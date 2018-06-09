import Layout from '@/components/layout/Layout.vue'
import NotFound from '@/components/layout/NotFound.vue'
import TabBar from '@/views/index/tabBar.vue'

const constantRoutes = [

]

const asyncRoutes = [
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
      },
      {
        path: 'cart',
        name: '购物车',
        component: () => import('@/views/index/cart.vue'),
      },
      {
        path: 'my',
        name: '我的',
        component: () => import('@/views/index/my.vue'),
      },
    ]
  },
  {
    path: '/my',
    component: Layout,
    children: [
      {
        path: 'bind',
        name: '绑定手机号',
        component: () => import('@/views/user/bind.vue'),
      },
      {
        path: 'address',
        name: '地址管理',
        component: () => import('@/views/user/address.vue'),
      },
      {
        path: 'edit',
        name: '编辑地址',
        component: () => import('@/views/user/editAddress.vue'),
      },
      {
        path: 'coupon',
        name: '优惠卷',
        component: () => import('@/views/user/coupon.vue'),
      },
      {
        path: 'city',
        name: '选择城市',
        component: () => import('@/views/user/city.vue'),
      },
      {
        path: 'community',
        name: '选择小区',
        component: () => import('@/views/user/community.vue'),
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
