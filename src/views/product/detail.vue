<template>
  <div class="detail">
    <swipe
      class="detail-swipe"
      :autoplay="5000"
    >
      <swipe-item
        v-for="(item, index) in detail.images"
        :key="index"
      >
        <img :src="item" />
      </swipe-item>
    </swipe>
    <div class="detail-title">
      <ve-row
        align="center"
      >
        <ve-col
          :span="20"
          class="detail-title-name"
        >
          {{detail.saleName}}
        </ve-col>
        <ve-col
          :span="4"
          textAlign="right"
          v-if="detail.productType !== 0"
        >
          <van-tag plain type="danger" v-if="detail.productType === 1">干洗</van-tag>
          <van-tag plain type="danger" v-if="detail.productType === 2">预售</van-tag>
        </ve-col>
      </ve-row>
      <p>
        <span class="detail-price">￥{{price(detail.salePrice)}}</span>
        <span class="detail-unit">/{{detail.minUnit}}</span>
      </p>
    </div>
    <van-button
      class="detail-button"
      bottom-action
      @click="handleAddCart"
      :loading="btnLoding"
    >
      加入购物车
    </van-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { Swipe, SwipeItem, Tag } from 'vant'
import { price } from '@/util/util'

@Component({
  components: {
    Swipe,
    SwipeItem,
    'van-tag': Tag
  }
})
export default class Detail extends Vue {
  @Action('product/getProductDetail') getProductDetail: any
  @Action('cart/addCart') addCart: any
  @Getter('product/detail') detail: any

  btnLoding: boolean = false

  price = price

  handleAddCart() {
    this.btnLoding = true

    this.addCart({
      id: this.detail.id,
      num: 1
    }).then(res => {
      if (res.code === 200) {
        this.$toast('添加购物车成功~')
      }

      this.btnLoding = false
    })
  }

  mounted() {
    this.getProductDetail(this.$route.params.id)
  }
}
</script>

<style lang="scss">
.detail{
  &-title{
    background-color: $--color-white;
    padding: 10px 20px;

    &-name{
      font-size: 38px;
      @include ellipsis(2)
    }

    .van-tag--plain{
      font-size: 28px;
    }
  }

  &-price{
    color: $--color-price;
    font-size: 38px;
  }

  &-unit{
    color: $--color-unit;
    font-size: 28px;
  }

  &-button{
    background-color: $--color-base;
    position: fixed;
    bottom: 0;
  }
}
</style>
