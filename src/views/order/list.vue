<template>
  <div
    class="list"
  >
    <van-tabs v-model="active">
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
        v-if="list.data.length > 0"
        v-for="(item) in list.data"
        :key="item.id"
      >
        <ve-row>
          <ve-col>
            {{item.shopName}}
          </ve-col>
          <ve-col>
            {{item.stateDetail}}
          </ve-col>
        </ve-row>
      </div>
    </van-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import { Tab, Tabs, List } from 'vant'
import HelperPullRefresh from '@/helper/HelperPullRefresh'

@Component({
  components: {
    'van-tab': Tab,
    'van-tabs': Tabs,
    'van-list': List,
  }
})
export default class OrderList extends Vue {
  @Action('order/getOrderList') getOrderList: any
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

  mounted() {
    this.pageConfig.others.query = {
      state: '0'
    }
    this.pullRefreshAction(0)
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
</style>
