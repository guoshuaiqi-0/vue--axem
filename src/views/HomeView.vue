<template>
	<div class="home">
		<el-container>
			<el-header class="header flex-between">
				<div class="logo flex-between">
					<img src="../assets/menu.png" class="icon-logo" alt="" @click="caidan = !caidan" />
					<span class="mar-10">现代学徒云平台</span>
				</div>
				<div class="info flex-between">
					<div class="nav">
						武汉市 2022-4-28 15:00 星期三 21~22℃ 晴 风力 1|2级 风向 无持续风向微风
					</div>
					<div class="avatars flex-between">
						<img src="../assets/icon_avatar.png" class="icon-avatars" alt="" />
						<span class="mar-10">{{phone}}</span>
					</div>
					<div class="exit flex-between" @click="logOut">
						<img src="../assets/exit.png" class="icon-exit" alt="" />
						<span class="mar-10">退出</span>
					</div>
				</div>
			</el-header>
			<el-container class="container">
				<el-aside width="200px" class="aside" v-show="caidan">
					<el-menu default-active="1" class="el-menu-vertical-demo" background-color="#0b1b34"
						text-color="#fff" active-text-color="#ffd04b">
						<el-submenu index="1">
							<template slot="title">
								<i class="el-icon-location"></i>
								<span>题库管理</span>
							</template>
							<el-menu-item index="1-1" @click="hand('questionBank')">题库管理</el-menu-item>
							<el-menu-item index="1-2" @click="hand('questionBank')">html题库</el-menu-item>
							<el-menu-item index="1-3" @click="hand('JSquestionBank')">css题库</el-menu-item>
							<el-menu-item index="1-4" @click="hand('JSquestionBank')">js题库</el-menu-item>
						</el-submenu>
						<el-submenu index="2">
							<template slot="title">
								<i class="el-icon-location"></i>
								<span>账号设置</span>
							</template>
							<el-menu-item index="2-1" @click="hand('personalData')">个人信息</el-menu-item>
							<el-menu-item index="2-2">修改头像</el-menu-item>
							<el-menu-item index="2-3">修改密码</el-menu-item>
							<el-menu-item index="2-4">账号绑定</el-menu-item>
							<el-menu-item index="2-5" @click="hand('calendarInterface')">日历</el-menu-item>
						</el-submenu>
						<el-submenu index="3">
							<template slot="title">
								<i class="el-icon-location"></i>
								<span>任务中心</span>
							</template>
							<el-menu-item index="3-1" @click="hand('createTask')">创建任务</el-menu-item>
						</el-submenu>
					</el-menu>
				</el-aside>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	// @ is an alias to /src
	import {
		getInfoApi,
		getLogoutApi,
	} from '@/api/api.js'

	import hand from '@/mixins/hand.js'

	export default {
		name: "HomeView",
		data() {
			return {
				phone: '',
				caidan: true
			};
		},
		mixins: [hand],
		created() {
			this.infor()
		},
		methods: {
			async logOut() {
				var res = await getLogoutApi()
				if (res.data.status == 1) {
					window.sessionStorage.setItem('token', '')
					this.hand('about')
				}
			},
			async infor() {
				var res = await getInfoApi()
				if (res.data.status == 1) {
					this.phone = res.data.data[0].phone
				} else if (res.data.status == 401) {
					this.hand('about')

				}

			}
		},
	};
</script>

<style lang="scss" scoped>
	.header {
		background-color: #3a84f1;
		font-size: 20px;
		color: white;

		& .logo {
			& .icon-logo {
				width: 30px;
				height: 30px;
				cursor: pointer;
			}
		}

		.info {
			font-size: 10px;
			display: flex;
			gap: 20px;

			& .exit {
				cursor: pointer;
			}

			.icon-avatars {
				width: 40px;
				height: 40px;
			}

			.icon-exit {
				width: 20px;
				height: 20px;
			}
		}
	}

	.container {
		height: calc(100vh - 60px);

		& .aside {
			background-color: #0b1b34;
		}


	}

	.el-main {
		background-color: #f7f7f7;
	}
</style>
