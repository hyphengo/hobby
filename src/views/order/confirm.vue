<template>
  <div
    class="confirm"
  >
    <div class="confirm-type">
      <van-button type="default" class="confirm-type-btn active">配送到家</van-button>
      <van-button type="default" class="confirm-type-btn">到店自取</van-button>
    </div>
    <product-info
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
import { loadOrder } from '@/api'
import { price } from '@/util/util'

@Component({
  components: {
    ProductInfo,
    SubmitBar
  }
})
export default class Confirm extends Vue {
  order: any = {}
  payLoding: boolean = false

  price = price

  handlePay() {

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
