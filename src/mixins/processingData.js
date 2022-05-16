
export default {
	methods:{
		time(val) {
			var date = new Date(val)
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
			let hour = date.getHours();
			let minute = date.getMinutes();
			let second = date.getSeconds();
			return `${year}-${month}-${day} \u00A0\u00A0 ${hour}:${minute}:${second}`
		},
		rowsType(val) {
			if (val == 1) {
				return '单'
			} else if (val == 2) {
				return '多'
			}
		},
		rowsLevel(val) {
			switch (val) {
				case 1:
					return '简单';
				case 2:
					return '普通';
				case 3:
					return '困难'
			}
		}
	}
}