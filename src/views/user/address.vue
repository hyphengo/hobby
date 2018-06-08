<template>
  <div class="address">
    <div class="info">左</div>
    <div class="edit">右</div>
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
export default class Address extends Vue {

}
</script>

<style lang="scss">
.address{
  display: flex;
  flex-flow: row;
  .info{
    flex-grow: 1;
  }
  .edit{
    width: 200px;
  }
}
</style>
