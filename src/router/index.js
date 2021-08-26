// 路由器对象模块

import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由组件
import Home from '../pages/Home/Home.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'

import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'


Vue.use(VueRouter)

export default new VueRouter({
	routes:[
		{
			path:'/',
			redirect:'/home',
		},
		{
			path:'/home',
			component:Home,
			meta:{
				Nav:true
			}
		},
		{
			path:'/order',
			component:Order,
			meta:{
				Nav:true
			}
		},
		{
			path:'/profile',
			component:Profile,
			meta:{
				Nav:true
			}
		},
		{
			path:'/search',
			component:Search,
			meta:{
				Nav:true
			}
		},
		{
			path:'/login',
			component:Login
		},
		{
			path:'/shop',
			component:Shop,
			children:[
				{
					path:'',
					redirect:'/shop/shop_goods',
				}
				,
				{
					path:'/shop/shop_goods',
					component:ShopGoods
				},
				{
					path:'/shop/shop_info',
					component:ShopInfo
				},
				{
					path:'/shop/shop_ratings',
					component:ShopRatings
				},
			]
		},
		
	]
})