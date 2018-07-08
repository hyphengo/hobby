<template>
  <div class="detail">
    <falling-tag
      class="detail-tag big"
      v-if="detail.onBestPrice === '1'"
      :price="detail.salePrice - detail.bestPrice"
    />
    <swipe
      class="detail-swipe"
      :autoplay="5000"
    >
      <swipe-item
        v-if="detail.images.length > 0 && isItemShow"
        v-for="item in detail.images"
        :key="item"
      >
        <img v-lazy="item" />
      </swipe-item>
      <swipe-item v-if="!detail.images">
        <img :src="require('assets/images/product.png')" alt="" />
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
          {{detail.name}}
        </ve-col>
        <ve-col
          :span="4"
          textAlign="right"
          v-if="detail.productType !== '0'"
        >
          <van-tag plain type="danger" v-if="detail.productType === '1'">干洗</van-tag>
          <van-tag plain type="danger" v-if="detail.productType === '2'">预售</van-tag>
        </ve-col>
      </ve-row>
      <p>
        <span v-if="detail.onBestPrice === '1'" class="detail-price">￥{{price(detail.bestPrice)}}</span>
        <span v-else class="detail-price">￥{{price(detail.salePrice)}}</span>
        <span class="detail-unit">/{{detail.minUnit}}</span>
        <span v-if="detail.onBestPrice === '1'" class="detail-best">￥{{price(detail.salePrice)}}</span>
      </p>
    </div>
    <div
      class="detail-activities"
      v-for="(dis, index) in detail.discountActivities"
      :key="index"
    >
      <van-tag plain type="danger">优惠</van-tag>
      <p>{{dis}}</p>
    </div>
    <div class="detail-describe" v-if="detail.detailImages && detail.detailImages.length > 0">
      <p>- 商品描述 -</p>
      <img
        v-for="(item, index) in detail.detailImages"
        :key="index"
        :src="item"
      />
    </div>
    <goods-action>
      <goods-action-mini-btn icon="home" text="主页" @click="() => $router.push('/index/home')" />
      <goods-action-mini-btn icon="cart" text="购物车" :info="cartCount" @click="() => $router.push('/index/cart?show=hidden')" />
      <goods-action-big-btn
        :class="[
          'detail-button',
          {
            disable: isAddCartDisable
          }
        ]"
        :text="cartText"
        @click="handleAddCart"
      />
    </goods-action>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { Swipe, SwipeItem, Tag, GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn } from 'vant'
import ModalRouter from '@/mixins/ModalRouter'
import FallingTag from '@/components/falling-tag/index.vue'
import { price } from '@/util/util'

@Component({
  components: {
    Swipe,
    SwipeItem,
    'van-tag': Tag,
    GoodsAction,
    GoodsActionBigBtn,
    GoodsActionMiniBtn,
    FallingTag
  }
})
export default class Detail extends Vue {
  @Action('product/getProductDetail') getProductDetail: any
  @Action('cart/addCart') addCart: any
  @Action('cart/getCount') getCount: any
  @Getter('product/detail') detail: any
  @Getter('cart/count') cartCount: any

  @Model('change') visible: any

  btnLoding: boolean = false

  isItemShow: boolean = false

  isAddCartDisable: boolean = false

  price = price

  get cartText() {
    if (this.detail.shopOnShelves === '0') {
      this.isAddCartDisable = true
      return '该商品已下架'
    }

    if (this.detail.stockLevel < 1) {
      this.isAddCartDisable = true
      return '该商品无库存'
    }

    return '加入购物车'
  }

  @ModalRouter.open
  open() {
    this.$emit('change', !this.visible)
  }

  handleAddCart() {
    if (this.isAddCartDisable) return
    this.btnLoding = true

    this.addCart({
      id: this.detail.id,
      num: 1
    }).then(res => {
      if (res.code === 200) {
        this.getCount()
      }

      this.btnLoding = false
    })
  }

  mounted() {
    this.getCount()
    this.getProductDetail(this.$route.params.id).then(() => {
      this.isItemShow = true
    })
  }
}
</script>

<style lang="scss">
.detail{
  padding-bottom: 100px;
  position: relative;

  &-tag{
    position: absolute !important;
    top: 50px;
    left: 50px;
    z-index: 1000;
  }

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

  &-best{
    color: #C6C6C6;
    text-decoration: line-through;
    margin-left: 10px;
  }

  &-button{
    background-color: $--color-base;

    &.disable{
      background-color: #ccc;
    }
  }

  &-swipe{
    width: 750px;
    height: 750px;

    img{
      width: 100%;
      height: 100%;
    }
  }

  &-activities{
    margin-top: 10px;
    display: flex;
    align-items: center;
    background-color: $--color-white;
    padding: 10px 20px;

    p{
      margin-left: 10px
    }
  }

  &-describe{
    font-size: 0;

    p{
      text-align: center;
      padding: 20px;
      background-color: $--color-white;
      margin-top: 20px;
      font-size: 28px;
    }

    img{
      width: 100%;
    }
  }

}
</style>
