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
							<el-input v-model="input1" placeholder="请输入内容" disabled></el-input>
						</el-col>
					</el-row>
					<el-row type="flex" style="align-items: center;" class="mr-30">
						<el-col :span="2">真实姓名</el-col>
						<el-col :span="15">
							<el-input v-model="input1" placeholder="请输入内容"></el-input>
						</el-col>
					</el-row>
					<el-row type="flex" style="align-items: center;" class="mr-20">
						<el-col :span="2" style="text-indent: 30px;">性别</el-col>
						<el-col :span="15">
							<el-radio-group v-model="radio">
								<el-radio :label="1">男</el-radio>
								<el-radio :label="2">女</el-radio>
							</el-radio-group>
						</el-col>
					</el-row>
					<el-row type="flex" style="align-items: center;" class="mr-20">
						<el-col :span="2" style="text-indent: 15px;">所在地</el-col>
						<el-col :span="5">
							<el-cascader v-model="value" :options="options"></el-cascader>
						</el-col>
						<el-col :span="5">
							<el-cascader v-model="value" :options="options"></el-cascader>
						</el-col>
						<el-col :span="5">
							<el-cascader v-model="value" :options="options"></el-cascader>
						</el-col>
					</el-row>
					<el-row type="flex" class="mr-30">
						<el-col :span="2" style="text-indent: 30px;">简介</el-col>
						<el-col :span="15">
							<el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="textarea">
							</el-input>
						</el-col>
					</el-row>
					<el-row type="flex" class="mr-30">
						<el-col :span="20" :offset="2">
							<el-button type="primary" round>保存</el-button>
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
		getUserInfoApi
	} from '@/api/api.js'

	export default {
		name: "personalData",
		data() {
			return {
				input1: '',
				radio: 1,
				value: '',
				options: [1, 2, 3],
				textarea: '',
				info:{}
			}
		},
		mounted() {
			this.updeyInfo()
		},
		methods: {
			async updeyInfo() {
				var res = await getUserInfoApi();
				if(res.data.status == 1){
					this.info = res.data.data[0]
				}
				console.log(this.info)
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
