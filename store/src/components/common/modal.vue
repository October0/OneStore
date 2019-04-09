<template>
  <section>
    <div class="modal">
      <span>{{tips}}</span>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    tips: String
  }
}
</script>

<style lang="stylus" scoped>
.modal
  position fixed
  left 50%
  bottom 100px
  z-index 999
</style>
