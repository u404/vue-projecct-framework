import Vue from 'vue'
import versionConfig from '@/version-config'
import utils from '../assets/scripts/utils'
import Router from 'vue-router'
import services from '../services'
import store from '../store'
import Index from '@/views/Index/Index' // 命名chunk，内部注释是必须的
import ErrorView from '@/views/ErrorView'
import wxHelper from '../assets/scripts/wxHelper'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Error',
      name: 'Error',
      props: route => ({
        ...route.query
      }),
      component: ErrorView
    }
  ]
})

router.beforeEach((to, from, next) => {
  router.app.$loading()

  if (to.name === 'Error') {
    next()
    return
  }
  to.query.couponCode = '123456'
  if (!to.query.couponCode) {
    next({name: 'Error', query: { msg: '无效的红包编码' }})
    return
  } else {
    store.commit('couponCodeUpdate', to.query.couponCode)
  }
  // 非微信用户不允许访问
  // if (!utils.client.isWeixin) {
  //   !versionConfig.wxApiDisabled && services.user.wxLogin()
  // }

  const loadCouponInfoAndAutoRoute = () => {
    store.dispatch('loadCouponInfo').then(() => {
      next()
    }).catch(err => {
      next({name: 'Error', query: { msg: err.msg }})
    })
  }
  store.dispatch('loadUserInfo').then(() => {
    loadCouponInfoAndAutoRoute()
  }).catch(err => {
    console.log(err)
    next({name: 'Error', query: { msg: err.msg }})
  })
})

router.afterEach((to, from) => {
  setTimeout(() => {
    router.app.$loading.close()
  }, 1000)

  if (to.name === 'Error') return
  services.user.getJSSDKConfig().then(res => {
    wxHelper.config({
      debug: versionConfig.wxDebug,
      ...res.data,
      appId: res.data.appid || res.data.appId,
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone'
      ]
    })
  })
  wxHelper.ready(() => {
    const link = location.origin + location.pathname + '?couponCode=' + store.state.redPacket.couponCode
    wxHelper.onShare({
      title: store.state.redPacket.coupon.webchatMainHead,
      desc: store.state.redPacket.coupon.webchatSubHead,
      link: link.replace(/\/\w+\?/, '/?'),
      imgUrl: store.state.redPacket.coupon.icon
    })
  })
})

export default router
