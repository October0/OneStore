<template>
  <section>
    <header>
      <div class="header">
        <h2>{{title}}</h2>
        <span @click="goBack">&lt; 返回</span>
      </div>
    </header>
  </section>
</template>

<script>
export default {
  props: {
    title: String
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~css/variable.styl'
.header
  height 50px
  line-height 50px
  background #1d1d1d
  background-image linear-gradient(#1d1d1d, #181818)
  color #ffffff
  position fixed
  top 0
  left 0
  right 0
  z-index 99
  h2
    font-size $font-size-t
    font-weight 700
    text-align center
  span
    display block
    height 32px
    line-height 32px
    position absolute
    top 50%
    left 6px
    transform translateY(-50%)
    font-size $font-size-d
    padding 0 10px
    background linear-gradient(#2a2a29, #151515)
    border-radius 4px
    box-shadow inset 0 1px 1px hsla(0, 0%, 100%, 0.1), inset 0 0 1px rgba(0, 0, 0, 0.5)
</style>
