import qs from 'qs'
import config from '@/version-config'
import utils from '../assets/scripts/utils'

export const redirect = (url) => {
  location.href = config.phpHost + url
}

export const jsonp = (url, data) => {
  let query = qs.stringify(data)
  query = query ? ('?' + query) : ''
  return new Promise((resolve, reject) => {
    console.log('jsonp', config.phpHost + url + query)
    utils.jsonp(config.phpHost + url + query).then(res => {
      if (+res.code === 0) {
        resolve(res)
      } else {
        reject(res)
      }
    }).catch(err => {
      console.log(err)
      reject({code: -1, msg: '请求出错'}) // eslint-disable-line
    })
  })
}

export default {}
