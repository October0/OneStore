<template>
  <section>
    <nav-header :title="title"></nav-header>
    <section class="wrap">
      <div class="menu"
           ref="menu">
        <ul class="left">
          <li v-for="(item,index) in goodsList"
              :key="item.id"
              :class="{'current':currentIndex===index}"
              @click="selectMenu(index, $event)"
              ref="menuList">{{item.title}}</li>
        </ul>
      </div>
      <div class="goods"
           ref="goods">
        <ul class="right">
          <li v-for="item in goodsList"
              :key="item.id"
              ref="goodList">
            <img v-lazy="item.image">
            <p class="dec">{{item.title}}</p>
            <div v-for="product in item.GoodsList"
                 :key="product.productId"
                 class="product"
                 @click="goToGoods(product.productId)">
              <img v-lazy="product.productImage"
                   :alt="product.productName">
              <p class="title">{{product.productNick}}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <nav-footer></nav-footer>
  </section>
</template>

<script>
import NavHeader from '@/components/common/navHeader'
import NavFooter from '@/components/common/navFooter'
import BScroll from 'better-scroll'
import axios from 'axios'
export default {
  data () {
    return {
      listHeight: [],
      scrollY: 0,
      title: '分类',
      goodsList: []
    }
  },
  created () {
    this.getGoodsList()
  },
  computed: {
    currentIndex () {
      // console.log(this.listHeight.length)
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    }
  },
  methods: {
    getGoodsList () {
      axios.get('/goods/list').then((response) => {
        const res = response.data
        if (res.status === '0') {
          const goods = res.result.list[0]
          this.goodsList.push(goods.hotGoods, goods.goods, goods.circums)
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        } else {
          console.log('连接异常')
        }
      })
    },
    goToGoods (productId) {
      let path = '/goods/' + productId
      this.$router.push({
        path: path
      })
    },
    selectMenu (index, $event) {
      if (!event._constructed) { }
      let goodList = this.$refs.goodList
      let el = goodList[index]
      this.goodsScroll.scrollToElement(el, 300)
    },
    _initScroll () {
      this.meunScroll = new BScroll(this.$refs.menu, {
        click: true
      })
      this.goodsScroll = new BScroll(this.$refs.goods, {
        probeType: 3,
        click: true
      })
      this.goodsScroll.on('scroll', (pos) => {
        if (pos.y <= 0) {
          this.scrollY = Math.abs(Math.round(pos.y))
        }
      })
    },
    _calculateHeight () {
      let goodList = this.$refs.goodList
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < this.goodsList.length; i++) {
        let item = goodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
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
  display flex
  position fixed
  top 50px
  bottom 54px
  left 0
  overflow hidden
  .menu
    flex 0 0 80px
    height 100%
    border-right 1px solid #ebebeb
    .left
      li
        width 100%
        height 46px
        line-height 46px
        font-size $font-size-h2
        color $color-text-d
        text-align center
      .current
        color #000
        font-size $font-size-t
        font-weight 700
        background linear-gradient(270deg, hsla(0, 0%, 100%, 0.05), rgba(0, 0, 0, 0.05))
  .goods
    flex 1
    padding 12.5px 12.5px 0
    .right
      padding-top 12.5px
      img
        display block
        width 100%
        height 79px
        padding-bottom 10px
      .dec
        font-size $font-size-t
        color $color-text-t
        text-align center
        height 30px
        line-height 30px
        padding-bottom 10px
      .product
        display inline-block
        width 33%
        height 130px
        img
          display block
          width 100%
          height auto
        .title
          font-size $font-size-d
          text-align center
          margin-bottom 20px
      &:last-child
        padding-bottom 260px
</style>
