<template>
	<div class="roleManagement">
		<div class="header align">
			<span class="el-icon-user"></span>
			<h1 class="mar-10">角色管理</h1>
		</div>
		<div class="main">
			<div class="left">
				<div class="head">
					<div class="newRole flex-centen mar-30" @click="hand('newRole')"><span
							class="el-icon-user"></span>新增角色</div>
					<div class="newGroup flex-centen mar-30"><span class="el-icon-user"></span>新建分组</div>
				</div>
				<div class="conter">
					<el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" text-color="#666666"
						active-text-color="#6cd6bf">
						<el-submenu :index="item.id+''" v-for="(item,index) in list" :key="index">
							<template slot="title">
								<i class="el-icon-location"></i>
								<span>{{ item.groupName }}</span>
							</template>
							<el-menu-item v-for="(menu_item,index) in item.renyuan" :index="menu_item.id+''"
								:key="index">{{ menu_item.roleName }}</el-menu-item>
						</el-submenu>
					</el-menu>
				</div>
			</div>
			<div class="right">
				<div class="head">
					<h1 class="head_h1">所有者<span class="head_span mar-10">系统默认角色，默认具有企业所有功能权限和全部数据可见范围</span></h1>
				</div>
				<div class="menu">
					<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
						@select="handleSelect">
						<el-menu-item index="1">角色成员</el-menu-item>
						<el-menu-item index="2">功能权限</el-menu-item>
						<el-menu-item index="3">数据范围</el-menu-item>
					</el-menu>
				</div>
				<div class="" v-if="activeIndex == 1">
					1
				</div>
				<!-- 功能权限 -->
				<div class="functionalAuthority" v-else-if="activeIndex == 2">
					<tableList></tableList>
				</div>
				<div class="" v-else>
					3
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	import tableList from '../../components/tableList.vue'
	import hand from '@/mixins/hand.js'
	import {
		getRoleGroupListApi,
		getRoleListApi
	} from '../../api/api.js'
	export default {
		name: "roleManagement",
		components: {
			tableList
		},
		mixins: [hand],
		data() {
			return {
				activeIndex: '2',
				// 列表内容
				list: [],
				// 组的列表
				zuList: [],
				// 人员的列表
				perporList: []
			}
		},
		created() {
			this.roleGroupList();
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			handleSelect(key) {
				this.activeIndex = key
			},
			// 角色分组列表
			async roleGroupList() {
				var res = await getRoleGroupListApi({
					pagination: false
				})
				if (res.data.status == 1) {
					this.zuList = res.data.data.rows
					this.roleList()
				}
			},
			// 角色列表
			async roleList() {
				var res = await getRoleListApi({
					pagination: false
				})
				if (res.data.status == 1) {
					this.perporList = res.data.data.rows
					this.chuliList()
				}
			},
			// 处理列表数据
			chuliList() {
				this.zuList.forEach(item => {
					var renyuan = this.perporList.filter((per_item) => {
						if (per_item.groupId == item.id) return per_item
					})
					this.list.push({
						id: item.id, //分组id
						groupName: item.groupName, // 分组的名字
						renyuan: renyuan
					})
				})
				console.log(this.list)
			}
		}
	};
</script>

<style lang="scss" scoped>
	h1 {
		margin: 0;
	}

	.newRole {
		cursor: pointer;
	}

	.roleManagement {
		height: 100%;
		display: grid;
		grid-template-rows: 60px auto;
		background-color: white;

		& .header {
			padding-left: 20px;
			font-size: 22px;
			border-bottom: 1px solid #ebeff1;
		}

		.main {
			display: grid;
			grid-template-columns: 25% 75%;

			& .left {
				border-right: 1px solid #ebeff1;

				& .head {
					padding: 20px 0;
					font-size: 18px;
					display: flex;
					color: #4c8edd;
				}
			}

			.right {
				padding: 0 20px;

				& .head {
					& .head_h1 {
						padding-top: 18px;
						color: #727f90;
						font-size: 18px;

						& .head_span {
							font-size: 14px;
							color: #aaaaaa;
						}
					}
				}

				.functionalAuthority {
					padding: 20px;
				}

				// 功能权限

			}
		}
	}
</style>
