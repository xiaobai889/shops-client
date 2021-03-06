<template>
	<div>
	  <div class="goods">
	    <div class="menu-wrapper">
	      <!-- 菜单对应的是食物分类列表-->
	      <ul>
	       <!--current-->
	        <li class="menu-item" v-for="(good,index) in shop_goods"
			 :class="{current: index===currentIndex}"
			 @click="toFoods(index)"
			 :key='index'>
	          <span class="text bottom-border-1px">
	            <img class="icon" :src="good.icon" v-if="good.icon">
				{{good.name}}
	          </span>
	        </li>
	      </ul>
	    </div>
	    <div class="foods-wrapper">
	      <!-- 右侧的食物列表是根据左侧的分类列表展现的-->
	      <!-- 所以右侧是在一个分类标题列表里面嵌套着各类食物列表-->
	      <ul ref="foodsUl">
	        <li class="food-list-hook" 
			v-for="(good,index) in shop_goods" 
			:key="index">
	          <h1 class="title">{{good.name}}</h1>
	          <ul>
	            <li class="food-item bottom-border-1px"
				 v-for="(food,index) in good.foods" 
				 @click="foodShow(food)"
				 :key="index">
	              <div class="icon">
	                <img width="57" height="57" :src="food.icon">
	              </div>
	              <div class="content">
	                <h2 class="name">{{food.name}}</h2>
	                <p class="desc">{{food.description}}</p>
	                <div class="extra">
	                  <span class="count">月售{{food.sellCount}}份</span>
	                  <span>好评率{{food.rating}}%</span>
	                </div>
	                <div class="price">
	                  <span class="now">{{food.price}}￥</span>
	                  <span class="old" v-if="food.oldPrice">{{food.oldPrice}}￥</span>
	                </div>
	                <div class="cartcontrol-wrapper">
						<CartControl :food='food'/>
	                </div>
	              </div>
	            </li>
	          </ul>
	        </li>
	      </ul>
	    </div>
		<CartFoods></CartFoods>
	  </div>
	  <Food ref="food" :food='food'/>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import Vue from 'vue'
	import BScroll from 'better-scroll'
	import CartControl from '../../../components/CartControl/CartControl.vue'
	import Food from '../../../components/Food/Food.vue'
	import CartFoods from '../../../components/CartFoods/CartFoods.vue'
	
	export default {
		name:'ShopGoods',
		data() {
			return {
				tops:[],//foods的top值数值
				scrollY:0,
				food:{},//食物信息
			}
		},
		mounted() {
			this.$store.dispatch('getGoods',() => {
				this.$nextTick(()=>{
					this._scroll()
					this._initTops()
				})	
			})
		},
		methods:{
			// 初始化滑动
			_scroll(){
				new BScroll('.menu-wrapper',{
				    click: true
				})
				this.foodScroll = new BScroll('.foods-wrapper',{
				    click: true,
					probeType: 2
				})
				// 监听滚轮
				this.foodScroll.on('scroll',({x,y})=>{
					this.scrollY = Math.abs(y)
				})
				// 滚轮结束
				this.foodScroll.on('scrollEnd',({x,y})=>{
					this.scrollY = Math.abs(y)
				})
			},
			
			// 初始化滑动tops,li的top值
			_initTops(){
				const tops = []
				let top = 0
				let lis = this.$refs.foodsUl.children
				tops.push(top)
				for(let i = 0;i < lis.length ; i++){
					top += lis[i].clientHeight
					tops.push(top)
				}
				this.tops = tops
			},
			
			// 点击菜单去到foods
			toFoods(index){
				let y = -this.tops[index]
				this.foodScroll.scrollTo(0,y,300)
			},
			// 显示食物框
			foodShow(food){
				this.food = food
				this.$refs.food.toggleShow()
			}
		},
		computed:{
			...mapState(['shop_goods']),
			currentIndex(){
				const {tops,scrollY} = this
				 // scrollY>=当前top && scrollY<下一个top
				let index = tops.findIndex((top,index) => {
					return scrollY >= top && scrollY < tops[index + 1]
				})
				return index	
			}
		},
		components:{
			CartControl,
			Food,
			CartFoods
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 30%
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 70px
        padding: 0 5px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 50%
</style>
