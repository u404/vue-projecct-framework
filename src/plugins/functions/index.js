import common from '@/assets/scripts/common'
import config from '@/assets/scripts/config'
import axios from 'axios'
import services from '@/services'
import dialog from './dialog'
import tips from './tips'
import loading from './loading'

const install = function (Vue, options) {
  Vue.prototype.$axios = axios
  Vue.prototype.$services = services

  Vue.prototype.$dialog = dialog(Vue)
  Vue.prototype.$tips = tips(Vue)
  Vue.prototype.$loading = loading(Vue)

  Vue.prototype.$config = config // config是全局参数对象，不是一个方法
  Vue.prototype.$common = common // 本项目专用公共函数库
}

export default {
  install
}
