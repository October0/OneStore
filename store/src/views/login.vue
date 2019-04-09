<template>
  <section class="login">
    <header class="header">登录官网</header>
    <form class="input">
      <input type="text"
             placeholder="手机号/邮箱"
             v-model="userName">
      <input type="password"
             placeholder="密码"
             v-model="userPwd">
    </form>
    <div class="register">
      <span>注册</span>
    </div>
    <span class="btn"
          :class="btn?'btn-active':'btn-disable'"
          @click="login">登录</span>
    <span class="tips"
          v-if="errorTip">用户名或密码错误，请重试</span>
  </section>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      errorTip: false,
      btn: false,
      userName: '12345678910',
      userPwd: '123456'
    }
  },
  mounted () {
    this._check()
  },
  methods: {
    login () {
      if (!this.userName || !this.userPwd) {
        this.errorTip = true
      }
      axios.post('/users/login', {
        userName: this.userName,
        userPwd: this.userPwd
      }).then((response) => {
        const res = response.data
        if (res.status === '0') {
          this.errorTip = false
          this.getCartCount()
          this.checkLogin()
          this.$router.go(-1)
        } else {
          this.errorTip = true
          setTimeout(() => {
            this.errorTip = false
          }, 2000)
        }
      })
    },
    checkLogin () {
      axios.get('/users/checkLogin').then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.$store.commit('updateUserInfo', res.result)
        }
      })
    },
    getCartCount () {
      axios.get('/users/getCartCount').then((response) => {
        let res = response.data
        this.$store.commit('updateCartCount', res.result)
      })
    },
    _check () {
      if (this.userName.length === 11 && this.userPwd.length >= 6) {
        this.btn = true
      } else {
        this.btn = false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~css/variable.styl'
.login
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  z-index 999
  background #f2f2f2
  height 667px
  .header
    padding 0
    background $color-background-h
    height 56px
    line-height 56px
    color $color-text
    font-size $font-size-t
    font-weight 700
    text-align center
  .input
    margin 12.5px 12.5px 0
    border 1px slild rgba(0, 0, 0, 0.5)
    border-1px-l(rgba(0, 0, 0, 0.1))
    input
      width 96.7%
      margin-right 12.5px
      height 44px
      padding-left 12px
      &:first-child
        border-radius 6px 6px 0 0
        box-shadow 0 3px 5px -4px rgba(0, 0, 0, 0.4) inset, -1px 0 3px -2px rgba(0, 0, 0, 0.1) inset
      &:last-child
        border-radius 0 0 6px 6px
  .register
    font-size 14px
    margin 18px 25px 0 0
    text-align right
    color #7f7f7f
  .btn
    margin 18px 12.5px 0
    display block
    width 93.3%
    height 53px
    line-height 53px
    font-size 16px
    color #fff
    text-align center
    border-radius 8px
    box-shadow 0 1px 1px -1px rgba(0, 0, 0, 0.8)
    box-sizing border-box
  .btn-disable
    background linear-gradient(#6f94e8, #5178df)
    opacity 0.6
  .btn-active
    background linear-gradient(#6788d0, #4364bb)
  .tips
    position absolute
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
