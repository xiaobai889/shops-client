<template>
	<li class="merchantItem">
		<div class="m-img">
			<img src="../../../static/imgs/pdx.jpg" alt="简视">
		</div>
		<div class="m-msg">
			<div class="m-msg-text">
				<div class="m-msgT1">
					<span class="sign">品牌</span>
					<span>{{Shop.name}}</span>
				</div>
				<div class="m-msgT2">
					<span>{{Shop.rating}}</span>
					<span>月售{{Shop.recent_order_num}}单</span>
					<Star :rating='Shop.rating'/>
				</div>
				<div class="m-msgT3">
					<span>${{Shop.float_minimum_order_amount}}起送 / {{Shop.piecewise_agent_fee.tips}}</span>
				</div>
			</div>
	
			<div class="m-msg-att">
				<div class="att1">
					<div>保</div>
					<div>准</div>
					<div>赢</div>
				</div>
				<div class="att2">
					<span>{{Shop.delivery_mode.text}}</span>		
				</div>
			</div>
		</div>
	</li>
</template>

<script>
	import Star from '../Star/Star.vue'
	
	export default {
		name:'MerchantItem',
		data() {
			return {
				
			}
		},
		props:['Shop'],
		components:{
			Star
		}
	}
</script>

<style>
	.merchantItem {
		height: 80px;
		padding: 14px 4px;
		border-bottom: 1px solid #d1d1d1;
		overflow: hidden;
		cursor: pointer;
	}
	
	.merchantItem>div {
		float: left;
	}
	
	/* 列表图片 */
	.m-img {
		width: 25%;
	}
	
	.m-img img {
		height: 75px;
		margin-left: 20%;
	}
	
	
	.m-msg {
		width: 70%;
		height: 100%;
	}
	
	/* 列表商家内容 */
	.m-msg-text {
		float: left;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}
	
	/* 品牌区域 */
	.m-msgT1 span{
		margin: 0;
		font-size: .8rem;
		font-weight: 700;
	}
	
	/* 品牌标志 */
	.m-msgT1 .sign {
		font-size: .2rem;
		font-weight: 600;
		background-color: #F5CC2F;
		margin-right: .3rem;
		padding: 1px;
		border-radius: 2px;
	}
	
	/* 评分区域 */
	.m-msgT2 {
		display: flex;
		align-items: baseline;
	}
	
	.m-msgT2 span:nth-child(1) {
		
		font-size: .9rem;
		font-weight: 600;
		color: #F39F74;
	}
	.m-msgT2 span:nth-child(2) {
		
		font-size: .2rem;
		color: #888888;
		margin: 0 .2rem;
	}
	.grade {
		padding: 0;
		margin: 0;
	}
	.grade li {
		font-size: .6rem;
		color: #FFA000;
	}
	
	.m-msgT3 span {
		font-size: .6rem;
	}
	
	/* 认证 */
	.m-msg-att {
		float: right;
		height: 100%;
	}
	
	.att1 {
		margin-top: 10px;
		overflow: hidden;
	}
	
	.att1>div {
		float: left;
		width: 14px;
		line-height: 14px;
		text-align: center;
		margin: 0 4px;
		font-size: .7rem;
		color: #888888;
		border: 1px solid #888;
	}
	
	.att2 {
		margin-top: 14px;
		margin-left: 12px;
	}
	
	.att2>span {
		font-size: .5rem;
		color: #06AA9D;
		border: 1px solid #06AA9D;
		padding: 0 2px;
	}
	
	/* 附近商家 */
	.merchant-near {
		overflow: hidden;
		margin-left: 10px;
	}
	
	.merchant-near>span {
		float: left;
		font-size: .8rem;
		color: #888888;
		margin-left: 8px;
	}
	
	.merchant-near>div {
		float: left;
		width: 10px;
		height: 2px;
		border-top: 2px solid #888;
		border-bottom: 6px double #888;
		margin-top: 4px;
	}
</style>
