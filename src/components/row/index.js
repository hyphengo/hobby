import Row from './Row.vue'

Row.install = function (Vue) {
  Vue.component(Row.name || 'VeRow', Row)
}

export default Row
