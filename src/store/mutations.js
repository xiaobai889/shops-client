// 直接更新state的多个方法对象
import Vue from 'vue'
import {
	RECEIVE_ADDRESS,
	RECEIVE_CATEGORYS,
	RECEIVE_SHOPS,
	RECEIVE_USER,
	RESET_OUT,
	RECEIVE_GOODS,
	RECEIVE_INFO,
	RECEIVE_RATINGS,
	SUB_FOOD,
	ADD_FOOD,
	CLEAR_CART,
	SEARCH_SHOPS
} from './mutation-types.js'

export default {
	// 地址
	[RECEIVE_ADDRESS](state,{address}){
		state.address = address
	},
	// 食品列表
	[RECEIVE_CATEGORYS](state,{categorys}){
		state.categorys = categorys
	},
	// 商家列表
	[RECEIVE_SHOPS](state,{shops}){
		state.shops = shops
	},
	// 用户信息
	[RECEIVE_USER](state,{user}){
		state.user = user
	},
	// 退出登录
	[RESET_OUT](state){
		state.user = {}
	},
	// 获取goods
	[RECEIVE_GOODS](state,shop_goods){
		state.shop_goods = shop_goods
	},
	// 获取info
	[RECEIVE_INFO](state,shop_info){
		state.shop_info = shop_info
	},
	// 获取ratings
	[RECEIVE_RATINGS](state,shop_Ratings){
		state.shop_Ratings = shop_Ratings
	},
	// 加food数量
	[ADD_FOOD](state,{food}){
		if(!food.count){
			// food.count = 1
			Vue.set(food,'count',1)
			state.cartfoods.push(food)
		}else{
			food.count++
		}
	},
	// 减food数量
	[SUB_FOOD](state,{food}){
		if(food.count){
			// food.count = 1
			food.count--
			if (food.count === 0) {
			  // 将food从cartFoods中移除
			  state.cartfoods.splice(state.cartfoods.indexOf(food), 1)
			}
		}
	},
	// 清空购物车
	[CLEAR_CART](state){
		state.cartfoods.forEach((food)=>food.count = 0)
		state.cartfoods = []
	},
	[SEARCH_SHOPS](state,search_shops){
		state.searchshops = search_shops
	}
}