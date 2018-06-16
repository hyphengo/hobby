<template>
  <div :style="{height: '100%', overflow: 'auto'}">
    <pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="cart">
        <div v-if="hasgoods">
          <div class="list">
            <div
              v-for="(data, index) in goods.items"
              :key="index"
              v-if="data.commerceItems.length > 0"
            >
              <div class="cart-list-title">
                <van-checkbox :value="data.selectAll" :name="data.groupName" @input="checkItemAll(data)">
                  {{data.groupName}}
                </van-checkbox>
                <!-- <div class="font-24">满88免配送费，还差**123元</div> -->
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
                      @overlimit="deleteItem(item, data.groupType)"
                      @change="(val) => handleQuantity(val, item, data.groupType)"
                    />
                  </div>
                </van-checkbox>
              </div>
            </div>
            <div
              v-for="(data, index) in goods.invalidItems"
              :key="index"
              v-if="goods.invalidItems && data.commerceItems.length > 0"
            >
              <div class="cart-list-title">
                <div>{{data.groupName}}</div>
                <div class="font-24" @click="handleClear">清空</div>
              </div>
              <div class="cart-goods">
                <van-checkbox
                  class="cart-goods-item"
                  v-for="item in data.commerceItems"
                  :value="item.selected"
                  :key="item.productCode"
                  :name="item.productCode"
                  :label-disabled="true"
                  disabled
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
                      disabled
                    />
                    <div class="cart-goods-failure">{{item.stateDetail}}</div>
                  </div>
                </van-checkbox>
              </div>
            </div>
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
        <van-dialog
          v-model="showSelect"
          show-cancel-button
          :before-close="beforeClose"
        >
          <p class="cart-dialog-title">请分开买单~</p>
          <radio-group v-model="radio">
            <cell-group>
              <van-cell
                v-for="(item, index) in single"
                :key="index"
                :title="item.groupName"
                :label="`${item.selectCount}件`"
                clickable
                @click="radio = item.groupType"
              >
                <van-radio :name="item.groupType" />
              </van-cell>
            </cell-group>
          </radio-group>
        </van-dialog>
      </div>
    </pull-refresh>
    <div class="cart-goods-btn van-hairline--top">
      <van-checkbox :value="checkedAll" @input="handleCheckAll">全选</van-checkbox>
      <div class="totalprice">¥{{price(goods.amount)}}</div>
      <van-button class="pay-btn" bottom-action @click="onSubmit" :loading="subLoding">去买单</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { Checkbox, CheckboxGroup, Card, SubmitBar, Stepper, Radio, RadioGroup, Cell, CellGroup, PullRefresh } from 'vant'
import GoodsCard from '@/components/goodsCard/GoodsCard.vue'
import { loadCart, selectItem, selectGroup, updateItem, removeItem, moveToCheckout, selectToCheckout, removeInvalidItem } from '@/api'
import { price } from '@/util/util'

@Component({
  components: {
    'VanCheckbox': Checkbox,
    'VanCard': Card,
    'VanStepper': Stepper,
    CheckboxGroup,
    RadioGroup,
    'VanRadio': Radio,
    'VanCell': Cell,
    CellGroup,
    SubmitBar,
    GoodsCard,
    PullRefresh,
  }
})
export default class Cart extends Vue {
  @Action('cart/setCartCount') setCartCount: Function

  // 购物车是否有商品
  hasgoods: boolean = true
  checkedAll: boolean = false
  goods: any = []
  subLoding: boolean = false
  showSelect: boolean = false
  radio: any = null
  single: any = null
  isLoading: boolean = false

  price = price

  loading() {
    this.$toast.loading({
      duration: 0,
      forbidClick: true,
    })
  }

  onRefresh() {
    loadCart().then(this.gotCart)
  }

  // 单类全选
  checkItemAll(data) {
    this.loading()

    selectGroup({
      groupType: data.groupType,
      select: data.selectAll ? 0 : 1,
    }).then(this.gotCart)
  }

  // 改变单个商品选中
  changeItem(item, groupType) {
    this.loading()

    selectItem({
      productId: item.productId,
      productType: groupType,
      select: item.selected ? 0 : 1
    }).then(this.gotCart)
  }


  // 删除购物车中无效的商品
  handleClear() {
    this.$dialog.confirm({
      message: '确定清除失效商品吗？',
    }).then(() => {
      this.loading()

      removeInvalidItem({}).then(this.gotCart)
    }).catch(() => {
      // on cancel
      this.$dialog.close()
    })
  }

  // 改变单个商品 数量
  handleQuantity(val, item, groupType) {
    this.loading()

    updateItem({
      productId: item.productId,
      quantity: val,
      productType: groupType
    }).then(this.gotCart)
  }

  // 删除商品
  deleteItem(item, groupType) {
    this.$dialog.confirm({
      message: '确认删除选中的商品吗？',
      cancelButtonText: '再想想'
    }).then(() => {
      this.loading()

      removeItem({
        productId: item.productId,
        productType: groupType
      }).then(this.gotCart)
    }).catch(() => {
      // on cancel
      this.$dialog.close()
    })
  }

  onSubmit() {
    this.subLoding = true
    moveToCheckout({}).then(res => {
      this.subLoding = false

      if (res.data.mutiGroup === 1) {
        this.single = res.data.selectOrderVoList
        this.radio = res.data.selectOrderVoList[0].groupType
        this.showSelect = true

        return
      }

      this.$router.push('/order/confirm')
    }).catch(() => {
      loadCart().then(this.gotCart)
    })
  }

  beforeClose(action, done) {
    if (action === 'confirm') {
      selectToCheckout({
        groupType: this.radio
      }).then(() => {
        this.$router.push('/order/confirm')
      })
    } else {
      done()
    }
  }

  goTosee() {
    this.$router.replace('/index/home')
  }

  // 所有商品选中
  async handleCheckAll() {
    this.loading()

    const p = this.goods.items.map((item) => () => selectGroup({
      groupType: item.groupType,
      select: this.checkedAll ? 0 : 1,
    }))

    let results = {}

    for (let i = 0; i < p.length; i++) {
      results = await p[i]()
    }

    this.gotCart(results)
  }

  gotCart(res) {
    this.goods = res.data
    this.hasgoods = res.data.cartCount > 0
    this.setCartCount(res.data.cartCount)
    this.checkedAll = res.data.items.every((item) => item.selectAll)
    this.isLoading = false
    this.subLoding = false

    this.$toast.clear()
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
  padding-bottom: 100px;

  .van-button > .van-loading {
    width: 60px !important;
    height: 60px !important;
  }

  .van-loading--black circle{
    stroke: #fff !important;
  }

  &-dialog-title{
    font-size: 32px;
    text-align: center;
    padding: 20px 0;
    color: $--color-base;
  }
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

  &-failure {
    text-align: center;
    color: red;
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

    .van-stepper__minus--disabled::before {
      background: #c9c9c9;
    }

    .van-stepper__plus--disabled {
      background: #c9c9c9;
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
  padding-bottom: 100%;

  .tips {
    p {
      font-size: 34px;
      line-height: 4;
      color: #666;
    }
  }
  .van-icon {
    color: #666;
    font-size: 40px;
  }

  .van-button--normal, .van-button--default {
    width: 160px;
    height: 80px;
    line-height: 80px;
    color: $--color-base;
    border: 1px solid $--color-base;
  }
}
</style>
