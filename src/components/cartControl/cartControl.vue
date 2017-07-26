<template>
	<div class="cart-control">
		<div class="decrease icon-remove_circle_outline" v-show="food.count>0" @click="cutCount($event)"></div>
		<div class="cart-count" v-show="food.count>0">{{ food.count }}</div>
		<div class="card-add icon-add_circle" @click="addCount($event)"></div>
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
				
				if (!event._constructed) {
					return;
				}
				
				if (!this.food.count) {
					this.$set(this.food, 'count', 1);
				}else {
					this.food.count++;
				}
			},

			cutCount (event) {
				
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
		font-size: 24px
		line-height: 24px
		padding: 6px
		vertical-align: top
	.decrease, .card-add
		color: #00a0dc
	.cart-count
		color: rgb(147, 153, 159)
		font-size: 10px
		

</style>