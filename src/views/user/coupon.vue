<template>
  <div class="coupon">
    <div :class="[{'coupon-bg-1': item.status==='active', 'coupon-bg-2': item.status==='expired', 'coupon-bg-3': item.status==='used'}, 'coupon-bg']" v-for="item in couponList" :key="item.id">
      <div class="coupon-left">
        <div>
          <p><span>￥</span>{{item.discount}}</p>
          <span>{{item.promotionName}}</span>
        </div>
      </div>
      <div class="coupon-right">
        <div>
          <p>{{item.promotionDiscription}}</p>
          <span>{{item.startDate}}-{{item.endDate}}</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Popup, CouponList } from 'vant'
import { getCoupons } from '@/api'

@Component({
  components: {
    'VanPopup': Popup,
    CouponList
  }
})
export default class Coupon extends Vue {
  couponList: any = null
  mounted() {
    getCoupons().then(res => {
      this.couponList = res.data
    })
  }
}
</script>

<style lang="scss">
  .coupon{
    .coupon-bg{
      display: flex;
      flex-flow: row;
      margin: 25px 35px 0;
      width: 680px;
      height: 140px;
      background-size: cover;
      &-1{
        background-image: url("../../assets/images/user/coupon-bg1.png");
      }
      &-2{
        background-image: url("../../assets/images/user/coupon-bg2.png");
      }
      &-3{
        background-image: url("../../assets/images/user/coupon-bg3.png");
      }
      .coupon-left{
        width: 168px;
        color: $--color-white;
        display: flex;
        align-items:center;
        div{
          width: 100%;
          text-align: center;
          p{
            font-size: 32px;
            padding: 10px 0 15px;
          }
          span{
            font-size: 22px;
          }
        }
      }
      .coupon-right{
        flex-grow: 1;
        display: flex;
        align-items:center;
        div{
          padding-left: 35px;
          p{
            font-size: 28px;
            padding-bottom: 15px;
            color: $--color-black;
          }
          span{
            font-size: 22px;
            color: #C6C6C6;
          }
        }
      }
    }
  }
</style>
