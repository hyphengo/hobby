<template>
  <div class="cart">
    <div v-if="hasgoods">
      <div class="list">
        <div v-for="(data,index) in goods" :key="index">
          <div class="cart-list-title">
            <vant-checkbox v-model="data.selectAll" :name="data.groupName" @change="checkItemAll">
              {{data.groupName}}
            </vant-checkbox>
            <div class="font-24">满88免配送费，还差**元</div>
          </div>
          <div class="cart-goods">
            <vant-checkbox
              class="cart-goods-item"
              v-for="item in data.commerceItems"
              v-model="item.selected"
              :key="item.productCode"
              :name="item.productCode"
              :label-disabled="true"
              @change="changeItem"
            >
              <goods-card
                :title="item.productName"
                :price="item.salePrice"
                :thumb="item.productImg"
                :unit="item.unit"
              />
              <div class="cart-goods-step">
                <vant-stepper
                  v-model="item.quantity"
                  @overlimit="deleteItem"
                />
              </div>
            </vant-checkbox>
          </div>
        </div>
      </div>
      <div class="cart-goods-btn">
        <vant-checkbox v-model="checkedAll" @change="handleCheckAll">全选</vant-checkbox>
        <div class="totalprice">¥{{totalPrice}}</div>
        <div class="pay-btn" @click="onSubmit">去买单</div>
      </div>
    </div>
    <div v-else class="cart-nogoods">
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
import { Checkbox, CheckboxGroup, Card, SubmitBar, Stepper, Icon, Button, Toast } from 'vant'
import GoodsCard from '@/components/goodsCard/GoodsCard.vue'
import { loadCart } from '@/api'

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
  checkedGoods: any = []
  hasgoods: boolean = false
  checkedAll: boolean = false
  goods: any = []

  get submitBarText() {
    const count = this.checkedGoods.length
    return '去买单' + (count ? `(${count})` : '')
  }


  get totalPrice() {
    let total = 0
    this.goods.map(sub => {
      sub.commerceItems.map(item => {
        if (item.selected) {
          total += item.salePrice * item.quantity
        }
      })
    })
    return total
  }

  changeItem(value) {
    this.checkedAll = true
    this.goods.map(sub => {
      sub.selectAll = true
      sub.commerceItems.map(item => {
        if (!item.selected) {
          sub.selectAll = false
        }
      })
      if (!sub.selectAll) {
        this.checkedAll = false
      }
    })
  }

  formatPrice(price) {
    return (price / 100).toFixed(2)
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
    Toast('点击结算')
  }

  goTosee() {
    Toast('qukankan')
  }

  handleCheckAll(value) {
    this.goods.map(sub => {
      sub.commerceItems.map(item => {
        item.selected = value
      })
    })
  }
  checkItemAll(value) {
    this.goods.map(sub => {
      sub.commerceItems.map(item => {
        item.selected = value
      })
    })
  }

  created() {
    loadCart().then(res => {
      this.goods = res.data.items
      this.hasgoods = res.data.cartCount > 0
    })
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

  &-item {
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
