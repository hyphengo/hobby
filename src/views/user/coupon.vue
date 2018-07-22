<template>
  <div class="coupon">
    <div
      v-if="$route.params.name === 'select'"
      class="coupon-abandon van-hairline--surround"
      @click="handleAbandon"
    >
      不用券了
    </div>
    <div
      :class="[
        {
          'coupon-bg-1': item.status==='active',
          'coupon-bg-2': item.status==='closed',
          'coupon-bg-3': item.status==='used'
        },
        'coupon-bg'
      ]"
      v-for="item in couponList"
      :key="item.id"
      @click="radioClick(item)"
    >
      <div class="coupon-left">
        <div>
          <p><span>￥</span>{{item.discount}}</p>
          <span>{{item.promotionName}}</span>
        </div>
      </div>
      <div class="coupon-right">
        <div class="coupon-info">
          <p>{{item.promotionDiscription}} <span class="coupon-info-super" v-if="item.type === '2'">可叠加</span></p>
          <span>{{dateFilter(item.startDate)}} - {{dateFilter(item.endDate)}}</span>
        </div>
        <div class="coupon-select" v-show="$route.params.name === 'select'">
          <van-checkbox :disabled="curType !== item.type && curType !== null" :value="couponId.has(item.id)" />
        </div>
      </div>
    </div>
    <p v-show="!nullData" class="more">别看了，真的没有了~</p>
    <div class="null-coupon" v-show="nullData">别看了，你并没有券，去搞几张吧~</div>
    <van-button v-show="$route.params.name === 'select' && !nullData" class="fix" size="large" type="primary" @click="deterClick" >确定</van-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Popup, CheckboxGroup, Checkbox, CouponList } from 'vant'
import { getCoupons, getAvailableCoupons, applyCoupons } from '@/api'
import moment from 'moment'

@Component({
  components: {
    'VanPopup': Popup,
    CheckboxGroup,
    'VanCheckbox': Checkbox,
    CouponList
  }
})
export default class Coupon extends Vue {
  couponList: any = null
  couponId: any = new Set()
  nullData: boolean = false
  curType: any = null

  getCurCheck(id) {
    return this.couponId.has(id)
  }

  deterClick() {
    applyCoupons({ids: Array.from(this.couponId)}).then(res => {
      this.$router.back()
    })
  }
  handleAbandon() {
    applyCoupons({ids: null}).then(res => {
      this.$router.back()
    })
  }
  radioClick(item) {
    if (this.$route.params.name === 'select') {
      const id = item.id

      if (this.couponId.size === 0) {
        this.curType = item.type
      }

      if (this.curType !== item.type) {
        if (item.type === '1') {
          this.$toast('请先取消可叠加的券')
        } else if (item.type === '2') {
          this.$toast('请先取消不可叠加的券')
        }
        return
      }

      if (this.curType === '1') {
        if (this.couponId.has(id)) {
          this.couponId.clear()
          this.curType = null
        } else {
          this.couponId.clear()
          this.couponId.add(id)
        }

        this.couponId = new Set(Array.from(this.couponId))
        return
      }

      if (this.couponId.has(id)) {
        this.couponId.delete(id)

        if (this.couponId.size === 0) {
          this.curType = null
        }
      } else {
        this.couponId.add(id)
      }
      this.couponId = new Set(Array.from(this.couponId))
    }
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
        for (let i = 0; i < this.couponList.length; i++) {
          if (this.couponList[i].used) {
            this.couponId.add(this.couponList[i].id)
            this.curType = this.couponList[i].type
          }
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
    padding-bottom: 100px;

    .van-checkbox--round {
      border-radius: 20%;
    }

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
        align-items: center;
        justify-content: space-between;

        .coupon-info{
          flex-grow: 1;
          padding-left: 35px;

          &-super{
            color: $--color-base !important;
          }

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
          text-align: right;
          padding-right: 20px;
          flex-grow: 1;
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
    .van-radio{
      overflow: inherit;
    }
    .null-coupon{
      text-align: center;
      padding-top: 50px;
      font-size: 22px;
    }

    &-abandon{
      margin: 25px 35px;
      padding: 20px;
      background-color: $--color-white;
      border-radius: 10px;

      &:active{
        background-color: #C6C6C6;
      }
    }
  }
</style>
