export default {
	methods: {
		hand(name, key) {
			if (this.$router.currentRoute.name == name) return;
			this.$router.push({
				name,
				query: {
					key
				}
			})
		},
	}
}
