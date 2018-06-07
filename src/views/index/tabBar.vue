<template>
  <div
    class="index"
  >
    <transition :name="pageTransition">
      <router-view class="transition-router-view" />
    </transition>
    <tabbar v-model="active">
      <tabbar-item icon="wap-home">首页</tabbar-item>
      <tabbar-item icon="gift" dot>逛逛</tabbar-item>
      <tabbar-item icon="cart" info="5">购物车</tabbar-item>
      <tabbar-item icon="contact">我的</tabbar-item>
    </tabbar>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Tabbar, TabbarItem } from 'vant'

@Component({
  components: {
    Tabbar,
    TabbarItem
  }
})
export default class Index extends Vue {
  active: number = 0
  pageTransition: string = 'slide-left'
}
</script>

<style lang="scss">
.transition-router-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all .5s cubic-bezier(.55,0,.1,1);
}

.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  transform: translate(60px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  transform: translate(-60px, 0);
}
</style>
