<template>
  <section class="wrapper">
    <pay-header :title="title"></pay-header>
    <section class="nav">
      <ul>
        <li class="active">商品</li>
        <li>详情</li>
        <li>参数</li>
        <li>推荐</li>
      </ul>
    </section>
    <goods-info :product="product"></goods-info>
    <section class="choose"
             @click="mask">
      <div class="show">
        <h6>已选版本</h6>
        <p><span>颜色：</span><span>{{color}}</span></p>
        <p><span>容量：</span><span>{{capacity}}</span></p>
        <p><span>数量：</span><span>{{productNum}}</span></p>
      </div>
    </section>
    <goods-detail :product="product"></goods-detail>
    <footer class="foot">
      <div>
        <span class="iconfont"
              @click="checkOut">&#xe600;<span v-text='cartCount'
                v-if="cartCount">12</span></span>
        <span class="btn"
              @click="addCart">加入购物车</span>
      </div>
    </footer>
    <transition name="fade">
      <section class="mask-d"
               v-show="maskShow">
        <header class="goods-d">
          <img v-lazy="product.productImage">
          <div class="title">
            <h4>{{title}}</h4>
            <p><span>{{color}}</span> · <span>{{capacity}}</span></p>
            <span>{{product.salePrice | currency('￥')}}</span>
          </div>
        </header>
        <div class="goods-c"
             ref="menu">
          <ul>
            <li class="color">
              <h2>颜色选择</h2>
              <ul class="color-ul">
                <li v-for="(item, index) in product.colors"
                    :key="item.id"
                    :class="{'active-col': curreyIndex == index}"
                    @click="changeColor(index)"><span :class="item.color"></span>{{item.dec}}</li>
              </ul>
            </li>
            <li class="capacity">
              <h2>容量选择</h2>
              <ul class="capacity-ul">
                <li v-for="(item,index) in product.capacityList"
                    :key="item.id"
                    :class="{'active-cap': curreyItem== index}"
                    @click="changeCapacity(index)">{{item.dec}}</li>
              </ul>
            </li>
            <li class="num">
              <h2>选择数量</h2>
              <div>
                <span class="subtract"
                      @click.stop="subtract"></span>
                <span>{{productNum}}</span>
                <span class="add"
                      @click.stop="add"></span>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </transition>
    <transition name="fode">
      <div class="mask"
           @click="mask"
           v-if="maskShow"></div>
    </transition>
    <span class="tips"
          v-if="tip">{{text}}</span>
  </section>
</template>

<script>
import payHeader from '@/components/common/payHeader'
import goodsInfo from '@/components/goods/goodsInfo'
import goodsDetail from '@/components/goods/goodsDetail'
import axios from 'axios'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      maskShow: false,
      title: '',
      curreyIndex: 0,
      curreyItem: 0,
      color: '',
      productNum: 1,
      capacity: '',
      product: {},
      tip: false
    }
  },
  created () {
    this.getGood()
  },
  computed: {
    cartCount () {
      return this.$store.state.cartCount
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$modalMask.beforeClose()
    next()
  },
  methods: {
    getGood () {
      let productId = this.$route.params.id
      axios.post('/goods/productId', {
        productId: productId
      }).then((response) => {
        const res = response.data
        console.log(res)
        if (res.status === '0') {
          this.product = res.result
          this.title = res.result.productName
          this.color = res.result.colors[0].dec
          this.capacity = res.result.capacityList[0].dec
          this.productNum = res.result.productNum
        } else {
          console.log('连接异常')
        }
      })
    },
    addCart () {
      if (document.cookie.length > 0) {
        let productId = this.$route.params.id
        console.log(this.productNum)
        axios.post('/goods/addCart', {
          productId: productId,
          productNum: this.productNum
        }).then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.$store.commit('updateCartCount', 1)
            this.text = '添加购物车成功'
            this.tip = true
            setTimeout(() => {
              this.tip = false
            }, 2000)
          }
        })
      } else {
        this.text = '尚未登陆，请先登录'
        this.tip = true
        setTimeout(() => {
          this.tip = false
        }, 2000)
      }
    },
    mask () {
      this.maskShow = !this.maskShow
      this.isPayment1(this.maskShow)
      this.$nextTick(() => {
        this._initScroll()
      })
    },
    goBack () {
      this.$router.go(-1)
    },
    isPayment1 (val) {
      if (val) {
        this.$modalMask.afterOpen() // 打开禁用
      } else {
        this.$modalMask.beforeClose() // 关闭禁用
      }
    },
    changeColor (index) {
      this.curreyIndex = index
      this.color = this.product.colors[index].dec
    },
    changeCapacity (index) {
      this.curreyItem = index
      this.capacity = this.product.capacityList[index].dec
    },
    add () {
      this.productNum += 1
    },
    subtract () {
      if (this.num > 1) {
        this.productNum -= 1
      }
    },
    checkOut () {
      this.$router.push({
        path: '/cart'
      })
    },
    _initScroll () {
      this.meunScroll = new BScroll(this.$refs.menu, {
        click: true
      })
    }
  },
  components: {
    payHeader,
    goodsInfo,
    goodsDetail
  }
}
</script>

<style lang="stylus" scoped>
@import '~css/variable.styl'
.nav
  padding 9.375px 6.25px
  position fixed
  top 50px
  left 0
  right 0
  height 32.5px
  line-height 32.5px
  background #f2f2f2
  box-shadow 0 5px 13px rgba(0, 0, 0, 0.12)
  z-index 99
  ul
    border 1px solid rgba(0, 0, 0, 0.1)
    border-radius 4px
    box-sizing border-box
    li
      width 23.8%
      display inline-block
      text-align center
      font-size 14px
      color #606060
      font-weight 700
      border-1px-r(rgba(0, 0, 0, 0.1))
      &:last-child
        border-none()
    .active
      color #fff
      background #bfbfbf
      background-image linear-gradient(#aeaeae, #b3b3b3)
      box-shadow inset 0 1px 3px rgba(0, 0, 0, 0.15)
.choose
  .show
    padding 16px 32px 12.5px 16px
    line-8px(rgba(0, 0, 0, 0.1))
    h6
      font-size $font-size-h4
      color $color-text-d
      font-weight 700
      margin-bottom 12.5px
    p
      margin-bottom 12px
      span
        font-size 14px
        &:last-child
          font-weight 700
.foot
  height 56px
  line-height 56px
  background #fff
  position fixed
  left 0
  right 0
  bottom 0
  z-index 299
  box-shadow 0 -11px 27px rgba(0, 0, 0, 0.1)
  div
    display flex
    justify-content space-between
    align-items center
    span
      &:first-child
        font-size 30px
        text-align center
        color rgba(0, 0, 0, 0.5)
        width 20%
        span
          display block
          width 10px
          height 10px
          line-height 10px
          font-size 8px
          padding 3px 8px
          border-radius 10px
          position absolute
          top 6px
          left 46px
          background linear-gradient(#6f94e8, #5178df)
      &:last-child
        flex 1
        height 40px
        line-height 40px
        font-size 16px
        font-weight 700
        margin-right 12.5px
        btn-blue()
.mask-d
  position fixed
  top 30%
  left 0
  right 0
  bottom 50px
  z-index 200
  background #fff
  .goods-d
    position absolute
    top 0
    left 0
    z-index 99
    height 112.5px
    width 100%
    background #f7f7f7
    background-image linear-gradient(#fefefe, #f6f6f6)
    box-shadow 0 5px 13px rgba(0, 0, 0, 0.12)
    img
      position absolute
      top -25px
      left 0
      z-index 210
      display block
      width 90px
      height 90px
      padding 10px
      margin 12.5px
      border-radius 4px
      background #fff
    .title
      position absolute
      left 145px
      top 18px
      h4
        font-size $font-size-h2
        font-weight 700
        margin-bottom 8px
        color #000
      p
        font-size $font-size-h4
        line-height 1.5
        color $color-text-d
        margin-bottom 14px
      &:last-child
        font-size $font-size-h2
        font-weight 700
        color $color-text-m
  .goods-c
    position absolute
    top 112.5px
    left 0
    right 0
    bottom 0
    height 72%
    z-index 900
    overflow-y hidden
    h2
      padding 0 12.5px
      height 42px
      line-height 42px
      font-size $font-size-h2
      color $color-text-h
      font-weight 700
      border-1px(rgba(0, 0, 0, 0.1))
    .color-ul, .capacity-ul
      border-1px(rgba(0, 0, 0, 0.1))
      padding 18px 12.5px
      display flex
    .color
      li
        flex 1
        height 64px
        font-size $font-size-d
        color $color-text-t
        text-align center
        border 1px solid #e5e5e5
        margin-right calc(((100% - 31.3% * 3 - 1px) / 2))
        border-radius 4px
        span
          display block
          width 19px
          height 19px
          border-radius 50%
          margin 10px auto
        .black
          background #000
        .white
          background #f2f2f2
        .blue
          background #00009f
        &:last-child
          margin-right 0
      .active-col
        border-color #698fe7
    .capacity
      ul
        flex-wrap wrap
        flex-direction row
        padding-bottom 10px
        li
          padding 10px
          border 1px solid #e5e5e5
          border-radius 4px
          margin 0 5px 10px 0
          color $color-text-d
          font-size $font-size-h2
        .active-cap
          border-color #698fe7
    .num
      div
        display flex
        align-items center
        padding 12.5px 0 0 12.5px
        span
          display block
          width 32px
          height 32px
          line-height 32px
          text-align center
          font-size 22px
          margin-bottom 20px
        .subtract
          btn-subtract(94px, 4px)
        .add
          btn-add(94px, -28px)
&.fade-enter-active, &.fade-leave-active
  transition all 0.5s
&.fade-enter, &.fade-leave-active
  transform translateY(70%)
  opacity 0
.mask
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background rgba(0, 0, 0, 0.8)
  z-index 99
&.fode-enter-active, &.fode-leave-active
  transition all 0.5s
&.fode-enter, &.fode-leave-active
  opacity 0
.tips
  position fixed
  bottom 80px
  left 0
  right 0
  z-index 1999
  color #fff
  font-size $font-size-h4
  text-align center
  background rgba(0, 0, 0, 0.8)
  width 150px
  padding 15px
  margin 0 auto
  border-radius 8px
</style>
