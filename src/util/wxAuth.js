import Http from '@/util/http'
import ls from '@/util/localStorage'
import store from '@/store'

const retryCount = 2
const retryKey = 'COCOWA_SALES_RETRY'
const http = new Http()

http.request(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 当构建环境为 test 的时候进行该配置
if (process.env.CONTEXT === 'test') {
  http.axios.defaults.withCredentials = true
}

function isWeiXin() {
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) === 'micromessenger') {
    return true
  } else {
    return false
  }
}

function wxAuth(callback) {
  http.get(process.env.FETCH_SESSION).then(res => {
    // 避免删除问题，进入 3s 之后清空 retry
    setTimeout(() => {
      ls.remove(retryKey)
    }, 3000)

    // 暂时放这里
    if (process.env.CONTEXT === 'test' && !isWeiXin()) {
      /* eslint-disable */
      res = {"code":200,"message":"\u64cd\u4f5c\u6210\u529f","data":{}}
      console.warn('在浏览器环境联调 token mock')
      /* eslint-enable */
    }

    if (res.code === 403) {
      const retry = ls.get(retryKey) || 1
      // 如果达到重试上限次数，则不再进行
      if (parseInt(retry, 10) >= retryCount) {
        return
      }
      ls.set(retryKey, retry + 1)

      // 跳转到微信 oauth
      store.dispatch('auth/clearAuth')
      window.location.href = `${process.env.OAUTH_REDIRECT_URL}?redirect=${window.location.href}`
    } else if (res.code === 200302) {
      ls.remove(retryKey)
      window.location.href = res.redirect
    } else {
      store.dispatch('auth/setUser', res.data)
      callback && callback()
      ls.remove(retryKey)
    }
  })
}

export default wxAuth
