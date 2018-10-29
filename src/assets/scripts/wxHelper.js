/* eslint-disable */

const config = (options = {}) => {
  wx && wx.config({
    debug: false,
    appId: '',
    nonceStr: '',
    signature: '',
    jsApiList: [],
    ...options
  })
}

const ready = (callback) => {
  wx && callback && wx.ready(callback)
}

const error = (callback) => {
  wx && callback && wx.error(callback)
}

const onShare = (options) => {
  if (!wx) return
  const defaults = {
    title: '', // 分享标题
    desc: '', // 分享描述
    link: '', // 分享链接，对于微信朋友和朋友圈分享，该链接域名必须与当前企业的可信域名一致
    imgUrl: '', // 分享图标
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () {
      // 用户确认分享后执行的回调函数
    },
    cancel: function () {
      // 用户取消分享后执行的回调函数
    }
  }
  let opts = {
    ...defaults,
    ...options
  }

  wx.onMenuShareTimeline({...opts}) // 朋友圈
  wx.onMenuShareAppMessage({...opts}) // 好友
  wx.onMenuShareQQ({...opts}) // QQ
  wx.onMenuShareWeibo({...opts}) // 微博
  wx.onMenuShareQZone({...opts}) // QQ空间
}

const closeWindow = () => {
  wx && wx.closeWindow && wx.closeWindow()
  wx && WeixinJSBridge.invoke('closeWindow', {}, function (res) {
  })
}

const closeOnBack = (on = true) => {
  if(!wx) return
  if (on) {
    var state = {
      title: 'forward',
      url: '#forward'
    }
    window.history.pushState(state, state.title, state.url)

    window.onpopstate = function () {
      closeWindow()
    }
  } else {
    window.onpopstate = null
  }
}

const shareForbid = () => {
  function onBridgeReady () {
    WeixinJSBridge.call('hideOptionMenu')
  }

  if (typeof WeixinJSBridge === 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
    }
  } else {
    onBridgeReady()
  }
}

export default {
  config,
  ready,
  error,
  onShare,
  shareForbid,
  closeOnBack,
  closeWindow
}
