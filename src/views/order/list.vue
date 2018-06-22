<template>
  <div
    class="list"
  >
    <van-tabs v-model="active" @click="handleTabChange">
      <van-tab title="全部" />
      <van-tab title="待付款" />
      <van-tab title="待接单" />
      <van-tab title="已完成" />
    </van-tabs>
    <van-list
      class="order-list"
      v-model="pageConfig.loading"
      :finished="pageConfig.finished"
      @load="pullRefreshAction"
      :immediate-check="false"
    >
      <div
        class="order-list-item"
        v-if="list.items.length > 0"
        v-for="(item) in list.items"
        :key="item.id"
      >
        <ve-row class="order-list-title">
          <ve-col :span="20">
            {{item.shopName}}
          </ve-col>
          <ve-col :span="4" textAlign="right">
            {{item.stateDetail}}
          </ve-col>
        </ve-row>
        <div class="order-list-product" @click="() => $router.push(`/order/detail/${item.id}`)">
          <div
            v-for="(product, index) in item.items"
            :key="product.productId"
            v-if="index < 5"
            class="order-list-product-item"
          >
            <img :src="product.productImg || require('assets/images/product.png')" />
          </div>
          <van-icon name="arrow order-list-product-arrow" />
        </div>
        <ve-row class="order-list-title">
          <ve-col :span="18">
            {{`${item.itemCount}种商品，共${item.saleCount}件`}}
          </ve-col>
          <ve-col :span="6" textAlign="right">
            合计: <span class="price">￥{{price(item.totalPrice)}}</span>
          </ve-col>
        </ve-row>
        <ve-row class="order-list-title van-hairline--top" align="center">
          <ve-col :span="4">
            <van-tag plain type="danger" v-if="item.productType === '2'">预售</van-tag>
          </ve-col>
          <ve-col :span="20" textAlign="right">
            <a
              v-if="item.state !== 10"
              class="order-list-btn van-button van-button--default van-button--normal"
              href="tel:‭02886210761‬"
            >
              联系店铺
            </a>
            <van-button @click="handleCancel(item)" v-if="item.state === 10 || item.state === 30" class="order-list-btn" type="default">取消</van-button>
            <van-button @click="handlePay(item)" v-if="item.state === 10" class="order-list-btn custom" type="default">买单</van-button>
            <van-button @click="handleAgain(item.id)" v-if="item.state === 30 || item.state === 60 || item.state === 70" class="order-list-btn custom" type="default">再买</van-button>
          </ve-col>
        </ve-row>
      </div>
      <p
        class="order-list-tip"
        v-if="!pageConfig.loading && !pageConfig.empty && pageConfig.finished"
      >
        别看了，真的没有了~
      </p>
      <div
        v-if="!pageConfig.loading && pageConfig.empty"
        class="order-list-empty"
      >
        <van-icon name="shop" />
        没订单，应该去买点什么吧~
        <van-button type="default" @click="() => $router.push('/index/home')">去看看</van-button>
    </div>
    </van-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Inject } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import { Tab, Tabs, List, Tag } from 'vant'
import HelperPullRefresh from '@/helper/HelperPullRefresh'
import { cancelOrder, buyItemsAgain, prePay } from '@/api'
import { price } from '@/util/util'
import wxs from '@/wxsdk'

@Component({
  components: {
    'van-tab': Tab,
    'van-tabs': Tabs,
    'van-list': List,
    'van-tag': Tag
  }
})
export default class OrderList extends Vue {
  @Action('order/getOrderList') getOrderList: any
  @Action('order/clearOrderList') clearOrderList: any
  @Getter('order/list') list: any

  @Inject('reload') reload: Function

  active: number = 0

  pageConfig: any = {
    others: {
      query: ''
    }
  }

  price = price

  @HelperPullRefresh('getOrderList', 'list')
  pullRefreshAction(page: number = 1) {

  }

  handleTabChange(index) {
    switch (index) {
      case 0:
        this.$router.replace('/order/list#all')
        break
      case 1:
        this.$router.replace('/order/list#wait')
        break
      case 2:
        this.$router.replace('/order/list#pick')
        break
      case 3:
        this.$router.replace('/order/list#done')
        break
    }
    this.clearOrderList()
  }

  @Watch('$route.hash')
  changeHash(val) {
    this.search(val)
  }

  search(hash) {
    switch (hash) {
      case '#all':
        this.pageConfig.others.query = {
          state: '0'
        }
        this.active = 0
        break
      case '#wait':
        this.pageConfig.others.query = {
          state: '10'
        }
        this.active = 1
        break
      case '#pick':
        this.pageConfig.others.query = {
          state: '30'
        }
        this.active = 2
        break
      case '#done':
        this.pageConfig.others.query = {
          state: '60'
        }
        this.active = 3
        break
      default:
        this.pageConfig.others.query = {
          state: '0'
        }
        this.active = 0
        break
    }
    this.pullRefreshAction(0)
  }

  handlePay(order) {
    // 微信支付
    this.$toast.loading({
      duration: 0,
      forbidClick: true,
    })
    prePay({
      payType: 'weixingzh',
      body: '可可蛙-零售商品',
      outOrderNo: order.id,
      totalFee: order.totalPrice
    }).then(data => {
      wxs.pay({
        timestamp: data.data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: data.data.noncestr, // 支付签名随机串，不长于 32 位
        package: data.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
        signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: data.data.sign, // 支付签名
        complete: (r) => {
          // 支付成功后的回调函数
          if (order.orderType === '2') {
            this.reload()
          } else {
            this.$router.push(`/order/detail/${order.id}`)
          }
          this.$toast.clear()
        }
      })
    }).catch(() => {
      this.$toast.clear()
    })
  }

  handleAgain(orderId) {
    buyItemsAgain({
      id: orderId
    }).then(res => {
      this.$router.push('/index/cart?show=hidden')
    })
  }

  handleCancel(order) {
    let tipO: any = {
      message: '不再考虑一下嘛，确定要取消订单？',
      cancelButtonText: '考虑考虑'
    }
    if (order.state === 30) {
      tipO = {
        title: '确定取消订单吗?',
        message: '退款将原路退回至您的支付账户中',
        cancelButtonText: '考虑考虑'
      }
    }
    this.$dialog.confirm(tipO).then(() => {
      cancelOrder({orderId: order.id}).then(res => {
        this.reload()
      })
    }).catch(() => {
      // 不写要报错，很尴尬
    })
  }

  mounted() {
    this.search(this.$route.hash)
  }
}
</script>

<style lang="scss">
.list{
  overflow: hidden;

  .van-tab--active{
    color: $--color-base;
  }

  .van-tabs__line{
    background-color: $--color-base;
  }
}
.order-list{
  height: 100%;
  overflow-y: auto;
  padding-bottom: 100px;

  &-item{
    margin-top: 20px;
  }

  &-title{
    background-color: $--color-white;
    padding: 20px 30px;
  }

  &-tip{
    text-align: center;
    color: #999;
    padding: 20px 0;
  }

  &-empty{
    display: flex;
    flex-direction: column;
    padding: 50px 180px;
    align-items: center;
    font-size: 28px;
    margin-top: 50px;

    .van-icon{
      font-size: 48px;
      margin-bottom: 30px;
    }

    .van-button{
      background-color: $--color-base;
      color: $--color-white;
      margin-top: 30px;
      height: 70px;
      line-height: 70px;
    }
  }

  &-product{
    display: flex;
    align-items: center;
    padding: 36px 40px;
    background-color: #F7F7FA;
    position: relative;

    &-arrow{
      position: absolute;
      right: 20px;
    }

    &-item{
      margin-right: 30px;

      :last-child{
        margin-right: 0;
      }
    }

    img{
      height: 100px;
      width: 100px;
    }
  }

  &-btn{
    height: 70px;
    line-height: 70px;
    font-size: 24px;

    &.custom{
      background-color: $--color-base;
      // border: 1px solid $--color-base;
      color: $--color-white;
    }
  }
}
</style>
