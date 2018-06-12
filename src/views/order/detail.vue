<template>
  <div class="detail">
    <div class=detail-status>
    </div>
    <product-info
      class="detail-product"
      :order="order"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SubmitBar } from 'vant'
import ProductInfo from '@/components/productInfo/index.vue'
import AddressCard from '@/components/address-card/index.vue'
import DateCard from '@/components/date-card/index.vue'
import InviteCard from '@/components/invite-card/index.vue'
// import { getOrderDetail } from '@/api'
import { price } from '@/util/util'

@Component({
  components: {
    ProductInfo,
    SubmitBar,
    AddressCard,
    DateCard,
    InviteCard,
  }
})
export default class Confirm extends Vue {
  detail: any = {}
  order: any = {}
  address: any = {}
  price = price

  mounted() {
    // getOrderDetail('1000011528192396611102284').then(res => {
    // console.log(res)
    // this.detail = res.data
    // })
    this.order = {
      orderTypeDesc: '普通商品',
      itemCount: 9,
      saleCount: 12,
      commerceItems: [
        {
          id: null,
          productId: '1000016954767423579',
          productName: '可口可乐零度500ml',
          productCode: '100172',
          productImg: 'http://test-img.cocowa.com.cn/product/76CKT917CF94VAE4Y.jpg',
          quantity: 3,
          salePrice: 3,
          type: '0',
          unit: '瓶'
        }
      ],
      orderPriceInfo: {
        rawSubtotal: '1234.0',
        couponDiscountAmount: '6.8',
        shipping: '12',
        total: '123'
      }
    }
    this.detail = {
      id: '1000011528192396611102284',
      consigneeName: 'Ellison Yang',
      cellphone: '18113002233',
      communityName: '南阳盛世',
      detailAddress: '13栋1206号',
      orderPriceInfo: [
        {
          id: null,
          productId: '1000016954767423579',
          productName: '可口可乐零度500ml',
          productCode: '100172',
          productImg: 'http://test-img.cocowa.com.cn/product/76CKT917CF94VAE4Y.jpg',
          quantity: 3,
          salePrice: 3,
          type: '0',
          unit: '瓶'
        }
      ],
      rawSubtotal: 9,
      shipping: 2,
      discountAmount: 0,
      total: 11,
      paymentMethods: ['weixin'],
      creationTime: 1528192396611,
      shipOnDate: 1528192383618,
      shipHourRange: '18:00 - 18:30',
      shippingMethod: '1',
      couponDiscountAmount: 0,
      state: 30,
      stateDetail: '待接单',
      orderType: '0',
      orderTypeDesc: '普通商品',
      leftNoPayTime: -600246784
    }
  }
}
</script>

<style lang="scss">
.detail {

}
</style>
