<template>
	<div>
		<ShopHead />
		<div class=".tab">
			<div class="tab-item">
				<router-link to="/shop/shop_goods" replace>点餐</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/shop/shop_ratings" replace>评价</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/shop/shop_info" replace>商家</router-link>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	import ShopHead from '../../components/ShopHead/ShopHead.vue'

	export default {
		name: 'Shop',
		components: {
			ShopHead
		},mounted() {
			this.$store.dispatch('getInfo')
			this.$store.dispatch('getRating')
		}
	}
</script>

<style>
	.tab {
		height: 40px;
		line-height: 40px;
		background: #fff;
		border-bottom: 1px rgba(7, 17, 27, 0.1) solid;
	}

	.tab-item {
		float: left;
		width: 33.33333%;
		text-align: center;
		font-size: 14px;
		color: rgb(77, 85, 93);
	}

	.tab-item>a {
		display: block;
		position: relative;
	}

	.tab-item .router-link-active {
		color: #02a774;
	}

	.tab-item .router-link-active::after {
		content: '';
		position: absolute;
		left: 50%;
		bottom: 1px;
		width: 35px;
		height: 2px;
		transform: translateX(-50%);
		background: #02a774;
	}
</style>
