<template>
  <div
    class="search"
  >
  <van-search
    v-model="value"
    show-action
    @search="onSearch"
  >
    <div slot="action" @click="onSearch">搜索</div>
  </van-search>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import { Getter, Action } from 'vuex-class'
import { Search } from 'vant'

@Component({
  components: {
    'van-search': Search
  }
})
export default class Index extends Vue {
  value: string = ''

  onSearch() {

  }

  mounted() {

  }
}
</script>

<style lang="scss">

</style>
