<template>
	<div class="home">
		<HeadTop :title='address.address'>
			<i slot='search' class="el-icon-search" @click="$router.push('/search')"></i>
			<div slot='login'>
				<router-link :to="user._id ? '/userView' : '/login'">{{user._id || '登录 | 注册'}}</router-link>
			</div>
		</HeadTop>
		<div class="swiper-container">
			<div class="swiper-wrapper shopNav">
				<ul class="swiper-slide shopNavList" v-for="(catagorys,index) in catagorysArr" :key='index'>
					<li v-for="(catagory) in catagorys" :key='catagory.id'>
						<a href="#">
							<img :src="baseImgUrl + catagory.image_url">
							<span>{{catagory.title}}</span>
						</a>
					</li>
				</ul>
			</div>
			<div class="swiper-pagination"></div>
		</div>

		<div class="merchant">
			<div class="merchant-near">
				<div></div>
				<span>附近商家</span>
			</div>
			<ul class="merchantList">
				<MerchantItem v-for="(shop) in shops"
				:key='shop.id' 
				:Shop="shop"
				@click.native="$router.push('/shop')"
				/>
			</ul>
		</div>
	</div>
</template>

<script>
	import('./img/font_2745836_h52jxyxgmpw/iconfont.css')
	import MerchantItem from '../../components/MerchantItem/MerchantItem.vue'
	import HeadTop from '../../components/HeadTop/HeadTop.vue'

	import Swiper from 'swiper'
	import 'swiper/dist/css/swiper.min.css'

	import {
		mapState
	} from 'vuex'

	export default {
		data() {
			return {
				baseImgUrl: 'https://fuss10.elemecdn.com'
			}
		},
		components: {
			MerchantItem,
			HeadTop,
			Swiper
		},
		methods:{
		},
		mounted() {
			this.$store.dispatch('getCategorys'),
			this.$store.dispatch('getShops'),
				
			this.$nextTick(() => {
				new Swiper('.swiper-container', {
					loop: true,
					pagination: {
						el: '.swiper-pagination',
					},
				})
			})
		},
		computed: {
			...mapState(['shops', 'address','user']),

			// 根据一维数组生成二维数组
			// 小数组最大为8
			catagorysArr() {
				const {
					categorys
				} = this.$store.state
				// 准备空的二维数组
				let arr = []
				let minArr = []
				categorys.forEach(c => {
					if (minArr.length === 0) {
						arr.push(minArr)
					}
					minArr.push(c)
					if (minArr.length === 8) {
						minArr = []
					}
				})
				return arr
			}
		}
	}
</script>

<style>
	.home {
		height: 100%;
		width: 100%;
		overflow: scroll;
		background-color: #F4F4F4;
	}

	.shopNav {
		padding-bottom: 30px;
	}

	/* 商品导航列表 */
	.shopNavList {
		margin: 0 auto;
		padding: 0;
		overflow: hidden;
		width: 100%;
		height: 40%;
		background-color: #FFFFFF;
	}

	/* 商品内部图标 */
	.shopNavList>li {
		width: 25%;
		float: left;
		display: flex;
		justify-content: center;
		margin: .6rem 0;
	}

	.shopNavList>li>a {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.shopNavList>li img {
		width: 55px;
		height: 55px;
		color: #ffff00;
	}

	/* 商家列表 */
	.merchant {

		background-color: #FFFFFF;
	}

	.merchantList {
		margin: 0 auto;
		padding: 0;
		width: 100%;
	}
</style>
