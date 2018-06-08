<template>
  <div class="info">
    <div class="user">
      <img class="avatar" src="" alt="">
      <div class="username">
        <p class="name">微信昵称</p>
        <span class="subtitle">可可蛙社区服务</span>
      </div>
    </div>
    <cell-group>
      <cell is-link>
        <template slot="title">
          <span class="cell-text">我的订单</span>
        </template>
        <span class="all-order">全部订单</span>
      </cell>
      <div class="order-type">
        <div>
          <vant-icon name="pending-payment" />
          <p>待付款</p>
          <span class="order-mark"></span>
        </div>
        <div>
          <vant-icon name="pending-orders" />
          <p>待接单</p>
        </div>
        <div>
          <vant-icon name="pending-deliver" />
          <p>已完成</p>
        </div>
      </div>
      <div class="blank"></div>
      <cell is-link to="/my/address">
        <template slot="title">
          <span class="cell-text">我的地址</span>
        </template>
      </cell>
      <cell is-link to="/my/coupon">
        <template slot="title">
          <span class="cell-text">优惠卷</span>
        </template>
      </cell>
    </cell-group>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell, CellGroup, Icon } from 'vant'


@Component({
  components: {
    Cell,
    CellGroup,
    'VantIcon': Icon
  }
})
export default class Info extends Vue {

}
</script>

<style lang="scss">
  .info{
    .user{
      display: flex;
      flex-flow: row;
      background: linear-gradient(to right, #2DC3C4, #72D8D9);
      .avatar{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        margin: 50px 40px;
      }
      .username{
        padding-top: 58px;
        flex-grow: 1;
        color: $--color-white;
        .name{
          font-size:32px;
          line-height: 32px;
        }
        .subtitle{
          font-size:22px;
          line-height: 22px;
        }
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
      text-align: center;
      height: 140px;
      & > div{
        position: relative;
        padding-top: 30px;
        flex-grow: 1;
        p{
          font-size: 22px;
        }
        .order-mark{
          position: absolute;
          top: 30px;
          margin-left: 18px;
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
