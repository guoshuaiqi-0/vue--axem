<template>
	<div class="personalData">
		<!-- 基本信息 -->
		<div class="basicInformation">
			<div class="header">
				<span>基本信息</span>
			</div>
			<div class="main">
				<div class="form">
					<el-row type="flex" style="align-items: center;">
						<el-col :span="2">账号昵称</el-col>
						<el-col :span="15" class="mar-10">
							<el-input v-model="info.avatarName" placeholder="请输入内容"></el-input>
						</el-col>
					</el-row>
					<el-row type="flex" style="align-items: center;" class="mr-30">
						<el-col :span="2">真实姓名</el-col>
						<el-col :span="15" class="mar-10">
							<el-input v-model="info.name" placeholder="请输入内容"></el-input>
						</el-col>
					</el-row>
					<el-row type="flex" style="align-items: center;" class="mr-20">
						<el-col :span="2" style="text-indent: 30px;">性别</el-col>
						<el-col :span="15" class="mar-10">
							<el-radio-group v-model="info.sex">
								<el-radio :label="1">男</el-radio>
								<el-radio :label="0">女</el-radio>
							</el-radio-group>
						</el-col>
					</el-row>
					<el-row type="flex" style="align-items: center;" class="mr-20">
						<el-col :span="2" style="text-indent: 15px;">手机号</el-col>
						<el-col :span="15" class="mar-10">
							<el-input v-model="info.phone" placeholder="请输入内容"></el-input>
						</el-col>
					</el-row>
					<el-row type="flex" style="align-items: center;" class="mr-30">
						<el-col :span="2" style="text-indent: 30px;">邮箱</el-col>
						<el-col :span="15" class="mar-10">
							<el-input v-model="info.email" placeholder="请输入内容"></el-input>
						</el-col>
					</el-row>
					<el-row type="flex" style="align-items: center;" class="mr-30">
						<el-col :span="2" style="text-indent: 15px;">所在地</el-col>
						<el-col :span="5" class="mar-10">
							<el-select v-model="info.provinceNo" placeholder="省">
								<el-option v-for="item in provinceData" :key="item.code" :label="item.name"
									:value="item.code">
								</el-option>
							</el-select>
						</el-col>
						<el-col :span="5">
							<el-select v-model="info.cityNo" placeholder="市">
								<el-option v-for="item in cityData" :key="item.code" :label="item.name"
									:value="item.code">
								</el-option>
							</el-select>
						</el-col>
						<el-col :span="5">
							<el-select v-if="areaData" v-model="info.areaNo" placeholder="区">
								<el-option v-for="item in areaData" :key="item.code" :label="item.name"
									:value="item.code">
								</el-option>
							</el-select>
						</el-col>
					</el-row>
					<el-row type="flex" class="mr-30">
						<el-col :span="2" style="text-indent: 30px;">简介</el-col>
						<el-col :span="15" class="mar-10">
							<el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="info.desc">
							</el-input>
						</el-col>
					</el-row>
					<el-row type="flex" class="mr-30">
						<el-col :span="20" :offset="2">
							<el-button type="primary" round @click="submitInfo">保存</el-button>
							<el-button round class="mar-20">取消</el-button>
						</el-col>
					</el-row>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	// @ is an alias to /src
	import {
		getUserInfoApi,
		getUserInfoUpdateApi
	} from '@/api/api.js'
	import cityData from '@/assets/json/citydata.json'

	export default {
		name: "personalData",
		data() {
			return {
				provinceData: [],
				cityData: [],
				areaData: [],
				info: {},
			}
		},
		created() {
			this.provinceData = cityData
			this.getinfo()
		},
		watch: {
			"info.provinceNo"(newval, oldval) {
				if (oldval) {
					this.info.cityNo = '', this.info.areaNo = ''
				}
				var cityData = this.provinceData.find((item) => item.code == newval)
				this.cityData = cityData.children
			},
			"info.cityNo"(newval, oldval) {
				if (oldval) {
					this.info.areaNo = ''
				}
				if (!newval) {
					return this.areaData = []
				}
				var areaData = this.cityData.find((item) => item.code == newval)
				this.areaData = areaData.children
			}
		},
		methods: {
			async getinfo() {
				var res = await getUserInfoApi()
				if (res.data.status == 1) {
					this.info = res.data.data[0]
				}
			},
			async submitInfo() {
				var info = this.info
				delete info.updatedAt
				delete info.createdAt
				console.log(info)
				var res = await getUserInfoUpdateApi(info)
				console.log(res)
			}
		}

	};
</script>

<style lang="scss" scoped>
	.personalData {
		background-color: white;
		font-size: 16px;
		min-width: 850px;

		& .header {
			padding: 20px 40px;
			font-weight: 700;
			border-bottom: 1px solid #f7f7f7;
		}

		.main {
			padding: 26px 20px;

			& .form {
				margin-left: 26px;
				box-sizing: border-box;
				color: #999999;
			}
		}
	}
</style>
