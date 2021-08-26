<template>
	<div>
		<ul class="footer brt">
			<li :class="{on:'/home' === $route.path}" @click="isNav('/home')"><i class="el-icon-house"></i><span>外卖</span></li>
			<li :class="{on:'/search' === $route.path}" @click="isNav('/search')"><i class="el-icon-search"></i><span>搜索</span></li>
			<li :class="{on:'/order' === $route.path}" @click="isNav('/order')"><i class="el-icon-tickets"></i><span>订单</span></li>
			<li :class="{on:'/profile' === $route.path}" @click="isNav('/profile')"><i class="el-icon-user"></i><span>我的</span></li>
		</ul>
	</div>
</template>

<script>
	export default {
		name:'FooterNav',
		data() {
			return {
				
			}
		},
		methods:{
			isNav(at){
				this.$router.replace(at)
			}
		}
	}
</script>

<style>
	.footer {
		position: absolute;
		width: 100%;
		display: flex;
		justify-content: space-around;
		margin: 0;
		padding: 0;
		bottom: 0;
		z-index: 999;
		color: #9D9D9D;
		background-color: #FFFFFF
	}
	.footer>li {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 20%;
		padding: 3px 0;
		cursor: pointer;
	}
	.footer li>i {
		font-size: 1.4rem;
	}
	.footer li>span {
		font-size: 0.8rem;
	}	
</style>
