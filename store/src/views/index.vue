<template>
  <div>
    <nav-header :title="title"
                class="header"></nav-header>
    <nav-slider></nav-slider>
    <hot-goods :hotGoodsList="hotGoodsList"></hot-goods>
    <mobile :goodsList="goodsList"></mobile>
    <circum :circumList="circumList"></circum>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from '@/components/common/navHeader'
import NavFooter from '@/components/common/navFooter'
import NavSlider from '@/components/index/slider'
import HotGoods from '@/components/index/hotGoods'
import Mobile from '@/components/index/mobile'
import Circum from '@/components/index/circum'
import axios from 'axios'
export default {
  data () {
    return {
      title: '首页',
      hotGoodsList: [],
      goodsList: [],
      circumList: []
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      axios.get('/goods/list').then((response) => {
        const res = response.data
        if (res.status === '0') {
          const goods = res.result.list[0]
          this.hotGoodsList = goods.hotGoods.GoodsList
          this.goodsList = goods.goods.GoodsList
          this.circumList = goods.circums.GoodsList
        } else {
          console.log('连接异常')
        }
      })
    }
  },
  components: {
    NavHeader,
    NavFooter,
    NavSlider,
    HotGoods,
    Mobile,
    Circum
  }
}
</script>
