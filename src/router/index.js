import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import AllCategories from '@/components/AllCategories/AllCategories'
import PerCenter from '@/components/PerCenter/PerCenter'
import FoodChoose from '@/components/FoodChoose/FoodChoose'
import BusDetail from '@/components/BusDetail/BusDetail'
import PreferentialPay from '@/components/PreferentialPay/PreferentialPay'
import MyCoupon from '@/components/MyCoupon/MyCoupon'
import AddressList from '@/components/AddressList/AddressList'
import MyCollection from '@/components/MyCollection/MyCollection'

Vue.use(Router)

export default new Router({
  linkActiveClass:"active",
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/AllCategories',
      name: 'AllCategories',
      component: AllCategories,
      meta: {
        title: '全部分类'
      }
    },
    {
      path: '/PerCenter',
      name: 'PerCenter',
      component: PerCenter,
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/FoodChoose',
      name: 'FoodChoose',
      component: FoodChoose,
      meta: {
        title: '配送'
      }
    },
    {
      path: '/BusDetail',
      name: 'BusDetail',
      component: BusDetail,
      meta: {
        title: '商家详情'
      }
    },
    {
      path: '/PreferentialPay',
      name: 'PreferentialPay',
      component: PreferentialPay,
      meta: {
        title: '优惠买单'
      }
    },
    {
      path: '/MyCoupon',
      name: 'MyCoupon',
      component: MyCoupon,
      meta: {
        title: '我的优惠券'
      }
    },
    {
      path: '/AddressList',
      name: 'AddressList',
      component: AddressList,
      meta: {
        title: '收货地址'
      }
    },
    {
      path: '/MyCollection',
      name: 'MyCollection',
      component: MyCollection,
      meta: {
        title: '我的收藏'
      }
    }
  ]
})
