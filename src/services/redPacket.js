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
  return jsonp('/Coupon/submit', data)
}

// 直接通过手机号和验证码领票
const recieveCouponByPhone = (data) => {
  if (data.code) {
    data.type = 1
    return jsonp('/Coupon/bindMobile', data)
  } else {
    data.type = 2
    return jsonp('/Coupon/otherSubmit', data)
  }
}

const setLocalCouponRecord = (data) => {
  let couponRecords = utils.localStorage.get('couponRecords') || {}
  couponRecords[data.couponCode] = data
  utils.localStorage.set('couponRecords', couponRecords)
}
const getLocalCouponRecord = (data) => {
  let couponRecords = utils.localStorage.get('couponRecords') || {}
  return couponRecords[data.couponCode]
}

export default {
  getCouponDetails,
  recieveCoupon,
  recieveCouponByPhone,
  setLocalCouponRecord,
  getLocalCouponRecord
}
