<template>
  <div
    v-if="isShow"
    class="float-cart"
    id="moveDiv"
    @mousedown="down"
    @touchstart="down"
    @mousemove="move"
    @touchmove="move"
    @mouseup="end"
    @touchend="end"
    @click="() => $router.push('/index/cart')"
  >
    <van-icon name="cart" :info="cartCount" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

@Component
export default class FloatCart extends Vue {
  @Prop({default: false}) isShow: boolean

  @Action('cart/getCount') getCount: any
  @Getter('cart/count') cartCount: any

  flags: boolean = false

  position: any = {
    x: 0,
    y: 0
  }

  nx: any = ''
  ny: any = ''
  dx: any = ''
  dy: any = ''
  xPum: any = ''
  yPum: any = ''

  // 实现移动端拖拽
  down(event) {
    const moveDiv = window.document.getElementById('moveDiv')
    this.flags = true
    let touch = null
    if (event.touches) {
      touch = event.touches[0]
    } else {
      touch = event
    }
    this.position.x = touch.clientX
    this.position.y = touch.clientY
    this.dx = moveDiv.offsetLeft
    this.dy = moveDiv.offsetTop
  }
  move(event) {
    const moveDiv = window.document.getElementById('moveDiv')
    if (this.flags) {
      let touch = null
      if (event.touches) {
        touch = event.touches[0]
      } else {
        touch = event
      }
      this.nx = touch.clientX - this.position.x
      this.ny = touch.clientY - this.position.y
      this.xPum = this.dx + this.nx
      this.yPum = this.dy + this.ny
      moveDiv.style.left = this.xPum + 'px'
      moveDiv.style.top = this.yPum + 'px'
      // 阻止页面的滑动默认事件
      document.addEventListener('touchmove', () => {
        event.preventDefault()
      }, false)
    }
  }
  // 鼠标释放时候的函数
  end() {
    this.flags = false
  }

  mounted() {
    this.getCount()
  }
}
</script>

<style lang="scss">
.float-cart{
  height: 100px;
  width: 100px;
  z-index: 990;
  position: fixed;
  bottom: 50px;
  right: 50px;
  border-radius: 50%;
  background-color: $--color-base;
  display: flex;
  justify-content: center;
  align-items: center;
  touch-action: none;

  .van-icon{
    font-size: 40px;
    color: $--color-white;
  }
}
</style>
