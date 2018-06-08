import Col from './Col.vue'

Col.install = function (Vue) {
  Vue.component(Col.name || 'VeCol', Col)
}

export default Col
