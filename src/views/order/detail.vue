<template>
  <div class="detail">
    <ve-row class="detail-row van-hairline--bottom">
      <ve-col :span="12">
        {{orderTypes[orderInfo.orderType]}}
      </ve-col>
      <ve-col :span="12" textAlign="right">
        {{`${orderInfo.itemCount}种商品，共${orderInfo.saleCount}件`}}
      </ve-col>
    </ve-row>
    <div class="detail-info van-hairline--bottom" v-for="item in products" :key="item.id">
      <goods-card
        class="detail-info-product"
        :title="item.productName"
        :price="item.salePrice"
        :thumb="item.productImg"
        :unit="item.unit"
        :id="item.productId"
      />
      <div class="detail-info-price">
        <p class="detail-info-price-title">{{`×${item.quantity}`}}</p>
        <p>{{`￥${item.quantity*item.salePrice}`}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getProducts } from '@/api'
import GoodsCard from '@/components/goodsCard/GoodsCard.vue'

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
  products: any = []
  mounted() {
    getProducts({}).then(res => {
      this.orderInfo = res.data
      this.products = this.products.concat(res.data.commerceItemVos)
    })
  }
}
</script>

<style lang="scss">
  .detail{
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
        &-title{
          @include ellipsis(2)
        }
      }
    }
  }
</style>
