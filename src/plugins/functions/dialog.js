import utils from '@/assets/scripts/utils'

import BaseDialog from '@/components/Base/BaseDialog'
import BaseAlert from '@/components/Base/BaseAlert'
import BaseConfirm from '@/components/Base/BaseConfirm'

export default function (Vue) {
  const DialogConstructor = Vue.extend(BaseDialog)
  const AlertConstructor = Vue.extend(BaseAlert)
  const ConfirmConstructor = Vue.extend(BaseConfirm)

  const initInstance = (Constructor) => {
    return new Constructor({
      el: document.createElement('div')
    })
  }

  var _dialog = null
  var _alert = null
  var _confirm = null

  const base = function (options) {
    var opts = {
      ...base.defaults,
      ...options
    }
    if (!utils.isVNode(opts.content)) {
      return
    }
    if (!_dialog) {
      _dialog = initInstance(DialogConstructor)
    }
    _dialog.title = opts.title
    _dialog.x = opts.x
    _dialog.onClose = opts.onClose
    _dialog.$slots.default = [opts.content]
    if (utils.isVNode(opts.footer)) {
      _dialog.$slots.footer = [opts.footer]
    }
    document.body.appendChild(_dialog.$el)

    Vue.nextTick(() => {
      _dialog.visible = true
    })
  }
  base.defaults = {
    title: '',
    content: null,
    x: true,
    onClose: null,
    footer: null
  }
  base.close = function () {
    _dialog.close()
  }
  base.alert = function (options) {
    var opts = {
      ...base.alert.defaults,
      ...options
    }
    if (!_alert) {
      _alert = initInstance(AlertConstructor)
    }
    _alert.autoClose = opts.autoClose
    _alert.type = opts.type
    _alert.onSure = opts.onSure
    if (utils.isVNode(opts.msg)) {
      _alert.$slots.default = [opts.msg]
      _alert.msg = null
    } else {
      _alert.msg = opts.msg
      delete _alert.$slots.default
    }
    document.body.appendChild(_alert.$el)

    Vue.nextTick(() => {
      _alert.visible = true
    })
  }
  base.alert.defaults = {
    msg: '',
    onSure: null,
    type: 'info',
    autoClose: true
  }
  base.confirm = function (options) {
    var opts = {
      ...base.confirm.defaults,
      ...options
    }
    if (!_confirm) {
      _confirm = initInstance(ConfirmConstructor)
    }
    _confirm.autoClose = opts.autoClose
    _confirm.onSure = opts.onSure
    _confirm.onCancel = opts.onCancel
    if (utils.isVNode(opts.msg)) {
      _confirm.$slots.default = [opts.msg]
      _confirm.msg = null
    } else {
      _confirm.msg = opts.msg
      delete _confirm.$slots.default
    }
    document.body.appendChild(_confirm.$el)

    Vue.nextTick(() => {
      _confirm.visible = true
    })
  }
  base.confirm.defaults = {
    msg: '',
    onSure: null,
    type: 'info',
    autoClose: true
  }
  return base
}
