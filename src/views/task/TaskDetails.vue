<template>
	<div class="taskDetails">
		<div class="left">
			<div class="header align flex-between">
				<div class="serialNumber">#1</div>
				<div class="follow">
					<div>1人关注 <span class="el-icon-caret-bottom mar-5"></span></div>
					<span class="padd-20">|</span>
					<div>
						<span class="el-icon-full-screen"></span>
						<span class="el-icon-edit-outline padd-20"></span>
						<span class="el-icon-more-outline"></span>
					</div>
				</div>
			</div>
			<div class="main">
				<div class="navMenu">
					<p class="navH1">任务测试</p>
					<el-button><span class="el-icon-edit mrr-10"></span>编辑描述</el-button>
					<el-button><span class="el-icon-upload2 mrr-10"></span>上传附件</el-button>
					<el-button><span class="el-icon-sort mrr-10"></span>关联代码仓库</el-button>
					<el-button><span class="el-icon-connection mrr-10"></span>阻塞关系</el-button>
					<el-button><span class="el-icon-document-checked mrr-10"></span>引用资源</el-button>
				</div>
				<div>
					<p>123</p>
				</div>
			</div>
			<div class="bottom">
				<p class="botH1">活动日志</p>
				<div class="tabs">
					<div class="whole item">全部</div>
					<div class="journal item">只看日志</div>
					<div class="comment item">只看评论</div>
				</div>
				<div class="block">
					<el-timeline>
						<el-timeline-item placement="top">
							<div class="car">
								王小虎 提交于 2018/4/12 20:46
							</div>
						</el-timeline-item>
						<el-timeline-item placement="top">
							<div class="car">
								王小虎 提交于 2018/4/12 20:46
							</div>
						</el-timeline-item>
						<el-timeline-item placement="top">
							<div class="car">
								王小虎 提交于 2018/4/12 20:46
							</div>
						</el-timeline-item>
					</el-timeline>
				</div>
				<!-- 富文本 -->
				<div class="richText">
					<myEditor></myEditor>
				</div>
			</div>
		</div>
		<div class="right">

		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	import myEditor from '../../components/MyEditor.vue'

	export default {
		name: "taskDetails",
		components: {
			myEditor
		},
		data() {
			return {

			}
		},
		created() {
			console.log(this.$route.query.key)
		}

	};
</script>

<style lang="scss" scoped>
	.taskDetails {
		height: 100%;
		display: grid;
		grid-template-columns: 70% 30%;

		& .left {
			padding: 0 20px;
			display: grid;
			grid-template-rows: 5% 30% 65%;
			height: 100%;
			background-color: white;

			& .header {
				font-size: 10px;
				padding: 0 10px;

				& .follow {
					display: flex;
				}
			}

			.main {
				& .navMenu {
					border-bottom: 1px solid #f7f7f7;
					padding: 20px 0;

					& .navH1 {
						font-size: 26px;
						font-weight: 700;
					}
				}
			}

			.bottom {
				overflow: hidden;

				& .botH1 {
					font-size: 20px;
					margin: 0;
				}

				.tabs {
					display: flex;
					padding: 20px 10px;

					& .item {
						padding: 2px 5px;
						font-size: 14px;
						border-radius: 4px;
						margin-left: 20px;
						align-items: center;
					}
				}

				.block {
					margin-top: 15px;

					& .car {
						position: relative;
						bottom: 12px;
					}
				}

				.richText {
					height: 400px;
					overflow: hidden;

					& .myed {
						overflow: hidden;
					}

					.w-e-scroll {
						overflow: hidden;
					}
				}

			}

		}

		.right {
			padding: 0 20px;
			background-color: #fcfcfd;
			height: 100%;

		}
	}
</style>
