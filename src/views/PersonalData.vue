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
						<el-col :span="15">
							<el-input v-model="info.avatarName" placeholder="请输入内容"></el-input>
						</el-col>
					</el-row>
					<el-row type="flex" style="align-items: center;" class="mr-30">
						<el-col :span="2">真实姓名</el-col>
						<el-col :span="15">
							<el-input v-model="info.name" placeholder="请输入内容"></el-input>
						</el-col>
					</el-row>
					<el-row type="flex" style="align-items: center;" class="mr-20">
						<el-col :span="2" style="text-indent: 30px;">性别</el-col>
						<el-col :span="15">
							<el-radio-group v-model="info.sex">
								<el-radio :label="1">男</el-radio>
								<el-radio :label="0">女</el-radio>
							</el-radio-group>
						</el-col>
					</el-row>
					<el-row type="flex" style="align-items: center;" class="mr-20">
						<el-col :span="2" style="text-indent: 15px;">手机号</el-col>
						<el-col :span="15">
							<el-input v-model="info.phone" placeholder="请输入内容"></el-input>
						</el-col>
					</el-row>
					<el-row type="flex" style="align-items: center;" class="mr-30">
						<el-col :span="2" style="text-indent: 30px;">邮箱</el-col>
						<el-col :span="15">
							<el-input v-model="info.email" placeholder="请输入内容"></el-input>
						</el-col>
					</el-row>
					<el-row type="flex" style="align-items: center;" class="mr-30">
						<el-col :span="2" style="text-indent: 15px;">所在地</el-col>
						<el-col :span="5">
							<el-select v-model="provinceNoText" placeholder="省" @change="provinceTab">
								<el-option v-for="item in provinceNoData" :key="item.code" :label="item.name"
									:value="item.code">
								</el-option>
							</el-select>
						</el-col>
						<el-col :span="5" class="mar-10">
							<el-select v-model="cityNoText" placeholder="市" @change="cityTab">
								<el-option v-for="item in cityNoData" :key="item.code" :label="item.name"
									:value="item.code">
								</el-option>
							</el-select>
						</el-col>
						<el-col :span="5" class="mar-10">
							<el-select v-if="areaNoText" v-model="info.areaNo" placeholder="区" @change="areaNoTab">
								<el-option v-for="item in areaNoData" :key="item.code" :label="item.name"
									:value="item.code">
								</el-option>
							</el-select>
						</el-col>
					</el-row>
					<el-row type="flex" class="mr-30">
						<el-col :span="2" style="text-indent: 30px;">简介</el-col>
						<el-col :span="15">
							<el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="info.desc">
							</el-input>
						</el-col>
					</el-row>
					<el-row type="flex" class="mr-30">
						<el-col :span="20" :offset="2">
							<el-button type="primary" round @click="updateInfo">保存</el-button>
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
				provinceNoData: '',
				cityNoData: '',
				areaNoData: '',
				provinceNoText: '',
				cityNoText: '',
				areaNoText: '',
				info: {},
			}
		},
		created() {
			this.updeyInfo()
			this.provinceNoData = cityData
		},
		methods: {
			async updeyInfo() {
				var res = await getUserInfoApi();
				if (res.data.status == 1) {
					this.info = res.data.data[0]
					this.provinceNoText = this.info.provinceNo
					this.cityNoText = this.info.cityNo
					this.areaNoText = this.info.areaNo
				}
				this.provinceTab(this.provinceNoText)
				this.cityTab(this.cityNoText)
				this.areaNoTab(this.areaNoText)
			},
			provinceTab(val) {
				this.info.cityNo = ''
				this.info.areaNo = ''
				this.provinceNoData.forEach(el => {
					if (el.code == val) {
						this.cityNoData = el.children
						this.info.provinceNo = val
					}
				})

			},
			cityTab(val) {
				this.info.areaNo = ''
				this.cityNoData.forEach(el => {
					if (el.code == val) {
						this.areaNoData = el.children
						this.info.cityNo = val
					}
				})
				this.areaNoTab()
			},
			areaNoTab(val) {
				this.info.areaNo = val
			},
			async updateInfo() {
				if (this.panduan().de) {
					const {
						phone,
						email,
						sex,
						avatarName,
						name,
						provinceNo,
						cityNo,
						areaNo,
						desc
					} = this.info
					var res = await getUserInfoUpdateApi({
						phone,
						email,
						sex,
						avatarName,
						name,
						provinceNo,
						cityNo,
						areaNo,
						desc
					})
					if (res.data.status == 1) {
						alert('修改成功')
						this.updeyInfo()
					}
				} else {
					this.$message({
						type: 'info',
						message: this.panduan().text
					});
				}
			},
			panduan() {
				var debug = {
					de: true
				};
				if (this.info.phone == '') {
					debug.de = false
					debug.text = '电话号不能为空'
					return debug
				} else if (this.info.email == '') {
					debug.de = false
					debug.text = '邮件不能为空'
					return debug
				} else if (this.info.avatarName == '') {
					debug.de = false
					debug.text = '昵称不能为空'
					return debug
				} else if (this.info.name == '') {
					debug.de = false
					debug.text = '名字不能为空'
					return debug
				} else {
					return debug
				}

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
