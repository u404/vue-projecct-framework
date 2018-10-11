import utils from '@/assets/scripts/utils'
import userService from '../services/user'
const state = {
  token: '',
  username: '',
  project: 1
}
// 由于没有采用命名空间，以下getters/mutations/actions
// 依然是注册到了全局命名空间下，因此需要进行特别的命名，比如全部以user开头
const getters = {

}

const mutations = {
  userUpdate (state, data) {
    Object.prototype.hasOwnProperty.call(data, 'token') && (state.token = data.token)
    Object.prototype.hasOwnProperty.call(data, 'username') && (state.username = data.username)
  }
}

const actions = {
  userLogin (context, userPara) {
    return userService.login(userPara).then((res) => {
      context.commit('userUpdate', res.data)
      utils.cookie.set('user', JSON.stringify(res.data))
      userService.setDefaultAjaxParams(context.state) // 用户登录成功的时，将所有ajax请求都附带上默认参数token等
    })
  },
  // 如果state中有token，那么视为登录状态
  // 如果cookie中有user，那么检查服务器端user是否在线，如果在线，那么设置到state中，并视为登录状态
  userCheckLogin (context) {
    if (!context.state.token) {
      let user = JSON.parse(utils.cookie.get('user'))
      if (!user) {
        return Promise.reject(new Error('用户未登录'))
      }
      return userService.status({ ...user,
        project: 1
      }).then(() => {
        context.commit('userUpdate', user)
        userService.setDefaultAjaxParams(context.state) // 用户登录成功的时，将所有ajax请求都附带上默认参数token等
      })
    }
    userService.setDefaultAjaxParams(context.state) // 用户登录成功的时，将所有ajax请求都附带上默认参数token等
    return Promise.resolve()
  },
  userLogout (context) {
    return userService.logout(context.state).then((res) => {
      context.commit('userUpdate', {
        token: '',
        name: ''
      })
      utils.cookie.remove('user')
      userService.setDefaultAjaxParams({}) // 用户退出时，取消所有的ajax默认参数
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
