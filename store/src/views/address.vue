<template>
  <article>
    <pay-header :title="title"></pay-header>
    <div class="wrap-ad"
         ref="menu">
      <ul>
        <li v-for="item in addressList"
            :key="item.addressId"
            class="address"
            :class="{border:item.isDefault===true}">
          <div class="info">
            <p><span>收货人：</span><span>{{item.userName}}</span></p>
            <p><span>手机号码：</span><span>{{item.tel}}</span></p>
            <p><span>收货地址：</span><span>{{item.streetName}}</span></p>
          </div>
          <div class="li-btn">
            <span @click="delAddress(item.addressId)">删除</span>
            <span @click="setDefault(item.addressId)">设为默认</span>
          </div>
        </li>
      </ul>
    </div>
    <section v-if="add"
             class="add-address">
      <div class="wrap">
        <h2>添加收货信息</h2>
        <div>
          <p>收货人：</p>
          <input type="text"
                 v-model="userName">
        </div>
        <div>
          <p>联系方式：</p>
          <input type="text"
                 v-model="tel">
        </div>
        <div>
          <p>收货地址：</p>
          <textarea name="address"
                    v-model="streetName"></textarea>
        </div>
        <span class="btn-post"
              @click="addAddress">确认</span>
      </div>
      <div class="mask">
      </div>
    </section>
    <span class="tips"
          v-if="tip">{{text}}</span>
    <footer class="foot">
      <span class="btn"
            @click="mask">添加地址</span>
    </footer>
  </article>
</template>

<script>
import payHeader from '@/components/common/payHeader'
import BScroll from 'better-scroll'
import axios from 'axios'
export default {
  data () {
    return {
      title: '地址管理',
      add: false,
      checkAllFlag: 1,
      addressList: [],
      addressId: '',
      selectedAddrId: '',
      text: '',
      userName: '',
      tel: '',
      streetName: '',
      tip: false
    }
  },
  created () {
    this.getAddressList()
  },
  beforeRouteLeave (to, from, next) {
    this.$modalMask.beforeClose()
    next()
  },
  methods: {
    getAddressList () {
      axios.get('/users/addressList').then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.addressList = res.result
          this.$nextTick(() => {
            this._initScroll()
          })
        }
      })
    },
    delAddress (addressId) {
      axios.post('/users/delAddress', {
        addressId: addressId
      }).then((response) => {
        let res = response.data
        if (res.status === '0') {
          console.log('del suc')
          this.text = '删除成功'
          this.tip = true
          setTimeout(() => {
            this.tip = false
          }, 2000)
          this.getAddressList()
        }
      })
    },
    setDefault (addressId) {
      axios.post('users/setDefault', {
        addressId: addressId
      }).then((response) => {
        let res = response.data
        if (res.status === '0') {
          console.log('set default')
          this.text = '设置默认成功'
          this.tip = true
          setTimeout(() => {
            this.tip = false
          }, 2000)
          this.getAddressList()
        }
      })
    },
    addAddress () {
      axios.post('users/addAddress', {
        userName: this.userName,
        tel: this.tel,
        streetName: this.streetName
      }).then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.add = false
          this._isPayment1(this.add)
          this.text = '添加成功'
          this.tip = true
          setTimeout(() => {
            this.tip = false
          }, 2000)
          this.getAddressList()
        }
      })
    },
    mask () {
      this.add = true
      this._isPayment1(this.add)
    },
    _isPayment1 (val) {
      if (val) {
        this.$modalMask.afterOpen() // 打开禁用
      } else {
        this.$modalMask.beforeClose() // 关闭禁用
      }
    },
    _initScroll () {
      this.meunScroll = new BScroll(this.$refs.menu, {
        click: true
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
.wrap-ad
  position absolute
  top 50px
  bottom 55px
  left 0
  right 0
  z-index 99
  overflow hidden
  .address
    margin-top 20px
    padding 10px 12.5px
    display flex
    align-items center
    background #f7f7f7
    background-image linear-gradient(#fefefe, #f6f6f6)
    box-shadow 0 5px 13px rgba(0, 0, 0, 0.12)
    margin-bottom 20px
    border-radius 6px
    .info
      flex 1
      margin-right 12px
      p
        display flex
        align-items center
        span
          height 100%
          line-height 26px
          font-size 14px
          &:first-child
            flex 0 0 90px
            color $color-text-t
            font-weight 700
          &:last-child
            flex 1
            color $color-text-d
    .li-btn
      display flex
      flex-direction column
      span
        font-size $font-size-h4
        height 20px
        line-height 20px
        width 60px
        btn-white()
        &:first-child
          margin-bottom 20px
  .border
    border 1px solid #5178df
.add-address
  .mask
    position fixed
    top 0
    bottom 0
    right 0
    left 0
    z-index 199
    background rgba(0, 0, 0, 0.6)
  .wrap
    position fixed
    top 70px
    left 5%
    right 5%
    background #fff
    z-index 299
    border-radius 6px
    h2
      font-size $font-size-t
      font-weight 700
      text-align center
      height 40px
      line-height 40px
      background #f7f7f7
      background-image linear-gradient(#fefefe, #f6f6f6)
      box-shadow 0 5px 13px rgba(0, 0, 0, 0.12)
      border-radius 6px
    div
      padding 20px 12.5px 0
      font-size $font-size-h2
      color $color-text-h
      &:nth-child(2), &:nth-child(3)
        display flex
        align-items center
        p
          width 80px
        input
          flex 1
          height 30px
          font-size 16px
          padding-left 10px
          border 1px solid rgba(0, 0, 0, 0.12)
          border-radius 6px
      &:nth-child(4)
        textarea
          height 80px
          width 97.8%
          margin-top 16px
          font-size 16px
          border 1px solid rgba(0, 0, 0, 0.12)
          border-radius 6px
    span
      display block
      font-size 18px
      font-weight 700
      height 40px
      line-height 40px
      margin 20px 12.5px
      btn-blue()
.foot
  position fixed
  left 0
  right 0
  bottom 0
  background #fff
  display flex
  z-index 99
  align-items center
  padding 10px 18px
  box-shadow 0 -11px 32px rgba(0, 0, 0, 0.08)
  .btn
    flex 1
    font-size $font-size-h2
    font-weight 700
    height 35px
    line-height 35px
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
