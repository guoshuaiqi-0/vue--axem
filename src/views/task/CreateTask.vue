<template>
	<div class="createTask">
		<h1>创建任务</h1>
		<CreateTaskItem ref="createTask" @creatTask="createTask" :userId="userList"></CreateTaskItem>
	</div>
</template>

<script>
	import {
		creatTaskApi,
		getUserList,
		releaseTaskApi
	} from '../../api/api.js'

	import CreateTaskItem from "@/components/CreateTaskItem.vue"

	export default {
		name: "createTask",
		components: {
			CreateTaskItem
		},
		data() {
			return {
				userList: []
			}
		},
		created() {
			this.getListUser()
		},
		methods: {
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
			// 创建任务接口
			async createTask(e) {
				var res = await creatTaskApi(e.params)
				if (res.data.status == 1) {
					this.releaseTask({
						userIds: e.userIds,
						taskId: res.data.data[0].id
					})
				}
			},
			// 发布任务接口
			async releaseTask(params) {
				var res = await releaseTaskApi(params)
				if (res.data.status == 1) {
					console.log(res)
				}
			}
		}
	};
</script>

<style lang="scss" scoped>

</style>
