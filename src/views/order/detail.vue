<template>
  <div class="detail">
    <pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="detail-text" v-if="detail.state === 60">
        <div class="detail-text-title">已完成</div>
        <div v-if="detail.orderType === '1'">好服务值得再享受一次</div>
        <div v-else>好东西值得再买一次</div>
      </div>
      <div class="detail-text" v-else-if="detail.state === 70">
        <div class="detail-text-title">已关闭</div>
        <div v-if="detail.autoCancelOrder">订单未付款，超时自动取消</div>
        <div v-else>您已取消订单</div>
      </div>
      <div class="detail-status" v-else>
        <van-steps :active="active">
          <van-step
            v-for="(data, index) in steplist"
            :key="index"
          >{{data.name}}</van-step>
        </van-steps>
        <!-- 普通商品 -->
        <div class="detail-tips" v-if="detail.orderType === '0'">
          <span v-if="detail.state === 10 && leftTime > 0">未付款，{{leftTime}}分钟后将自动取消</span>
          <span v-if="detail.state === 20 || detail.state === 30">稍等，我蛙很快会接单的~</span>
          <span v-if="detail.state === 40 && detail.shippingMethod === '1'">商家正在为您准备商品</span>
          <span v-if="detail.state === 40 && detail.shippingMethod === '2'">随时可以去店铺拿货哦~</span>
          <span v-if="detail.state === 50 && detail.shippingMethod === '1'">等待商品送上门来吧~</span>
        </div>
        <!-- 干洗商品 -->
        <!-- shippingMethod：1:送货上门  2：到店自提 -->
        <div class="detail-tips" v-if="detail.orderType === '1'">
          <span v-if=" detail.state === 10 && leftTime > 0">未付款，{{leftTime}}分钟后将自动取消</span>
          <span v-if="detail.state === 30 || detail.state === 20">稍等，商家很快会接单的~</span>
          <span v-if="(detail.state === 40 || detail.state === 100) && detail.shippingMethod === '2'">约好了，把衣物送到店铺来吧~</span>
          <span v-if="(detail.state === 40 || detail.state === 100) && detail.shippingMethod === '1'">准备好衣物，我们的人会准时找上门来的~</span>
          <span v-if="detail.state === 110">我们很快会将衣物送至干洗中心~</span>
          <span v-if="detail.state === 120">衣物已送至干洗中心，正在洗涤养护中~</span>
          <span v-if="detail.state === 130">衣物洗好啦，辛苦您来店铺取一下哈~</span>
        </div>
        <!-- 预售商品 -->
        <div class="detail-tips" v-if="detail.orderType === '2'">
          <span v-if=" detail.state === 10 && leftTime > 0">未付款，{{leftTime}}分钟后将自动取消</span>
          <span v-if="detail.state === 30 || detail.state === 40">美好事物值得等待，我蛙会按时出去采购回来的~</span>
          <span v-if="detail.state === 130">商品已采购到店，随时可以去店铺拿货哦~</span>
        </div>
      </div>
      <div class="detail-item">
        <address-card
          v-if="detail.shippingMethod === '1'"
          :info="detail"
          :disabled="true"
        />
        <date-card
          v-if="detail.shippingMethod === '1'"
          :info="detail"
          :disabled="true"
        />
        <invite-card
          v-if="detail.shippingMethod === '2'"
          :info="detail"
          :orderType="detail.orderType"
          :disabled="true"
        />
      </div>
      <div class="detail-item">
        <product-info
          class="detail-product"
          :order="detail"
          :isDetail="true"
        />
      </div>
      <div class="detail-item">
        <ve-row class="productInfo-row van-hairline--bottom">
          <ve-col :span="12">
            实付金额
          </ve-col>
          <ve-col :span="12" textAlign="right" class="productInfo-grey price-color">
            {{`￥${price(detail.total)}`}}
          </ve-col>
        </ve-row>
        <ve-row class="productInfo-row van-hairline--bottom">
          <ve-col :span="12">
            支付方式
          </ve-col>
          <ve-col :span="12" textAlign="right" class="productInfo-grey">
            {{payType}}
          </ve-col>
        </ve-row>
      </div>
      <div class="detail-item">
        <ve-row class="productInfo-row van-hairline--bottom">
          <ve-col :span="12">
            下单时间
          </ve-col>
          <ve-col :span="12" textAlign="right" class="productInfo-grey">
            {{createDate}}
          </ve-col>
        </ve-row>
        <ve-row class="productInfo-row van-hairline--bottom">
          <ve-col :span="12">
            订单号
          </ve-col>
          <ve-col :span="12" textAlign="right" class="productInfo-grey">
            {{detail.id}}
          </ve-col>
        </ve-row>
      </div>
      <memo-card :note="detail.note" :disabled="true" />
    </pull-refresh>
    <div class="detail-btn">
      <a
        v-if="detail.state !== 10"
        class="btn van-button van-button--default van-button--normal"
        href="tel:‭02886210761‬"
      >
        联系店铺
      </a>
      <van-button
        type="default"
        class="btn"
        @click="handleCancel"
        v-if="detail.state === 10 || detail.state === 30"
      >
        取消
      </van-button>
      <van-button
        type="default"
        :class="['btn', 'active']"
        @click="handlePay"
        v-if="detail.state === 10"
      >
        买单
      </van-button>
      <van-button
        type="default"
        :class="['btn', 'active']"
        @click="handleAgain"
        v-if="detail.state === 30 || detail.state === 60 || detail.state === 70"
      >
        再买
      </van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject } from 'vue-property-decorator'
import { SubmitBar, Step, Steps, PullRefresh } from 'vant'
import ProductInfo from '@/components/productInfo/index.vue'
import AddressCard from '@/components/address-card/index.vue'
import DateCard from '@/components/date-card/index.vue'
import InviteCard from '@/components/invite-card/index.vue'
import MemoCard from '@/components/memo-card/index.vue'
import { getOrderDetail, cancelOrder, buyItemsAgain, prePay } from '@/api'
import { price } from '@/util/util'
import moment from 'moment'
import wxs from '@/wxsdk'

@Component({
  components: {
    ProductInfo,
    SubmitBar,
    AddressCard,
    DateCard,
    InviteCard,
    MemoCard,
    'VanStep': Step,
    'VanSteps': Steps,
    PullRefresh
  }
})
export default class Confirm extends Vue {
  price = price
  detail: any = {}
  id: string = ''
  active: number = 0
  steplist: any = []
  leftTime: number
  payType: string = '微信支付'
  isLoading: boolean = false

  @Inject('reload') reload: any

  onRefresh() {
    this.init()
  }

  mounted() {
    this.init()
  }

  init() {
    this.id = this.$route.params.id

    getOrderDetail(this.id).then(res => {
      this.detail = res.data

      // 未付款订单自动关闭的剩余时间
      if (this.detail.state === 10 && this.detail.leftNoPayTime) {
        this.leftTime = Math.round(this.detail.leftNoPayTime / 1000 / 60)
      }

      let payTypeList = this.detail.paymentMethods[0]
      if (payTypeList === 'alipay') {
        this.payType = '支付宝支付'
      }

      // shippingMethod：1:送货上门  2：到店自提
      if (this.detail.orderType === '0' && this.detail.shippingMethod === '1') {
        this.steplist = [
          {name: '下单', status: 10},
          {name: '付款', status: 30},
          {name: '接单', status: 40},
          {name: '备货', status: 50},
          {name: '配送'}
        ]
      } else if (this.detail.orderType === '0' && this.detail.shippingMethod === '2') {
        this.steplist = [
          {name: '下单', status: 10},
          {name: '付款', status: 30},
          {name: '接单', status: 40},
          {name: '自取'}
        ]
      } else if (this.detail.orderType === '1') {
        this.steplist = [
          {name: '下单', status: 10},
          {name: '付款', status: 30},
          {name: '接单', status: 40},
          {name: '收衣', status: 110},
          {name: '送洗', status: 120},
          {name: '干洗', status: 130},
          {name: '取衣'},
        ]
      } else if (this.detail.orderType === '2') {
        this.steplist = [
          {name: '下单', status: 10},
          {name: '付款', status: 30},
          {name: '采购', status: 130},
          {name: '自取'}
        ]
      }

      if (this.detail.state === 20) {
        this.active = 1
      } else if (this.detail.state === 100) {
        this.active = 2
      } else if (this.detail.state === 40 && this.detail.orderType === '2') {
        this.active = 1
      }

      this.steplist.map((ele, index) => {
        if (ele.status === this.detail.state) {
          this.active = index
        }
      })

      this.isLoading = false
    })
  }

  get createDate() {
    return moment(this.detail.creationTime).format('YYYY-MM-DD HH:mm:ss')
  }

  loading() {
    this.$toast.loading({
      duration: 0,
      forbidClick: true,
    })
  }

  handlePay() {
    this.loading()

    prePay({
      payType: 'weixingzh',
      body: '可可蛙-零售商品',
      outOrderNo: this.detail.id,
      totalFee: this.detail.total
    }).then(data => {
      wxs.pay({
        timestamp: data.data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: data.data.noncestr, // 支付签名随机串，不长于 32 位
        package: data.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
        signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: data.data.sign, // 支付签名
        complete: (r) => {
          // 支付成功后的回调函数
          if (this.detail.orderType === '2') {
            this.$router.replace('/order/list#all')
          } else {
            this.reload()
          }
          this.$toast.clear()
        }
      })
    }).catch(() => {
      this.$toast.clear()
    })
  }

  handleAgain() {
    buyItemsAgain({
      id: this.id
    }).then(res => {
      this.$router.push('/index/cart?show=hidden')
    })
  }

  handleCancel() {
    this.$dialog.confirm({
      message: '不再考虑一下嘛，确定取消订单',
      cancelButtonText: '考虑考虑'
    }).then(() => {
      this.loading()

      cancelOrder({
        orderId: this.id
      }).then(res => {
        this.reload()
        this.$toast.clear()
      })
    }).catch(() => {
      // on cancel
      this.$dialog.close()
    })
  }
}
</script>

<style lang="scss">
.detail {
  overflow: auto;
  padding-bottom: 140px;

  &-text {
    text-align: center;
    font-size: 28px;
    height: 176px;
    color: #888;
    padding: 40px 0;

    &-title {
      color: #000;
      font-size: 40px;
      margin-bottom: 10px;
    }
  }

  &-status {
    height: 176px;
    background: #fff;
    .van-step--horizontal {
      padding-left: 4px;
    }
  }

  &-tips {
    text-align: center;
  }

  &-item {
    margin-top: 20px;

    .price-color {
      color: $--color-price;
    }
  }

  &-btn {
    text-align: right;
    padding: 20px;
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;

    .btn {
      height: 70px;
      line-height: 70px;
      text-align: center;
      background: none;
      border: 1px solid #999;
      margin-left: 20px;
    }
    .active {
      color: $--color-base;
      border: 1px solid $--color-base;
    }
  }
}
</style>
