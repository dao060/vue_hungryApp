<template>
	<div class="shopcard">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highLight': totalPrice > 0}">
						<span class="icon-shopping_cart"></span>
					</div>
					<div class="selectNum" v-show="totalCount > 0">{{ totalCount }}</div>
				</div>
				<div class="price" :class="{'highLight': totalPrice > 0}">￥{{ totalPrice }}</div>
				<div class="desc">配送费￥{{ deliveryPrice }}元</div>
			</div>
			<div class="content-right">
				<div class="pay" :class="{'highLight': totalPrice >= minPrice }">
					{{ payDesc }}
				</div>
			</div>
			<!-- 小球动画 -->
			<div class="ball-container">
				<div v-for="ball in balls" v-show="ball.show" class="ball">
					<transition name="drop">
						<div class="inner"></div>
					</transition>
				</div>
			</div>	
		</div>
	</div>
</template>

<script>
import cartControl from '../cartControl/cartControl.vue';
	export default {
		name: 'shopcard',
		data() {
			return {
				balls: [
					{
						show: true
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					}
				]
			}
		},
		components: {
			cartControl
		},
		props: {
			selectFoods: {
				type: Array,
				default () {
					return [
						{
							price: 0,
							count: 0
						}
					];
				}
			},
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			}
		},
		computed: {
			
			totalPrice() {
				// 计算总价
				var total = 0;
				this.selectFoods.forEach((food) => {
					total += food.price * food.count;
				});

				return total;
			},
			totalCount() {
				// 计算总数量
				var count = 0;
				this.selectFoods.forEach((food) => {
					count += food.count;
				});

				return count;
			},
			payDesc() {
				// 支付信息联动
				if (this.totalPrice === 0) {

					return `￥${this.minPrice}元起送`

				}else if (this.totalPrice < this.minPrice ) {

					let diff = this.minPrice - this.totalPrice;
					return `还差${diff}元起送`;

				}else {
					return '去结算';
				}
			}
		},
		methods: {
			drop (el) {
				// 小球下降方法
				console.log(el);
			},
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
					&.highLight
						background: #00a0dc
						color: #fff
					.icon-shopping_cart
						font-size: 24px
						line-height: 44px
				.selectNum
					position: absolute
					top: 0
					right: 0
					width: 24px
					height: 12px
					line-height: 12px
					background: rgb(240, 20, 20)
					color: #fff
					border-radius: 6px
					text-align: center
					font-size: 9px
					box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
					-webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
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
				&.highLight
					color: #fff
			.desc
				display: inline-block
				-webkit-text-size-adjust: none
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
				&.highLight
					background: #00b43c
					color: #fff
				
		.ball-container
			.ball
				position: fixed
				bottom: 22px
				left: 32px
				z-index: 200
				.inner
					width: 16px
					height: 16px
					border-radius: 50%
					background: rgb(0, 160, 220)
				&.drop-enter-active, &.drop-leave-active
					transition: all .4s 


</style>