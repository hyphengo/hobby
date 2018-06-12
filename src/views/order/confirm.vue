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
        自送门店
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
      v-model="phone"
      v-if="order.shippingGroup && order.shippingGroup.shippingMethod === '2'"
      :info="order.shippingGroup"
      :orderType="order.orderType"
    />
    <product-info
      class="confirm-product"
      :order="order"
    />
    <div v-if="order.returnCouponAmount" class="confirm-returnCoupon">
      <van-tag plain type="danger">满6元返12%</van-tag>
      <span>订单完成预计可获得无门槛券 <span class="price">{{order.returnCouponAmount}}</span>元</span>

    </div>
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
// import { Getter, Action } from 'vuex-class'
import { SubmitBar, Tag } from 'vant'
import ProductInfo from '@/components/productInfo/index.vue'
import AddressCard from '@/components/address-card/index.vue'
import DateCard from '@/components/date-card/index.vue'
import InviteCard from '@/components/invite-card/index.vue'
import { loadOrder, applyShippingMethod, applyShippingDate, commitOrder, applyDeliveryCode } from '@/api'
import { price } from '@/util/util'

@Component({
  components: {
    ProductInfo,
    SubmitBar,
    AddressCard,
    DateCard,
    InviteCard,
    'van-tag': Tag
  }
})
export default class Confirm extends Vue {
  order: any = {}
  payLoding: boolean = false
  phone: string = ''

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

    commitOrder({}).then(res => {
      if (res.code === 200) {
        // TODO 微信支付
        this.$router.replace(`/order/detail/${res.data.id}`)
      }

      this.payLoding = false
    })
  }

  mounted() {
    loadOrder({initFlag: 0}).then(res => {
      this.order = res.data
    })
  }
}
</script>

<style lang="scss">
.confirm{
  height: 100%;
  overflow: scroll;
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
  }
}
</style>
