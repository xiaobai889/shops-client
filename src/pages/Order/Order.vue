<template>
	<div class="order">
		<HeadTop title='订单列表'/>
		<div class="login-bf">
			<div class="orderImg">
				<img src="../../../static/imgs/pdx.jpg" >
			</div>
			<div>
				<p>登录后查看外卖订单</p>
				<button class="btn" type="button">立即登录</button>
			</div>
		</div>
	</div>
</template>

<script>
	import HeadTop from '../../components/HeadTop/HeadTop.vue'
	
	export default {
		components:{
			HeadTop
		}
	}
</script>

<style>
	.order {
		width: 100%;
		height: 100%;
		position: relative;
	}
	
	.login-bf {
		position: absolute;
		width: 100%;
		top: 50%;
		transform: translateY(-50%);
	}
	.login-bf div {
		text-align: center;
	}
	.orderImg img {
		height: 200px;
	}
</style>
