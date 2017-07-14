<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link :to="{path: '/goods'}" replace>商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path: '/ratings'}" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path: '/seller'}" replace>商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import header from './components/header/header.vue';
export default {
  name: 'app',
  data () {
    return {
      seller: {}
    }
  },
  created () {
    this.$http.get('/api/seller').then((res) => {
      res = res.body;
      console.log(res);
      this.seller = res.seller;
    })
  },
  components: {
    'v-header': header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import './common/stylus/mixin.styl'
@import './common/stylus/border-1px.styl'
.tab
  display: flex
  width: 100%
  height: 40px
  line-height: 40px
  border-1px(rgb(7, 17, 27, 0.1))
  .tab-item
    flex: 1
    text-align: center 
    & > a
      display: block
      font-size: 14px
      color: rgb(77, 85, 93)
      &.router-link-active
        color: rgb(240, 20, 20)
</style>
