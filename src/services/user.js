// import utils from '../assets/scripts/utils'
import { redirect, jsonp } from './phpService'

const wxLogin = (returnUrl) => {
  let url = returnUrl || location.href
  redirect('/login?url=' + url)
}

const bindPhone = (data) => {
  return Promise.reject({code: 0, msg: '未绑定接口'})
}

const getVerifImg = () => {
  return Promise.reject({code: 0, msg: '未绑定接口'})
}

const sendSMSCode = (data) => {
  return Promise.reject({code: 0, msg: '未绑定接口'})
}

const getSendSMSTimes = (data) => {
  return Promise.reject({code: 0, msg: '未绑定接口'})
}

const getBindingState = (data) => {
  return Promise.reject({code: 0, msg: '未绑定接口'})
}

const getJSSDKConfig = () => {
  return Promise.reject({code: 0, msg: '未绑定接口'})
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
