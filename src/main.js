// 入口
import Vue from 'vue'
import App from './App.vue'

import router from './router/index.js'
import store from './store/index.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 加载
import './mock/mockServer.js'

Vue.use(ElementUI)

new Vue({
	el:'#app',
	router,
	store,
	render:h => h(App)
})