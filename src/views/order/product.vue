<template>
  <div class="product">
    <ve-row class="product-row van-hairline--bottom">
      <ve-col :span="12">
        {{orderTypes[orderInfo.orderType]}}
      </ve-col>
      <ve-col :span="12" textAlign="right" v-if="orderInfo.itemCount">
        {{`${orderInfo.itemCount}种商品，共${orderInfo.saleCount}件`}}
      </ve-col>
      <ve-col :span="12" textAlign="right" v-else />
    </ve-row>
    <div class="product-info van-hairline--bottom" v-for="item in orderInfo.commerceItemVos" :key="item.id">
      <goods-card
        class="product-info-product"
        :title="item.productName"
        :price="item.salePrice"
        :thumb="item.productImg"
        :unit="item.unit"
        :id="item.productId"
      />
      <div class="product-info-price">
        <p class="product-info-price-title">{{`×${item.quantity}`}}</p>
        <p>￥{{priceTurn(item.quantity*item.salePrice)}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getProducts } from '@/api'
import GoodsCard from '@/components/goodsCard/GoodsCard.vue'
import { price } from '@/util/util'

@Component({
  components: {
    GoodsCard,
  }
})
export default class Detail extends Vue {
  orderInfo: any = {}
  orderTypes: any = {
    0: '普通商品',
    1: '干洗商品',
    2: '预售商品',
  }
  priceTurn = price
  mounted() {
    getProducts({}).then(res => {
      this.orderInfo = res.data
    })
  }
}
</script>

<style lang="scss">
  [v-cloak] {
    display: none;
  }
  .product{
    &-row{
      padding: 28px 20px;
      background-color: $--color-white;
    }
    &-info{
      display: flex;
      flex-flow: row;
      background-color: $--color-white;
      &-product{
        flex-grow: 1;
      }
      &-price{
        padding: 29px 20px 29px 0;
        text-align: right;
        width: 100px;
        font-size: 28px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: $--color-price;
        &-title{
          color: $--color-black;
          @include ellipsis(2)
        }
      }
    }
  }
</style>
