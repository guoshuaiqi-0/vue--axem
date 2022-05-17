
export default {
	methods:{
		hand(name) {
			if (this.$router.currentRoute.name == name) return;
			this.$router.push({
				name
			})
		},
	}
}