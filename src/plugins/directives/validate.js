const defaultValidators = {
  'require': {
    rule: /\S+/,
    errMsg: '请输入值'
  },
  'phone': {
    rule: /^1[^2460]\d{9}$/,
    errMsg: '手机号输入有误'
  }
}

// 监听器注册存储对象
// {
//   el: el,
//   validators: [stringOrValidator],
//   error: {
//     rule: '', //正则，函数
//     errmsg: ''
//   }
// }
const observers = []

// 校验函数
const doValidate = function (observer) {
  const testValidator = (validator) => {
    if (!validator.rule) return true
    let result = true
    if (validator.rule instanceof RegExp) { // 如果是正则，那么直接进行校验
      result = validator.rule.test(observer.el.value)
    }
    if (validator.rule instanceof Function) { // 目前只支持同步验证
      result = validator.rule(observer.el.value, observer.el)
    }
    if (result) {
      observer.error = null
      validate.setError(null)
    } else {
      observer.error = validator
      validate.setError({ el: observer.el, ...validator })
    }
    return result
  }
  return observer.validators.every(item => {
    let validator = item
    if (typeof item === 'string') { // 最简模式，直接传入字符串，则从默认验证器中，去规则和错误消息
      validator = { ...defaultValidators[item] }
    } else if (typeof item.rule === 'string') {
      validator = { ...defaultValidators[item.rule], errMsg: item.errMsg }
    }
    return testValidator(validator)
  })
}

// 注入vue中的对象
// error: { rule, errormsg, el }
const validate = {
  error: null,
  // 执行整个分组的测试
  test (group = 'default') {
    return observers.every(observer => {
      if (observer.group === group) {
        return doValidate(observer)
      }
      return true
    })
  },
  // 执行自定义元素的测试，根据元素的属性值和属性名（默认name）找到指定的元素
  exec (value, prop = 'name') {
    return observers.every(observer => {
      if (observer.el[prop] === value) {
        return doValidate(observer)
      }
      return true
    })
  },
  listeners: [],
  addListener (fn) {
    fn && this.listeners.push(fn)
  },
  removeListener (fn) {
    if (fn) {
      let i = this.listeners.findIndex(o => o === fn)
      if (i > -1) {
        this.listeners.splice(i, 1)
      }
    } else {
      this.listeners = []
    }
  },
  trigger () {
    this.listeners.forEach(fn => {
      fn(this.error)
    })
  },
  setError (error) {
    if (!this.error && !error) {
      return
    }
    this.error = error
    this.trigger()
  },
  clearError () {
    this.setError(null)
  }
}

const install = function (Vue, options) {
  Vue.prototype.$validate = validate

  const bindHandle = function (el, binding) {
    let observer = observers.find(o => o.el === el)
    if (!observer) {
      observer = {
        el: el,
        listeners: [],
        name: '',
        group: 'default',
        validators: [],
        clearOnFocus: true,
        error: null
      }
      observers.push(observer)
    }
    observer.group = binding.arg || 'default'
    observer.validators = binding.value
    observer.listeners.forEach(listener => {
      el.removeEventListener(listener.event, listener.callback)
    })
    observer.listeners = []
    // 可以使用事件名作为指令的修饰符，会将验证器注册到事件上，如：v-validate.blur
    Object.keys(binding.modifiers).forEach(modifier => {
      let listener = {
        event: modifier,
        callback: function (e) {
          observer && doValidate(observer)
        }
      }
      observer.listeners.push(listener)
      el.addEventListener(listener.event, listener.callback)
    })
    if (observer.clearOnFocus) {
      let listener = {
        event: 'focus',
        callback: function (e) {
          validate.clearError()
        }
      }
      observer.listeners.push(listener)
      el.addEventListener(listener.event, listener.callback)
    }
  }
  const unbindHandle = function (el, binding) {
    let i = observers.findIndex(o => o.el === el)
    let observer = observers[i]
    if (observer) {
      observer.listeners.forEach(listener => {
        el.removeEventListener(listener.event, listener.callback)
      })
      observers.splice(i, 1)
    }
  }

  Vue.directive('validate', {
    bind: bindHandle,
    update: bindHandle,
    unbind: unbindHandle
  })
}

export default {
  install
}
