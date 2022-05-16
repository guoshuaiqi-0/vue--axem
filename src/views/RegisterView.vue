<template>
<div class="register flex-centen">
    <div class="body">
        <el-container class="container">
            <el-header class="header align">Header</el-header>
            <el-main class="main flex-direction">
                <el-steps :active="active" finish-status="success" align-center>
                    <el-step title="步骤 1"></el-step>
                    <el-step title="步骤 2"></el-step>
                </el-steps>
                <div v-if="active == 0">
                    <!--
                    <div class="verification flex-between mr-10">
                        <el-input class="mrr-20" placeholder="请输入验证码"></el-input>
                        <el-button>获取验证码</el-button>
                    </div> -->
                    <el-form :label-position="labelPosition" :rules="rules" label-width="20px" :model="formLabelAlign" status-icon ref="formLabelAlign">
                        <el-form-item label=" " prop="username">
                            <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="formLabelAlign.username"></el-input>
                        </el-form-item>
                        <el-form-item label=" " prop="password">
                            <el-input placeholder="请输入密码" type="password" prefix-icon="el-icon-key" v-model="formLabelAlign.password"></el-input>
                        </el-form-item>
                        <el-form-item label=" " prop="confirmPass">
                            <el-input placeholder="请再次输入密码" type="password" prefix-icon="el-icon-key" v-model="formLabelAlign.confirmPass"></el-input>
                        </el-form-item>
                        <el-form-item label=" " prop="email">
                            <el-input placeholder="请输入邮箱" prefix-icon="el-icon-message" v-model="formLabelAlign.email"></el-input>
                        </el-form-item>
                        <el-form-item label=" " prop="phone">
                            <el-input placeholder="请输入电话" prefix-icon="el-icon-phone-outline" v-model="formLabelAlign.phone"></el-input>
                        </el-form-item>
                        <div class="verification flex-between mr-10">
                            <el-form-item label=" " prop="captcha">
                                <el-input class="mrr-20" placeholder="请输入验证码" v-model="formLabelAlign.captcha"></el-input>
                            </el-form-item>
                            <img :src="captchaApi" alt="" @click="refreshCaptcha">
                        </div>
                        <div class="button mr-20">
                            <el-button type="primary" @click="submitForm('formLabelAlign')">注册</el-button>
                        </div>
                    </el-form>
                </div>
                <div v-else-if="active == 1">
                    <div class="img flex-direction">
                        <i class="el-icon-circle-check"></i>
                        <p>恭喜您注册成功，{{s}}秒后自动跳转主页</p>
                    </div>
                    <div class="verification flex-between mr-10">
                        <el-button @click="tabhome">自动登录</el-button>
                        <el-button>返回首页</el-button>
                    </div>
                </div>

            </el-main>
        </el-container>
    </div>
</div>
</template>

<script>
import {
    getCaptchaApi,
    getLoginApi,
    postRegisterApi
} from '@/api/api.js'
// @ is an alias to /src
import {
    encrypt,
} from '@/assets/utils/index.js'
export default {
    name: "RegisterView",
    data() {
        var validatename = (rule, value, callback) => {
            let res = /(\W)/.test(value);
            if (res) {
                callback(new Error('用户名含有非法字符'));
            } else {
                callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.formLabelAlign.confirmPass !== '') {
                    this.$refs.formLabelAlign.validateField('confirmPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.formLabelAlign.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            active: 0,
            s: 3,
            captchaApi: '/api/captcha',
            labelPosition: 'right',
            formLabelAlign: {
                username: '',
                password: '',
                confirmPass: '',
                email: '',
                captcha: '',
                phone: ''
            },
            rules: {
                username: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        max: 15,
                        message: '长度在 6 到 15 个字符',
                        trigger: 'blur'
                    },
                    {
                        validator: validatename,
                        trigger: 'blur',
                    }
                ],
                password: [{
                    required: true,
                    validator: validatePass,
                    trigger: 'blur',
                }, {
                    min: 6,
                    max: 15,
                    message: '长度在 6 到 15 个字符',
                    trigger: 'blur'
                }],
                confirmPass: [{
                    required: true,
                    validator: validatePass2,
                    trigger: 'blur'
                }, {
                    min: 6,
                    max: 15,
                    message: '长度在 6 到 15 个字符',
                    trigger: 'blur'
                }],
                email: [{
                    required: true,
                    message: '请输入密码名称',
                    trigger: 'blur'
                }, ],
                phone: [{
                        required: true,
                        message: '请输入电话',
                        trigger: 'blur'
                    },
                    {
                        min: 11,
                        max: 11,
                        message: '请输入正确的手机号',
                        trigger: 'blur'
                    }
                ],
                captcha: [{
                    required: true,
                    message: '请输入验证码',
                    trigger: 'blur'
                }]

            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (!valid) {
                    this.$message.error('请输入正确信息');
                    return false;
                }
                var res = await postRegisterApi({payload:{
                    username: this.formLabelAlign.username,
                    password: this.formLabelAlign.password,
                    email: this.formLabelAlign.email,
                    phone: this.formLabelAlign.phone,
                    captcha: this.formLabelAlign.captcha,
                }})
                if (res.data.status == 1) {
                    this.$message({
                        message: '注册成功',
                        type: 'success'
                    });
                    this.active = 1
                    this.countdown()
                } else {
                    this.$message.error(res.data.msg);
                    this.refreshCaptcha()
                }

            });
        },
        refreshCaptcha() {
            this.captchaApi = getCaptchaApi()
        },
        countdown() {
            var tab = setInterval(() => {
                if (this.s != 1) {
                    this.s--
                } else {
                    this.login(this.formLabelAlign.username, encrypt(this.formLabelAlign.password), this.formLabelAlign.captcha)
                    clearInterval(tab)
                }
            }, 1000)
        },
        async login(username, password, captcha) {
            var res = await getLoginApi({payload:{
                username,
                password,
                captcha
            }})
            if (res.data.status == 1) {
                window.sessionStorage.setItem('token', res.data.data)
                this.tabhome()
            }

        },
        tabhome() {
            this.$router.push({
                name: 'home'
            })
        }

    }
};
</script>

<style lang="scss" scoped>
.register {
    height: 100vh;

    & .body {
        width: 1000px;
        height: 700px;
        border: 13px solid black;
        border-radius: 10px;
        background-color: #f9f9fd;

        & .container {
            padding: 0 60px;
            padding-bottom: 60px;
            height: 100%;

            & .main {
                height: 100%;
                background-color: white;
                padding: 0 30%;
                min-width: 550px;

                & .el-steps {
                    width: 100%;
                }

                .button {
                    width: 100%;

                    & .el-button {
                        width: 100%;
                    }
                }

                .img {
                    width: 100%;
                    height: 100px;
                    margin: 50px 0;
                    color: rgb(24, 240, 96);
                    font-weight: bold;

                    & i {
                        font-size: 30px;
                    }
                }
            }
        }
    }
}
</style>
