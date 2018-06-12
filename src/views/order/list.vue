<template>
  <div
    class="list"
  >
    <van-tabs v-model="active" @click="handleTabChange">
      <van-tab title="全部" />
      <van-tab title="待付款" />
      <van-tab title="待接单" />
      <van-tab title="已完成" />
    </van-tabs>
    <van-list
      class="order-list"
      v-model="pageConfig.loading"
      :finished="pageConfig.finished"
      @load="pullRefreshAction"
      :immediate-check="false"
    >
      <div
        class="order-list-item"
        v-if="list.items.length > 0"
        v-for="(item) in list.items"
        :key="item.id"
      >
        <ve-row class="order-list-title">
          <ve-col :span="20">
            {{item.shopName}}
          </ve-col>
          <ve-col :span="4" textAlign="right">
            {{item.stateDetail}}
          </ve-col>
        </ve-row>
        <div class="order-list-product">
          <div
            v-for="(product, index) in item.items"
            :key="product.productId"
            v-if="index < 5"
            class="order-list-product-item"
          >
            <img :src="product.productImg" />
          </div>
          <van-icon name="arrow order-list-product-arrow" />
        </div>
        <ve-row class="order-list-title">
          <ve-col :span="20">
            {{`${item.itemCount}种商品，共${item.saleCount}件`}}
          </ve-col>
          <ve-col :span="4" textAlign="right">
            合计: ￥{{item.totalPrice}}
          </ve-col>
        </ve-row>
        <ve-row class="order-list-title van-hairline--top" align="center">
          <ve-col :span="4">
            <van-tag plain type="danger" v-if="item.productType === '2'">预售</van-tag>
          </ve-col>
          <ve-col :span="20" textAlign="right">
            <van-button v-if="item.state !== 10" class="order-list-btn" type="default">联系店铺</van-button>
            <van-button v-if="item.state === 10" class="order-list-btn" type="default">取消</van-button>
            <van-button v-if="item.state === 10" class="order-list-btn custom" type="default">买单</van-button>
            <van-button v-if="item.state === 30 || item.state === 60 || item.state === 70" class="order-list-btn custom" type="default">再买</van-button>
          </ve-col>
        </ve-row>
      </div>
      <p
        class="order-list-tip"
        v-if="!pageConfig.loading && !pageConfig.empty && pageConfig.finished"
      >
        别看了，真的没有了~
      </p>
      <div
        v-if="!pageConfig.loading && pageConfig.empty"
        class="order-list-empty"
      >
        <van-icon name="shop" />
        没订单，应该去买点什么吧~
        <van-button type="default">去看看</van-button>
    </div>
    </van-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import { Tab, Tabs, List, Tag } from 'vant'
import HelperPullRefresh from '@/helper/HelperPullRefresh'

@Component({
  components: {
    'van-tab': Tab,
    'van-tabs': Tabs,
    'van-list': List,
    'van-tag': Tag
  }
})
export default class OrderList extends Vue {
  @Action('order/getOrderList') getOrderList: any
  @Action('order/clearOrderList') clearOrderList: any
  @Getter('order/list') list: any

  active: number = 0

  pageConfig: any = {
    others: {
      query: ''
    }
  }

  @HelperPullRefresh('getOrderList', 'list')
  pullRefreshAction(page: number = 1) {

  }

  handleTabChange(index) {
    switch (index) {
      case 0:
        this.$router.replace('/order/list#all')
        break
      case 1:
        this.$router.replace('/order/list#wait')
        break
      case 2:
        this.$router.replace('/order/list#pick')
        break
      case 3:
        this.$router.replace('/order/list#done')
        break
    }
    this.clearOrderList()
  }

  @Watch('$route.hash')
  changeHash(val) {
    this.search(val)
  }

  search(hash) {
    switch (hash) {
      case '#all':
        this.pageConfig.others.query = {
          state: '0'
        }
        this.active = 0
        break
      case '#wait':
        this.pageConfig.others.query = {
          state: '10'
        }
        this.active = 1
        break
      case '#pick':
        this.pageConfig.others.query = {
          state: '30'
        }
        this.active = 2
        break
      case '#done':
        this.pageConfig.others.query = {
          state: '60'
        }
        this.active = 3
        break
      default:
        this.pageConfig.others.query = {
          state: '0'
        }
        this.active = 0
        break
    }
    this.pullRefreshAction(0)
  }

  mounted() {
    this.search(this.$route.hash)
  }
}
</script>

<style lang="scss">
.list{
  .van-tab--active{
    color: $--color-base;
  }

  .van-tabs__line{
    background-color: $--color-base;
  }
}
.order-list{

  &-item{
    margin-top: 20px;
  }

  &-title{
    background-color: $--color-white;
    padding: 20px 30px;
  }

  &-tip{
    text-align: center;
    color: #999;
    padding: 20px 0;
  }

  &-empty{
    display: flex;
    flex-direction: column;
    padding: 50px 180px;
    align-items: center;
    font-size: 28px;
    margin-top: 50px;

    .van-icon{
      font-size: 48px;
      margin-bottom: 30px;
    }

    .van-button{
      background-color: $--color-base;
      color: $--color-white;
      margin-top: 30px;
      height: 70px;
      line-height: 70px;
    }
  }

  &-product{
    display: flex;
    align-items: center;
    padding: 36px 40px;
    background-color: #F7F7FA;
    position: relative;

    &-arrow{
      position: absolute;
      right: 20px;
    }

    &-item{
      margin-right: 30px;

      :last-child{
        margin-right: 0;
      }
    }

    img{
      height: 100px;
      width: 100px;
    }
  }

  &-btn{
    height: 70px;
    line-height: 70px;
    font-size: 24px;

    &.custom{
      background-color: $--color-base;
      // border: 1px solid $--color-base;
      color: $--color-white;
    }
  }
}
</style>
