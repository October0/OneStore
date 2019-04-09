<template>
  <header class="header">
    <router-link to="/"
                 tag="span"
                 class="menu iconfont">&#xe682;</router-link>
    <h4>{{title}}</h4>
    <router-link to="/"
                 tag="span"
                 class="search iconfont">&#xe671;</router-link>
  </header>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style lang="stylus" scoped>
@import '~css/variable.styl'
.header
  height 50px
  display flex
  justify-content space-between
  align-items center
  background $color-background-h
  color $color-text
  padding 0 20px
  position fixed
  top 0
  left 0
  right 0
  z-index 999
  h4
    font-weight 700
    font-size $font-size-t
  .iconfont
    font-size 20px
    color #f2f2f2
</style>
