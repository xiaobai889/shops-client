<template>
	<div class="headTop">
		<template>
			<slot name="search"></slot>
			<span>{{title}}</span>
			<slot name="login"></slot>
		</template>
	</div>
</template>

<script>
	export default {
		name: 'HeadTop',
		props: ['title']
	}
</script>

<style>
	/* 顶部 */
	.headTop {
		display: flex;
		position: relative;
		box-sizing: border-box;
		padding: 0 20px;
		width: 100%;
		height: 30px;
		justify-content: center;
		align-items: center;
		background-color: #018F72;
		overflow: hidden;
		border-bottom: 1px solid #F4F4F4;
	}

	.headTop>i {
		color: white;
		position: absolute;
		left: 10px;
		cursor: pointer;
	}

	.headTop>span {
		color: white;
		font-size: 1.2rem;
		width: 150px;
		white-space:nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: center;
	}

	.headTop>div {
		position: absolute;
		color: white;
		font-size: .4rem;
		right: 10px;
	}

	.headTop>div a {
		color: white;
		text-decoration: none;
	}
</style>
