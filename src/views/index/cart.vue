<template>
  <div class="cart">
    <div v-if="hasgoods">
      <div class="list">
        <div v-for="(data,index) in goods.items" :key="index">
          <div class="cart-list-title">
            <van-checkbox :value="data.selectAll" :name="data.groupName" @input="checkItemAll(data)">
              {{data.groupName}}
            </van-checkbox>
            <!-- <div class="font-24">满88免配送费，还差**元</div> -->
          </div>
          <div class="cart-goods">
            <van-checkbox
              class="cart-goods-item"
              v-for="item in data.commerceItems"
              :value="item.selected"
              :key="item.productCode"
              :name="item.productCode"
              :label-disabled="true"
              @input="changeItem(item, data.groupType)"
            >
              <goods-card
                class="cart-goods-card"
                :title="item.productName"
                :price="item.salePrice"
                :thumb="item.productImg"
                :unit="item.unit"
                :id="item.productId"
              />
              <div class="cart-goods-step">
                <van-stepper
                  :value="item.quantity"
                  @overlimit="deleteItem"
                />
              </div>
            </van-checkbox>
          </div>
        </div>
      </div>
      <div class="cart-goods-btn van-hairline--top">
        <van-checkbox v-model="checkedAll" @change="handleCheckAll">全选</van-checkbox>
        <div class="totalprice">¥{{price(goods.amount)}}</div>
        <div class="pay-btn" @click="onSubmit">去买单</div>
      </div>
    </div>
    <div v-else class="cart-nogoods">
      <div class="tips">
        <van-icon name="shop" />
        <p>没商品哦，快去搞点吧～</p>
      </div>
      <van-button
        text="去看看"
        @click="goTosee"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Checkbox, CheckboxGroup, Card, SubmitBar, Stepper } from 'vant'
import GoodsCard from '@/components/goodsCard/GoodsCard.vue'
import { loadCart, selectItem, selectGroup } from '@/api'
import { price } from '@/util/util'

@Component({
  components: {
    'VanCheckbox': Checkbox,
    CheckboxGroup,
    'VanCard': Card,
    SubmitBar,
    GoodsCard,
    'VanStepper': Stepper,
  }
})
export default class Cart extends Vue {
  checkedGoods: any = []
  // 购物车是否有商品
  hasgoods: boolean = true
  checkedAll: boolean = false
  goods: any = []

  price = price

  get submitBarText() {
    const count = this.checkedGoods.length
    return '去买单' + (count ? `(${count})` : '')
  }

  // 全选
  checkItemAll(data) {
    selectGroup({
      groupType: data.groupType,
      select: data.selectAll ? 0 : 1,
    }).then(this.gotCart)
  }

  changeItem(item, groupType) {
    selectItem({
      productId: item.productId,
      productType: groupType,
      select: item.selected ? 0 : 1
    }).then(this.gotCart)
  }

  deleteItem() {
    this.$dialog.confirm({
      message: '确认删除商品'
    }).then(() => {

    }).catch(() => {
      // on cancel
      this.$dialog.close()
    })
  }

  onSubmit() {
    this.$toast('点击结算')
  }

  goTosee() {
    this.$toast('qukankan')
  }

  handleCheckAll(value) {

  }

  gotCart(res) {
    this.goods = res.data
    this.hasgoods = res.data.cartCount > 0
  }

  created() {
    loadCart().then(this.gotCart)
  }
}

</script>

<style lang="scss">
.cart {
  height: 100%;
  overflow: auto;
  padding-bottom: 200px;
}
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
.cart-goods {
  padding: 10px 20px;
  background-color: #fff;
  margin-bottom: 15px;

  &-card{
    flex-grow: 1;
    padding-left: 0 !important;
  }

  &-item {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding-left: 20px;
  }

  .van-checkbox__icon{
    flex-shrink: 0;
  }

  .van-checkbox__label{
    display: flex;
    align-items: center;
    width: 100%;
  }

  &-step {
    flex-shrink: 0;

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
    position: fixed;
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

.cart-nogoods {
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
