<template>
  <div
    class="search"
  >
    <van-search
      v-model="value"
      show-action
      @search="onSearch"
      placeholder="搜索商品"
    >
      <div slot="action" @click="onSearch">
        <van-button size="small">搜索</van-button>
      </div>
    </van-search>
    <cell-group>
      <van-cell
        v-for="(item, index) in searchHistory"
        :key="index"
        :title="item"
      >
        <van-icon
          slot="right-icon"
          name="delete"
          class="van-cell__right-icon"
          @click="handleDelete(index)"
        />
      </van-cell>
    </cell-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import { Getter, Action } from 'vuex-class'
import { Search, Cell, CellGroup } from 'vant'
import ls from '@/util/localStorage'

const lsSearchKey: string = 'COCOWA_SEARCH_HISTORY'

@Component({
  components: {
    'van-search': Search,
    'van-cell': Cell,
    CellGroup
  }
})
export default class SearchPage extends Vue {
  value: string = ''
  searchHistory: Array<string> = ls.get(lsSearchKey) || []

  onSearch() {
    const indexKey = this.searchHistory.indexOf(this.value)

    if (indexKey === -1) {
      this.searchHistory.unshift(this.value)
      ls.set(lsSearchKey, this.searchHistory)
    } else {

    }
  }

  handleDelete(index) {
    this.searchHistory.splice(index, 1)
    ls.set(lsSearchKey, this.searchHistory)
  }

  mounted() {

  }
}
</script>

<style lang="scss">
.van-search__action{
  width: 150px;
  text-align: center;
}
</style>
