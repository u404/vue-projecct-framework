import services from '../services'
const state = {
  code: '',
  openid: '',
  phone: ''
}
// 由于没有采用命名空间，以下getters/mutations/actions
// 依然是注册到了全局命名空间下，因此需要进行特别的命名，比如全部以user开头
const getters = {

}

const mutations = {
  userUpdate (state, data) {
    Object.prototype.hasOwnProperty.call(data, 'code') && (state.code = data.code)
    Object.prototype.hasOwnProperty.call(data, 'openid') && (state.openid = data.openid)
    Object.prototype.hasOwnProperty.call(data, 'phone') && (state.phone = data.phone)
  }
}

const actions = {
  loadUserInfo ({state, commit}, data) {
    if (state.phone) {
      return Promise.resolve()
    }
    if (data.isWeixin) {
      return services.user.getBindingState({code: state.code}).then(res => {
        commit('userUpdate', {
          openid: res.data.openid,
          phone: res.data.u_mobile
        })
        return Promise.resolve()
      }).catch(err => {
        console.log('getBindingStateError', err)
        if (+err.code === 300000402) { // 用户未绑定手机
          return Promise.resolve()
        }
        return Promise.reject(err) // 300000300 参数错误，300000401 获取信息失败
      })
    } else {
      return Promise.resolve()
    }
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
