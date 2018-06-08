<template>
  <div class="city">
    <van-cell class="van-hairline--bottom" title="单元格" is-link />
    <div class="blank"></div>
    <van-cell value="单元格" />
    <van-cell value="单元格" />
    <van-cell value="单元格" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell } from 'vant'

@Component({
  components: {
    'VanCell': Cell,
  }
})
export default class City extends Vue {

}
</script>

<style lang="scss">
  .city{
    .blank{
      height: 15px;
      background-color: $--color-body;
    }
  }
</style>
