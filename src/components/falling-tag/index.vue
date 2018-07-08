<template>
  <div
    class="falling-tag"
  >
    <img :src="img" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { toFixed } from '@/util/util'

@Component
export default class FallingTag extends Vue {
  @Prop({default: false}) isShow: boolean
  @Prop() price: number

  url(p) {
    return `http://img.cocowa.com.cn/activity/bestprice_${p}.png`
  }

  get img() {
    const p = toFixed(Math.abs(this.price), 1).split('.')
    let integer = parseInt(p[0], 10) // 整数位
    const decimal = parseInt(p[1], 10) // 小数位
    let tail = 0

    if (decimal > 2 && decimal <= 7) {
      tail = 5
    }

    if (decimal > 7) {
      integer = integer + 1
    }

    return this.url(`${integer}${tail}`)
  }

  mounted() {

  }
}
</script>

<style lang="scss">
.falling-tag{
  position: relative;

  img {
    width: 46px !important;
    height: 62px !important;
    border-radius: 0 !important;
  }

  &.big img{
    width: 92px !important;
    height: 123px !important;
    border-radius: 0 !important;
  }
}
</style>
