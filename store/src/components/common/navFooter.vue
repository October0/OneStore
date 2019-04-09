<template>
  <footer class="foot">
    <ul>
      <router-link to="/"
                   tag="li"
                   class="box">
        <span class="iconfont">&#xe60d;</span>
        <p class="title">首页</p>
      </router-link>
      <router-link to="/category"
                   tag="li"
                   class="box">
        <span class="iconfont">&#xe621;</span>
        <p class="title">分类</p>
      </router-link>
      <router-link to="/cart"
                   tag="li"
                   class="box">
        <span class="iconfont">&#xe600;</span>
        <p class="title">购物车<span v-text='cartCount'
                v-if="cartCount">12</span></p>
      </router-link>
      <router-link to="/user"
                   tag="li"
                   class="box">
        <span class="iconfont">&#xe89a;</span>
        <p class="title">个人中心</p>
      </router-link>
    </ul>
  </footer>
</template>

<script>
export default {
  computed: {
    cartCount () {
      return this.$store.state.cartCount
    }
  }
}
</script>

<style lang="stylus" scoped>
ul
  height 54px
  display flex
  align-items center
  position fixed
  left 0
  right 0
  bottom 0
  box-shadow 0 -11px 32px rgba(0, 0, 0, 0.08)
  background #fff
  z-index 999
  li
    flex 1
    height 54px
    text-align center
    color rgba(0, 0, 0, 0.3)
    span
      display block
      font-size 22px
      margin 8px 0 5px
    .title
      font-size 8px
      font-weight 700
      span
        display block
        font-size 8px
        padding 3px 8px
        border-radius 10px
        position absolute
        top -8px
        right 27%
        background linear-gradient(#6f94e8, #5178df)
  .router-link-exact-active
    color #000
    background linear-gradient(0deg, hsla(0, 0%, 100%, 0.05), rgba(0, 0, 0, 0.05))
</style>
