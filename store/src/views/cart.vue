<template>
  <section>
    <nav-header :title="title"></nav-header>
    <section class="wrap"
             v-if="login">
      <span class="iconfont icon">&#xe600;</span>
      <h2>购物车暂无商品</h2>
      <p>添加到购物车的商品将会显示在这里</p>
      <router-link to="/login"
                   tag="span"
                   class="login"
                   v-if="showCart">登录</router-link>
      <router-link to='/'
                   tag="span"
                   class="index">现在选购</router-link>
    </section>
    <section class="full"
             v-show="!login">
      <ul>
        <li v-for="item in cartList"
            :key="item.productId">
          <span class="check"
                :class="{'active':item.checked===1}"
                @click="editCart('checked',item)"></span>
          <img v-lazy="item.productImage"
               :alt="item.productName">
          <div class="info">
            <h4>{{item.productName}}</h4>
            <p>{{item.productDec}}</p>
            <span class="price">{{item.salePrice | currency('￥')}}</span>
            <div>
              <span class="subtract"
                    @click.stop="editCart('minu',item)"></span>
              <span>{{item.productNum}}</span>
              <span class="add"
                    @click.stop="editCart('add',item)"></span>
            </div>
          </div>
          <span class="btn"
                @click="cartDel(item.productId,item.productNum)">删除</span>
        </li>
      </ul>
      <div class="foot">
        <div @click="checkAll"><span :class="{'check-a':checkedAllFlag}"></span><span>全选</span></div>
        <span class="aprice">{{totalPrice | currency('￥')}}</span>
        <span class="btn"
              @click="checkOut">结算</span>
      </div>
    </section>
    <nav-footer></nav-footer>
    <span class="tips"
          v-if="tip">{{text}}</span>
  </section>
</template>

<script>
import NavHeader from '@/components/common/navHeader'
import NavFooter from '@/components/common/navFooter'
import axios from 'axios'
export default {
  data () {
    return {
      showCart: false,
      login: true,
      count: 0,
      title: '购物车',
      showIcon: false,
      currentIndex: 0,
      cartList: [],
      tip: false,
      num: 0
    }
  },
  created () {
    this._showLoginBtn()
    this.getCartList()
  },
  computed: {
    checkedAllFlag () {
      return this.checkedCount === this.cartList.length
    },
    checkedCount () {
      let i = 0
      this.cartList.forEach((item) => {
        if (item.checked === 1) i++
      })
      return i
    },
    totalPrice () {
      var money = 0
      this.cartList.forEach((item) => {
        if (item.checked === 1) {
          money += item.salePrice * item.productNum
        }
      })
      return money
    }
  },
  methods: {
    getCartList () {
      axios.get('/users/cartList').then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.login = false
          this.cartList = res.result
          if (this.cartList.length === 0) {
            this.login = true
          }
        }
      })
    },
    cartDel (productId, productNum) {
      axios.post('/users/cartDel', {
        productId: productId
      }).then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.text = '删除成功'
          this.tip = true
          setTimeout(() => {
            this.tip = false
          }, 2000)
          this.getCartList()
          let delCount = productNum
          this.$store.commit('updateCartCount', -delCount)
        }
      })
    },
    editCart (flag, item) {
      if (flag === 'add') {
        item.productNum++
      } else if (flag === 'minu') {
        if (item.productNum <= 1) {
          return
        }
        item.productNum--
      } else {
        item.checked = item.checked === 1 ? 0 : 1
      }
      axios.post('/users/cartEdit', {
        productId: item.productId,
        productNum: item.productNum,
        checked: item.checked
      }).then((response) => {
        let res = response.data
        if (res.status === '0') {
          if (flag === 'add') {
            this.count = 1
          } else if (flag === 'minu') {
            this.count = -1
          } else {
            this.count = 0
          }
          this.$store.commit('updateCartCount', this.count)
        }
      })
    },
    checkAll () {
      var flag = !this.checkAllFlag
      this.cartList.forEach((item) => {
        item.checked = flag ? 1 : 0
      })
      axios.post('users/editCheckAll', {
        checkAll: flag
      }).then((response) => {
        let res = response.data
        if (res.status === '0') {
          console.log('update suc')
        }
      })
    },
    checkOut () {
      if (this.checkedCount > 0) {
        this.$router.push({
          path: '/pay'
        })
      }
    },
    _showLoginBtn () {
      if (document.cookie.length > 0) {
        this.showCart = false
      } else {
        this.showCart = true
      }
    }
  },
  components: {
    NavHeader,
    NavFooter
  }
}
</script>

<style lang="stylus" scoped>
@import '~css/variable.styl'
.wrap
  position absolute
  left 0
  right 0
  top 50%
  transform translateY(-50%)
  text-align center
  .icon
    display block
    font-size 120px
    color rgba(0, 0, 0, 0.15)
    margin-bottom 20px
  h2
    font-size 26px
    color rgba(0, 0, 0, 0.15)
    font-weight 700
    margin-bottom 10px
  p
    font-size 14px
    color rgba(0, 0, 0, 0.15)
    margin-bottom 16px
  .login
    display inline-block
    width 142px
    height 40px
    line-height 40px
    font-weight 700
    margin-right 5px
    btn-blue()
  .index
    display inline-block
    width 142px
    height 40px
    line-height 40px
    font-weight 700
    btn-white()
.full
  margin 54px 0 94px
  li
    width 100%
    height 126px
    display flex
    align-items center
    box-sizing border-box
    padding 12.5px
    border-1px(rgba(0, 0, 0, 0.1))
    .check
      check-box()
      opacity 0.2
    .active
      opacity 1
    img
      display block
      width 100px
      height 100px
    .info
      flex 1
      margin-top 10px
      h4
        font-size $font-size-h4
        font-weight 700
        margin-bottom 10px
      p
        font-size $font-size-d
        color $color-text-d
        margin-bottom 5px
        width 188px
        text-dots()
      .price
        font-size $font-size-d
        font-weight 700
        color $color-text-m
      div
        display flex
        align-items center
        margin-top 10px
        span
          display block
          width 18px
          height 18px
          line-height 18px
          text-align center
          font-size 19
          margin-bottom 10px
        .subtract
          btn-subtract(58px, 0)
          margin-right 10px
        .add
          btn-add(58px, -19px)
          margin-left 10px
    .btn
      font-size $font-size-h4
      color $color-text-d
      padding 5px
      border 1px solid rgba(0, 0, 0, 0.3)
      border-radius 4px
  .foot
    position fixed
    left 0
    right 0
    bottom 54px
    background #fff
    display flex
    z-index 99
    align-items center
    padding 0 12.5px
    box-shadow 0 -11px 32px rgba(0, 0, 0, 0.08)
    div
      height 40px
      display flex
      align-items center
      span
        font-size $font-size-h2
        font-weight 700
        opacity 0.2
        &:first-child
          check-box()
          margin-right 5px
      .check-a
        opacity 1
    .aprice
      flex 1
      font-size $font-size-h2
      font-weight 800
      text-align right
      color $color-text-m
    .btn
      width 80px
      height 30px
      line-height 30px
      margin-left 20px
      btn-blue()
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
  width 100px
  padding 15px
  margin 0 auto
  border-radius 8px
</style>
