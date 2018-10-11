module.exports = {
  port: 8080,
  proxyTable: {
    // 代理配置示例：
    '/api': {
      target: 'http://ksd.37degree.com',
      pathRewrite: {
        '^/api': ''
      },
      changeOrigin: true
    }
  },
  useMicroCache: true

}
