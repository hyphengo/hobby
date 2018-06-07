<template>
  <div
    class="index"
  >
    <div class="aaa">jahah</div>
    <tabbar>
      <tabbar-item icon="shop">标签</tabbar-item>
      <tabbar-item icon="chat" dot>标签</tabbar-item>
      <tabbar-item icon="records" info="5">标签</tabbar-item>
      <tabbar-item icon="gold-coin" info="20">标签</tabbar-item>
    </tabbar>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Tabbar, TabbarItem } from 'vant';

@Component({
  components: {
    Tabbar,
    TabbarItem
  }
})
export default class Index extends Vue {

}
</script>

<style lang="scss">
.aaa{
  font-size: 24px;
}
</style>
