<template>
  <div class="index">
    <nav-bar title="我的"/>
    <div class="user">
      <img src="" alt="">
      <p>黄龙真人</p>
    </div>
    <cell-group>
      <cell value="更多订单" is-link>
        <template slot="title">
          <span class="cell-text">我的订单</span>
        </template>
      </cell>
      <cell is-link>
        <template slot="title">
          <span class="cell-text">我的地址</span>
        </template>
      </cell>
      <cell is-link>
        <template slot="title">
          <span class="cell-text">优惠卷</span>
        </template>
      </cell>
    </cell-group>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { NavBar, Cell, CellGroup } from 'vant'

@Component({
  components: {
    NavBar,
    Cell,
    CellGroup
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
