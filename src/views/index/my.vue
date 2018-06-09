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
      <cell class="bind-phone" is-link to="/my/bind">
        <template slot="title">
          <span class="bind-text">我蛙：我们还能好好做朋友嘛~ 你手机号都不告诉我</span>
        </template>
        <span class="all-order">绑定手机号</span>
      </cell>
      <cell is-link>
        <template slot="title">
          <span class="cell-text">我的订单</span>
        </template>
        <span class="all-order">全部订单</span>
      </cell>
      <tabbar>
        <tabbar-item icon="pending-payment">待付款</tabbar-item>
        <tabbar-item icon="pending-orders" dot>待接单</tabbar-item>
        <tabbar-item icon="pending-deliver">已完成</tabbar-item>
      </tabbar>
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
    nickName: ''
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
        width: 140px;
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
    .van-tabbar--fixed{
      position: relative;
    }
    .van-tabbar{
      height: 140px;
      padding: 0 10px;
    }
    .van-tabbar-item__icon{
      margin-bottom: 15px;
    }
  }
</style>
