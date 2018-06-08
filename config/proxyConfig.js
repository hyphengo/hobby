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
        target: 'https://test-ec-api.cocowa.com.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
