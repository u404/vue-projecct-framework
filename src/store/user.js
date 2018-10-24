// import services from '../services'
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
    return Promise.resolve()
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
