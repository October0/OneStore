<template>
  <section class="info">
    <div class="info-img"><img :src="product.productImage">
    </div>
    <div class="info_dec">
      <h2>商品信息</h2>
      <div>
        <h4>{{product.productName}}</h4>
        <p>{{product.productDec}}</p>
        <span>{{product.salePrice | currency('￥')}}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    product: Object
  }
}
</script>

<style lang="stylus" scoped>
@import '~css/variable.styl'
.info
  padding-top 100px
  .info-img
    line-8px(rgba(0, 0, 0, 0.1))
    img
      display block
      width 100%
      height auto
  .info_dec
    padding 0 12.5px
    border-1px-h(rgba(0, 0, 0, 0.1), 40px)
    line-8px(rgba(0, 0, 0, 0.1))
    h2
      font-size $font-size-t
      font-weight 700
      color $color-text-t
      height 40px
      line-height 40px
    div
      padding 16px 6px
      h4
        font-size $font-size-h2
        font-weight 700
        margin-bottom 8px
      p
        font-size $font-size-h4
        line-height 1.5
        color $color-text-d
        margin-bottom 8px
      span
        font-size $font-size-h2
        font-weight 800
        color $color-text-m
</style>
