<template>
  <section>
    <nav-header :title="title"></nav-header>
    <section class="wrap">
      <div class="user"
           @click="showLog">
        <img src="../../static/user.jpg"
             alt="">
        <p v-if="!nickName">登录/注册</p>
        <p v-if="nickName"
           v-text="nickName"></p>
        <span class="iconfont">&#xe60c;</span>
      </div>
      <ul class="item">
        <li>
          <span class="iconfont">&#xe624;</span>
          <p>全部订单</p>
        </li>
        <li>
          <span class="iconfont">&#xe610;</span>
          <p>待付款</p>
        </li>
        <li>
          <span class="iconfont">&#xe60b;</span>
          <p>待收货</p>
        </li>
        <li>
          <span class="iconfont">&#xe616;</span>
          <p>售后</p>
        </li>
      </ul>
      <div class="address"
           @click="goAddress">
        <p>地址管理</p>
        <span class="iconfont">&#xe60c;</span>
      </div>
      <div>
        <div class="service">
          <p>服务支持</p>
          <span class="iconfont">&#xe60c;</span>
        </div>
        <div class="service">
          <p>常见问题</p>
          <span class="iconfont">&#xe60c;</span>
        </div>
      </div>
    </section>
    <nav-footer></nav-footer>
  </section>
</template>

<script>
import NavHeader from '@/components/common/navHeader'
import NavFooter from '@/components/common/navFooter'
export default {
  data () {
    return {
      title: '个人中心',
      showUserName: false,
      showLogin: false
    }
  },
  created () {

  },
  computed: {
    nickName () {
      return this.$store.state.nickName
    }
  },
  methods: {
    goAddress () {
      if (document.cookie.length > 0) {
        this.$router.push({
          path: '/address'
        })
      }
    },
    showLog () {
      if (document.cookie.length > 0) { } else {
        this.$router.push({
          path: '/login'
        })
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
  padding 64.5px 12.5px 200px
  background #f2f2f2
  .user
    display flex
    align-items center
    flex-wrap wrap
    background #fff
    border-1px(#ebebeb)
    border-radius 8px 8px 0 0
    img
      display block
      width 55px
      height 55px
      border-radius 50%
      border-1px(#ebebeb)
      padding 18px
    p
      flex 1
      font-size $font-size-u
    span
      padding-right 8px
      color $color-text-t
  ul
    background #fff
    border-radius 0 0 8px 8px
    width 100%
    height 62.5px
    box-shadow 0 1px 2px rgba(0, 0, 0, 0.1), 0 18px 20px -10px rgba(0, 0, 0, 0.03), 0 18px 20px -10px rgba(0, 0, 0, 0.03), 0 10px 20px -10px rgba(0, 0, 0, 0.03)
    li
      width 23.8%
      height 62.5px
      display inline-block
      text-align center
      border-1px-r(#ebebeb)
      span
        display block
        font-size 24px
        color rgba(0, 0, 0, 0.5)
        margin 10px 0 5px
      p
        font-size $font-size-d
      &:last-child
        border-none()
  .address
    margin-top 14.5px
    width 100%
    height 62.5px
    background #fff
    border-radius 8px
    box-shadow 0 1px 2px rgba(0, 0, 0, 0.1), 0 18px 20px -10px rgba(0, 0, 0, 0.03), 0 18px 20px -10px rgba(0, 0, 0, 0.03), 0 10px 20px -10px rgba(0, 0, 0, 0.03)
    display flex
    justify-content space-between
    align-items center
    p
      font-size $font-size-u
      margin-left 18px
    span
      margin-right 8px
  .service
    width 100%
    height 62.5px
    background #fff
    display flex
    justify-content space-between
    align-items center
    p
      font-size $font-size-u
      margin-left 18px
    span
      margin-right 8px
    &:first-child
      margin-top 14.5px
      border-radius 8px 8px 0 0
    &:last-child
      border-radius 0 0 8px 8px
      box-shadow 0 1px 2px rgba(0, 0, 0, 0.1), 0 18px 20px -10px rgba(0, 0, 0, 0.03), 0 18px 20px -10px rgba(0, 0, 0, 0.03), 0 10px 20px -10px rgba(0, 0, 0, 0.03)
</style>
