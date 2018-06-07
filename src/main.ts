// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
/* START 引入 awesome iconfonts */
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'
/* END 引入 awesome iconfonts */
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Loading,
  Dialog,
  Toast,
  Row,
  Col,
  Card,
  Checkbox,
  Icon
} from 'vant'
import './assets/index.scss'

const unsync = sync(store, router) // eslint-disable-line

Vue.config.productionTip = false

// Vue.use(vant)

Vue.prototype.$toast = Toast
Vue.prototype.$dialog = Dialog

// awesome icons
fontawesome.library.add(solid)
fontawesome.library.add(regular)
fontawesome.library.add(brands)

// 注册组件
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('van-icon', Icon)
Vue.component('van-loading', Loading)
Vue.component('van-row', Row)
Vue.component('van-col', Col)
Vue.component('van-card', Card)
Vue.component('van-checkbox', Checkbox)

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App,
  },
  template: '<App/>'
})
