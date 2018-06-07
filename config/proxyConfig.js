/**
 * 设置代理
 */
module.exports = {
  // 本地 mock
  dev: {
    proxyTable: {
    }
  },

  // 联调
  test: {
    proxyTable: {
      '/api': {
        target: 'https://xxx.xx.xx',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
