<template>
<div class="header">
  <div class="content-wrapper">
    <div class="avatar">
      <img :src="seller.avatar" width="64px" height="64px">
    </div>
    <div class="content">
      <div class="title">
        <span class="brand"></span>
        <span class="name">{{ seller.name }}</span>
      </div>
      <div class="description">{{ seller.description }}/{{ seller.deliveryTime }}分钟到达</div>
      <div class="supports">
        <span class="icon"></span><span v-if="seller.supports">{{ seller.supports[0].description }}</span>
        <div class="supports-count">
          <span class="count" v-if="seller.supports">{{ seller.supports.length }}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
  </div>
  <!-- 公告 -->
  <div class="bulletin-wrapper">
    <span class="bulletin-icon"></span><span class="bulletin-content">{{ seller.bulletin }}</span>
    <i class="icon-keyboard_arrow_right"></i>
  </div>
  <div class="background">
    <img :src="seller.avatar" width="100%" height="100%"/>
  </div>
  <!-- 商家详情弹页 -->
  <div v-show="detailShow" class="detail">
    <div class="detail-wrapper clearfix">
      <div class="detail-main"></div>
    </div>
    <div class="detai-close">
      <i class="icon-close"></i>
    </div>
  </div>   
</div>
</template>
<script>
export default {
  name: 'header',
  props: {
      seller: {
          type: Object
      }
  },
  data() {
    return {
      detailShow: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin.styl'
.header
  position: relative
  width: 100%
  color: #fff
  background: rgba(7, 17, 27, 0.5)
  .content-wrapper
    width: 100%
    position: relative
    box-sizing: border-box
    padding: 24px 12px 18px 24px
    font-size: 0px
    &>.avatar
      display: inline-block
      vertical-align: top
      &>img
        border-radius: 2px
        -webkit-border-radius: 2px
    .content
      display: inline-block
      font-size: 14px
      margin-left: 16px
      vertical-align: top
      .title
        margin: 2px 0 8px 0
        .brand
          display: inline-block
          width: 30px
          height: 18px
          bg-img('brand')
          background-size: 30px 18px
          background-repeat: no-repeat
          vertical-align: top
        .name
          margin-left: 6px
          font-size: 16px
          font-weight: bold
          line-height: 18px
      .description
        margin-bottom: 10px
      .supports
        font-size: 10px
        margin-bottom: 2px
        &>.icon
          display: inline-block
          width: 12px
          height: 12px
          bg-img('decrease_1')
          background-size: 12px 12px
          background-repeat: no-repeat
          vertical-align: top
          margin-right: 4px
        .supports-count
          position: absolute
          right: 12px
          bottom: 15px
          background: #4c5054
          border-radius: 12px
          font-size: 0
          padding: 7px 8px
          -webkit-border-radius: 12px
          .count
            display: inline-block
            font-size: 10px
            height: 12px
            line-height: 12px
            margin-right: 2px
            vertical-align: top
          &>i
            font-size: 12px
  .bulletin-wrapper
    position: relative
    width: 100%
    box-sizing: border-box
    height: 28px
    line-height: 28px
    background: rgba(7, 17, 27, 0.2)
    z-index: 1
    padding: 0 22px 0 12px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    .bulletin-icon
      display: inline-block
      width: 22px
      height: 12px
      bg-img('bulletin')
      background-size: 22px 12px
      background-repeat: no-repeat
      vertical-align: top
      margin-top: 7px
    .bulletin-content
      vertical-align: top
      font-size: 10px
      margin: 0 4px
    .icon-keyboard_arrow_right
      display: inline-block
      position: absolute
      right: 12px
      top: 8px
      font-size: 12px
/* 背景样式 */
  .background
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: -1
    filter: blur(10px)
    -webkit-filter: blur(10px)
    overflow: hidden
/* 弹出页样式 */
  .detail
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100% 
    overflow: auto
    z-index: 10
    background: rgba(7,17,27,0.8)
    filter: blur(10)
    -webkit-filter: blur(10)
    .detail-wrapper
      min-height: 100%
      .detail-main
        margin-top: 64px
        padding-bottom: 32px
    .detail-close
      position: relative
      width: 32px
      heith: 32px
      margin: -64px auto 0 auto
      clear: both
      .icon-close
        color: rgba(255,255,255,0.5)
</style>