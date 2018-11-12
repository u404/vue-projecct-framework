import validate from './validate'
const install = function (Vue, options) {
  // Vue.directive('focus', {
  //     inserted(el){
  //         el.focus()
  //     }
  // })
  Vue.use(validate)
}

export default {
  install
}
