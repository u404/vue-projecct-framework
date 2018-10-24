// import jsFileDownload from 'js-file-download'
import utils from '@/assets/scripts/utils'
import javaService from './javaService'
import { jsonp } from './phpService'

const getCouponDetails = (params) => {
  return javaService.get('/coupon/details', {
    params
  })
}

// 直接通过code领票
const recieveCoupon = (data) => {
  return Promise.reject({code: 0, msg: '未绑定接口'})
}

// 直接通过手机号和验证码领票
const recieveCouponByPhone = (data) => {
  return Promise.reject({code: 0, msg: '未绑定接口'})
}

const setLocalCouponRecord = (data) => {
  let couponRecords = utils.localStorage.get('testData') || {}
  couponRecords[data.couponCode] = data
  utils.localStorage.set('testData', couponRecords)
}
const getLocalCouponRecord = (data) => {
  let couponRecords = utils.localStorage.get('testData') || {}
  return couponRecords[data.couponCode]
}

export default {
  getCouponDetails,
  recieveCoupon,
  recieveCouponByPhone,
  setLocalCouponRecord,
  getLocalCouponRecord
}
