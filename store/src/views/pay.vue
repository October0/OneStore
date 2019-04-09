<template>
  <section class="wrapper">
    <pay-header :title="title"></pay-header>
    <article class="wrap"
             v-if='!show'>
      <router-link to="/address"
                   tag="section"
                   class="address">
        <h2>收货信息</h2>
        <div>
          <p><span>收货人：</span><span>{{addressList.userName}}</span></p>
          <p><span>手机号码：</span><span>{{addressList.tel}}</span></p>
          <p><span>收货地址：</span><span>{{addressList.streetName}}</span></p>
        </div>
      </router-link>
      <section class="shop">
        <h2>购物清单</h2>
        <ul>
          <li v-for="item in cartList"
              :key="item.productId">
            <img v-lazy="item.productImage"
                 :alt="item.productName">
            <div class="info">
              <h4>{{item.productName}}</h4>
              <p>{{item.productDec}}</p>
              <span class="num">件数：{{item.productNum}}</span>
              <span class="price">{{item.salePrice*item.productNum | currency('￥')}}</span>
            </div>
          </li>
        </ul>
      </section>
      <section class="Billing">
        <h2>结算信息</h2>
        <div>
          <p><span>订单总额：</span><span>{{price | currency('￥')}}</span></p>
          <p><span>配送费：</span><span>{{price1| currency('￥')}}</span></p>
          <p><span>折扣：</span><span>{{price2 | currency('￥')}}</span></p>
          <p><span>应付总额：</span><span>{{totalPrice | currency('￥')}}</span></p>
        </div>
      </section>
      <footer class="foot">
        <span class="btn"
              @click="payMent">提交订单</span>
      </footer>
    </article>
    <section class="success"
             v-if='show'>
      <div>
        <img src="../../static/ok.png">
        <h4>提交订单成功</h4>
        <p><span>订单号：</span><span>{{orderId}}</span></p>
        <p><span>订单金额：</span><span>{{totalPrice | currency('￥')}}</span></p>
        <div>
          <span class="btn-i">查看订单</span>
          <router-link tag="span"
                       to='/'
                       class="btn-d">继续购物</router-link>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import payHeader from '@/components/common/payHeader'
import axios from 'axios'
export default {
  data () {
    return {
      title: '支付',
      price1: 99,
      price2: 108,
      show: false,
      orderId: '',
      addressList: {},
      cartList: [],
      num: 0
    }
  },
  created () {
    this.getOrder()
  },
  computed: {
    price () {
      var money = 0
      this.cartList.forEach((item) => {
        money += item.salePrice * item.productNum
      })
      return money
    },
    totalPrice () {
      var money = 0
      this.cartList.forEach((item) => {
        money += item.salePrice * item.productNum + this.price1 - this.price2
      })
      return money
    }
  },
  methods: {
    payMent () {
      let addressId = this.addressList.addressId
      axios.post('/users/payMent', {
        addressId: addressId,
        orderTotal: this.totalPrice
      }).then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.show = true
          this.orderId = res.result.orderId
          this.cartList.forEach((item) => {
            axios.post('/users/cartDel', {
              productId: item.productId
            }).then((response) => {
              let res = response.data
              if (res.status === '0') {
                console.log(item.productNum)
                this.num = item.productNum
                this.$store.commit('updateCartCount', -this.num)
              }
            })
          })
        }
      })
    },
    getOrder () {
      axios.get('/users/cartList').then((response) => {
        let res = response.data
        if (res.status === '0') {
          res.result.forEach((item) => {
            if (item.checked === 1) {
              this.cartList.push(item)
            }
          })
        }
      })
      axios.get('/users/addressList').then((response) => {
        let res = response.data
        if (res.status === '0') {
          res.result.forEach((item) => {
            if (item.isDefault === true) {
              this.addressList = item
            }
          })
        }
      })
    }
  },
  components: {
    payHeader
  }
}
</script>

<style lang="stylus" scoped>
@import '~css/variable.styl'
.wrap
  h2
    padding 0 12.5px
    font-size $font-size-h2
    color $color-text-h
    font-weight 700
    height 40px
    line-height 40px
    background #f7f7f7
    background-image linear-gradient(#fefefe, #f6f6f6)
    box-shadow 0 5px 13px rgba(0, 0, 0, 0.12)
    margin-bottom 18px
  .address
    margin-top 60px
    div
      padding 0 12.5px
      margin-bottom 16px
      p
        display flex
        align-items center
        span
          height 100%
          line-height 26px
          font-size 14px
          &:first-child
            flex 0 0 108px
            color $color-text-t
            font-weight 700
          &:last-child
            flex 1
            color $color-text-d
  .shop
    margin-bottom 18px
    li
      height 126px
      display flex
      align-items center
      box-sizing border-box
      border-1px(rgba(0, 0, 0, 0.1))
      img
        flex 0 0 100px
        height 100px
        margin-right 18px
      .info
        flex 1
        h4
          font-size $font-size-h4
          font-weight 700
          margin-bottom 10px
        p
          font-size $font-size-d
          color $color-text-d
          margin-bottom 10px
          text-overflow ellipsis
          white-space nowrap
          overflow hidden
        .num
          display block
          font-size $font-size-h4
          color $color-text-t
          margin-bottom 10px
        .price
          font-size $font-size-h2
          font-weight 700
          color $color-text-m
      &:last-child
        border-none()
  .Billing
    margin-bottom 64px
    p
      display flex
      height 25px
      align-items center
      font-size $font-size-h2
      span
        text-align right
        &:first-child
          flex 0.7
          font-size $font-size-h2
          color $color-text-t
        &:last-child
          flex 0.3
          margin-right 12.5px
      &:last-child
        color $color-text-m
        font-size $font-size-u
        font-weight 800
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
    .btn
      display block
      font-size $font-size-h2
      font-weight 700
      height 40px
      line-height 40px
      margin 8px 12.5px
      btn-blue()
.success
  position fixed
  top 100px
  left 10%
  right 10%
  bottom 0
  div
    width 100%
    img
      display block
      height 260px
      margin 0 auto
    h4
      font-size 20px
      color $color-text-h
      font-weight 700
      text-align center
      margin 20px 0
    p
      display flex
      height 20px
      line-height 20px
      font-size $font-size-h2
      color $color-text-t
      margin-bottom 5px
      margin-left 20px
      span
        &:first-child
          width 90px
          text-align right
    div
      margin-top 50px
      span
        display inline-block
        width 47%
        height 40px
        line-height 40px
        font-weight 700
      .btn-d
        btn-blue()
      .btn-i
        btn-white()
        margin-right 8px
</style>
