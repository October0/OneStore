import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Category from '@/views/category'
import Cart from '@/views/cart'
import User from '@/views/user'
import Goods from '@/views/goods'
import Pay from '@/views/pay'
import Address from '@/views/address'
import Login from '@/views/login'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      keepAlive: true
    }
  }, {
    path: '/category',
    name: 'Category',
    component: Category,
    meta: {
      keepAlive: true
    }
  }, {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: {
      keepAlive: false
    }
  }, {
    path: '/user',
    name: 'User',
    component: User,
    meta: {
      keepAlive: true
    }
  }, {
    path: '/goods/:id',
    name: 'Goods',
    component: Goods,
    meta: {
      keepAlive: false
    }
  }, {
    path: '/pay',
    name: 'Pay',
    component: Pay,
    meta: {
      keepAlive: false
    }
  }, {
    path: '/address',
    name: 'Address',
    component: Address,
    meta: {
      keepAlive: false
    }
  }, {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      keepAlive: false
    }
  }]
})
