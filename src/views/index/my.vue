<template>
  <div class="info">
    <div class="user">
      <img class="avatar" :src="userInfo.image" alt="">
      <div class="username">
        <p class="name">{{userInfo.nickName}}</p>
        <span class="subtitle">可可蛙社区服务</span>
      </div>
    </div>
    <cell-group>
      <cell v-if="!userInfo.mobileFlag" class="bind-phone" is-link to="/my/bind">
        <template slot="title">
          <span class="bind-text">我蛙：我们还能好好做朋友嘛~ 你手机号都不告诉我</span>
        </template>
        <span class="all-order">写给我</span>
      </cell>
      <cell is-link to="/order/list">
        <template slot="title">
          <span class="cell-text">我的订单</span>
        </template>
        <span class="all-order">全部订单</span>
      </cell>
      <div class="order-type">
        <div>
          <img src="../../assets/images/user/icon-payment.png" alt="">
          <p>待付款</p>
          <span v-if="userInfo.orderState[10]" class="order-mark"></span>
        </div>
        <div>
          <img src="../../assets/images/user/icon-deliver.png" alt="">
          <p>待接单</p>
          <span v-if="userInfo.orderState[30]" class="order-mark"></span>
        </div>
        <div>
          <img src="../../assets/images/user/icon-order.png" alt="">
          <p>已完成</p>
        </div>
      </div>
      <div class="blank"></div>
      <cell is-link to="/address/list/list">
        <template slot="title">
          <span class="cell-text">我的地址</span>
        </template>
      </cell>
      <cell is-link to="/my/coupon/list">
        <template slot="title">
          <span class="cell-text">优惠券</span>
        </template>
      </cell>
    </cell-group>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell, CellGroup, Tabbar, TabbarItem } from 'vant'
import { loadUserCenter } from '@/api'

@Component({
  components: {
    Cell,
    CellGroup,
    Tabbar,
    TabbarItem
  }
})
export default class Info extends Vue {
  userInfo: any = {
    image: '',
    nickName: '',
    mobileFlag: true,
    orderState: {
      10: false,
      30: false
    }
  }
  mounted() {
    loadUserCenter().then(res => {
      this.userInfo = res.data
    })
  }
}
</script>

<style lang="scss">
  .info{
    .user{
      display: flex;
      flex-flow: row;
      align-items: center;
      background: linear-gradient(to right, #2DC3C4, #72D8D9);
      .avatar{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        margin: 50px 40px;
      }
      .username{
        flex-grow: 1;
        color: $--color-white;
        .name{
          font-size:32px;
          line-height: 1.5;
        }
        .subtitle{
          font-size:22px;
          opacity: 0.6;
          line-height: 22px;
        }
      }
    }
    .bind-phone{
      align-items: center;
      .bind-text{
        font-size: 22px;
      }
      .van-cell__value{
        flex: inherit;
        width: 110px;
        padding-top: 3px;
      }
    }
    .all-order{
      color: #B2B2B2;
    }
    .cell-text{
      color: $--color-black;
    }
    .blank{
      height: 15px;
      background-color: $--color-body;
    }
    .order-type{
      display: flex;
      flex-flow: row;
      align-items: center;
      height: 130px;
      padding-bottom: 10px;
      & > div{
        text-align: center;
        position: relative;
        flex-grow: 1;
        img {
          width: 75px;
        }
        p{
          font-size: 22px;
          margin-top: -10px;
        }
        .order-mark{
          display: inline-block;
          position: absolute;
          top: 18px;
          margin-left: 14px;
          width: 9px;
          height: 9px;
          border: 2px solid $--color-white;
          background-color: #F12C20;
          border-radius: 50%;
        }
      }
    }
  }
</style>
