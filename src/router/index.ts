import Vue from 'vue'
import VueRouter from 'vue-router'
import Progress from 'nprogress'
import constantRoutes, { asyncRoutes } from './routes'
import store from '../store'
import { setWXTitle } from '../util/util'
import wxAuth from '../util/wxAuth'
import wxsdk from '@/wxsdk'
import { wxjsconfig } from '@/api'
import 'nprogress/nprogress.css'

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

  // process start
  Progress.start()

  if (to && to.name) {
    setWXTitle(to.name)
  }

  if (isAuth) {
    // process done
    Progress.done()
    next()
  } else {
    // wx auth 中会进行其他验证
    wxAuth(() => {
      // success
      router.addRoutes(asyncRoutes)

      // process done
      // Progress.done()
      const hackto: any = { ...to, replace: true }

      next(hackto)
    })
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
      jsApiList: ['closeWindow'],
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
