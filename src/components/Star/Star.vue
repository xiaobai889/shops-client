<template>
	<ul class="grade">
		<li v-for="star in getRating" :class="star"></li>
	</ul>
</template>

<script>
	export default {
		props:['rating'],
		computed:{
			getRating(){
				const {rating} = this
				let starArr = []
				
				// 数组不能大于5
				// 给数组添加class,评分整数为全星
				for(var i = 0 ; i < Math.floor(rating) ; i++){
					starArr.push('el-icon-star-on')
				}
				while(starArr.length < 5){
					starArr.push('el-icon-star-off')
				}
				
				return starArr
			}
		}
		
	}
</script>

<style>
</style>
