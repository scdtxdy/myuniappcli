<template>
	<view>
		<cu-custom bgColor="bg-olive light" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">首页</block>
		</cu-custom>
		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="action">
				<text class="icon-Mask"></text>
			</view>
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入搜索的关键词" confirm-type="search"></input>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,

			}
		},
		methods: {

        }
	}
</script>

<style lang="scss">
</style>
