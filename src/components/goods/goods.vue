<template>
  <div class="goods">
  <!-- 左侧菜单列表 -->
    <div class="menu-wrapper">
      <ul>
        <li v-for="item in goods" class="menu-item">
          <span class="text border-1px">
            <span class="icon" v-show="item.type>0"
             :class="classMap[item.type]"></span>{{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <!-- 商品列表 -->
    <div class="foods-wrapper">
      <ul>
        <li v-for="item in goods" class="food-list">
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
                  <span class="count">月售{{food.price}}份</span>
                  <span v-show="food.rating">好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{ food.price }}</span>
                  <span v-show="food.oldPrice" class="old">￥{{ food.oldPrice }}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

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
      goods: {}
    }
  },
  created() {

    this.classMap = ['decrease',
     'discount', 'special', 'invoice', 'guarantee'];

    this.$http.get('/api/goods').then(response => {
      console.log(response);
      response = response.body
      if(response.errno === ERR_OK) {
        this.goods = response.data;
      }
    },response => {
      console.log('获取数据失败'+ response);
    });
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
        line-height: 14px
        padding: 0 12px
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
          .extra
            &>.count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
          .now
            font-size: 14px
            color: rgb(240, 20, 20)
          .old
            text-decoration: line-through
            font-size: 10px
            color: rgb(147, 153, 159)
</style>