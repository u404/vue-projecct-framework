/**
 * 项目配置文件
 */

const getJavaUrl = (suffix) => {
  return `http://localhost:8080`
}
const getPhpUrl = (suffix) => {
  return `http://localhost:8080`
}

const versionConfig = {
  '': {
    javaHost: getJavaUrl('-dev'),
    phpHost: getPhpUrl('dev'),
    mockdata: true,
    wxDebug: true,
    wxApiDisabled: true,
    localData: {
      phone: '18515882013', // 本地测试专用
      openid: '123456'
    }
  },
  test: {
    javaHost: getJavaUrl('-test1'),
    phpHost: getPhpUrl('test1'),
    wxDebug: false
  },
  pre: {
    javaHost: getJavaUrl('-pre'),
    phpHost: getPhpUrl('pre'),
    wxDebug: false
  },
  product: {
    javaHost: getJavaUrl(''),
    phpHost: getPhpUrl(''),
    wxDebug: false
  }
}

export default versionConfig[PACKAGE_VERSION] // eslint-disable-line
