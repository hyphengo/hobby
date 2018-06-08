<template>
  <div class="coupon">
    <vant-popup v-model="showList" position="bottom">
      <coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </vant-popup>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Popup, CouponList } from 'vant'

@Component({
  components: {
    'VantPopup': Popup,
    CouponList
  }
})
export default class Coupon extends Vue {

}
</script>

<style lang="scss">
.aaa{
  font-size: 24px;
}
</style>
