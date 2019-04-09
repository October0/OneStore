<template>
  <article>
    <section class="detail">
      <h2>商品详情</h2>
      <div v-for="item in product.info"
           :key="item.id">
        <img v-lazy="item.src">
      </div>
    </section>
    <section class="parameter">
      <h2>技术参数</h2>
      <div v-for="item in product.info"
           :key="item.id">
        <img v-lazy="item.src"
             :alt="item.id">
      </div>
    </section>
  </article>
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
.detail, .parameter
  h2
    font-size $font-size-t
    font-weight 700
    color $color-text-t
    height 40px
    line-height 40px
    padding-left 12.5px
  img
    display block
    width 100%
    height auto
.detail
  line-8px(rgba(0, 0, 0, 0.1))
.parameter
  padding-bottom 56px
</style>
