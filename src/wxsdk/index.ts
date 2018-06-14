import wx from 'weixin-js-sdk'
/* eslint-disable */

const defaultParams = {
  debug: false,
  appId: '', // 必填，企业号的唯一标识，此处填写企业号corpid
  timestamp: '', // 必填，生成签名的时间戳
  nonceStr: '', // 必填，生成签名的随机串
  signature: '', // 必填，签名，见附录1
  jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
}

export default {
  created(data) {
    const params = Object.assign({}, defaultParams, data)

    wx.config(params)

    wx.ready(() => {
      // console.log('ready: ', 2)
    })

    wx.error((res) => {
      // console.log('error: ', res)
    })
  },

  closeWindow() {
    wx.closeWindow()
  },

  pay(params) {
    wx.chooseWXPay(params)
  }
}
