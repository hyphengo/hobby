import Layout from '@/components/layout/Layout.vue'
import NotFound from '@/components/layout/NotFound.vue'
import TabBar from '@/views/index/tabBar.vue'

const constantRoutes = [

]

const asyncRoutes = [
  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '首页',
        component: () => import('@/views/home/index.vue'),
      },
      {
        path: 'browse',
        name: '逛逛',
      }
    ]
  },
  {
    path: '/index',
    component: TabBar,
    children: [
      {
        path: 'home',
        name: '首页',
        component: () => import('@/views/index/home.vue'),
      },
      {
        path: 'browse',
        name: '逛逛',
        component: () => import('@/views/index/browse.vue'),
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'info',
        name: '我的',
        component: () => import('@/views/user/info.vue'),
      },
      {
        path: 'bind',
        name: '绑定手机号',
        component: () => import('@/views/user/bind.vue'),
      },
    ]
  },
  {
    path: '/404',
    name: '404',
    component: NotFound
  },
  {
    path: '*',
    redirect: '/404'
  }
]

export {
  asyncRoutes,
  constantRoutes,
}

export default constantRoutes
