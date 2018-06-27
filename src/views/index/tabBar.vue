<template>
  <div
    class="index"
  >
    <transition :name="pageTransition">
      <router-view :isShowBar="isShowBar" class="transition-router-view" />
    </transition>
    <tabbar
      v-model="active"
      @change="tabChange"
      v-if="isShowBar"
    >
      <tabbar-item>
        首页
        <template slot="icon" slot-scope="props">
          <img :src="props.active ? require('assets/images/home_active.png') : require('assets/images/home.png')" />
        </template>
      </tabbar-item>
      <tabbar-item>
        逛逛
        <template slot="icon" slot-scope="props">
          <img :src="props.active ? require('assets/images/browse_active.png') : require('assets/images/browse.png')" />
        </template>
      </tabbar-item>
      <tabbar-item :info="cartCount || null">
        购物车
        <template slot="icon" slot-scope="props">
          <img :src="props.active ? require('assets/images/cart_active.png') : require('assets/images/cart.png')" />
        </template>
      </tabbar-item>
      <tabbar-item icon="contact">
        我的
        <template slot="icon" slot-scope="props">
          <img :src="props.active ? require('assets/images/my_active.png') : require('assets/images/my.png')" />
        </template>
      </tabbar-item>
    </tabbar>
  </div>

</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { Tabbar, TabbarItem } from 'vant'

@Component({
  components: {
    Tabbar,
    TabbarItem
  }
})
export default class Index extends Vue {
  @Getter('cart/count') cartCount: number
  @Action('cart/getCount') getCount: Function
  active: number = 0
  pageTransition: string = 'slide-left'
  isShowBar: boolean = true

  tabChange(key) {
    switch (key) {
      case 0:
        this.$router.replace('/index/home')
        break
      case 1:
        this.$router.replace('/index/browse')
        break
      case 2:
        this.$router.replace('/index/cart')
        break
      case 3:
        this.$router.replace('/index/my')
        break
      default:
        this.$router.replace('/index/home')
        break
    }
  }

  @Watch('$route.name')
  changeActive(val) {
    switch (val) {
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

  @Watch('$route.query')
  changeQuery(newVal) {
    if (this.$route.query.show === 'hidden') {
      this.isShowBar = false
    } else {
      this.isShowBar = true
    }
  }

  mounted() {
    this.getCount()
    this.changeActive(this.$route.name)

    if (this.$route.query.show === 'hidden') {
      this.isShowBar = false
    }
  }
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
.van-tabbar-item--active{
  color: $--color-base !important;
}
.van-tabbar-item__icon{
  margin-bottom: 0;

  .van-icon__info{
    top: -.2em;
    font-size: 22px;
  }

  img{
    height: 48px !important;
  }
}
</style>
