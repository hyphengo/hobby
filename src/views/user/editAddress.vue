<template>
  <div class="edit">
    <cell-group>
      <cell value="选择小区" is-link>
        <template slot="title">
          <span class="cell-text">小区</span>
        </template>
      </cell>
      <cell is-link>
        <template slot="title">
          <span class="cell-text">门牌号</span>
        </template>
      </cell>
    </cell-group>
    <cell-group>
      <cell>
        <template slot="title">
          <span class="cell-text">联系人</span>
        </template>
      </cell>
      <cell>
        <template slot="title">
          <span class="cell-text">手机号码</span>
        </template>
        <template slot="value">
          <span class="cell-text">手机号码</span>
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
export default class Edit extends Vue {

}
</script>

<style lang="scss">
.address{
  display: flex;
  flex-flow: row;
  .edit{
    width: 30px;
  }
}
</style>
