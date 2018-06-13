import Vue from 'vue'
import VueRouter from 'vue-router'
import Progress from 'nprogress'
import constantRoutes, { asyncRoutes } from './routes'
import store from '../store'
import { setWXTitle } from '../util/util'
import wxsdk from '@/wxsdk'
import { wxjsconfig, wxToken } from '@/api'
import isWeiXin from '@/util/isWeiXin'
import 'nprogress/nprogress.css'

let isV = true

Vue.use(VueRouter)

Progress.configure({ showSpinner: false })

const router = new VueRouter({
  mode: 'history',
  routes: constantRoutes,
  base: '/',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

/**
 * 判断是否是静态路由
 * @param path route.to.path
 */
// function isConstantRoute(path) {
//   return constantRoutes.find(item => item.path === path) !== undefined
// }

router.beforeEach((to, from, next) => {
  const isAuth = store.getters['auth/isAuth']
  const isBack = to.query.state && to.query.code

  // process start
  Progress.start()

  if (to && to.name) {
    setWXTitle(to.name)
  }

  if (isV) {
    router.addRoutes(asyncRoutes)
    isV = false
  }

  if (isAuth) {
    next()
  } else if (isBack) {
    wxToken({
      state: to.query.state,
      code: to.query.code
    }).then(res => {
      // 设置登录状态
      store.dispatch('auth/setUser', res.data.token)

      const hackto: any = { ...to, replace: true }

      next(hackto)
    })
  } else {

    store.dispatch('auth/setUser', '')

    // 本地调试 bad code TODO
    if (process.env.CONTEXT === 'test' && !isWeiXin()) {
      store.dispatch('auth/setUser', '806865a6-9e8b-4792-b20d-a1db3da152ad')
    }

    const hackto: any = { ...to, replace: true }

    next(hackto)
  }
})

const wxsdkAuth = () => {
  wxjsconfig({
    url: window.location.href,
  }).then(res => {
    const { data } = res

    wxsdk.created({
      jsapi_ticket: data.jsapi_ticket,
      appId: data.appid,
      timestamp: data.timestamp,
      nonceStr: data.noncestr,
      signature: data.signature,
      jsApiList: ['getLocation', 'chooseWXPay'],
    })
  })
}

router.afterEach((to, from) => {
  if (to.meta && to.meta.wxsdk) {
    setTimeout(wxsdkAuth, 300)
  }

  Progress.done()
})

export default router
