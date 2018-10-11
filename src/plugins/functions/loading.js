import BaseLoading from '@/components/Base/BaseLoading'

export default function (Vue) {
  const LoadingConstructor = Vue.extend(BaseLoading)

  const initInstance = Constructor => {
    return new Constructor({
      el: document.createElement('div')
    })
  }

  var _loading = null

  const base = function (options) {
    var opts = {
      ...base.defaults,
      ...options
    }
    if (!_loading) {
      _loading = initInstance(LoadingConstructor)
    }
    _loading.title = opts.title
    _loading.msg = opts.msg
    document.body.appendChild(_loading.$el)

    Vue.nextTick(() => {
      _loading.visible = true
    })
  }
  base.defaults = {
    title: '',
    msg: ''
  }
  base.close = function () {
    _loading.close()
  }
  return base
}
