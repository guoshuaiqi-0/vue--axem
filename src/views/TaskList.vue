<template>
	<div class="taskList">
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="任务id" width="80" align>
			</el-table-column>
			<el-table-column prop="taskName" label="任务名称">
			</el-table-column>
			<el-table-column prop="level" label="任务状态">
			</el-table-column>
			<el-table-column prop="desc" label="任务描述">
			</el-table-column>
			<el-table-column prop="userName" label="发布人">
			</el-table-column>
			<el-table-column prop="userId" label="发布人ID">
			</el-table-column>
			<el-table-column prop="duration" label="任务时长">
			</el-table-column>
			<el-table-column prop="createdAt" label="创建时间">
			</el-table-column>
			<el-table-column prop="createdAt" label="更新时间">
			</el-table-column>
			<el-table-column label="">
				<template slot-scope="scope">
					<el-button size="mini" @click="hand('taskDetails', scope.row)">任务详情</el-button>
				</template>
			</el-table-column>
			<el-table-column label="">
				<template slot-scope="scope">
					<el-button size="mini" @click="release(scope.row)">领取任务</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
			:current-page="fenye.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="fenye.pageSize"
			layout="total, sizes, prev, pager, next, jumper" :total="count">
		</el-pagination>

	</div>
</template>

<script>
	// @ is an alias to /src
	import {
		getListTaskApi,
		getUserInfoApi,
		releaseTaskApi
	} from '../api/api.js'

	import hand from '../mixins/hand.js'

	export default {
		name: "taskList",
		mixins: [hand],
		data() {
			return {
				tableData: [],
				fenye: {
					pagination: true,
					pageSize: 10, //非必填  每页获取几条数据  如果不传 默认是获取10条；	
					pageNum: 1 //非必填  想获取第几页的数据  如果不传 默认是第1页；
				},
				count: 0,
				myid: ''
			}
		},
		created() {
			this.getuser()
			this.taskList(this.fenye)
		},
		methods: {
			async getuser() {
				var res = await getUserInfoApi()
				if (res.data.status == 1) {
					this.myid = res.data.data[0].id
				}
			},
			async taskList(params) {
				var res = await getListTaskApi(params)
				if (res.data.status == 1) {
					this.tableData = res.data.data.rows
					this.count = res.data.data.count
				}
			},
			handleSizeChange(val) {
				this.fenye.pageSize = val
			},
			handleCurrentChange(val) {
				this.fenye.pageNum = val
			},
			async release(key) {
				const params = {
					userId: [this.myid], //用户id，  如果给多个人发送任务，可以传数组，数组中是每一个人的id； 
					taskId: key.id, //任务id   
				}
				var res = await releaseTaskApi(params)
				if (res.data.status == 1) {
					alert('领取成功')
				}
			}
		},
		watch: {
			tableData(newval) {
				for (var item in newval) {
					const date = new Date(newval[item].createdAt)
					newval[item].createdAt = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
					newval[item].level = newval[item].level == 0 ? '普通' : '紧急';
				}
			},
			"fenye.pageSize"() {
				this.taskList(this.fenye)
			},
			"fenye.pageNum"() {
				this.taskList(this.fenye)
			},
		},

	};
</script>

<style lang="scss" scoped>
	.taskList {
		overflow: hidden;
	}
</style>
