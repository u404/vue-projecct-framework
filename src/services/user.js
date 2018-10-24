// import utils from '../assets/scripts/utils'
import { redirect, jsonp } from './phpService'

const wxLogin = (returnUrl) => {
  let url = returnUrl || location.href
  redirect('/ShareFilm/login?url=' + url)
}

const bindPhone = (data) => {
  return jsonp('/Coupon/bindMobile', data)
}

const getVerifImg = () => {
  return jsonp('/ShareFilm/verifCode')
}

const sendSMSCode = (data) => {
  return jsonp('/Coupon/sendCode', data)
}

const getSendSMSTimes = (data) => {
  return jsonp('/v2/ShareFilm/checkMobileNum', data)
}

const getBindingState = (data) => {
  return jsonp('/v2/ShareFilm/checkBindMobile', data)
}

const getJSSDKConfig = () => {
  return jsonp('/ShareFilm/getJssdkConf', {
    url: location.href
  })
}

export default {
  wxLogin,
  bindPhone,
  getVerifImg,
  sendSMSCode,
  getSendSMSTimes,
  getBindingState,

  getJSSDKConfig
}
