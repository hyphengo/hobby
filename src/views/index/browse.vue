<template>
  <div
    class="browse"
  >
    <div class="browse-search">
      <search />
    </div>
    <div class="browse-list tabbar-padding">
      <div class="browse-list-left">
        <ul>
          <li
            :class="['browse-list-item', {
              'active': item.categoryId === active
            }]"
            v-for="(item) in twoClass"
            :key="item.categoryId"
            @click="handleItem(item)"
          >
            {{item.name}}
          </li>
        </ul>
      </div>
      <div class="browse-list-right">
        <van-list
          class="browse-list-scroll"
          v-model="pageConfig.loading"
          :finished="pageConfig.finished"
          @load="pullRefreshAction"
          :immediate-check="false"
        >
          <div
            v-if="list.items.length > 0"
            v-for="(item) in list.items"
            :key="item.productId"
          >
            <ve-row align="center">
              <ve-col :span="21">
                <goods-card
                  :thumb="item.smallImage"
                  :price="item.price"
                  :title="item.name"
                  :unit="item.minUnit"
                />
              </ve-col>
              <ve-col :span="3" @click="handleAddCart(item)">
                <add-button />
              </ve-col>
            </ve-row>
          </div>
          <p
            class="browse-list-scroll-tip"
            v-if="!pageConfig.empty && pageConfig.finished"
          >
            别看了，真的没有了~
          </p>
          <div
            v-if="pageConfig.empty"
            class="browse-list-scroll-tip"
          >
            真想不到，竟然没有商品诶~
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { Badge, BadgeGroup, List } from 'vant'
import HelperPullRefresh from '@/helper/HelperPullRefresh'
import { searchCategories } from '@/api'
import Search from '@/components/search/index.vue'
import goodsCard from '@/components/goodsCard/GoodsCard.vue'
import AddButton from '@/components/add-button/index.vue'

@Component({
  components: {
    Search,
    Badge,
    BadgeGroup,
    'van-list': List,
    goodsCard,
    AddButton
  }
})
export default class Browse extends Vue {
  @Action('browse/searchProductList') searchProductList: any
  @Getter('browse/list') list: any
  @Action('cart/addCart') addCart: any
  active: string = null
  twoClass: any = null

  pageConfig: any = {
    others: {
      query: ''
    }
  }

  @HelperPullRefresh('searchProductList', 'list')
  pullRefreshAction(page: number = 1) {

  }

  handleItem(item) {
    this.active = item.categoryId
    this.changeClass([`${item.dimValId}`])
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

  changeClass(ids) {
    this.pageConfig.others.query = {
      dimensionIds: ids
    }
    this.pullRefreshAction(0)
  }

  mounted() {
    searchCategories().then(res => {
      this.twoClass = res.data
      this.active = res.data[0].categoryId
      this.changeClass([`${res.data[0].dimValId}`])
    })
  }
}
</script>

<style lang="scss">
.browse{
  background-color:: $--color-white;

  &-search{
    padding: 18px 20px;
  }

  &-list{
    height: 100%;
    display: flex;
    justify-content: space-between;

    &-left{
      flex-basis: 150px;
      flex-shrink: 0;
      overflow-y: auto;
    }

    &-right{
      flex-grow: 2;
    }

    &-scroll{
      height: 100%;
      overflow-y: auto;

      &-tip{
        text-align: center;
        color: #999;
        padding: 20px 0;
      }
    }

    &-item{
      width: 100%;
      height: 100px;
      color: #888888;
      background-color: #F5F5F7;
      text-align: center;
      line-height: 100px;

      &.active{
        color: $--color-base;
        background-color: $--color-white;
      }
    }
  }
}
</style>
