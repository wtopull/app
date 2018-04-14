export default {
//	increment() {
//		this.$store.dispatch('increment')
//	},
//	decrement() {
//		this.$store.dispatch('decrement')
//	},
// 上面缩写如下
	increment: ({commit}) => commit('increment'),
	decrement: ({commit}) => commit('decrement'),
}
