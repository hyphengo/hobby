<template>
  <van-list
    class="product-list"
    v-model="pageConfig.loading"
    :finished="pageConfig.finished"
    @load="pullRefreshAction"
    :immediate-check="false"
  >
    <pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div
        v-if="list.items.length > 0"
        v-for="(item, index) in list.items"
        :key="index"
      >
        <ve-row align="center">
          <ve-col :span="21">
            <goods-card
              :thumb="item.smallImage"
              :price="item.price"
              :title="item.name"
              :unit="item.minUnit"
              :id="item.productId"
            />
          </ve-col>
          <ve-col :span="3" @click="handleAddCart(item)">
            <add-button />
          </ve-col>
        </ve-row>
      </div>
      <p
        class="product-list-tip"
        v-if="!pageConfig.loading && !pageConfig.empty && pageConfig.finished && !isLoading"
      >
        别看了，真的没有了~
      </p>
      <div
        v-if="!pageConfig.loading && pageConfig.empty && !isLoading"
        class="product-list-tip"
      >
        真想不到，竟然没有商品诶~
      </div>
    </pull-refresh>
  </van-list>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { List, PullRefresh } from 'vant'
import HelperPullRefresh from '@/helper/HelperPullRefresh'
import Search from '@/components/search/index.vue'
import goodsCard from '@/components/goodsCard/GoodsCard.vue'
import AddButton from '@/components/add-button/index.vue'

@Component({
  components: {
    Search,
    'van-list': List,
    goodsCard,
    AddButton,
    PullRefresh
  }
})
export default class ProductList extends Vue {
  @Prop() term: string
  @Prop() ids: Array<any>

  @Action('product/searchProductList') searchProductList: any
  @Action('product/clearProductList') clearProductList: any
  @Getter('product/list') list: any
  @Action('cart/addCart') addCart: any

  pageConfig: any = {
    others: {
      query: ''
    }
  }

  isLoading: boolean = false

  @HelperPullRefresh('searchProductList', 'list')
  pullRefreshAction(page: number = 1) {
    this.isLoading = false
  }

  @Watch('term')
  searchForTerm(newTerm) {
    this.clearProductList()
    this.pageConfig.others.query = {
      searchTerm: newTerm
    }
    this.pullRefreshAction(0)
  }

  @Watch('ids')
  searchForIds(newIds) {
    this.clearProductList()
    this.pageConfig.others.query = {
      dimensionIds: newIds
    }
    this.pullRefreshAction(0)
  }

  handleAddCart(item) {
    this.addCart({
      id: item.productId,
      num: 1
    }).then(res => {
      if (res.code === 200) {
        this.$toast('添加购物车成功~')
      }
    })
  }

  onRefresh() {
    this.pullRefreshAction(0)
  }

  mounted() {

  }
}
</script>

<style lang="scss">
.product-list{
  background-color: $--color-white;
  height: 100%;
  overflow-y: auto;

  &-tip{
    text-align: center;
    color: #999;
    padding: 20px 0;
  }
  .van-pull-refresh__track{
    min-height: 1000px;
  }
}
</style>
