<template>
  <section>
    <h2>品牌周边</h2>
    <div class="wrap">
      <div class="item"
           v-for="item in circumList"
           :key="item.productId"
           @click="goToGoods(item.productId)">
        <img v-lazy="item.productImage"
             :alt="item.productDec">
        <div class="dec">
          <h4>{{item.productName}}</h4>
          <p>{{item.productDec}}</p>
          <span class="label">{{item.productLabel}}</span>
          <ul>
            <li v-for="color in item.color"
                :key='color.id'><img :src="color.img"></li>
          </ul>
          <span>{{item.salePrice | currency('￥')}}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    circumList: Array
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
  padding-bottom 54px
  .item
    display flex
    flex-direction row
    align-items center
    padding 12.5px
    border-1px(#ebebeb)
    img
      display block
      width 36%
      height auto
      margin-right 32px
    .dec
      h4
        color $color-text-h
        font-size $font-size-h4
        font-weight 700
        white-space nowrap
        text-overflow ellipsis
        overflow hidden
        margin 10px 0 8px
      p
        color $color-text-d
        font-size $font-size-d
        white-space nowrap
        text-overflow ellipsis
        overflow hidden
        margin-bottom 8px
      li
        display inline-block
        img
          width 10px
          height 10px
          border 2px solid rgba(0, 0, 0, 0.1)
          box-sizing border-box
          border-radius 50%
          margin-right 6.25px
      .label
        display block
        width 24px
        font-size 6px
        color #3965cc
        background #e5efff
        padding 2px 6.25px
        border-radius 2px
        border 1px solid #94b3f7
      span
        color $color-text-m
        font-size $font-size-h4
</style>
