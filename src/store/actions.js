import {
	RECEIVE_ADDRESS,
	RECEIVE_CATEGORYS,
	RECEIVE_SHOPS,
	RECEIVE_USER,
	RESET_OUT,
	RECEIVE_GOODS,
	RECEIVE_INFO,
	RECEIVE_RATINGS,
	ADD_FOOD,
	SUB_FOOD,
	CLEAR_CART,
	SEARCH_SHOPS
} from './mutation-types.js'

import {
	address,
	categorys,
	shops,
	userinfo,
	loginout,
	shopGoods,
	shopInfo,
	shopRatings,
	SearchShops,
} from '../api/getData.js'



// 通过mutation间接更新state
export default {
	// 异步获取位置
	async getAddress({commit,state}) {
		let addr = state.latitude + ',' + state.longitude
		let result = await address(addr)
		if(result.data.code === 0){
			const address = result.data.data
			commit(RECEIVE_ADDRESS,{address})
		}	 
	},
	// 获取食品列表
	async getCategorys({commit}) {
		let result = await categorys()
		if(result.data.code === 0){
			const categorys = result.data.data
			commit(RECEIVE_CATEGORYS,{categorys})
		}	 
	},
	// 获取商家
	async getShops({commit,state}) {
		let addr = 'latitude=' + state.latitude + '&' + 'longitude=' + state.longitude
		let result = await shops(addr)
		if(result.data.code === 0){
			const shops = result.data.data
			commit(RECEIVE_SHOPS,{shops})
		}	 
	},
	
	// 同步获取用户信息,不需发请求
	getUser({commit},{user}){
		commit(RECEIVE_USER,{user})
	},
	
	// 异步自动获取用户信息
	async autoGetUser({commit}){
		let result = await userinfo()
		if(result.data.code === 0){
			let user = result.data.data
			commit(RECEIVE_USER,{user})
		}
	},
	
	//异步退出登录
	async quitLogin({commit}){
		let result = await loginout()
		if(result.data.code === 0){
			commit(RESET_OUT)
		}
	},
	
	// 异步获取goods
	async getGoods({commit},scroll){
		let result = await shopGoods()
		if(result.data.code === 0){
			commit(RECEIVE_GOODS,result.data.data)
		}
		
		scroll && scroll()
	},
	// 异步获取info
	async getInfo({commit}){
		let result = await shopInfo()
		if(result.data.code === 0){
			commit(RECEIVE_INFO,result.data.data)
			
		}
	},
	// 异步获取ratings
	async getRating({commit},callback){ 
		let result = await shopRatings()
		if(result.data.code === 0){
			commit(RECEIVE_RATINGS,result.data.data)
		}
		
		callback && callback()
	},
	// 给food更新count
	updateCount({commit},{isAdd,food}){
		if(isAdd){
			commit(ADD_FOOD,{food})
		}else{
			commit(SUB_FOOD,{food})
		}
	},
	// 清空购物车
	clearCar({commit}){
		commit(CLEAR_CART)
	},
	// 异步获取搜索商家
	async getSearchShops({commit,state},keyword) {
		let addr = state.latitude + ',' + state.longitude
		let result = await SearchShops(keyword,addr)
		if(result.data.code === 0){
			const Searchshops = result.data.data
			commit(SEARCH_SHOPS,Searchshops)
		}	 
	},
}
