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
        name: '可可蛙',
        meta: {
          wxsdk: true,
          share: true
        },
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
        path: 'coupon/:name', /* 传入list为列表，传入select为选择 */
        name: '优惠券',
        component: () => import('@/views/user/coupon.vue'),
      },
    ]
  },
  {
    path: '/address',
    component: Layout,
    children: [
      {
        path: 'list/:name', /* 传入list为列表，传入select为选择 */
        name: '地址管理',
        component: () => import('@/views/address/list.vue'),
      },
      {
        path: 'edit/:name', /* 传入list为地址列表传入，传入select为选择列表传入 */
        name: '编辑地址',
        component: () => import('@/views/address/editAddress.vue'),
      },
      {
        path: 'city', /* query传入type:list为列表页，select为选择页，main为首页 */
        name: '选择城市',
        component: () => import('@/views/address/city.vue'),
      },
      {
        path: 'community', /* query传入type:list为列表页，select为选择页，main为首页 */
        name: '选择小区',
        component: () => import('@/views/address/community.vue'),
      },
      {
        path: 'nullCommunity',
        name: '未选择小区',
        component: () => import('@/views/address/nullCommunity.vue'),
      },
    ]
  },
  {
    path: '/product',
    component: Layout,
    children: [
      {
        path: 'search',
        name: '搜索',
        component: () => import('@/views/product/search.vue'),
      },
      {
        path: 'detail/:id',
        name: '商品详情',
        meta: {
          wxsdk: true,
        },
        component: () => import('@/views/product/detail.vue'),
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'list',
        name: '我的订单',
        meta: {
          wxsdk: true
        },
        component: () => import('@/views/order/list.vue'),
      },
      {
        path: 'confirm',
        name: '确认订单',
        meta: {
          wxsdk: true
        },
        component: () => import('@/views/order/confirm.vue'),
      },
      {
        path: 'detail/:id',
        name: '订单详情',
        meta: {
          wxsdk: true
        },
        component: () => import('@/views/order/detail.vue'),
      },
      {
        path: 'product',
        name: '商品信息',
        component: () => import('@/views/order/product.vue'),
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: NotFound
  },
  {
    path: '*',
    redirect: '/index/home'
  }
]

export {
  asyncRoutes,
  constantRoutes,
}

export default constantRoutes
