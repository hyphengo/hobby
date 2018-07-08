<template>
  <div @click="handleToDetail">
    <div class="goodscard">
      <div class="goodscard-thumb">
          <img :src="thumb || require('assets/images/product.png')" class="img" >
          <falling-tag
            class="goodscard-thumb-tag"
            v-if="onBestPrice === '1'"
            :price="price - bestPrice"
          />
      </div>
      <div class="goodscard-content">
          <div class="goodscard-title">
              {{title}}
          </div>
          <div class="goodscard-price">
            <span v-if="onBestPrice === '1'" class="price">￥{{priceTurn(bestPrice)}}</span>
            <span v-else class="price">￥{{priceTurn(price)}}</span>
            <span class="unit">/{{unit}}</span>
            <span v-if="onBestPrice === '1'" class="best">￥{{priceTurn(price)}}</span>
          </div>
      </div>
    </div>
    <div
      class="goodscard-activities"
      v-for="(dis, index) in discountActivities"
      :key="index"
      v-if="discountActivities.length > 0"
    >
      <van-tag plain type="danger">优惠</van-tag>
      <p>{{dis}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Tag } from 'vant'
import FallingTag from '../falling-tag/index.vue'
import { price } from '@/util/util'

@Component({
  components: {
    'van-tag': Tag,
    FallingTag
  }
})
export default class GoodsCard extends Vue {
  @Prop({ default: '' }) thumb: string
  @Prop({ default: null }) price: Number
  @Prop({ default: '' }) title: string
  @Prop({ default: '' }) unit: string
  @Prop() id: string
  @Prop() discountActivities: any
  @Prop({ default: false }) disable: boolean
  @Prop() onBestPrice: any
  @Prop() bestPrice: any

  priceTurn = price

  handleToDetail() {
    if (this.disable) return
    this.$router.push(`/product/detail/${this.id}`)
  }
}
</script>

<style lang="scss">
.goodscard {
  padding: 29px 35px;
  margin-right: 24px;
  display: flex;
  background: #fff;

  &-thumb {
    flex-shrink: 0;
    width: 100px;
    height: 100px;
    margin-right: 20px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
    }

    &-tag{
      position: absolute !important;
      top: 0;
      left: 0;
    }
  }
  &-title{
    @include ellipsis(2)
  }
  &-content {
    width: 100%;
    font-size: $--base-font;
    color: #000;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .goodscard-price {
      .price {
        color: $--color-price;
      }
      .unit {
        color: #C6C6C6;
      }

      .best{
        color: #C6C6C6;
        text-decoration: line-through;
        margin-left: 10px;
      }
    }
  }

  &-activities{
    display: flex;
    align-items: center;
    font-size: 24px;
    padding-left: 45px;
    margin-top: -20px;

    p{
      margin-left: 10px;
    }
  }

}
</style>


