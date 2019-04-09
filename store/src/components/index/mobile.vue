<template>
  <section class="mobile">
    <h2>坚果手机</h2>
    <div class="wrap">
      <div v-for="item in goodsList"
           class="item"
           :key="item.productId"
           @click="goToGoods(item.productId)">
        <img v-lazy="item.productImage"
             :alt="item.productName">
        <div class="dec">
          <h4>{{item.productName}}</h4>
          <p>{{item.productDec}}</p>
          <span>{{item.salePrice | currency('￥')}}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    goodsList: Array
  },
  methods: {
    goToGoods (productId) {
      let path = '/goods/' + productId
      this.$router.push({
        path: path
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~css/variable.styl'
h2
  height 40px
  line-height 40px
  font-size $font-size-h2
  font-weight 700
  color $color-text-t
  padding 0 12.5px
  border-1px(#ebebeb)
.wrap
  padding 18.75px 12.5px 0
  display flex
  justify-content space-between
  flex-wrap wrap
  line-8px(#f2f2f2)
  .item
    width 48.5%
    img
      display block
      width 100%
      height auto
      border 1px solid #ebebeb
      border-radius 4px
    .dec
      padding 8px 12.5px 18.75px
      h4
        color $color-text-h
        font-size $font-size-h4
        font-weight 700
        margin-bottom 8px
      p
        color $color-text-d
        font-size $font-size-d
        white-space nowrap
        text-overflow ellipsis
        overflow hidden
        margin-bottom 5px
      span
        color $color-text-m
        font-size $font-size-h4
</style>
