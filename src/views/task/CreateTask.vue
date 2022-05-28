<template>
	<div class="createTask">
		<el-form ref="params" :model="params" label-width="80px">
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
			<el-form-item label="执行人">
				<el-cascader :options="userList" :props="props" v-model="list">
					<template slot-scope="{ data }">
						<span>{{ data.name }}</span>
					</template>
				</el-cascader>
			</el-form-item>
			<el-form-item label="是否紧急">
				<el-switch v-model="params.level"></el-switch>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit('params')">立即创建</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	// @ is an alias to /src
	import {
		creatTaskApi,
		getUserList,
		releaseTaskApi
	} from '../../api/api.js'

	export default {
		name: "createTask",
		data() {
			return {
				props: {
					multiple: true,
					value: 'id',
					label: 'name'
				},
				params: {
					name: '', //任务名称
					desc: '', //任务描述
					duration: '', //任务时长,
					level: false,
					region: ''
				},
				userList: [],
				list: [],
				publishUserList: [],
				rules: {
					taskName: [{
						required: true,
						message: "请输入内容",
						trigger: 'blur'
					}],
				}
			}
		},
		created() {
			this.getListUser()
		},
		methods: {
			onSubmit(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.taskCreat()
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			async taskCreat() {
				const params = {
					name: this.params.name, //任务名称
					desc: this.params.desc, //任务描述
					duration: Number(this.params.duration), //任务时长,
					level: this.params.level == true ? 1 : 0
				}
				var res = await creatTaskApi(params)
				if (res.data.status == 1) {
					this.taskRelease(res.data.data[0])
				}
			},
			// 获取用户信息列表
			async getListUser() {
				var res = await getUserList({
					pagination: false
				})
				if (res.data.status == 1) {
					this.userList = res.data.data.data.rows
				}
			},
			publishTask(id) {
				var publishUserList = []
				this.list.forEach(option => {
					publishUserList.push(option[0])
				})
				const params = {
					taskId: id.id,
					userId: publishUserList
				}
				return params
			},
			async taskRelease(id) {
				var res = await releaseTaskApi(this.publishTask(id))
				console.log(res)
			}

		}
	};
</script>

<style lang="scss" scoped>
	.createTask {
		width: 60%;
	}

	::v-deep .el-cascader {
		width: 100%;
	}
</style>
