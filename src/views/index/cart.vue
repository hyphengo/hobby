<template>
  <div class="cart">
    <div v-if="!hasgoods">
      <div class="cart-list-title">
        <vant-checkbox v-model="checkItemAll">干洗衣物</vant-checkbox>
        <div class="font-24">满88免配送费，还差**元</div>
      </div>
      <checkbox-group
        class="card-goods"
        v-model="checkedGoods"
      >
        <vant-checkbox
          class="card-goods__item"
          v-for="item in goods"
          :key="item.id"
          :name="item.id"
        >
          <goods-card
            :title="item.title"
            :price="formatPrice(item.price)"
            :thumb="item.thumb"
            :unit="item.unit"
          />
          <div class="card-goods-step">
            <vant-stepper v-model="item.num" />
          </div>
        </vant-checkbox>
      </checkbox-group>
      <div class="card-goods-btn">
        <vant-checkbox v-model="checkedAll">全选</vant-checkbox>
        <div class="totalprice">¥{{formatPrice(totalPrice)}}</div>
        <div class="pay-btn" @click="onSubmit">去买单</div>
      </div>
    </div>
    <div v-else class="card-nogoods">
      <div class="tips">
        <vant-icon name="shop" />
        <p>没商品哦，快去搞点吧～</p>
      </div>
      <vant-button
        text="去看看"
        @click="goTosee"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Checkbox, CheckboxGroup, Card, SubmitBar, Toast, Stepper, Icon, Button } from 'vant'
import GoodsCard from '@/components/goodsCard/GoodsCard.vue'

@Component({
  components: {
    'VantCheckbox': Checkbox,
    CheckboxGroup,
    'VantCard': Card,
    SubmitBar,
    GoodsCard,
    'VantStepper': Stepper,
    'VantIcon': Icon,
    'VantButton': Button
  }
})
export default class Cart extends Vue {
  checkedGoods: any = ['1', '2', '3']
  hasgoods: boolean = false
  checkItemAll: boolean = false
  checkedAll: boolean = false
  goods: any = [
    {
      id: '1',
      title: '进口香蕉',
      desc: '约250g，2根',
      unit: '根',
      price: 200,
      num: 1,
      thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg'
    }, {
      id: '2',
      title: '陕西蜜梨',
      unit: '约600g',
      price: 690,
      num: 3,
      thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg'
    }, {
      id: '3',
      title: '美国伽力果',
      unit: '3个',
      price: 2680,
      num: 1,
      thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg'
    }
  ]

  get submitBarText() {
    const count = this.checkedGoods.length
    return '去买单' + (count ? `(${count})` : '')
  }

  get totalPrice() {
    return this.goods.reduce((total, item) => total + (this.checkedGoods.indexOf(item.id) !== -1 ? item.price : 0), 0)
  }

  formatPrice(price) {
    return (price / 100).toFixed(2)
  }

  onSubmit() {
    console.log('点击结算')
  }

  goTosee() {
    console.log('qukankan')
  }


}

</script>

<style lang="scss">
.cart-list-title {
  display: flex;
  width: 100%;
  height: 80px;
  line-height: 80px;
  justify-content: space-between;
  padding: 0 22px;
  font-size: 28px;
  border-bottom: 1px solid #EDEDF0;
  background: #fff;

  .font-24 {
    font-size: $--base-font;
  }
}
.card-goods {
  padding: 10px 20px;
  background-color: #fff;
  margin-bottom: 15px;

  &__item {
    position: relative;
    background-color: #fff;
    .van-checkbox__label {
      position: relative;
      width: 100%;
      padding-left: 40px;
      box-sizing: border-box;
    }
    .van-checkbox__icon {
      top: 50%;
      left: 10px;
      z-index: 1;
      position: absolute;
      margin-top: -10px;
    }

  }
  &-step {
    display: inline-block;
    position: absolute;
    right: 30px;
    top: 50%;
    margin-top: -22px;

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

    .van-stepper__input {
      border: none;
    }
  }

  &-btn {
    width: 100%;
    height: 98px;
    line-height: 98px;
    background: #fff;
    position: absolute;
    bottom: 98px;
    display: flex;
    justify-content: space-between;
    padding-left: 30px;
    font-size: 28px;

    .totalprice {
      color: $--color-price;
      font-size: 38px;
    }
    .pay-btn {
      width: 232px;
      background: $--color-base;
      text-align: center;
      color: #fff;
    }
  }
}

.card-nogoods {
  text-align: center;
  height: 100%;
  padding-top: 50%;

  .tips {
    p {
      font-size: 34px;
      line-height: 4;
      color: #666;
    }
    
  }
  .van-icon {
    color: #666;
  }
  .van-button--normal,
    .van-button--default {
      width: 160px;
      height: 80px;
      line-height: 80px;
      color: $--color-base;
      border: 1px solid $--color-base;
    }
}
</style>
