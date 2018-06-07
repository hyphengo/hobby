<template>
  <div
    class="index"
  >
    <transition :name="pageTransition">
      <router-view class="transition-router-view" />
    </transition>
    <tabbar
      v-model="active"
      @change="tabChange"
    >
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

  tabChange(key) {
    switch (key) {
      case 0:
        this.$router.push('/index/home')
        break
      case 1:
        this.$router.push('/index/browse')
        break
      case 2:
        this.$router.push('/index/cart')
        break
      case 3:
        this.$router.push('/index/my')
        break
      default:
        this.$router.push('/index/home')
        break
    }
  }

  mounted() {
    switch (this.$route.name) {
      case '首页':
        this.active = 0
        break
      case '逛逛':
        this.active = 1
        break
      case '购物车':
        this.active = 2
        break
      case '我的':
        this.active = 3
        break
    }
  }
}
</script>

<style lang="scss">
.transition-router-view {
  position: relative;
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
.index{
  padding-bottom: 100px;
}
</style>
