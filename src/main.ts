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
  Col
} from 'vant'
import './assets/index.scss'

const unsync = sync(store, router) // eslint-disable-line

Vue.config.productionTip = false

// 注册组件
const vant: object = {
  Loading,
  Dialog,
  Toast,
  Row,
  Col
}
// Vue.use(vant)

Vue.prototype.$toast = Toast
Vue.prototype.$dialog = Dialog

// awesome icons
fontawesome.library.add(solid)
fontawesome.library.add(regular)
fontawesome.library.add(brands)

Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App,
    ...vant
  },
  template: '<App/>'
})
