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
                ￥{{price}}/{{unit}}
            </div>
        </div>
      </div>
      <div class="goodscard-right">
        <vant-stepper v-model="num" />
      </div>
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
  //   @Prop({ default: () => {} }) onAction: Function
  @Prop({ default: null }) num: Number
  @Prop({ default: null }) price: Number
  @Prop({ default: '' }) title: string
  @Prop({ default: '' }) unit: string

  handleClick() {
    // this.onAction()
    // this.$emit('action')
  }
}
</script>

<style lang="scss">
.goodscard {
  border: 1px solid #ebeef5;
  height: 146px;

  &-left {
  }

  &-thumb {
      width: 70px;
      height: 78px;
  }

  &-right {
    padding: 15px;
  }

  .boxer-action {
    padding: 4px !important;
  }
}
</style>


