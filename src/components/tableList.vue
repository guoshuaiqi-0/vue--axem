<template>
	<div class="tableList">
		<div class="header flex-between">
			<span class="header_span">设置角色对应的功能操作、应用管理、后台管理权限</span>
			<div class="check">
				<input type="checkbox" name="" id="selectAll">
				<label for="selectAll">全选</label>
			</div>
		</div>
		<div class="table">
			<div class="news table_border">
				<div class="left align">
					<input type="checkbox" name="" id="news">
					<label for="news">消息</label>
				</div>
				<div class="right">
					<el-row>
						<el-col :span="8">
							<div class="item">
								<input type="checkbox" name="" id="messageApplicationSettings">
								<label for="messageApplicationSettings">消息应用设置</label>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="item">
								<input type="checkbox" name="" id="createPublicGroups">
								<label for="createPublicGroups">创建公开群组</label>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="item">
								<input type="checkbox" name="" id="createPrivateGroup">
								<label for="createPrivateGroup">创建私有群组</label>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="item">
								<input type="checkbox" name="" id="managePublicGroups">
								<label for="managePublicGroups">管理公开群组</label>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="item">
								<input type="checkbox" id="sendMessageInGroupEnterpriseAnnouncement">
								<label for="sendMessageInGroupEnterpriseAnnouncement">群组企业公告中发送消息</label>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="item">
								<input type="checkbox" name="" id="deleteMessageFromGroup">
								<label for="deleteMessageFromGroup">群组中删除消息</label>
							</div>
						</el-col>
					</el-row>
				</div>
			</div>
			<div class="project table_border">
				<div class="left align">
					<input type="checkbox" name="" id="project">
					<label for="project">项目</label>
				</div>
				<div class="right">

				</div>
			</div>
			<div class="calendar table_border">
				<div class="left align">
					<input type="checkbox" name="" id="calendar">
					<label for="calendar">日历</label>
				</div>
				<div class="right">

				</div>
			</div>
			<div class="netDisk table_border">
				<div class="left align">
					<input type="checkbox" name="" id="netDisk">
					<label for="netDisk">网盘</label>
				</div>
				<div class="right">

				</div>
			</div>
		</div>

	</div>
</template>

<script>
	// @ is an alias to /src


	export default {
		name: "tableList",
		data() {
			return {

			}
		},

	};
</script>

<style lang="scss" scoped>
	.table_border {
		border: 1px solid #eef3fc;
		box-sizing: border-box;
		display: grid;
		grid-template-columns: 20% 70%;

		& .left {
			margin-left: 20px;
		}
	}

	.header {
		padding: 25px 0;
		border: none;
		font-size: 16px;

		& .header_span {
			color: #aaaaaa;
		}
	}

	.table {
		background-color: #fafbfc;
		display: flex;
		flex-direction: column;
		color: black;

		& .right {
			padding: 20px 0;

			& .item {
				padding: 15px 10px;
				box-sizing: border-box;
			}
		}

	}
</style>
