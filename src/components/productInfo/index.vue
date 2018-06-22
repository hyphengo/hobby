<template>
  <div
    class="productInfo"
    v-if="order.orderType && !isDetail"
  >
    <ve-row class="productInfo-row">
      <ve-col :span="12">
        {{order.orderTypeDesc}}
      </ve-col>
      <ve-col :span="12" textAlign="right">
        {{`${order.itemCount}种商品，共${order.saleCount}件`}}
      </ve-col>
    </ve-row>
    <div class="productInfo-list"  @click="() => $router.push('/order/product')">
      <div
        v-for="(item, index) in order.commerceItems"
        :key="index"
        v-if="index < 5"
        class="productInfo-list-item"
      >
        <img :src="item.productImg || require('assets/images/product.png')" />
      </div>
      <van-icon name="arrow productInfo-list-arrow" />
    </div>
    <ve-row class="productInfo-row van-hairline--bottom">
      <ve-col :span="12">
        商品金额
      </ve-col>
      <ve-col :span="12" textAlign="right" class="productInfo-grey">
        {{`￥${price(order.orderPriceInfo.rawSubtotal)}`}}
      </ve-col>
    </ve-row>
    <ve-row @click="handleToSelectCoupon" align="center" class="productInfo-row van-hairline--bottom">
      <ve-col :span="11">
        优惠券
      </ve-col>
      <ve-col :span="12" textAlign="right" class="productInfo-price">
        {{`-￥${price(order.orderPriceInfo.couponDiscountAmount)}`}}
      </ve-col>
      <van-icon name="arrow" />
    </ve-row>
    <ve-row class="productInfo-row van-hairline--bottom">
      <ve-col :span="12">
        配送费
      </ve-col>
      <ve-col :span="12" textAlign="right" class="productInfo-grey">
        {{`￥${price(order.orderPriceInfo.shipping)}`}}
      </ve-col>
    </ve-row>
    <div class="productInfo-combined">
      合计: <span class="productInfo-combined-price">{{`￥${price(order.orderPriceInfo.total)}`}}</span>
    </div>
  </div>
  <div
    class="productInfo"
    v-else
  >
    <ve-row class="productInfo-row" v-if="order.orderType">
      <ve-col :span="12">
        {{orderTypeText}}
      </ve-col>
      <ve-col :span="12" textAlign="right" v-if="order.itemCount">
        {{`${order.itemCount}种商品，共${order.saleCount}件`}}
      </ve-col>
    </ve-row>
    <div class="productInfo-list" @click="() => $router.push(`/order/product?id=${order.id}`)">
      <div
        v-for="(item, index) in order.items"
        :key="index"
        v-if="index < 5"
        class="productInfo-list-item"
      >
        <img :src="item.productImg || require('assets/images/product.png')" />
      </div>
      <van-icon name="arrow productInfo-list-arrow" />
    </div>
    <ve-row class="productInfo-row van-hairline--bottom">
      <ve-col :span="12">
        商品金额
      </ve-col>
      <ve-col :span="12" textAlign="right" class="productInfo-grey">
        {{`￥${price(order.rawSubtotal)}`}}
      </ve-col>
    </ve-row>
    <ve-row align="center" class="productInfo-row van-hairline--bottom">
      <ve-col :span="12">
        优惠券
      </ve-col>
      <ve-col :span="12" textAlign="right" class="productInfo-price">
        {{`-￥${price(order.couponDiscountAmount)}`}}
      </ve-col>
    </ve-row>
    <ve-row class="productInfo-row van-hairline--bottom">
      <ve-col :span="12">
        配送费
      </ve-col>
      <ve-col :span="12" textAlign="right" class="productInfo-grey">
        {{`￥${price(order.shipping)}`}}
      </ve-col>
    </ve-row>
    <div class="productInfo-combined">
      合计: <span class="productInfo-combined-price">{{`￥${price(order.total)}`}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { price } from '@/util/util'

@Component
export default class ProductInfo extends Vue {
  @Prop() order: any
  @Prop() isDetail: boolean

  price = price


  handleToSelectCoupon() {
    this.$router.push('/my/coupon/select')
  }

  get orderTypeText() {
    let type = '普通商品'

    if (this.order.orderType === '1') {
      type = '干洗商品'
    } else if (this.order.orderType === '2') {
      type = '预售商品'
    }

    return type
  }
}
</script>

<style lang="scss">
.productInfo{
  &-row{
    padding: 28px 20px;
    background-color: $--color-white;
  }
  &-grey{
    color: #888888;
  }
  &-price{
    color: $--color-price;
  }
  &-combined{
    padding: 28px 20px 40px;
    background-color: $--color-white;
    text-align: right;
    font-size: 28px;

    &-price{
      color: $--color-price;
    }
  }
  &-list{
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
}
</style>
