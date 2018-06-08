<template>
  <div class="info">
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
import { Cell, CellGroup } from 'vant'

@Component({
  components: {
    Cell,
    CellGroup
  }
})
export default class Info extends Vue {

}
</script>

<style lang="scss">
.aaa{
  font-size: 24px;
}
</style>
