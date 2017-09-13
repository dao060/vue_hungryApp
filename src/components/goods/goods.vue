<template>
  <div class="goods">
  <!-- 左侧菜单列表 -->
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item menu-item-hook" :class="{'current': currentIndex===index}"  @click="selectMenu(index, $event)">
          <span class="text border-1px">
            <span class="icon" v-show="item.type>0"
             :class="classMap[item.type]"></span>{{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <!-- 商品列表 -->
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook" ref="foodList">
          <h1 class="title">{{ item.name }}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon" width="57px" height="57px" />
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售{{food.price}}份</span><span
                   v-show="food.rating">好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{ food.price }}</span>
                  <span v-show="food.oldPrice" class="old">￥{{ food.oldPrice }}</span>
                </div>
                <div class="cartControl-wrapper">
                  <cart-control :food="food"></cart-control>
                </div> 
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 购物车组件 -->
  <shopcard :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcard>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
import shopcard from '../shopcard/shopcard.vue';
import cartControl from '../cartControl/cartControl.vue';

const ERR_OK = 0;

export default {

  name: 'goods',
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: {},
      listHeight: [],
      scrollY: 0
    }
  },
  created() {
    this.classMap = ['decrease',
     'discount', 'special', 'invoice', 'guarantee'];

    this.$http.get('/api/goods').then(response => {
      response = response.body
      if(response.errno === ERR_OK) {
        
        this.goods = response.data;
        
        this.$nextTick(() => {
          this._initScroll();

          // 计算高度
          this._calculateHeight();
        });

      };
    }, response => {
      alert('获取数据失败'+ response);
    });
  },
  computed: {
    currentIndex() {
      for(let i = 0; i < this.listHeight.length; i++) {

        let height = this.listHeight[i];
        let nextHeight = this.listHeight[i+1];
        
        if (!nextHeight || (this.scrollY >= height && (this.scrollY < nextHeight))) {
         
          return i;
        }
      }
      return 0;
    }
  },
  methods: {
    _initScroll() {

      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      });

      this.foodsScroll.on('scroll', pos => {
        
        this.scrollY = Math.abs(Math.round(pos.y));
      });

    },
    _calculateHeight() {
     
      // 获取dom元素
      let foodList = this.$el.getElementsByClassName('food-list-hook');
            
      let height = 0;
      this.listHeight.push(height); 

      for(let i = 0, len = foodList.length; i < len; i++) {

        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(index, event) {
      
      if(!event._constructed) {
        return;
      }

      let foodList = this.$refs.foodList;
      
     let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);

    }
  },
  components: {
    shopcard,
    'cart-control': cartControl
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin.styl'
  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width:  56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          background: #fff
          font-weight: 700
          top: -1px
          .text
            border-none()

        .icon
          &.decrease
            bg-img('decrease_1')
          &.discount
            bg-img('discount_1')
          &.guarantee
            bg-img('guarantee_1')
          &.invoice
            bg-img('invoice_1')
          &.special
            bg-img('special_1')
        
          display: inline-block
          width: 12px
          height: 12px
          background-size: 12px 12px
          background-repeat: no-repeat
          vertical-align: top
          
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))

    /********* food 列表样式 **********/
    .foods-wrapper
      flex: 1
      .title
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        padding-left: 14px
        color: rgb(147, 153, 159)
        background-color: #f3f5f7

      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
        .icon
          flex: 0 0 57px
          width: 57px
          margin-right: 10px
        .content
          flex: 1
          position: relative
          .name
            margin: 2px 0 8px 0
            font-size: 14px
            line-height: 14px
            font-weight: 700
            color: rgb(7, 17, 27)
          .desc, .extra
            color: rgb(147, 153, 159)
            font-size: 10px
            line-height: 10px
          .desc
            margin-bottom: 8px
            line-height: 12px
          .extra
            &>.count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              font-size: 14px
              margin-right: 8px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)

          .cartControl-wrapper
            position: absolute
            right: 0px
            bottom: -8px
</style>