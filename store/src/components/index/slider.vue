<template>
  <section class="wrapper">
    <swiper :options="swiperOption">
      <swiper-slide v-for="item in imgList"
                    :key="item.title">
        <img :src="item.img"
             :alt="item.title"></swiper-slide>
      <div class="swiper-pagination"
           slot="pagination"></div>
    </swiper>
    <section class="nav">
      <ul>
        <li v-for="item in navList"
            :key="item.title">
          <img :src="item.img"
               :alt="item.title">
          <p>{{item.title}}</p>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data () {
    return {
      imgList: [{
        img: '../../../static/slide1.png',
        title: '坚果R1'
      }, {
        img: '../../../static/slide2.png',
        title: '坚果PRO2'
      }],
      navList: [{
        img: '../../../static/nav1.png',
        title: '新品首发'
      }, {
        img: '../../../static/nav2.png',
        title: '手机'
      }, {
        img: '../../../static/nav3.png',
        title: '畅呼吸系列'
      }, {
        img: '../../../static/nav4.png',
        title: '官方配件'
      }, {
        img: '../../../static/nav5.png',
        title: '品牌周边'
      }],
      swiperOption: {
        loop: true,
        autoplay: true,
        pagination: {
          el: '.swiper-pagination'
        }
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
.wrapper
  margin-top 64px
  line-8px(#f2f2f2)
  .swiper-container
    margin 14px 0 24px
    width 100%
    img
      display block
      width 93.3%
      height auto
      margin 0 auto
  & >>> .swiper-pagination-bullet
    width 6px
    height 6px
  & >>> .swiper-pagination-bullet-active
    background #fff
  .nav
    margin 0 12.5px
    ul
      display flex
      align-items center
      li
        flex 1
        img
          display block
          width 25px
          height 25px
          text-align center
          padding 10px 0
          margin 0 auto
        p
          font-size $font-size-d
          text-align center
          margin-bottom 28.75px
</style>
