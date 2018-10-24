// import userService from '../services/user'
import services from '../services'
const state = {
  couponCode: '',
  coupon: null
}
// 由于没有采用命名空间，以下getters/mutations/actions
// 依然是注册到了全局命名空间下，因此需要进行特别的命名，比如全部以user开头
const getters = {

}

const mutations = {
  couponCodeUpdate (state, couponCode) {
    state.couponCode = couponCode
  },
  couponUpdate (state, data) {
    state.coupon = data
  }
}

const actions = {
  loadCouponInfo ({state, commit, rootState}, data) {
    if (state.coupon && state.coupon.couponCode === state.couponCode) {
      return Promise.resolve()
    }
    return services.redPacket.getCouponDetails({
      couponCode: state.couponCode,
      openId: rootState.user.openid || undefined
    }).then(res1 => {
      let coupon = res1.data
      if (!data.isWeixin) {
        let couponRecord = services.redPacket.getLocalCouponRecord({couponCode: state.couponCode})
        if (couponRecord) {
          coupon.isReceive = 1
          commit('userUpdate', {
            phone: couponRecord.phone
          })
        }
      }
      commit('couponUpdate', { ...coupon, couponCode: state.couponCode })
      return Promise.resolve()
    }).catch(err => {
      console.log(err)
      // return Promise.resolve() // 测试使用数据
      return Promise.reject(err)
    })
  }
}

const modules = {

}

export default {
  state,
  getters,
  mutations,
  actions,
  modules
}
