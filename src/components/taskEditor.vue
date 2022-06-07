<template>
  <div class="teskEditor">
    <!-- <h1>我是更改任务</h1> -->
    <el-form :model="params" label-width="80px">
      <el-form-item label="任务名称">
        <el-input v-model="params.name"></el-input>
      </el-form-item>
      <el-form-item label="任务时长">
        <el-input placeholder="请输入内容" v-model="params.duration">
          <template slot="append">小时</template>
        </el-input>
      </el-form-item>
      <el-form-item label="任务描述">
        <el-input type="textarea" v-model="params.desc" :rows="5"></el-input>
      </el-form-item>
      <el-form-item label="执行人" v-if="userList.length > 0">
        <el-select v-model="list" multiple placeholder="请选择">
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否紧急">
        <el-switch v-model="params.level"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="zx">{{ btnName }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["userList", "taskInfo", "btnName"],
  created() {
    this.params =
      this.taskInfo && Object.keys(this.taskInfo).length > 0
        ? this.taskInfo
        : this.params;
  },
  data() {
    return {
      params: {
        name: "", //任务名称
        desc: "", //任务描述
        duration: "", //任务时长,
        level: false,
        region: "",
      },
      list: [],
    };
  },
  watch: {
    taskInfo: function (val) {
      this.params = val;
    },
  },
  methods: {
    zx() {
      this.$emit("my-modify");
    },
  },
};
</script>
