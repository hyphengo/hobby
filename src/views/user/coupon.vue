<template>
  <div class="coupon">
    <div class="coupon-bg coupon-bg-1">
      <div class="coupon-left">
        <div>
          <p><span>￥</span>100</p>
          <span>满100可用</span>
        </div>
      </div>
      <div class="coupon-right">
        <div>
          <p>全品类券，随便买</p>
          <span>2018.01.02-2018.09.02</span>
        </div>
      </div>
    </div>
    <div class="coupon-bg coupon-bg-2">
      <div class="coupon-left">
        <div>
          <p><span>￥</span>100</p>
          <span>满100可用</span>
        </div>
      </div>
      <div class="coupon-right">
        <div>
          <p>全品类券，随便买</p>
          <span>2018.01.02-2018.09.02</span>
        </div>
      </div>
    </div>
    <div :class="[{'coupon-bg1': item.e, 'coupon-bg2': !item.e}, 'coupon-bg']" v-for="item in couponList" :key="item.id">
      {{item.a}}
    </div>
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
  couponList: any = null
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
