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
    <address-card v-if="order.shippingGroup && order.shippingGroup.shippingMethod === '1'" :info="order.shippingGroup" />
    <date-card v-if="order.shippingGroup && order.shippingGroup.shippingMethod === '1'" :info="order.shippingGroup" />
    <invite-card v-model="phone" v-if="order.shippingGroup && order.shippingGroup.shippingMethod === '2'" :info="order.shippingGroup" />
    <product-info
      class="confirm-product"
      :order="order"
    />
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
import { SubmitBar } from 'vant'
import ProductInfo from '@/components/productInfo/index.vue'
import AddressCard from '@/components/address-card/index.vue'
import DateCard from '@/components/date-card/index.vue'
import InviteCard from '@/components/invite-card/index.vue'
import { loadOrder, applyShippingMethod } from '@/api'
import { price } from '@/util/util'

@Component({
  components: {
    ProductInfo,
    SubmitBar,
    AddressCard,
    DateCard,
    InviteCard,
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

  handlePay() {
    // console.log(this.phone)
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
