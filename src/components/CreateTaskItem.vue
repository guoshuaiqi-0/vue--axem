<template>
	<div class="createTaskItem">
		<el-form ref="params" :model="params" label-width="80px">
			<el-form-item label="任务名称">
				<el-input v-model="params.taskName"></el-input>
			</el-form-item>
			<el-form-item label="任务时长">
				<el-input placeholder="请输入内容" v-model="params.duration">
					<template slot="append">小时</template>
				</el-input>
			</el-form-item>
			<el-form-item label="任务描述">
				<el-input type="textarea" :rows="5" v-model="params.updatedAt"></el-input>
			</el-form-item>
			<el-form-item label="执行人">
				<el-select v-model="value" multiple placeholder="请选择">
					<el-option v-for="item in userIds" :key="item.id" :label="item.name" :value="item.id">
						<span style="float: left">{{ item.name }}</span>
						<span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否紧急">
				<el-switch v-model="params.levelName"></el-switch>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submit">立即创建</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				params: {},
				value: [],
				key: '',
				userIds: []
			}
		},
		props: ['userId', 'taskInfo', 'userList'],
		created() {
			if (this.userId) {
				this.userIds = this.userId
			}
			if (this.taskInfo) {
				this.params = this.taskInfo
				this.params.levelName = this.params.levelName == '紧急' ? 1 : 0;
			}
			if (this.userList) {
				this.userIds = this.userList
			}
		},
		watch: {
			userId(val) {
				this.userIds = val
			},
			taskInfo(val) {
				this.params = val
				this.params.levelName = this.params.levelName == '紧急' ? 1 : 0;
			},
			userList(val) {
				this.userIds = val
			}
		},
		methods: {
			submit() {
				const params = {
					name: this.params.taskName,
					desc: this.params.updatedAt,
					duration: this.params.duration,
					level: this.params.levelName ? 1 : 0
				}
				if (this.userId) {
					this.$emit('creatTask', {
						params: params,
						userIds: this.value
					})
				}else if(this.taskInfo){
					params.id = this.taskInfo.id
					this.$emit('updateTask', {
						params: params,
					})
				}
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
