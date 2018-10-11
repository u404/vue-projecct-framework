import utils from '@/assets/scripts/utils'

import BaseTips from '@/components/Base/BaseTips'

export default function (Vue) {
  const TipsConstructor = Vue.extend(BaseTips)

  const initInstance = (Constructor) => {
    return new Constructor({
      el: document.createElement('div')
    })
  }

  var _tips = null

  const base = function (options) {
    var opts = {
      ...base.defaults,
      ...options
    }

    if (!_tips) {
      _tips = initInstance(TipsConstructor)
    }
    _tips.delay = opts.delay
    _tips.onClose = opts.onClose
    if (utils.isVNode(opts.msg)) {
      _tips.$slots.default = [opts.msg]
      _tips.msg = null
    } else {
      _tips.msg = opts.msg
      delete _tips.$slots.default
    }
    document.body.appendChild(_tips.$el)

    Vue.nextTick(() => {
      _tips.visible = true
    })
  }
  base.defaults = {
    msg: '',
    onClose: null,
    delay: 3000
  }

  base.close = function () {
    _tips.close()
  }
  return base
}
