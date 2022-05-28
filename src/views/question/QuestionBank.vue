<template>
	<div class="questionBank">
		<div class="item mr-20">
			<div class="on">
				<div class="inline">创建时间：2017-08-11&nbsp;&nbsp;18:30:33</div>
				<div class="inline mar-50">
					<div class="tab-right">期中考试</div>
					<div class="tab-green mar-10">考生同卷</div>
				</div>
				<div class="inline mar-50">满分：100<span class="mar-50">使用次数：18次</span></div>
				<div class="inline float-right">
					<img src="../../assets/icon_jiazia.png" class="icon" alt="">
					<img src="../../assets/icon_chazhao.png" class="icon  mar-20" alt="">
					<img src="../../assets/icon_lajitong.png" class="icon  mar-20" alt="">
				</div>
			</div>
			<div class="under mr-20">
				1.Java程序设计期中考试试题
			</div>
		</div>

	</div>
</template>

<script>
	// @ is an alias to /src
	export default {
		name: "questionBank",
		data() {
			return {


			}
		},
		created() {

		},
		methods: {

		}

	};
</script>

<style lang="scss" scoped>
	.item {
		box-sizing: border-box;
		padding: 20px;
		border: 1px solid #f0f0f0;
		border-radius: 10px;

		& .on {
			color: #b5b5b5;

			& .tab-right,
			.tab-green {
				font-size: 14px;
				padding: 1px 5px;
				color: white;
				display: inline-block;
				border-radius: 3px;
			}

			.tab-right {
				background-color: red;
			}

			.tab-green {
				background-color: green;
			}
		}

		.under {
			font-size: 20px;
		}
	}
</style>
