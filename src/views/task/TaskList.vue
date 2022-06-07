<template>
	<div class="taskList">
		<el-table :data="tableData">
			<el-table-column prop="id" label="任务id" width="80" align>
			</el-table-column>
			<el-table-column prop="taskName" label="任务名称" width="150">
			</el-table-column>
			<el-table-column label="任务状态" width="90">
				<template slot-scope="scope">
					<div>
						<el-tag type="success" v-if="scope.row.level == '普通'">{{ scope.row.level }}</el-tag>
						<el-tag type="danger" v-else>{{ scope.row.level }}</el-tag>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="userName" label="发布人" width="90">
			</el-table-column>
			<el-table-column prop="userId" label="发布人ID" width="90">
			</el-table-column>
			<el-table-column label="任务领取状态" width="150">
				<template slot-scope="scope">
					<div>
						<el-tag v-if="scope.row.isReceived == '已领取'">{{ scope.row.isReceived }}</el-tag>
						<el-tag type="danger" v-else>{{ scope.row.isReceived }}</el-tag>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="duration" label="任务时长" width="150">
			</el-table-column>
			<el-table-column prop="createdAt" label="创建时间" width="150">
			</el-table-column>
			<el-table-column prop="updatedAt" label="更新时间" width="150">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<div class="link">
						<el-link type="primary" size="mini" @click="hand('taskDetails', scope.row)">任务详情</el-link>
						<el-link type="primary" size="mini" @click="receive(scope.row)"
							v-if="scope.row.isReceived == '未领取'">领取任务
						</el-link>
						<el-link type="primary" size="mini" @click="publishTask(scope.row)">发布任务
						</el-link>
						<el-link type="primary" size="mini" @click="edit(scope.row)">编辑任务
						</el-link>
					</div>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
			:current-page="fenye.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="fenye.pageSize"
			layout="total, sizes, prev, pager, next, jumper" :total="count">
		</el-pagination>

		<!-- 发布任务弹层 -->
		<el-dialog title="提示" :visible.sync="dialogVisible">
			<el-cascader :options="userList" :props="props" v-model="receivedData">
				<template slot-scope="{ data }">
					<span>{{ data.name }}</span>
				</template>
			</el-cascader>
			<el-button type="primary" @click="release()">发布</el-button>
		</el-dialog>
		<!-- 编辑任务的抽屉 -->
		<el-drawer title="我是标题" :visible.sync="drawer"  :direction="direction" :before-close="handleClose" size="50%">
			<taskEditor ref="task" :userList="userList" btnName="修改" :taskInfo="params" @my-modify="modify"></taskEditor>
		</el-drawer>
	</div>
</template>

<script>
	// @ is an alias to /src
	import {
		getUserList,
		getListTaskApi,
		getUserInfoApi,
		releaseTaskApi,
		getDetailTaskApi,
		creatTaskApi,
		updateTaskApi,
	} from '../../api/api.js'

	import hand from '../../mixins/hand.js'

	export default {
		name: "taskList",
		mixins: [hand],
		data() {
			return {
				// props (发布任务弹层的自定义内容)
				props: {
					multiple: true,
					value: 'id',
					label: 'name'
				},
				tableData: [], //获取到的任务列表
				fenye: {
					pagination: true,
					pageSize: 10, //非必填  每页获取几条数据  如果不传 默认是获取10条；	
					pageNum: 1 //非必填  想获取第几页的数据  如果不传 默认是第1页；
				},
				count: 0, //总共有多少数据
				myid: '', //自己的id
				receivedData: [], // 已领取任务人列表信息,
				userList: [], //用户信息列表,
				dialogVisible: false, //发布任务弹层开关,，
				taskId: '',
				// 编辑任务的抽屉
				drawer: false,
				direction: 'ltr',
				params: {}, //任务信息
				list:[],
			}
		},
		created() {
			this.getuser()
		},
		methods: {
			// 发布任务弹层开关
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(() => {
						done();
					})
					.catch(() => {});
			},
			// 获取个人信息
			async getuser() {
				var res = await getUserInfoApi()
				if (res.data.status == 1) {
					this.myid = res.data.data.id
					this.taskList(this.fenye);
				}
			},
			// 获取任务信息列表
			async taskList(params) {
				var res = await getListTaskApi(params)
				if (res.data.status == 1) {
					this.tableData = res.data.data.rows
					this.count = res.data.data.count
					this.params = res.data.data
				}
			},
			// 获取任务详情
			async detailTask(taskId) {
				return await getDetailTaskApi({taskId});
				// if (res.data.status == 1) {
				// 	this.taskId = res.data.data.taskId
				// 	res.data.data.receivedData.forEach(item => {
				// 		this.receivedData.push(item.userId)
				// 	})
				// 	this.getListUser()
				// }
			},
			//获取未领取当前任务的人;
			userArr(){
                this.userList = [];
				Promise.all([this.detailTask(this.params.id),this.getListUser()]).then(res=>{
					let [detailArr,userArr] =  res;
					let tempArr = [];//存放id
					let targetArr=[];//存放要加的用户
					let allUser = userArr.data.data.data.rows;
					let taskUser= detailArr.data.data.receivedData;
					taskUser.forEach(item => {
						tempArr.push(item.userId);
					});
					allUser.forEach(item=>{
						if(!tempArr.includes(item.id)){
							targetArr.push(item);
						}
					})
					this.userList = targetArr;
					// console.log(targetArr);
					// console.log(allUser);
					// console.log(taskUser);
					// console.log(tempArr);
					// console.log(detailArr.data.data.receivedData);
					// console.log(userArr.data.data.data.rows);
				})
			},
			// 获取用户信息列表
			async getListUser() {
				return await getUserList({
					pagination: false
				})
				// if (res.data.status == 1) {
				// 	this.userList = res.data.data.data.rows
				// 	this.dialogVisible = true
				// }
			},
			// 分页
			handleSizeChange(val) {
				this.fenye.pageSize = val
			},
			handleCurrentChange(val) {
				this.fenye.pageNum = val
			},
			// 领取任务
			receive(key) {
				this.$confirm('确认领取！', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					const params = {
						userIds: [this.myid], //用户id，  如果给多个人发送任务，可以传数组，数组中是每一个人的id； 
						taskId: key.id, //任务id   
					}
                    // console.log(params);
					var res = await releaseTaskApi(params)
					if (res.data.status == 1) {
						this.$message({
							type: 'success',
							message: '领取成功!'
						});
						this.taskList(this.fenye)
					}else{
                        this.$message({
							type: 'success',
							message: '领取失败!'
						});
                    }
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消领取'
					});
				});
			},
			// 发布任务
			publishTask(key) {
				const params = {
					taskId: key.id, //任务id
				}
				this.detailTask(params)
			},
			//发布任务单层确认按钮
			async release() {
				const params = {
					userIds: this.receivedData, //用户id，  如果给多个人发送任务，可以传数组，数组中是每一个人的id； 
					taskId: this.taskId, //任务id   
				}
				var res = await releaseTaskApi(params)
				if (res.data.status == 1) {
					this.dialogVisible = false
					this.taskList(this.fenye)
				}
			},
			// 编辑任务按钮
			edit(key) {
				this.drawer = true;
				this.params = key;
				this.params.name = key.taskName;
				this.userArr(this.params.id);
			},
			// 创建任务接口
			async creatTask(params) {
				var res = await creatTaskApi(params)
				if (res.data.status == 1) {
					this.$message({
						type: 'success',
						message: '编辑程功!'
					});
					this.drawer = false
				}
			},
			//更改任务接口
			async updateTask(params){
				var res = await updateTaskApi(params);
				if(res.data.status==1){
					this.$message({
						type: 'success',
						message: '编辑程功!'
					});
					this.drawer = false;
let data = await releaseTaskApi({userIds:this.$refs.task.list,taskId:params.id,});if(data.data.status==1){this.$message({type: 'success',message: '发布任务成功!'});this.taskList(this.fenye);this.$refs.task.list= [];}this.taskList(this.fenye);
				}
			},
			modify() {
				this.params = this.$refs.task.params;
				const params = {
					id:this.params.id,//任务id
					name: this.params.name, //任务名称
					desc: this.params.desc, //任务描述
					duration: this.params.duration, //任务时长
					level: this.params.level ? 1 : 0, // 任务等级  1：紧急  0：普通任务
				}
				this.updateTask(params)
			}
		},
		watch: {
			tableData(newval) {
				for (var item in newval) {
					const date = new Date(newval[item].createdAt)
					newval[item].createdAt = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
					newval[item].level = newval[item].level == 0 ? '普通' : '紧急';
					newval[item].isReceived = newval[item].isReceived == 0 ? '未领取' : '已领取';
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
	::v-deep .el-cascader {
		width: 100%;
		margin-bottom: 30px;
	}

	::v-deep .el-link--inner {
		margin: 0 5px;
	}

	::v-deep .cell {
		text-align: center;
		display: flex;
		justify-content: center;
	}

	::v-deep .el-table__row {
		height: 60px;
		overflow: hidden;
	}

	::v-deep .el-link {
		float: left;
	}

	.link {
		margin: 0 auto;
	}

	.taskList {
		height: 100%;
		min-width: 1280px;
	}
</style>
