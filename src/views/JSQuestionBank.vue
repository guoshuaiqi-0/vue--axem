<template>
  <div class="JSquestionBank">
    <div class="head">
      <div class="shiYong">
        <span class="color-5b5b5b">适用考试：</span>
        <el-radio-group v-model="listParams.type" @change="listData">
          <el-radio-button :label="1" class="radio-mr5">单选题</el-radio-button>
          <el-radio-button :label="2" class="radio-mr5">多选题</el-radio-button>
          <el-radio-button :label="3" class="radio-mr5">填空题</el-radio-button>
          <el-radio-button :label="4" class="radio-mr5">问答题</el-radio-button>
        </el-radio-group>
      </div>
      <div class="shiJuan mr-20">
        <span class="color-5b5b5b">试卷形式：</span>
        <el-radio-group v-model="radio2">
          <el-radio-button label="全部" class="radio-mr5"></el-radio-button>
          <el-radio-button label="考生同卷" class="radio-mr5"></el-radio-button>
          <el-radio-button label="随机顺序" class="radio-mr5"></el-radio-button>
          <el-radio-button label="考生试卷" class="radio-mr5"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="flex-between mr-20">
        <div class="left">
          <el-button type="primary" @click="createModify()">添加题目</el-button>
          <el-button type="primary">策略组卷</el-button>
          <el-button type="primary">手动组卷</el-button>
        </div>
        <div class="right">
          <el-input
            placeholder="请输入内容"
            suffix-icon="el-icon-search"
            @change="titleLookup"
            v-model="title"
          >
          </el-input>
        </div>
      </div>
    </div>
    <div class="item mr-20" v-for="(item, index) in listRows" :key="index">
      <div class="header">
        <p class="text">创建时间：{{ time(item.createdAt) }}</p>
        <div class="type mar-50">{{ rowsType(item.type) }}</div>
        <div class="difficulty mar-10">{{ rowsLevel(item.level) }}</div>
        <p class="text mar-50">使用次数：18次</p>
        <div class="picture_button">
          <img
            src="../assets/icon_chazhao.png"
            class="icon"
            alt=""
            @click="createModify(item)"
          />
          <img
            src="../assets/icon_lajitong.png"
            class="icon mar-10"
            alt=""
            @click="removeQuertion(item.id, item.type)"
          />
        </div>
      </div>
      <div class="main">
        <el-checkbox v-model="checked[item.id]"></el-checkbox>
        <span class="mar-10">{{ item.title }}</span>
        <div class="radio mar-20">
          <el-radio-group v-model="radio.id">
            <el-radio label="A" disabled class="mar-50" v-if="item.questionA"
              >A. {{ item.questionA }}
            </el-radio>
            <el-radio label="B" disabled class="mar-50" v-if="item.questionB"
              >B. {{ item.questionB }}
            </el-radio>
            <el-radio label="C" disabled class="mar-50" v-if="item.questionC"
              >C. {{ item.questionC }}
            </el-radio>
            <el-radio label="D" disabled class="mar-50" v-if="item.questionD"
              >D. {{ item.questionD }}
            </el-radio>
          </el-radio-group>
        </div>
        <span class="mar-30">答案：{{ item.answer }}</span>
      </div>
      <div class="footer">
        <p class="mar-30">
          所属知识点：<span class="mar-50">知识点一</span
          ><span class="mar-50">知识点一</span>
        </p>
        <p class="mar-30">解析：这是解析字段</p>
      </div>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 15, 20, 30, 50]"
        :page-size="listParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      >
      </el-pagination>
    </div>

    <!-- 链接模块 -->

    <!-- 创建问题 -->
    <el-drawer
      title="我是标题"
      :visible.sync="createQuestion"
      :with-header="false"
      size="50%"
      class="creat_question"
      :before-close="handleClose"
    >
      <div class="box">
        <div class="form_Question">
          <h1 class="mar-20">{{ createModifytext }}</h1>
          <el-row class="title align mr-20">
            <el-col :span="4">题目标题：</el-col>
            <el-col :span="16">
              <el-input
                v-model="creatParams.title"
                placeholder="请输入内容"
              ></el-input>
            </el-col>
          </el-row>
          <el-row
            class="align mr-20"
            v-for="item in questionOption"
            :key="item.id"
          >
            <el-col :span="4">{{ item.label }}：</el-col>
            <el-col :span="16">
              <el-input
                v-model="item.value"
                placeholder="请输入内容"
              ></el-input>
            </el-col>
            <el-col
              :span="2"
              v-if="item.id == questionOption.length && item.id < 4"
            >
              <i
                class="el-icon-circle-plus-outline i"
                @click="addQuestionOption()"
              ></i>
            </el-col>
            <el-col
              :span="1"
              v-if="item.id == questionOption.length && item.id > 2"
            >
              <i
                class="el-icon-remove-outline i"
                @click="removeQuestionOption(item.id)"
              ></i>
            </el-col>
          </el-row>
          <el-row class="answer align mr-20">
            <el-col :span="4">答案：</el-col>
            <el-col :span="16">
              <el-select
                v-model="creatParams.answer"
                placeholder="请选择"
                class="select"
              >
                <el-option
                  v-for="(item, index) in answer"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row class="level align mr-20">
            <el-col :span="4">难易程度：</el-col>
            <el-col :span="16">
              <el-select
                v-model="creatParams.level"
                placeholder="请选择"
                class="select"
              >
                <el-option
                  v-for="(item, index) in levelOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row class="submite align mr-20">
            <el-col :span="6" :offset="4">
              <el-button
                type="primary"
                class="select"
                @click="createModifySubmite"
                >提交</el-button
              >
            </el-col>
            <el-col :span="6" :offset="4">
              <el-button type="info" class="select" @click="close()"
                >取消</el-button
              >
            </el-col>
          </el-row>
        </div>
      </div>
    </el-drawer>
    <!-- 修改问题 -->
  </div>
</template>

<script>
import {
  getQuestionListApi,
  getQuestionCreateApi,
  getQuestionDeleteApi,
  getQuestionUpdateApi,
} from "@/api/api.js";

import processingData from "@/mixins/processingData.js";

export default {
  name: "JSquestionBank",
  mixins: [processingData],
  data() {
    return {
      title: "",
      checked: {},
      radio: {},
      radio2: "全部",
      listParams: {
        type: 1, // < number > , 必填项  题目类型  1：单选题  2：多选题  3：填空题  4：问答题   注：暂只支持单选；
        pagination: true, //< boolean > , 非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页;
        pageSize: 10, // < number > , 非必填  每页获取几条数据  如果不传 默认是获取10条；
        pageNum: 1, //< number > ,非必填  想获取第几页的数据  如果不传 默认是第1页；
      },
      listRows: [],
      count: 0,
      createQuestion: false,
      creatParams: {
        type: 1, //<number>, 题目类型
        title: "", //<string>,题目标题
        answer: "", //<string>,     答案  如果是单选题则传 A 或者  B 或  C 或 D (大写)
        level: "", //<number>,     难度系数  1：简单  2：普通 3：困难
      },
      questionOption: [
        {
          id: 1,
          label: "选项A",
          name: "questionA",
          value: "",
        },
        {
          id: 2,
          label: "选项B",
          name: "questionB",
          value: "",
        },
      ],
      answerOptions: [
        {
          value: "A",
          label: "A",
        },
        {
          value: "B",
          label: "B",
        },
        {
          value: "C",
          label: "C",
        },
        {
          value: "D",
          label: "D",
        },
      ],
      levelOptions: [
        {
          value: 1,
          label: "简单",
        },
        {
          value: 2,
          label: "普通",
        },
        {
          value: 3,
          label: "困难",
        },
      ],
      createModifytext: "创建题目",
      questionObj: [
        {
          id: 1,
          label: "选项A",
          name: "questionA",
          value: "",
        },
        {
          id: 2,
          label: "选项B",
          name: "questionB",
          value: "",
        },
        {
          id: 3,
          label: "选项C",
          name: "questionC",
          value: "",
        },
        {
          id: 4,
          label: "选项D",
          name: "questionD",
          value: "",
        },
      ],
      id: 0,
    };
  },
  created() {
    this.listData();
  },
  computed: {
    answer() {
      var arr = [];
      this.answerOptions.forEach((item, index) => {
        if (this.questionOption[index]) {
          arr.push(item);
        }
      });
      return arr;
    },
  },

  methods: {
    // 模糊查找
    titleLookup() {
      this.listData();
    },
    close() {
      this.createQuestion = false;
      this.emptyCreat();
    },
    createModifySubmite() {
      if (this.createModifytext == "创建题目") {
        this.creatQuestion();
      } else {
        this.updateQuestion();
      }
    },
    async updateQuestion() {
      const { type, title, answer, level, id = this.id } = this.creatParams;
      var questionA = "",
        questionB = "",
        questionC = "",
        questionD = "";
      this.questionOption.forEach((el) => {
        if (el.name == "questionA") {
          questionA = el.value;
        } else if (el.name == "questionB") {
          questionB = el.value;
        } else if (el.name == "questionC") {
          questionC = el.value;
        } else {
          questionD = el.value;
        }
      });
      if (
        this.checkParams({
          id,
          type,
          title,
          questionA,
          questionB,
          questionC,
          questionD,
          answer,
          level,
        })
      ) {
        var res = await getQuestionUpdateApi({
          id,
          type,
          title,
          questionA,
          questionB,
          questionC,
          questionD,
          answer,
          level,
        });
        if (res.data.status == 1) {
          this.createQuestion = false;
          console.log(res);
          // 刷新查找
          this.listData();
          // 执行清空
          this.emptyCreat();
        }
      }
    },
    createModify(item) {
      this.createQuestion = true;
      if (!item) {
        this.createModifytext = "创建题目";
      } else {
        this.createModifytext = "修改题目";
        this.id = item.id;
        this.creatParams = item;
        var arr = [];
        for (var i in item) {
          for (var q in this.questionObj) {
            if (this.questionObj[q].name == i && item[i]) {
              this.questionObj[q].value = item[i];
              arr.push(this.questionObj[q]);
            }
          }
        }
        this.questionOption = arr;
      }
    },
    emptyCreat() {
      this.creatParams = {
        type: 1, //<number>, 题目类型
        title: "", //<string>,题目标题
        answer: "", //<string>,     答案  如果是单选题则传 A 或者  B 或  C 或 D (大写)
        level: "", //<number>,     难度系数  1：简单  2：普通 3：困难
      };
      this.questionOption = [
        {
          id: 1,
          label: "选项A",
          name: "questionA",
          value: "",
        },
        {
          id: 2,
          label: "选项B",
          name: "questionB",
          value: "",
        },
      ];
    },
    async modifyQuestion() {
      const {
        id,
        type,
        title,
        questionA,
        questionB,
        questionC,
        questionD,
        answer,
        level,
      } = this.updateParams;
      if (
        this.checkParams({
          id,
          type,
          title,
          questionA,
          questionB,
          questionC,
          questionD,
          answer,
          level,
        })
      ) {
        var res = await getQuestionUpdateApi({
          id,
          type,
          title,
          questionA,
          questionB,
          questionC,
          questionD,
          answer,
          level,
        });
        if (res.data.status == 1) {
          this.listData();
        }
      }
    },
    removeQuertion(id, type) {
      this.$confirm("此操作将永久删除该题目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          var res = await getQuestionDeleteApi({
            id,
            type,
          });
          if (res.data.status == 1) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.listData();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async creatQuestion() {
      const { type, title, answer, level } = this.creatParams;
      var questionA = "",
        questionB = "",
        questionC = "",
        questionD = "";
      this.questionOption.forEach((el) => {
        if (el.name == "questionA") {
          questionA = el.value;
        } else if (el.name == "questionB") {
          questionB = el.value;
        } else if (el.name == "questionC") {
          questionC = el.value;
        } else {
          questionD = el.value;
        }
      });
      if (
        this.checkParams({
          type,
          title,
          questionA,
          questionB,
          questionC,
          questionD,
          answer,
          level,
        })
      ) {
        var res = await getQuestionCreateApi({
          type,
          title,
          questionA,
          questionB,
          questionC,
          questionD,
          answer,
          level,
        });
        if (res.data.status == 1) {
          this.createQuestion = false;
          this.listData();
          //
          this.emptyCreat();
        }
      }
    },
    removeQuestionOption(val) {
      this.questionOption.forEach((el) => {
        if (el.id == val) {
          el.value = "";
        }
      });
      this.questionOption.pop();
    },
    addQuestionOption() {
      var len = this.questionOption.length;
      this.questionOption.push(this.questionObj[len]);
    },
    async listData() {
      const { type, pagination, pageSize, pageNum } = this.listParams;
      const title = this.title;
      var res = await getQuestionListApi({
        type,
        pagination,
        pageSize,
        pageNum,
        title,
      });
      if (res.data.status == 1) {
        this.listRows = res.data.data.rows;
        this.count = res.data.data.count;
        res.data.data.rows.forEach((item) => {
          this.radio.id = item.answer;
        });
      }
    },
    handleSizeChange(val) {
      this.listParams.pageSize = val;
      this.listData();
      console.log(`每页 ${this.listParams.pageSize} 条`);
    },
    handleCurrentChange(val) {
      this.listParams.pageNum = val;
      this.listData();
      console.log(`当前页: ${val}`);
    },
    handleClose(done) {
      done();
      this.emptyCreat();
    },
    checkParams(obj = {}) {
      let debuge = true;
      var checkTemplate = {
        title: "标题",
        questionA: "选项A",
        questionB: "选项B",
        answer: "答案",
        level: "难度",
      };
      for (var key in obj) {
        console.log(this.questionOption);
        if (
          key == "questionC" &&
          this.questionOption.length == 3 &&
          obj[key] == ""
        ) {
          this.$message({
            type: "info",
            message: `选项C不能为空`,
          });
          debuge = false;
          return;
        } else if (
          key == "questionD" &&
          this.questionOption.length == 4 &&
          obj[key] == ""
        ) {
          this.$message({
            type: "info",
            message: `选项D不能为空`,
          });
          debuge = false;
          return;
        } else if (key == "questionC" || key == "questionD") {
          continue;
        } else if (!obj[key]) {
          this.$message({
            type: "info",
            message: `${checkTemplate[key]}不能为空`,
          });
          debuge = false;
          return;
        }
      }

      return debuge;
    },
  },
};
</script>

<style lang="scss" scoped>
.JSquestionBank {
  & .head {
    box-sizing: border-box;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;

    & ::v-deep .el-radio-button__inner {
      border-radius: 50px;
      padding: 2px 15px;
    }
  }

  .item {
    border: 1px solid #eaecf0;
    border-radius: 5px;
    padding: 14px 20px;
    font-size: 12px;
    font-weight: 600;
    color: #c2c2c2;

    & .header {
      & .text {
        margin: 0;
        padding: 4px 0;
        display: inline-block;
      }

      .type,
      .difficulty {
        display: inline-block;
        padding: 4px 6px;
        border-radius: 2px;
        color: white;
      }

      .type {
        background-image: linear-gradient(#f24a38, #fa7d65);
      }

      .difficulty {
        background-image: linear-gradient(#72d994, #72d9aa);
      }

      .picture_button {
        float: right;
      }
    }

    .main {
      color: black;
      padding: 10px 0;
      border-bottom: 1px dashed #e2e5ea;
      margin-bottom: 4px;

      & .radio {
        padding: 26px 0;
      }
    }

    .footer {
      & p {
        margin: 12px 0 0 0;
      }
    }
  }

  .creat_question {
    & .box {
      height: 100vh;
      border: 6px solid aqua;
      padding: 10px;

      & .form_Question {
        padding: 10px;

        & .el-row {
          text-align: center;

          & .i {
            font-size: 20px;
            cursor: pointer;
          }

          .select {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
