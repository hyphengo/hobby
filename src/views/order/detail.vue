<template>
  <div class="detail">
    <div class=detail-status>
      <van-steps :active="active">
        <van-step
          v-for="(data, index) in steplist"
          :key="index"
        >{{data.name}}</van-step>
      </van-steps>
      <div class="detail-tips">
        <span v-if="detail.state === 10">未付款，{{leftTime}}分钟后将自动取消</span>
      </div>
    </div>
    <address-card
      v-if="detail.shippingMethod === '1'"
      :info="detail"
      :disabled="true"
    />
    <date-card
      v-if="detail.shippingMethod === '1'"
      :info="detail"
      :disabled="true"
    />
    <invite-card
      v-model="phone"
      v-if="detail.shippingMethod === '2'"
      :info="detail"
      :orderType="detail.orderType"
    />
    <product-info
      class="detail-product"
      :order="detail"
      :isDetail="true"
    />
    <ve-row class="productInfo-row van-hairline--bottom">
      <ve-col :span="12">
        实付金额
      </ve-col>
      <ve-col :span="12" textAlign="right" class="productInfo-grey">
        {{`￥${price(124.0)}`}}
      </ve-col>
    </ve-row>
    <ve-row class="productInfo-row van-hairline--bottom">
      <ve-col :span="12">
        支付方式
      </ve-col>
      <ve-col :span="12" textAlign="right" class="productInfo-grey">
        {{`￥${price(124.0)}`}}
      </ve-col>
    </ve-row>
    <ve-row class="productInfo-row van-hairline--bottom">
      <ve-col :span="12">
        下单时间
      </ve-col>
      <ve-col :span="12" textAlign="right" class="productInfo-grey">
        {{`￥${price(124.0)}`}}
      </ve-col>
    </ve-row>
    <ve-row class="productInfo-row van-hairline--bottom">
      <ve-col :span="12">
        订单号
      </ve-col>
      <ve-col :span="12" textAlign="right" class="productInfo-grey">
        {{`￥${price(124.0)}`}}
      </ve-col>
    </ve-row>
    <div v-if="detail.state === 10" class="detail-btn">
      <van-button
        type="default"
        class="btn"
        @click="handleCancel"
      >
        取消
      </van-button>
      <van-button
        type="default"
        :class="['btn', 'active']"
      >
        买单
      </van-button>
    </div>
    <div v-else class="detail-btn">
      <van-button
        type="default"
        class="btn"
      >
        联系店铺
      </van-button>
      <van-button
        type="default"
        :class="['btn', 'active']"
        v-if="item.state === 30 || item.state === 60 || item.state === 70"
      >
        再买
      </van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SubmitBar, Step, Steps } from 'vant'
import ProductInfo from '@/components/productInfo/index.vue'
import AddressCard from '@/components/address-card/index.vue'
import DateCard from '@/components/date-card/index.vue'
import InviteCard from '@/components/invite-card/index.vue'
import { getOrderDetail, cancelOrder } from '@/api'
import { price } from '@/util/util'

@Component({
  components: {
    ProductInfo,
    SubmitBar,
    AddressCard,
    DateCard,
    InviteCard,
    'VanStep': Step,
    'VanSteps': Steps
  }
})
export default class Confirm extends Vue {
  price = price
  detail: any = {}
  id: string = ''
  active: number = 0
  steplist: any = []
  leftTime: number

  mounted() {
    this.id = this.$route.params.id

    getOrderDetail(this.id).then(res => {
      this.detail = res.data
      if (this.detail.state === 10 && this.detail.leftNoPayTime) {
        this.leftTime = this.detail.leftNoPayTime / 1000 / 60
      }
      // shippingMethod：1:送货上门  2：到店自提
      if (this.detail.orderType === '0' && this.detail.shippingMethod === '1') {
        this.steplist = [
          {
            name: '下单',
          },
          {
            name: '付款',
          },
          {
            name: '接单',
          },
          {
            name: '配送',
          }
        ]
      } else if (this.detail.orderType === '0' && this.detail.shippingMethod === '2') {
        this.steplist = [
          {
            name: '下单',
          },
          {
            name: '付款',
          },
          {
            name: '接单',
          },
          {
            name: '自取',
          }
        ]
      } else if (this.detail.orderType === '1') {
        this.steplist = [
          {
            name: '下单',
          },
          {
            name: '付款',
          },
          {
            name: '接单',
          },
          {
            name: '收衣',
          },
          {
            name: '送洗',
          },
          {
            name: '干洗',
          },
          {
            name: '取衣',
          },
        ]
      } else if (this.detail.orderType === '2') {
        this.steplist = [
          {
            name: '下单',
          },
          {
            name: '付款',
          },
          {
            name: '采购',
          },
          {
            name: '自取',
          }
        ]
      }
    })
  }

  loading() {
    this.$toast.loading({
      duration: 0,
      forbidClick: true,
    })
  }

  handleCancel() {
    this.$dialog.confirm({
      message: '不再考虑一下嘛，确定取消订单'
    }).then(() => {
      this.loading()

      cancelOrder(this.id).then(res => {
        this.$toast.clear()
        this.$router.replace('/order/list#all')
      })
    }).catch(() => {
      // on cancel
      this.$dialog.close()
    })
  }
}
</script>

<style lang="scss">
.detail {
  overflow: auto;

  &-status {
    height: 176px;
    background: #fff;
  }

  &-tips {
    text-align: center;
  }

  &-btn {
    text-align: right;
    padding: 20px;

    .btn {
      width: 176px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      background: none;
      border: 1px solid #999;
    }
    .active {
      color: $--color-base;
      border: 1px solid $--color-base;
      margin-left: 20px;
    }
  }
}
</style>
