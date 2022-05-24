<template>
	<div class="den flex-centen">
		<div>
			<el-container class="conter">
				<div class="parallelogram flex-direction">
					<div class="title flex-direction">m</div>
					<div class="describe flex-direction">
						<p>mobideo</p>
						<span class="transcript">DIGITIZING INDUSTRIAL SERVICES</span>
					</div>
				</div>
				<div class="aside flex-align">
					<div class="item">
						<p>username</p>
						<el-input v-model="username" placeholder="请输入用户名" @blur="jiance"></el-input>
					</div>
					<div class="item">
						<p>password</p>
						<el-input v-model="password" placeholder="请输入密码" show-password></el-input>
					</div>
					<div class="captcha flex-between">
						<el-input v-model="captcha" placeholder="请输入验证码"></el-input>
						<img :src="captchaApi" alt="" @click="refreshCaptcha">
					</div>
					<el-button type="success" @click="submit">LOG IN</el-button>
				</div>
			</el-container>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	import {
		getCaptchaApi,
		getLoginApi,
	} from '@/api/api.js'
	import {
		encrypt
	} from '@/assets/utils/index.js'

	export default {
		name: "DengLu",
		data() {
			return {
				username: '',
				password: '',
				captcha: '',
				captchaApi: '/api/captcha'
			};
		},
		mounted() {
			this.refreshCaptcha()
			addEventListener("keyup", this.eventListener, true)
		},
		methods: {
			eventListener(e) {
				if (e.key == "Enter") this.submit()
			},
			jiance() {
				let res = /(\W)/.test(this.username);
				if (res) {
					this.$message({
						message: '用户名错误，有违法字符',
						type: 'warning'
					});
					this.username = ''
					this.refreshCaptcha()
				}
			},
			refreshCaptcha() {
				this.captchaApi = getCaptchaApi()
			},
			isvalue() {
				var value = {
					switch: true
				}
				if (this.username == '') {
					value.content = '用户名不能为空'
					value.switch = false
				} else if (this.password == '') {
					value.content = '密码不能为空'
					value.switch = false
				} else if (this.captcha == '') {
					value.content = '验证码不能为空'
					value.switch = false
				}
				return value
			},
			tabhome() {
				console.log(this.$router)
				this.$router.push({
					name: 'calendarInterface'
				})
			},
			async submit() {
				var debag = this.isvalue()
				if (!debag.switch) {
					this.refreshCaptcha()
					return this.$message({
						message: debag.content,
						type: 'warning'
					});
				}
				var res = await getLoginApi({
					payload: {
						username: this.username,
						password: encrypt(this.password),
						captcha: this.captcha
					}
				})
				if (res.data.status == 1) {
					window.sessionStorage.setItem('token', res.data.data)
					this.tabhome()
				} else {
					this.$message({
						message: res.data.msg,
						type: 'warning'
					});
					this.refreshCaptcha()
				}
			}
		},
		destroyed() {
			removeEventListener("keyup", this.eventListener, true)
		}
	};
</script>

<style lang="scss" scoped>
	.den {
		height: 100vh;
	}

	.conter {
		width: 800px;
		height: 600px;
		border: 13px solid #1e80e1;
		background-color: #f5f8fd;
		align-items: center;

		& .parallelogram {
			width: 295px;
			height: 480px;
			transform: skew(-10deg) translate(70px);
			background-color: #1e80e1;

			& .title {
				width: 78px;
				height: 78px;
				color: white;
				font-size: 60px;
				background-color: #1d7edf;
				box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
				transform: skew(10deg) translate(0, -30px);
			}

			.describe {
				color: white;
				font-size: 48px;

				& p {
					margin: 0;
				}

				.transcript {
					font-size: 10px;
					margin: 0;
					padding: 0;
				}
			}
		}

		.aside {
			width: 500px;
			height: 290px;
			background-color: white;
			box-sizing: border-box;
			margin-right: 25px;
			padding-right: 60px;

			& .item {
				width: 280px;

				& p {
					padding: 10px 0;
					margin: 0;
					color: #53a1ec;
				}
			}

			.captcha {
				width: 280px;
				margin-top: 20px;
			}

			.el-button {
				width: 280px;
				background-color: #61c6d0;
				margin: 20px 0;
			}
		}
	}
</style>
