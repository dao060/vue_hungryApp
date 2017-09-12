<template>
	<div class="cart-control">
		<transition name="move">
			<div class="decrease"  v-show="food.count>0" @click="cutCount($event)">
				<span class="icon-remove_circle_outline inner"></span>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{ food.count }}</div>
		<div class="card-add icon-add_circle" @click.stop="addCount($event)"></div>
	</div>
</template>
<script>

	export default {
		
		props: {
			food: {
				type: Object
			}
		},

		methods: {

			addCount (event) {
				// 添加商品
				if (!event._constructed) {
					return;
				}
				// food对象添加属性count
				if (!this.food.count) {
					this.$set(this.food, 'count', 1);
				}else {
					this.food.count++;
				}

				this.$emit('Add', event.target);
					
			},

			cutCount (event) {
				// 减小删除商品
				if (!event._constructed) {
					return;
				}

				if(this.food.count > 0) {
					this.food.count--;
				}
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.cart-control
	font-size: 0
		
	.decrease, .cart-count, .card-add
		display: inline-block
		color: #00a0dc
		line-height: 24px
		padding: 6px
		vertical-align: top
	.decrease
		font-size: 0
		opacity: 1
		transform: translate3d(0, 0, 0)
		.inner
			display: inline-block
			font-size: 24px
			vertical-align: middle
			transition: all 0.4s linear
			transform: rotate(0)
		&.move-enter-active, &.move-leave-active
			transition: all 0.4s linear	
		&.move-enter, &.move-leave-to
			opacity: 0
			transform: translate3D(24px, 0, 0)
			.inner
				transform: rotate(180deg)
	.card-add
		font-size: 24px
	.cart-count
		color: rgb(147, 153, 159)
		font-size: 10px
	
</style>