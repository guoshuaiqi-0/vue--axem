<template>
	<div class="taskDetails">
		<div class="left"></div>
		<div class="right"></div>
	</div>
</template>

<script>
	// @ is an alias to /src


	export default {
		name: "taskDetails",
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
		background-color: white;
		height: 100%;
		display: grid;
		grid-template-columns: 70% 30%;
	}
</style>
