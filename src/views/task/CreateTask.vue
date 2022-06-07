<template>
	<div class="createTask">
		<taskEditor ref="task" :userList="userList" btnName="立即创建" @my-modify="onSubmit"></taskEditor>
	</div>
</template>

<script>
	import {
		creatTaskApi,
		getUserList,
		releaseTaskApi
	} from '../../api/api.js'

	export default {
		name: "createTask",
		data() {
			return {
				userList: [],
				publishUserList: [],
				list:[],
			}
		},
		created() {
			this.getListUser()
		},
		methods: {
			onSubmit() {
				// console.log(Array.isArray(this.$refs.task.list));
				this.taskCreat()
			},
			async taskCreat() {
				this.params = this.$refs.task.params;
				const params = {
					name: this.params.name, //任务名称
					desc: this.params.desc, //任务描述
					duration: Number(this.params.duration), //任务时长,
					level: this.params.level == true ? 1 : 0
				}
				var res = await creatTaskApi(params);
				if (res.data.status == 1) {
					let taskId = res.data.data[0].id;
					this.taskRelease(taskId);
				}
			},
			// 获取用户信息列表
			async getListUser() {
				var res = await getUserList({
					pagination: false
				})
				if (res.data.status == 1) {
					this.userList = res.data.data.data.rows;
					console.log(this.userList);
				}
			},
			async taskRelease(taskId) {
				let userIdArr = this.$refs.task.list;
				var res = await releaseTaskApi({
					userIds:userIdArr,
					taskId,
				})
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
