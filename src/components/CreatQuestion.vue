<template>
<div class="creatQuestion flex-centen">
    <div>
        <el-container class="conter flex-centen">
            <div class="form">
                <div>题目：<input type="text" v-model="title"></div>
                <div>
                    题目类型：
                    <select name="" id="" v-model="type">
                        <option value="1">单选</option>
                        <option value="2">多选</option>
                    </select>
                    题目难度：
                    <select name="" id="" v-model="level">
                        <option value="1">简单</option>
                        <option value="2">普通</option>
                        <option value="3">困难</option>
                    </select>
                </div>
                <div>
                    选项A：<input type="text" v-model="questionA">
                </div>
                <div>
                    选项B：<input type="text" v-model="questionB">
                </div>
                <div>
                    选项C：<input type="text" v-model="questionC">
                </div>
                <div>
                    选项D：<input type="text" v-model="questionD">
                </div>
                <div v-if="type == 1">正确答案：
                    <select name="" id="" v-model="answer">
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select></div>
                <div><button @click="onSubmit">提交</button></div>
            </div>
        </el-container>
    </div>

</div>
</template>

<script>
// @ is an alias to /src
import {
    getQuestionCreateApi
} from '@/api/api.js';

export default {
    name: 'creatQuestion',
    data() {
        return {
            type: 1, //题目类型
            title: '', //题目标题
            questionB: '', // 选项b,
            questionA: '', // 选项a,
            questionC: '', // 非必填 选项c,
            questionD: '', // 非必填 选项d,
            answer: '', // 答案
            level: 1, // 难度系数  1：简单  2：普通 3：困难

        }
    },
    methods: {
        aa() {
            console.log(this.params.level)
        },
        async onSubmit() {
            var res = await getQuestionCreateApi({
                type: Number(this.type),
                title: this.title,
                questionB: this.questionB,
                questionA: this.questionA,
                questionC: this.questionC,
                questionD: this.questionD,
                answer: this.answer,
                level: Number(this.level),
            })
            if (res.data.status == 1) {
                console.log(res)
                this.hand('JSquestionBank')
            }
        },
       hand(name) {
            if (this.$router.currentRoute.name == name) return;
            this.$router.push({
                name
            })
        },
        // removeDomain(item) {
        //     var index = this.form.domains.indexOf(item)
        //     if (index !== -1) {
        //         this.form.domains.splice(index, 1)
        //     }
        // },
        // addDomain() {
        //     this.form.domains.push({
        //         value: '',
        //         key: Date.now()
        //     });
        // }
    }
}
</script>

<style lang="scss" scoped>
.creatQuestion {
    height: calc(100vh - 120px);
}

.conter {
    width: 800px;
    height: 600px;
    border: 13px solid #1e80e1;
    background-color: #f5f8fd;
    align-items: center;

    & .el-form {
        width: 100% !important;
    }
}
</style>
