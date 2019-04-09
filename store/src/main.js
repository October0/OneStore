// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import Vuex from 'vuex'
import axios from 'axios'

import 'css/reset.styl'
import 'css/iconfont.css'
import {
  currency
} from './util/currency'
import {
  ModalMask
} from './util/mask'

Vue.filter('currency', currency)
Vue.prototype.$modalMask = ModalMask
fastclick.attach(document.body)
Vue.use(VueLazyload, {
  loading: require('./assets/logo.png')
})
Vue.use(Vuex)

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    nickName: '',
    cartCount: 0
  },
  mutations: {
    // 更新用户信息
    updateUserInfo (state, nickName) {
      state.nickName = nickName
    },
    updateCartCount (state, cartCount) {
      state.cartCount += cartCount
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  mounted () {
    this.getCartCount()
    this.checkLogin()
  },
  methods: {
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
        if (res.status === '0') {
          this.$store.commit('updateCartCount', res.result)
        }
      })
    }
  },
  components: {
    App
  },
  template: '<App/>'
})
