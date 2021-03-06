<template>
  <div
    class="confirm"
  >
    <div class="confirm-type">
      <van-button
        @click="handleShippingMethod('1')"
        v-if="order.orderType === '1'"
        type="default"
        :class="[
          'confirm-type-btn',
          {
            'active': order.shippingGroup.shippingMethod === '1'
          }
        ]"
      >
        上门取件
      </van-button>
      <van-button
        @click="handleShippingMethod('2')"
        v-if="order.orderType === '1'"
        type="default"
        :class="[
          'confirm-type-btn',
          {
            'active': order.shippingGroup.shippingMethod === '2'
          }
        ]"
      >
        自送到店
      </van-button>
      <van-button
        @click="handleShippingMethod('1')"
        v-if="order.orderType === '0'"
        type="default"
        :class="[
          'confirm-type-btn',
          {
            'active': order.shippingGroup.shippingMethod === '1'
          }
        ]"
      >
        配送到家
      </van-button>
      <van-button
        @click="handleShippingMethod('2')"
        v-if="order.orderType === '2' || order.orderType === '0'"
        type="default"
        :class="[
          'confirm-type-btn',
          {
            'active': order.shippingGroup.shippingMethod === '2'
          }
        ]"
      >
        到店自取
      </van-button>
    </div>
    <address-card
      v-if="order.shippingGroup && order.shippingGroup.shippingMethod === '1'"
      :info="order.shippingGroup"
    />
    <date-card
      v-if="order.shippingGroup && order.shippingGroup.shippingMethod === '1'"
      :info="order.shippingGroup"
      @click="handleShippingDate"
    />
    <invite-card
      :value="phone"
      v-if="order.shippingGroup && order.shippingGroup.shippingMethod === '2'"
      :info="order.shippingGroup"
      :orderType="order.orderType"
    />
    <product-info
      class="confirm-product"
      :order="order"
    />
    <div v-if="order.returnCouponAmount" class="confirm-returnCoupon">
      <van-tag plain type="danger">{{order.activityName}}</van-tag>
      <span>订单完成预计可获得现金券 <span class="price">{{order.returnCouponAmount}}</span>元</span>
    </div>
    <memo-card :value="note" />
    <div class="confirm-bar" v-if="order.orderPriceInfo">
      <p>付款: <span class="price">￥{{price(order.orderPriceInfo.total)}}</span></p>
      <van-button
        class="confirm-btn"
        bottom-action
        @click="handlePay"
        :loading="payLoding"
      >
        提交
      </van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { SubmitBar, Tag } from 'vant'
import ProductInfo from '@/components/productInfo/index.vue'
import AddressCard from '@/components/address-card/index.vue'
import DateCard from '@/components/date-card/index.vue'
import InviteCard from '@/components/invite-card/index.vue'
import MemoCard from '@/components/memo-card/index.vue'
import { loadOrder, applyShippingMethod, applyShippingDate, commitOrder, applyDeliveryCode, applyNote, prePay } from '@/api'
import { price } from '@/util/util'
import wxs from '@/wxsdk'

@Component({
  components: {
    ProductInfo,
    SubmitBar,
    AddressCard,
    DateCard,
    InviteCard,
    MemoCard,
    'van-tag': Tag
  }
})
export default class Confirm extends Vue {
  @Action('confirm/setInit') setInit: Function
  @Getter('confirm/init') init: boolean

  @Getter('confirm/phone') phone: any
  @Getter('confirm/memo') note: any
  @Action('confirm/clear') clear: any

  order: any = {}
  payLoding: boolean = false
  // availableCoupons: number = 0

  price = price

  handleShippingMethod(val) {
    applyShippingMethod({
      shippingMethod: val
    }).then(res => {
      this.order = res.data
    })
  }

  handleShippingDate(val) {
    applyShippingDate({
      shipOnDate: val.dateTime,
      shippingRange: val.chosseDate
    }).then(res => {
      this.order = res.data
    })
  }

  async handlePay() {
    this.payLoding = true

    if (this.order.shippingGroup.shippingMethod === '2') {
      if (this.phone.length !== 11) {
        this.$toast('请填写正确的11位手机号码')
        this.payLoding = false
        return
      }

      await applyDeliveryCode({
        deliveryCode: this.phone
      })
    }

    if (this.note.length > 30) {
      this.$toast('备注最多30字')
      this.payLoding = false
      return
    }

    await applyNote({
      note: this.note
    }).catch(() => {
      this.payLoding = false
    })

    commitOrder({}).then(res => {
      if (res.code === 200) {
        // 微信支付
        prePay({
          payType: 'weixingzh',
          body: '可可蛙-零售商品',
          outOrderNo: res.data.id,
          totalFee: res.data.total
        }).then(data => {
          wxs.pay({
            timestamp: data.data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: data.data.noncestr, // 支付签名随机串，不长于 32 位
            package: data.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: data.data.sign, // 支付签名
            success: (r) => {
              // 支付成功后的回调函数
              if (this.order.orderType === '2') {
                this.$router.replace('/order/list#all')
              } else {
                this.$router.replace(`/order/detail/${res.data.id}`)
              }
              this.setInit(false)
              this.payLoding = false
            },
            cancel: () => {
              this.$router.replace(`/order/detail/${res.data.id}`)

              this.setInit(false)
              this.payLoding = false
            },
            complete: () => {
              this.clear()
            }
          })
        }).catch(() => {
          this.$router.replace(`/order/detail/${res.data.id}`)

          this.setInit(false)
          this.payLoding = false
        })
      }
    }).catch(() => {
      this.payLoding = false
    })
  }

  mounted() {
    const options = {
      initFlag: this.init ? 0 : 1
    }
    loadOrder(options).then(res => {
      this.order = res.data
      this.setInit(true)
    }).catch(res => {
      setTimeout(() => {
        this.$router.back()
      }, 3000)
    })

    // getAvailableCoupons().then(res => {
    //   this.availableCoupons = res.data.length
    // })
  }
}
</script>

<style lang="scss">
.confirm{
  padding-bottom: 110px;

  &-product{
    margin-top: 16px;
  }

  &-type{
    height: 124px;
    padding: 30px 190px;
    display: flex;
    justify-content: space-between;

    &-btn{
      width: 150px;
      height: 60px;
      line-height: 60px;
      font-size: 26px;
      padding: 0 20px;
      border: 0;

      &:active{
        background-color: #c6c6c6;
      }

      &.active{
        background-color: $--color-base;
        color: $--color-white;
      }

      &::before{
        display: none;
      }
    }
  }

  &-returnCoupon{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 28px 20px;
    background-color: $--color-white;
    margin-top: 20px;
  }

  &-bar{
    height: 98px;
    background-color: $--color-white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    padding-left: 22px;
    font-size: 28px;
    bottom: 0;
    width: 100%;

    p{
      display: flex;
      align-items: center;
    }

    .price{
      font-size: 38px;
      margin-left: 20px;
    }
  }

  &-btn{
    width: 230px;
    background-color: $--color-base;

    > .van-loading {
      width: 60px !important;
      height: 60px !important;
    }

    .van-loading--black circle{
      stroke: #fff !important;
    }
  }
}
</style>
