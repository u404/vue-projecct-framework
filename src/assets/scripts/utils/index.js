import './extend'
const utils = {}
window && (window.utils = utils)
global && (global.utils = utils)

utils.localStorage = {
  set (key, value) {
    localStorage[key] = JSON.stringify(value || null)
  },
  get (key) {
    return JSON.parse(localStorage[key] || null)
  }
}

utils.sessionStorage = {
  set (key, value) {
    localStorage[key] = JSON.stringify(value || null)
  },
  get (key) {
    return JSON.parse(localStorage[key] || null)
  }
}
/**
 * cookie 操作方法，需要注意的是，一定不能设置多个path或domain不同而name相同的cookie，否则可能出现无法正确取值和无法销毁的问题
 */
utils.cookie = {
  set (key, value, domain = '', path = '/', expireDays = 7) {
    var val = escape(JSON.stringify(value || null))
    var expireDate = new Date()
    expireDate.setDate(expireDate.getDate() + expireDays)
    var expires = expireDate.toGMTString()
    document.cookie = `${key}=${val};expires=${expires};domain=${domain};path=${path}`
  },
  get (key) {
    let reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)')
    let arr = document.cookie.match(reg)
    if (arr) {
      return JSON.parse(unescape(arr[2]) || null)
    } else {
      return null
    }
  },
  remove (key, domain = '', path = '/') {
    this.set(key, null, domain, path, -1)
  }
}
/**
 * 安全设置cookie，完全避免出现多个不同domain或不同path的同名cookie，而引起的值获取混乱的问题
 */
utils.cookieSafe = {
  set (key, value, domain = '', path = '/', expireDays = 7) {
    expireDays > 0 && this.remove(key)
    var val = escape(
      JSON.stringify({
        domain,
        path,
        value
      })
    )
    var expireDate = new Date()
    expireDate.setDate(expireDate.getDate() + expireDays)
    var expires = expireDate.toGMTString()
    document.cookie = `${key}=${val};expires=${expires};domain=${domain};path=${path}`
  },
  __get (key) {
    let reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)')
    let arr = document.cookie.match(reg)
    if (arr) {
      return JSON.parse(unescape(arr[2]) || null)
    } else {
      return null
    }
  },
  get (key) {
    return this.__get(key).value
  },
  remove (key) {
    var cookie = this.__get(key)
    if (cookie) {
      this.set(key, null, cookie.domain, cookie.path, -1)
    }
  }
}

/**
 * 将search和hash字符串中的参数转化为字典对象，不传参数时，取location中的search和hash
 */
utils.urlParam = function (search, hash) {
  search = search || window.location.search
  hash = hash || window.location.hash
  var fn = function (str, reg) {
    if (str) {
      var data = {}
      str.replace(reg, function ($0, $1, $2, $3) {
        data[$1] = decodeURI($3)
      })
      return data
    }
  }
  return {
    search: fn(search, /([^?=&]+)(=([^&]*))?/g) || {},
    hash: fn(hash, /([^#=&]+)(=([^&]*))?/g) || {}
  }
}

utils.jsonp = function (url, charset, callbackKeyName = 'callback') {
  if (!window) return new Error('禁止非浏览器环境下使用jsonp')

  return new Promise((resolve, reject) => {
    let i = 0
    while (window[`__jsonpCallback${i}__`]) {
      i++
    }
    window[`__jsonpCallback${i}__`] = (data) => {
      console.log(url, data)
      resolve(data)
      window[`__jsonpCallback${i}__`] = null // 将执行完的callback清理掉
    }
    // 此处url的处理方案不太完善，追加&callback=xxx的位置有可能会在#xxx之后
    url += (/[^#]+\?/.test(url) ? '&' : '?') + callbackKeyName + `=__jsonpCallback${i}__`
    var script = document.createElement('script')
    script.src = url
    charset && (script.charset = charset)
    script.onload = function () {
      this.onload = this.onerror = null
      this.parentNode.removeChild(this)
      // callback && callback.call(this, true)
    }
    script.onerror = function (err) {
      this.onload = this.onerror = null
      this.parentNode.removeChild(this)
      // callback && callback.call(this, false)
      console.log('jsonp', err)

      reject(new Error('请求出错'))
    }
    document.head.appendChild(script)
  })
}

utils.client = {
  isAndroid: !!navigator.userAgent.match(/android/gi),
  isIos: !!navigator.userAgent.match(/iphone|ipod/gi),
  isIpad: !!navigator.userAgent.match(/ipad/gi),
  isIos9: !!navigator.userAgent.match(/OS 9/gi),
  isYx: !!navigator.userAgent.match(/MailMaster_Android/i),
  isNewsapp: !!navigator.userAgent.match(/newsapp/i),
  isWeixin: /MicroMessenger/gi.test(navigator.userAgent),
  isYixin: /yixin/gi.test(navigator.userAgent),
  isQQ: /qq/gi.test(navigator.userAgent)
}

utils.hasOwnProperty = function (obj, key) {
  return hasOwnProperty.call(obj, key)
}

utils.isVNode = function (node) {
  return (
    node !== null &&
    typeof node === 'object' &&
    utils.hasOwnProperty(node, 'componentOptions')
  )
}

utils.throttle = function (func, delay) {
  // 节流函数
  var timer = null
  var timerStartTime = null
  delay = delay || 500
  var nextDelay = delay
  var lastDelay = null
  var setTimer = function () {
    if (nextDelay) {
      console.log(nextDelay)
      timerStartTime = new Date()
      timer = setTimeout(setTimer, nextDelay)
      lastDelay = nextDelay
      nextDelay = null
    } else {
      console.log('clear')
      nextDelay = delay
      timer && (timer = clearTimeout(timer))
      timerStartTime = null // 这句无所谓
    }
  }

  return function () {
    if (timer) {
      nextDelay = delay - (timerStartTime - new Date() + lastDelay)
      console.log(delay)
      return
    }
    setTimer()
    func.apply(this, arguments)
  }
}

utils.uuid = function (len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  var uuid = []
  var i
  radix = radix || chars.length

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
    // rfc4122, version 4 form
    var r

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join('')
}

export default utils
