<template>
  <section class="hotGoods">
    <h2>热销商品</h2>
    <swiper :options="swiperOption">
      <swiper-slide v-for="item in hotGoodsList"
                    :key="item.productId">
        <img :src="item.productImage"
             :alt="item.productName">
        <h4>{{item.productName}}</h4>
        <p>{{item.productDec}}</p>
        <span>{{item.salePrice | currency('￥')}}</span>
      </swiper-slide>
    </swiper>
  </section>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  props: {
    hotGoodsList: Array
  },
  data () {
    return {
      swiperOption: {
        freeMode: true,
        slidesPerView: 3
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="stylus" scoped>
@import '~css/variable.styl'
.hotGoods
  line-8px(#f2f2f2)
  height 280px
  h2
    height 40px
    line-height 40px
    font-size $font-size-h2
    font-weight 700
    color $color-text-h
    padding 0 12.5px
    border-1px(#ebebeb)
  .swiper-slide
    padding-top 18.75px
    padding-left 12.5px
    img
      display block
      width 126px
      height 126px
      border 1px solid #ebebeb
      border-radius 4px
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
    span
      color $color-text-m
      font-size $font-size-h4
</style>
