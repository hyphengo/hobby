/**
 * @file api.ts
 * @author lihuanji
 *
 * 接口请求文件
 */
import Http from './util/http'
import ls from '@/util/localStorage'
import { TOKEN } from '@/constants'
import { Toast } from 'vant'
import store from '@/store'

const http = new Http()

let host = process.env.API_HOST

if (process.env.NODE_ENV === 'production') {
  host = '/api'
}

http.axios.defaults.baseURL = host

http.request(
  config => {
    const token = ls.get(TOKEN)

    if (token) {
      config.headers['token'] = token
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * http response 拦截器
 */
http.response(
  res => {
    const code = res.data.code

    if (code !== 200) {
      Toast(res.data.message)

      return Promise.reject(res.data)
    }

    return Promise.resolve(res)
  },
  err => {
    if (err.response) {
      const status = err.response.status
      if (status === 401) {
        store.dispatch('auth/clearAuth')
        wxRedirect({
          backUrl: window.location.href
        }).then((result) => {
          window.location.href = result.data
        })
      }
    }
    return Promise.reject(err)
  }
)

// wx jssdk
export const wxjsconfig = (params) => http.get('/jsSdkConfig', params)

// wx 登录 获取重定向url
export const wxRedirect = (params) => http.get('/redirectUrl', params)

// wx 登录 获取token
export const wxToken = (params) => http.post('/wxlogin', params)

/**
 * 获取订单预支付信息，用以客户端调起第三方支付页面进行支付
 *
 * @param params payType 支付类型（"weixin": "微信小程序支付"；"weixinapp": "微信APP支付"；"weixingzh": "微信公众号支付"；"alipay": "支付宝APP支付"）
 * @param params body 商品描述 (最多128个字)
 * @param params outOrderNo 订单号
 * @param params totalFee 总金额(元)
 */
export const prePay = (params) => http.post('/pay/prePay', params)

// 定位位置,获取门店信息
export const initLocation = (params) => http.post('/home/initLocation', params)

// 选择指定的社区
export const selectCommunity = (params) => http.post('/home/selectCommunity', params)

// 获取首页信息
export const getHome = () => http.get('/home/loadNewHome')

// 搜索所有二级分类
export const searchCategories = () => http.get('/product/searchCategories')

// 根据一级分类搜索商品二级分类列表
export const searchSecondCategories = (params) => http.get('/product/searchSecondCategories', params)

// 根据二级分类查询商品列表
export const searchProductList = (params) => http.post('/product/searchProductList', params)

/**
 * 添加商品到购物车
 * @param id  => productId
 * @param num => 数量
 */
export const addItem = (id, num) => http.post('/cart/addItem', {productId: id, quantity: num})

// 获取购物车商品总数
export const loadCartCount = () => http.get('/cart/loadCartCount')

// 获取所有城市
export const getCities = () => http.get('/home/getCities')

// 获取所选城市下的小区
export const getCommunities = (params) => http.get('/home/getCommunities', params)

// 获取用户的优惠卷
export const getCoupons = () => http.get('/coupon/getCoupons')

// 获取地址列表
export const getAddress = () => http.get('/user/getAddress')

// 新增地址
export const addAddress = (params) => http.post('/user/addAddress', params)

// 修改地址信息
export const updateAddress = (params) => http.post('/user/updateAddress', params)

// 删除地址
export const removeAddress = (params) => http.post('/user/removeAddress', params)

// 加载个人中心主页
export const loadUserCenter = () => http.get('/user/loadUserCenter')

// 获取用户可使用优惠卷
export const getAvailableCoupons = () => http.get('/checkout/getAvailableCoupons')

// 应用优惠卷到订单上
export const applyCoupon = (params) => http.post('/checkout/applyCoupon', params)

// 应用多张优惠卷到订单上
export const applyCoupons = (params) => http.post('/checkout/applyCoupons', params)

// 设置配送地址
export const applyShippingAddress = (params) => http.post('/checkout/applyShippingAddress', params)

// 获取手机验证码
export const sendVeriCode = (params) => http.post('/sendVeriCode', params)

// 绑定手机号
export const bindingMobile = (params) => http.post('/bindingMobile', params)

/**
 * 获取商品详情
 * @param id 商品id productId
 */
export const getProductDetail = (id) => http.get('/product/getProductDetail', {id})

// 加载购物车
export const loadCart = () => http.get('/cart/loadCart')

// 选择或者不选择购物车中的商品
export const selectItem = (params) => http.post('/cart/selectItem', params)

// 全选或者全不选购物车中商品分组的商品
export const selectGroup = (params) => http.post('/cart/selectGroup', params)

// 删除购物车中商品
export const removeItem = (params) => http.post('/cart/removeItem', params)

// 修改购物车中的商品数量
export const updateItem = (params) => http.post('/cart/updateItem', params)

// 购物车提交订单
export const moveToCheckout = (params) => http.post('/cart/moveToCheckout', params)

// 购物车中选择某一类型商品去结算。当购物车中存在同时结算多个类型商品时调用
export const selectToCheckout = (params) => http.post('/cart/selectToCheckout', params)

// 加载确认订单信息（商品，送货地址）
export const loadOrder = (params) => http.post('/checkout/loadOrder', params)

// 删除购物车中无效的商品
export const removeInvalidItem = (params) => http.post('/cart/removeInvalidItem', params)

// 选中的配送方式应用到订单上
export const applyShippingMethod = (params) => http.post('/checkout/applyShippingMethod', params)

// 订单商品信息
export const getProducts = (params) => http.get('/checkout/getProducts', params)

// 送货上门时,应用选择的设置配送时间
export const applyShippingDate = (params) => http.post('/checkout/applyShippingDate', params)

// 获取订单详情
export const getOrderDetail = (id) => http.get('/order/getOrderDetail', {id})

// 到店自提时,设置取货码
export const applyDeliveryCode = (params) => http.post('/checkout/applyDeliveryCode', params)

// 订单备注
export const applyNote = params => http.post('/checkout/applyNote', params)

// 提交订单
export const commitOrder = (params) => http.post('/checkout/commitOrder', params)

// 订单中心根据订单状态查询订单列表 订单状态: 0:全部; 10:待付款; 30:待接单; 60:已完成
export const queryOrderList = (params) => http.post('/order/queryOrderList', params)

// 取消未支付的订单
export const cancelOrder = (params) => http.post('/order/cancel', params)

// 再次购买已完成、已取消的订单中的商品
export const buyItemsAgain = (params) => http.post('/order/buyItemsAgain', params)
