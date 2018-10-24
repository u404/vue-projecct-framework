// import jsFileDownload from 'js-file-download'
import javaService from './javaService'

const get = id => {
  return javaService.get('/xxx/xxx', {
    params: {
      id: id
    }
  })
}

const post = data => {
  return javaService.post('/xxxx/xxxx', data)
}
/**
 * data 为formdata
 */
const upload = (params, data) => {
  return javaService.request({
    method: 'post',
    url: '/xxxx/xxxxx',
    data: data,
    params: params,
    headers: {
      'Content-Type': undefined
    },
    transformRequest: [
      function (data, headers) {
        // 如果需要转换数据
        return data
      }
    ]
  })
}

export default {
  get,
  post,
  upload
}
