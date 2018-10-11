import ajaxBase from './ajaxBase'

const login = (data) => {
  return ajaxBase.post('/user/login', data)
}

const logout = (data) => {
  return ajaxBase.get('/user/logout', {
    params: data
  })
}
const status = (data) => {
  return ajaxBase.get('/user/status', {
    params: data
  })
}

const setDefaultAjaxParams = (data) => {
  ajaxBase.defaults.params = data
}

export default {
  login,
  logout,
  status,
  setDefaultAjaxParams
}
