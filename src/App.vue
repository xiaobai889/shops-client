<template>
	<div id="app">
		<router-view></router-view>
		<FooterNav v-show="$route.meta.Nav"/>
	</div>
</template>

<script>
	import FooterNav from './components/FooterNav/FooterNav.vue'
	import {mapActions} from 'vuex'
	
	export default {
		name:'App',
		components:{
			FooterNav
		},mounted() {
			this.$store.dispatch('getAddress')
			this.$store.dispatch('autoGetUser')
		}
	}
</script>

<style>
	* {
		list-style: none;
		text-decoration: none;
	}
	ul {
		padding: 0;
		margin: 0;
	}
	
	html,body {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}
	
	#app {
		width: 100%;
		height: 100%;
		position: relative;
	}
	
	/* 通用样式 */
	.brt {
		border-top: 1px solid #F4F4F4;
	}
	
	.on {
		color: #018F72;
	}
	
	.btn {
		border: none;
		padding: 7px 12px;
		background-color: #018F72;
		color: white;
		font-size: .8rem;
	}
	.btn:hover {
		background-color: #00a27f;
	}
</style>
