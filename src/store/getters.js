// state的计算属性
export default {
	totalPrice(state){
		return state.cartfoods.reduce((pre,food)=>pre + food.price*food.count,0)
	},
	totalCount(state){
		return state.cartfoods.reduce((pre,food)=>pre + food.count,0)
	}
}