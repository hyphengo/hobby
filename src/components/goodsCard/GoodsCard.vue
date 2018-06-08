<template>
  <div class="goodscard">
      <div class="goodscard-left">
        <div class="goodscard-thumb">
            <img :src="thumb" class="img" >
        </div>
        <div class="goodscard-content">
            <div :class="title">
                {{title}}
            </div>
            <div class="goodscard-price">
              <span style="color: #FC7818">￥{{price}}</span>
              <span style="color: #C6C6C6">/{{unit}}</span>
            </div>
        </div>
      </div>
      <!-- <div class="goodscard-right">
        <vant-stepper v-model="num" />
      </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Stepper } from 'vant'

@Component({
  components: {
    'VantStepper': Stepper
  }
})

export default class GoodsCard extends Vue {
  @Prop({ default: '' }) thumb: string
  @Prop({ default: null }) price: Number
  @Prop({ default: '' }) title: string
  @Prop({ default: '' }) unit: string
}
</script>

<style lang="scss">
.goodscard {
  height: 146px;
  padding: 34px 20px;
  margin-right: 24px;
  display: flex;
  justify-content: space-between;
  background: #fff;

  &-left {
    display: flex;
  }

  &-right {
    display: flex;
    align-items: center;

    .van-stepper__minus,
    .van-stepper__plus {
      border-radius: 50%;
      width: 44px;
      height: 44px;
    }
    .van-stepper__plus {
      background: #3ACBCC;
      border: none;
    }
    .van-stepper__minus::after, .van-stepper__minus::before {
      background: #3ACBCC;
    }
    .van-stepper__plus::after, .van-stepper__plus::before{
      background: #fff;
    }
    // .stepper__plus::after {
    //   background: #fff;
    // }

    .van-stepper__input {
      border: none;
    }
  }

  &-thumb {
      width: 70px;
      height: 78px;
      margin-right: 10px;

      img {
        width: 100%;
        height: 100%;
      }
  }
  &-content {
    font-size: 24px;
    color: #000;
    text-align: left;
  }

}
</style>


