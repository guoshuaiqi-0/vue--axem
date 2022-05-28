<template>
	<div class="newRole">
		<div class="header">
			<span class="header_h1">新增角色权限</span>
		</div>
		<div class="main">
			<div class="head">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-row>
						<el-col :span="6">
							<el-form-item label="角色名称" prop="name">
								<el-input v-model="ruleForm.name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="所属部门" prop="name">
								<el-input v-model="ruleForm.name"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div class="listTable">
				<tableList></tableList>
				<el-button type="primary" class="mr-20">确认创建</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import tableList from '../../components/tableList.vue'
	export default {
		name: "newRole",
		components: {
			tableList
		},
		data() {
			return {
				ruleForm: {

				},
				rules: {
					name: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
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
