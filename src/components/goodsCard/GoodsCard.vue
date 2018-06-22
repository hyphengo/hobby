<template>
  <div @click="handleToDetail">
    <div class="goodscard">
      <div class="goodscard-thumb">
          <img :src="thumb || require('assets/images/product.png')" class="img" >
      </div>
      <div class="goodscard-content">
          <div class="goodscard-title">
              {{title}}
          </div>
          <div class="goodscard-price">
            <span class="price">￥{{priceTurn(price)}}</span>
            <span class="unit">/{{unit}}</span>
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
import { price } from '@/util/util'

@Component({
  components: {
    'van-tag': Tag
  }
})
export default class GoodsCard extends Vue {
  @Prop({ default: '' }) thumb: string
  @Prop({ default: null }) price: Number
  @Prop({ default: '' }) title: string
  @Prop({ default: '' }) unit: string
  @Prop() id: string
  @Prop() discountActivities: any

  priceTurn = price

  handleToDetail() {
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

    img {
      width: 100%;
      height: 100%;
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


