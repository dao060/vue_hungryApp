<template>
	<div class="shopcard">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo">
						<span class="icon-shopping_cart"></span>
					</div>
				</div>
				<div class="price">￥0</div>
				<div class="desc">另需配送费￥{{ delivery }}元</div>
			</div>
			<div class="content-right">
				<div class="pay">
					￥{{ minDelivery }}元起送
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'shopcard',
		props: {
			selectFoods: {
				type: Array,
				default() {
					return [];
				}
			},
			delivery: {
				type: Number,
				default: 0
			},
			minDelivery: {
				type: Number,
				default: 0
			}
		},
		computed: {
			totalPrice() {},
			totalCount() {}

		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.shopcard 
	position: fixed
	width: 100%
	height: 48px
	z-index: 50
	bottom: 0
	left: 0
	background: #000
	.content
		display: flex
		background: #141d27
		color:rgba(255, 255, 255, 0.4)
		font-size: 0
		.content-left
			flex: 1
			.logo-wrapper
				display: inline-block
				position: relative
				top: -10px
				width: 56px
				height: 56px
				padding: 6px
				margin: 0 12px
				box-sizing: border-box
				border-radius: 50%
				background: #141d27
				.logo
					width: 100%
					height:100%
					background: #2b343c
					border-radius: 50%
					text-align: center
					.icon-shopping_cart
						font-size: 24px
						line-height: 44px
						
			.price
				display: inline-block
				font-size: 16px
				vertical-align: top
				line-height: 24px
				margin-top: 12px
				padding-right: 12px
				border-right: 1px solid rgba(255, 255, 255, 0.1)
				font-size: 16px
				font-weight: 700
			.desc
				display: inline-block
				font-size: 10px
				font-weight: 200
				line-height: 24px
				margin: 12px 0 0 12px
				vertical-align: top
		.content-right
			flex: 0 0 105px
			width: 105px
			.pay
				height: 48px
				line-height: 48px
				font-size: 12px
				font-weight: 700
				text-align: center
				background: #2b333b
				
				

</style>