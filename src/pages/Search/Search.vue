<template>
	<div class="search">
		<HeadTop title='搜索'/>
		<div class="searchInput">
			<input type="text" v-model="text"/>
			<button class="btn" type="button" @click="getShops">提交</button>
		</div>
		<ul class="searchList">
			<li v-for="(shop,index) in searchshops" :key='index' class="Sshop">
				<span>{{shop.name}}</span>
				<p>{{shop.address}}</p>
				<img :src="imgBaseUrl + shop.image_path" >
			</li>
		</ul>
	</div>
</template>

<script>
	import HeadTop from '../../components/HeadTop/HeadTop.vue'
	import {mapState} from 'vuex'
	
	export default {
		data() {
			return {
				text:'',
				imgBaseUrl: 'http://cangdu.org:8001/img/',
				noText:false//是否搜索得到，有数据不展示，没有数据展示
			}
		},
		computed:{
			...mapState(['searchshops'])
		},
		methods:{
			getShops(){
				this.$store.dispatch('getSearchShops',this.text)
			}
		},
		watch:{
		},
		components:{
			HeadTop
		},
	}
</script>

<style>
	.search {
		width: 100%;
		height: 100%;
	}
	
	.searchInput {
		width: 100%;
		margin-top: 10px;
		text-align: center;
	}
	
	.searchInput>input {
		outline-style: none;
		border: none;
		background-color: #F4F4F4;
		width: 70%;	
		height: 30px;
		margin-right: 10px;
	}
	.searchInput>input:hover {
		background-color: #e5e5e5;
	}
	.searchInput>input:focus {
		background-color: #e5e5e5;
	}
	.searchList {
		width: 100%;
		height: 80%;
		overflow: scroll;
	}
	.Sshop {
		background-color: #0077AA;
		margin: 12px 0;
		text-align: center;
	}
	.Sshop>img {
		width: 50px;
		height: 50px;
	}
</style>
