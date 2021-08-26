<template>
	<div class="cartcontrol">
	  <transition name="move">
	  <i class="el-icon-remove-outline" v-show="food.count" @click.stop="update(false)"></i>
	  </transition>
	  <div class="cart-count" v-show="food.count"> {{food.count}}</div>
	  <i class="el-icon-circle-plus-outline" @click.stop="update(true)"></i>
	</div>
</template>

<script>
	export default {
		name:'CartControl',
		props:['food'],
		methods:{
			update(isAdd){
				if(isAdd){
					this.$store.dispatch('updateCount',{isAdd,food:this.food})
				}else{
					this.$store.dispatch('updateCount',{isAdd,food:this.food})
				}
			}
		}
	}
</script>

<style>
  .cartcontrol>* {
	  float: left;
	  line-height: 16px;
	  margin: 0 4px;
	  font-size: 20px;
  }
  .cartcontrol>i {
	  color: #009472;
  }
</style>
