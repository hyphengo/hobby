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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import { Action } from 'vuex-class'
import { Tab, Tabs } from 'vant'

@Component({
  components: {
    'van-tab': Tab,
    'van-tabs': Tabs
  }
})
export default class List extends Vue {
  active: number = 0

  mounted() {
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
