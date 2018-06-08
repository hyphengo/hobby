/**
 * @file api.ts
 * @author lihuanji
 *
 * 接口请求文件
 */
import Http from './util/http'
import ls from '@/util/localStorage'
import { TOKEN } from '@/constants'

const http = new Http()

http.axios.defaults.baseURL = process.env.API_HOST

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

    if (code === '403' || code === '401' || code === undefined) {
      return Promise.reject(code)
    }

    return Promise.resolve(res)
  },
  err => {
    if (err.response) {
      const status = err.response.status
      if (status === 401) {
      }
    }
    return Promise.reject(err)
  }
)

// wx jssdk
export const wxjsconfig = (params) => http.get('/workwechat/jsconfig', params)

// 获取首页信息
export const getHome = () => http.get('/home/loadNewHome')

// 搜索所有二级分类
export const searchCategories = () => http.get('product/searchCategories')

// 根据二级分类查询商品列表
export const searchProductList = (params) => http.post('/product/searchProductList', params)

/**
 * 添加商品到购物车
 * @param id  => productId
 * @param num => 数量
 */
export const addItem = (id, num) => http.post('/cart/addItem', {productId: id, quantity: num} )

// 获取购物车商品总数
export const loadCartCount = () => http.get('/cart/loadCartCount')
