<template>
  <div
    class="search"
  >
    <van-search
      v-model="value"
      show-action
      @search="onSearch"
      placeholder="搜索商品"
      @focus="onSearchFocus"
    >
      <div slot="action" @click="onSearch">
        <van-button size="small">搜索</van-button>
      </div>
    </van-search>
    <cell-group v-show="isShowType">
      <van-cell
        v-for="(item, index) in searchHistory"
        :key="index"
        :title="item"
        @click="handleHistory(item, index)"
      >
        <van-icon
          slot="right-icon"
          name="delete"
          class="van-cell__right-icon"
          @click.stop="handleDelete(index)"
        />
      </van-cell>
    </cell-group>
    <product-list
      v-show="!isShowType"
      :term="term"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { Search, Cell, CellGroup } from 'vant'
import ProductList from '@/components/productList/index.vue'
import ls from '@/util/localStorage'

const lsSearchKey: string = 'COCOWA_SEARCH_HISTORY'

@Component({
  components: {
    'van-search': Search,
    'van-cell': Cell,
    CellGroup,
    ProductList
  }
})
export default class SearchPage extends Vue {
  @Action('search/setText') setText: any
  @Getter('search/text') text: any

  value: string = ''
  searchHistory: Array<string> = ls.get(lsSearchKey) || []
  // 控制显示搜索历史还是商品列表 true 为历史 flase 为商品列表
  isShowType: boolean = true
  // 当前搜索文字
  term: string = '.'

  onSearch() {
    // 本地存储历史逻辑
    const indexKey = this.searchHistory.indexOf(this.value)
    const val = this.value.replace(/(^\s+)|(\s+$)/g, '').replace(/\s/g, '')

    if (val.length > 0) {
      if (indexKey === -1) {
        this.searchHistory.unshift(val)
        ls.set(lsSearchKey, this.searchHistory)
      } else {
        const advance = this.searchHistory.splice(indexKey, 1)
        this.searchHistory.unshift(advance[0])
        ls.set(lsSearchKey, this.searchHistory)
      }
    }

    this.term = val
    this.isShowType = false
    this.setText(val)
  }

  handleDelete(index) {
    this.searchHistory.splice(index, 1)
    ls.set(lsSearchKey, this.searchHistory)
  }

  onSearchFocus() {
    this.isShowType = true
  }

  handleHistory(history, index) {
    this.term = history
    this.value = history
    this.isShowType = false

    const advance = this.searchHistory.splice(index, 1)
    this.searchHistory.unshift(advance[0])
    ls.set(lsSearchKey, this.searchHistory)

    this.setText(history)
  }

  mounted() {
    if (this.text) {
      this.value = this.text
      this.isShowType = false
    }
  }
}
</script>

<style lang="scss">
.search{
  overflow: hidden;
  padding-bottom: 90px;
}
.van-search__action{
  width: 150px;
  text-align: center;
}
</style>
