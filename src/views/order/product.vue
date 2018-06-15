<template>
  <div class="product">
    <ve-row v-if="orderInfo.itemCount" class="product-row van-hairline--bottom">
      <ve-col :span="12">
        {{orderTypes[orderInfo.orderType]}}
      </ve-col>
      <ve-col :span="12" textAlign="right">
        {{`${orderInfo.itemCount}种商品，共${orderInfo.saleCount}件`}}
      </ve-col>
    </ve-row>
    <ve-row v-else />
    <div class="product-bg van-hairline--bottom" v-for="item in orderList" :key="item.id">
      <div class="product-info">
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
          <p>&nbsp;</p>
          <p>￥{{priceTurn(item.quantity*item.salePrice)}}</p>
        </div>
      </div>
      <!--<div class="product-bg-favourable">
        <p></p>
        <div><span>优惠</span> 满6元返12%无门槛现金券</div>
      </div>-->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getProducts, getOrderDetail } from '@/api'
import GoodsCard from '@/components/goodsCard/GoodsCard.vue'
import { price } from '@/util/util'

@Component({
  components: {
    GoodsCard,
  }
})
export default class Detail extends Vue {
  orderInfo: any = {}
  orderList: any = []
  orderTypes: any = {
    0: '普通商品',
    1: '干洗商品',
    2: '预售商品',
  }
  priceTurn = price
  mounted() {
    if (!this.$route.query.id) {
      getProducts({}).then(res => {
        this.orderInfo = res.data
        this.orderList = res.data.commerceItemVos
      })
    } else {
      getOrderDetail(this.$route.query.id).then(res => {
        this.orderInfo = res.data
        this.orderList = res.data.items
      })
    }
  }
}
</script>

<style lang="scss">
  [v-cloak] {
    display: none;
  }
  .product{
    &-bg{
      background-color: $--color-white;
      &-favourable{
        display: flex;
        flex-flow: row;
        margin-top: -10px;
        padding-bottom: 29px;
        p{
          width: 160px;
        }
        div{
          flex-grow: 1;
          span{
            color: $--color-price;
            padding: 2px 5px;
            border: 1px solid $--color-price;
            border-radius: 2px;
          }
        }
      }
    }
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
        width: 200px;
        display: flex;
        flex-shrink: 0;
        flex-direction: column;
        justify-content: space-between;
        color: $--color-price;
        p{
          width: 160px;
          text-align: right;
          font-size: 28px;
        }
        &-title{
          display: block;
          color: $--color-black;
        }
      }
    }
  }
</style>
