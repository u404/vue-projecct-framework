/* eslint-disable */

const versionUrls = {
  '': 'http://api.com',
  test: 'http://test.api.com',
  beta: 'http://beta.api.com'
}

export default {
  baseURL: versionUrls[PACKAGE_VERSION]
}
