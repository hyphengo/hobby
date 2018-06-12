<template>
  <div class="coupon">
    <radio-group v-model="couponId">
      <div :class="[{'coupon-bg-1': item.status==='active', 'coupon-bg-2': item.status==='closed', 'coupon-bg-3': item.status==='used'}, 'coupon-bg']" v-for="item in couponList" :key="item.id">
        <div class="coupon-left">
          <div>
            <p><span>￥</span>{{item.discount}}</p>
            <span>{{item.promotionName}}</span>
          </div>
        </div>
        <div class="coupon-right">
          <div class="coupon-info">
            <p>{{item.promotionDiscription}}</p>
            <span>{{dateFilter(item.startDate)}} - {{dateFilter(item.endDate)}}</span>
          </div>
          <div class="coupon-select" v-show="$route.params.name === 'select'">
            <van-radio :name="item.id" />
          </div>
        </div>
      </div>
    </radio-group>
    <p v-show="!nullData" class="more">别看了，真的没有了~</p>
    <div class="null-coupon" v-show="nullData">别看了，你并没有券，去搞几张吧~</div>
    <van-button v-show="$route.params.name === 'select' && !nullData" class="fix" size="large" type="primary" @click="deterClick" >确定</van-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Popup, RadioGroup, Radio, CouponList } from 'vant'
import { getCoupons, getAvailableCoupons, applyCoupon } from '@/api'
import moment from 'moment'

@Component({
  components: {
    'VanPopup': Popup,
    RadioGroup,
    'VanRadio': Radio,
    CouponList
  }
})
export default class Coupon extends Vue {
  couponList: any = null
  couponId: any = null
  nullData: boolean = false
  deterClick() {
    applyCoupon({id: this.couponId}).then(res => {
      this.$router.back()
    })
  }
  mounted() {
    if (this.$route.params.name === 'list') {
      getCoupons().then(res => {
        this.couponList = res.data
        if (!this.couponList.length) {
          this.nullData = true
        }
      })
    } else if (this.$route.params.name === 'select') {
      getAvailableCoupons().then(res => {
        this.couponList = res.data
        if (!this.couponList.length) {
          this.nullData = true
        }
      })
    }
  }
  dateFilter(el) {
    return moment(el).format('YYYY.MM.DD')
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
        .coupon-info{
          flex-grow: 1;
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
        .coupon-select{
          width: 60px;
        }
      }
    }
    .more{
      text-align: center;
      padding-top: 22px;
      font-size: 22px;
    }
    .fix{
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 9999;
      padding-left: 25px;
    }
    .van-button--primary{
      background-color: $--color-base;
      border-color: $--color-base;
    }
    .van-radio .van-icon-checked{
      color: $--color-base;
    }
    .null-coupon{
      text-align: center;
      padding-top: 50px;
      font-size: 22px;}
  }
</style>
