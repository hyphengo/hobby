<template>
  <div class="cart">
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
          :num="item.num"
          :price="formatPrice(item.price)"
          :thumb="item.thumb"
          :unit="item.unit"
        />
      </vant-checkbox>
    </checkbox-group>
    <!-- <div>
      <span>全选</span>
      <span>¥{{formatPrice(totalPrice)}}</span>
      <span>去买单</span>
    </div> -->
    <submit-bar
      :price="totalPrice"
      :button-text="submitBarText"
      :disabled="!checkedGoods.length"
      @submit="onSubmit"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Checkbox, CheckboxGroup, Card, SubmitBar, Toast } from 'vant'
// import { NavBar, Field, CellGroup, Button } from 'vant'
import GoodsCard from '@/components/goodsCard/GoodsCard.vue'

@Component({
  components: {
    'VantCheckbox': Checkbox,
    CheckboxGroup,
    'VantCard': Card,
    SubmitBar,
    GoodsCard
  }
})
export default class Cart extends Vue {
  checkedGoods: any = ['1', '2', '3']

  goods: any = [{
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
    num: 1,
    thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg'
  }, {
    id: '3',
    title: '美国伽力果',
    unit: '3个',
    price: 2680,
    num: 1,
    thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg'
  }]

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
    Toast('点击结算')
  }
}

</script>

<style lang="scss">
.card-goods {
  padding: 10px 0;
  background-color: #fff;
  &__item {
    position: relative;
    background-color: #fff;
    .van-checkbox__label {
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
}
</style>
