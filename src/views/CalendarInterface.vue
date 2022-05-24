<template>
	<div class="calendarInterface">
		<div class="left">
			<div class="calendar">
				<el-calendar v-model="value">
				</el-calendar>
			</div>
			<div class="taskList">下</div>
		</div>
		<div class="right">
			<div class="taskNotification">
				<div class="head align">任务通知</div>
				<div class="main mr-10">
					<div class="main_icon flex-centen align">
						<i class="el-icon-edit-outline"></i>
					</div>
					<div class="main_data">
						<p class="main_introduce">gdsafsnmkjuhbgdafs</p>
						<p class="main_time">gdsafsnmkjuhbgdafs</p>
						<el-button type="warning">接受任务</el-button>
					</div>
				</div>
			</div>
			<div class="chat">
				<div class="chat_head align">
					聊天(当前人数为：{{ peopleNum }})
				</div>
				<div class="chat_window">
					<div class="item mr-20 flex-between" v-for="(item,index) in infoData" :key="index">
						<div class="item_left" v-show="item.avatarName != info.avatarName">
							<div class="item_img flex-centen align">{{ item.avatarName | name }}</div>
							<div class="item_text mar-10">
								<div class="item_text_head">{{ item.avatarName }}</div>
								<div class="item_text_span"> {{ item.msg }} </div>
								<div class="item_text_time">{{ time(item.date) }}</div>
							</div>
						</div>
						<div></div>
						<div class="item_right" v-show="item.avatarName == info.avatarName">
							<div class="item_text mrr-10">
								<div class="item_text_head">{{ item.avatarName }}</div>
								<span class="item_text_span"> {{ item.msg }} </span>
								<div class="item_text_time">{{ time(item.date) }}</div>
							</div>
							<div class="item_img flex-centen align">{{ item.avatarName | name }}</div>
						</div>
					</div>
				</div>
				<div class="chat_input align">
					<el-input v-model="input" placeholder="请输入内容"></el-input>
					<el-popover placement="bottom" title="不能发送空白信息" width="200" trigger="manual" v-model="visible">
					</el-popover>
					<span class="el-icon-position" @click="sendSocketMsg" v-if="input" slot="reference"></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	import {
		getUserInfoApi,
	} from '@/api/api.js'

	export default {
		name: "calendarInterface",
		data() {
			return {
				value: new Date(),
				info: {},
				input: '',
				infoData: [],
				peopleNum: '',
				visible: false
			}
		},
		created() {
			this.getinfo()
			window.addEventListener(
				"keydown",
				(event) => {
					if (event.code == "Enter") {
						if (window.document.querySelector('.el-icon-position')) {
							this.sendSocketMsg();
							//使用KeyboardEvent.keyCode处理事件并将handled设置为true。
							event.preventDefault();
						} else {
							this.visible = !this.visible
							setTimeout(() => {
								this.visible = !this.visible
							}, 1000)
						}
					}
				},
				true
			);
		},
		filters: {
			name(val) {
				var name = String(val)
				return name.substring(0, 1)
			}
		},
		methods: {
			async getinfo() {
				var res = await getUserInfoApi()
				if (res.data.status == 1) {
					this.info = res.data.data[0]
				}
				const parms = {
					userId: this.info.id,
					avatarName: this.info.avatarName,
				}
				this.$socket.emit('addUser', parms)
			},
			time(val) {
				var currentDate = new Date()
				var beforeDate = new Date(val)
				if (currentDate.getHours() - beforeDate.getHours() >= 1) {
					return currentDate.getHours() - beforeDate.getHours() + '小时之前'
				} else if (currentDate.getMinutes() - beforeDate.getMinutes() >= 1) {
					return currentDate.getMinutes() - beforeDate.getMinutes() + '分钟前'
				} else {
					return '刚刚'
				}
			},
			sendSocketMsg() {
				const parms = {
					userId: this.info.id, //用户ID
					type: 1, // 1：文本   2：图片   3：表情 emoje;
					avatarName: this.info.avatarName, //用户昵称
					msg: this.input, //发送的文本消息
				}
				//向服务端发送消息
				this.$socket.emit("sendMsg", parms);
				this.input = ''
			}
		},
		sockets: {
			userCount: function(message) {
				//建立连接后调用的函数
				this.peopleNum = message
				console.log("共有" + message + '人');
			},
			// message 是服务端返回的信息
			receiveMsg: function(message) {
				this.infoData.push(message)
				this.$nextTick(() => {
					var oChatWindow = document.querySelector('.chat_window')
					var chatItem = oChatWindow.querySelectorAll('.item')
					chatItem[chatItem.length - 1].scrollIntoView({
						behavior: 'smooth'
					})
				})
			},
			// 断开时调用的函数
			disconnect: function() {
				console.log("disconnect!");
			},
		},
		destroyed() {
			console.log('我走了')
			const parms = {
				userId: this.info.id,
				avatarName: this.info.avatarName,
			}
			this.$socket.emit('removeUser', parms)
		}

	};
</script>

<style lang="scss" scoped>
	p {
		margin: 0;
		padding: 0;
	}

	::v-deep .el-popover {
		bottom: 60px;
		right: 40px;
	}

	.calendarInterface {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		height: 100%;
		background-color: white;

		& .left {
			display: grid;
			grid-template-rows: 2fr 1fr;
			overflow: scroll;

			& .calendar {
				& ::v-deep .el-calendar {
					height: 100%;
				}

				::v-deep .el-calendar-day {
					padding: 10px;
					height: 100%;
				}
			}
		}

		.right {
			height: 100%;
			display: grid;
			grid-template-rows: 1fr 3fr;
			overflow: hidden;
			color: black;
			padding: 20px 0;
			box-sizing: border-box;

			& .taskNotification {
				overflow: scroll;
				padding: 0 20px;
				display: grid;
				grid-template-rows: 30px auto;

				& .main {
					width: 100%;
					padding: 16px 14px;
					background-color: #58419c;
					box-sizing: border-box;
					border-radius: 20px;
					display: grid;
					grid-template-columns: 70px auto;
					background-image: url(../assets/circular.jpg);
					background-repeat: no-repeat;
					background-position: 100% 100%;
					background-size: 20%;

					& .main_icon {
						width: 40px;
						height: 40px;
						border-radius: 5px;
						background-color: #7a65b0;
						color: white;
						font-size: 25px;
						margin: 15px 7px;
					}

					.main_data {
						color: white;

						& .main_introduce {
							padding: 5px 0;
							font-size: 20px;
						}

						.main_time {
							padding: 8px 0;
							margin-bottom: 8px;
						}

					}
				}
			}

			.chat {
				height: 100%;
				overflow: hidden;
				position: relative;
				padding: 0 20px;

				& .chat_head {
					height: 40px;
					font-size: 16px;
					font-weight: 700;
					padding-left: 15px;
				}

				.chat_window {
					width: 100%;
					height: 100%;
					position: relative;
					height: calc(100% - 100px);
					overflow-y: scroll;
					background-color: #fafafc;
					border-radius: 25px 25px 0 0;
					overflow-y: scroll;
					padding: 0 20px 5px;
					box-sizing: border-box;
					word-break: break-all;

					& .item {
						& .item_left {
							display: grid;
							grid-template-columns: 30px auto;
						}

						.item_right {
							display: grid;
							grid-template-columns: auto 30px;

							& .item_text {
								text-align: right;

								& .item_text_head {
									padding-right: 5px;
									text-align: right;
								}

								.item_text_span {
									background-color: #eeedfb !important;
								}
							}
						}

						.item_img {
							width: 30px;
							height: 30px;
							border-radius: 50%;
							background-color: aqua;
							display: inline-block;
							color: #58419c;
						}

						.item_text {
							display: inline-block;

							& .item_text_head {
								margin-bottom: 5px;
								font-size: 10px;
							}

							.item_text_span {
								background-color: white;
								padding: 7px 10px;
								border-radius: 10px;
								display: inline-block;
								text-align: left;
								line-height: 25px;
							}

							.item_text_time {
								margin-top: 5px;
								font-size: 8px;
								color: #d4d4d6;
							}
						}
					}
				}

				.chat_input {
					background-color: #fafafc;
					border-radius: 0 0 25px 25px;
					height: 40px;
					padding: 0 20px 20px;

					& ::v-deep .el-input__inner {
						padding-right: 40px;
					}

					.el-icon-position {
						width: 40px;
						cursor: pointer;
						position: absolute;
						right: 30px;
					}
				}
			}
		}

		::-webkit-scrollbar {
			height: 0;
			width: 0;
		}
	}
</style>
