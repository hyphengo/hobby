<template>
  <div class="goodscard" @click="handleToDetail">
    <div class="goodscard-thumb">
        <img :src="thumb" class="img" >
    </div>
    <div class="goodscard-content">
        <div class="goodscard-title">
            {{title}}
        </div>
        <div class="goodscard-price">
          <span class="price">￥{{price}}</span>
          <span class="unit">/{{unit}}</span>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class GoodsCard extends Vue {
  @Prop({ default: '' }) thumb: string
  @Prop({ default: null }) price: Number
  @Prop({ default: '' }) title: string
  @Prop({ default: '' }) unit: string
  @Prop() id: string

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

}
</style>


