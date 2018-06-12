<template>
  <transition :name="pageTransition">
    <router-view class="transition-router-view" />
  </transition>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter, State } from 'vuex-class'

@Component
export default class Layout extends Vue {
  @Getter('auth/isAuth') isAuth: boolean
  @State('route') route: any

  // @Watch('route')
  // watchRoute(to, from) {}

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
  overflow: scroll;
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
