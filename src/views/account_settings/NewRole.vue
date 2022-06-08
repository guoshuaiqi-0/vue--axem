<template>
	<div class="newRole">
		<div class="header">
			<span class="header_h1">新增角色权限</span>
		</div>
		<div class="main">
			<div class="head">
				<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-row>
						<el-col :span="6">
							<el-form-item label="角色名称" prop="name">
								<el-input v-model="ruleForm.roleName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="所属部门">
								<el-select v-model="ruleForm.groupId" placeholder="请选择">
									<el-option v-for="(item,index) in groupingData" :key="index" :label="item.groupName"
										:value="item.id">
									</el-option>
								</el-select>
							</el-form-item>

						</el-col>
					</el-row>
				</el-form>
			</div>
			<div class="listTable">
				<tableList></tableList>
				<el-button type="primary" class="mr-20" @click="confirmCreation">确认创建</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import tableList from '../../components/tableList.vue'
	import {
		getUserInfoApi,
		getRoleGroupListApi,
		getRoleCreateApi
	} from '@/api/api.js'

	export default {
		name: "newRole",
		components: {
			tableList
		},
		data() {
			return {
				ruleForm: {
					userId: '',
					roleName: '',
					groupId: ''
				},
				// 分组信息
				groupingData: [],
			}
		},
		created() {
			this.userInfo()
			this.roleGroupList()
		},
		methods: {
			// 获取用户信息
			async userInfo() {
				var res = await getUserInfoApi()
				if (res.data.status == 1) {
					this.ruleForm.userId = res.data.data[0].id
				}
			},
			// 获取分组信息
			async roleGroupList() {
				var res = await getRoleGroupListApi({
					pagination: false
				})
				if (res.data.status == 1) {
					this.groupingData = res.data.data.rows
				}
			},
			// 确认创建
			async confirmCreation() {
				if (this.ruleForm.groupId && this.ruleForm.roleName) {
					var res = await getRoleCreateApi(this.ruleForm)
					console.log(res)
				} else {
					this.$message.error('缺少必填信息，请检查所需信息是否输入完成!');
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.newRole {
		height: 100%;
		display: grid;
		grid-template-rows: 40px auto;

		& .header {
			font-size: 18px;
		}

		& .main {
			background-color: white;
			padding: 15px;
			box-sizing: border-box;
			display: grid;
			grid-template-rows: 60px auto;

			& .head {
				border-bottom: 1px solid #f3f2f7;
			}
		}
	}
</style>
