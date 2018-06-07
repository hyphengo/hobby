<template>
  <div class="index">
    <div class="address">
      <div class="info"></div>
      <div class="edit"></div>
    </div>
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
export default class Index extends Vue {

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
