<template>
	<div class="profile">
		<HeadTop title='我的' />
		<div class="profileGloin">
			<img src="../../../static/imgs/sy.jpg" alt="">
			<div class="Pgloin">
				<h2>
					<router-link :to="user._id ? '/userView' : '/login'">{{user.name || user._id || '登录 | 注册'}}
					</router-link>
				</h2>
				<span v-show="!user.name"><i class="el-icon-mobile-phone"></i>{{user.phone || '暂无绑定手机号'}}</span>
			</div>
			<i class="el-icon-arrow-right"></i>
		</div>
		<ul class="balance">
			<li>
				<p>0.00<span>元</span></p>
				<span>我的余额</span>
			</li>
			<li>
				<p>0<span>个</span></p>
				<span>我的优惠</span>
			</li>
			<li>
				<p>0<span>分</span></p>
				<span>我的积分</span>
			</li>
		</ul>
		<ul class="serve">
			<li>
				<i class="el-icon-tickets"></i>
				<span>我的订单</span>
				<i class="el-icon-arrow-right"></i>
			</li>
			<li>
				<i class="el-icon-coin"></i>
				<span>积分商城</span>
				<i class="el-icon-arrow-right"></i>
			</li>
			<li>
				<i class="el-icon-medal-1"></i>
				<span>会员卡</span>
				<i class="el-icon-arrow-right"></i>
			</li>
			<li>
				<i class="el-icon-office-building"></i>
				<span>服务中心</span>
				<i class="el-icon-arrow-right"></i>
			</li>
		</ul>
		<div class="quitBtn" v-if="user.id">
			<el-button type="danger" v-on:click='quitLogin'>退出登录</el-button>
		</div>
	</div>
</template>

<script>
	import HeadTop from '../../components/HeadTop/HeadTop.vue'
	import {
		mapState
	} from 'vuex'

	export default {
		name: 'Profile',
		components: {
			HeadTop
		},
		computed: {
			...mapState(['user'])
		},
		methods: {
			quitLogin() {
				this.$confirm('此操作将退出登录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					// 确定
					this.$message({
						type: 'success',
						message: '退出成功!'
					})
					
					// 执行发送退出登录请求
					this.$store.dispatch('quitLogin')
					
				}).catch(() => {
					// 取消
					this.$message({
						type: 'info',
						message: '取消退出'
					})

				})
			}
		}
	}
</script>

<style>
	.profile {
		width: 100%;
		height: 100%;
	}

	.profileGloin {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		height: 7rem;
		padding: 0 20px;
		align-items: center;
		justify-content: space-between;
		background-color: #018F72;
	}

	.profileGloin>img {
		width: 60px;
		height: 60px;
		border-radius: 50%;
	}

	.Pgloin {
		text-align: center;
	}

	.Pgloin>h2 {
		padding: 0;
		margin: 0;
		font-size: 1rem;
		color: white;
	}

	.Pgloin>h2>a {
		color: white;
	}

	.Pgloin>span {
		color: white;
		font-size: .8rem;
	}

	.profileGloin>i {
		display: block;
		color: white;
	}

	/* 登录区--结束 */

	/* 余额 */
	.balance {
		width: 100%;
		padding: 0;
		margin: 0;
		display: flex;
		justify-content: space-around;
	}

	.balance li {
		text-align: center;
		width: 33%;
	}

	.balance li:not(:last-child) {
		border-right: 1px solid #F4F4F4;
	}

	.balance>li>p {
		margin: 0;
		font-size: 1.6rem;
		font-weight: 700;
		margin-top: 10px;
	}

	.balance>li:nth-child(1) p {
		color: #FF9E09;
	}

	.balance>li:nth-child(2) p {
		color: #FF6F3E;
	}

	.balance>li:nth-child(3) p {
		color: #67AC0E;
	}

	.balance>li span {
		font-size: .2rem;
		color: #535353;
	}

	/* 服务区 */
	.serve {
		width: 100%;
		padding: 0;
		/* margin: 0; */
		border-top: 1px solid #F4F4F4;
	}

	.serve li {
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #F4F4F4;
		margin-left: 20px;
		padding-left: 5px;
		z-index: 999;
	}

	.serve li i {
		font-size: .8rem;
	}

	.serve li i:last-child {
		float: right;
		line-height: 40px;
		margin-right: 10px;
	}

	.serve li i:first-child {
		margin-right: 4px;
	}

	.serve li:nth-child(1) i:first-child {
		color: #018F72;
	}

	.serve li:nth-child(2) i:first-child {
		color: #ff0000;
	}

	.serve li:nth-child(3) i:first-child {
		color: #ffff00;
	}

	.serve li:nth-child(4) i:first-child {
		color: #005500;
	}

	/* 退出登录按钮 */
	.quitBtn {
		text-align: center;
	}
	.quitBtn>button {
		width: 80%;
	}
</style>
