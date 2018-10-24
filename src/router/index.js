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
  // 检查store中是否有openid，如果有，那么直接展示页面（已绑定手机状态），否则执行2
  // 检查params中是否有code，如果有，那么执行5
  // 检查是否是微信客户端，如果不是，直接展示页面（未绑定手机状态），否则执行4
  // 跳转到php端拉取用户授权页面，最终会跳回本页面，并携带url参数code，执行5
  // 使用code尝试拉取用户手机号和openid，如果code无效，那么跳转到3，如果未拉取到用户相关信息，那么展示页面（未绑定手机状态），成功，那么设置store中的对应值，并且展示页面（已绑定手机状态）
  // // utils.client.isWeixin

  // 由于目前只要求在微信下使用，对于非微信的访问，直接跳到拉授权的页面，让微信报错即可
  router.app.$loading()

  if (to.name === 'Error') {
    next()
    return
  }

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
    store.dispatch('loadCouponInfo', {isWeixin: utils.client.isWeixin}).then(() => {
      // 对于状态非正常的红包（非0可领取，非8已领完），全都跳领取页，进行报错弹窗
      if (+store.state.redPacket.coupon.activityStatus !== 0 && +store.state.redPacket.coupon.activityStatus !== 8) {
        if (to.name !== 'Index') {
          next({name: 'Index', query: to.query})
          return
        }
      } else { // 对于状态正常的红包
        if (store.state.redPacket.coupon.isReceive) { // 如果是已被领取
          if (to.name !== 'Success') {
            next({name: 'Success', query: to.query})
            return
          }
        } else { // 如果是未被领取
          if (to.name === 'Success') {
            next({name: 'Index', query: to.query})
            return
          }
        }
      }
      next()
    }).catch(err => {
      next({name: 'Error', query: { msg: err.msg }})
    })
  }

  // 如果是微信客户端
  // 那么先检查store中的code是否与查询参数中的code匹配，如果匹配那么不走微信授权了
  // 否则通过微信重新授权，并且把code存入store中
  if (utils.client.isWeixin) {
    let code = to.query.code
    if (!store.state.user.code || store.state.user.code !== code) { // 如果store里面没有code或者store中的code与参数中的code不匹配
      if (!code) {
        !versionConfig.wxApiDisabled && services.user.wxLogin()
        return
      }

      let localConfig = versionConfig.localData || {}

      store.commit('userUpdate', {
        code: code,
        phone: '',
        openid: '',
        ...localConfig
      })
    }
  }

  // 如果是微信客户端，那么从接口查用户信息，如果非微信客户端，那么尝试从缓存读取用户信息
  store.dispatch('loadUserInfo', {isWeixin: utils.client.isWeixin}).then(() => {
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
