// import jsFileDownload from 'js-file-download'
import ajaxBase from './ajaxBase'

const get = id => {
  return ajaxBase.get('/xxx/xxx', {
    params: {
      id: id
    }
  })
}

const post = data => {
  return ajaxBase.post('/xxxx/xxxx', data)
}
/**
 * data 为formdata
 */
const upload = (params, data) => {
  return ajaxBase.request({
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
