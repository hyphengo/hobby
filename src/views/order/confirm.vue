<template>
  <div
    class="confirm"
  >
    <product-info
      :order="order"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import { Getter, Action } from 'vuex-class'
// import { Cell, CellGroup } from 'vant'
import ProductInfo from '@/components/productInfo/index.vue'
import { loadOrder } from '@/api'

@Component({
  components: {
    ProductInfo
  }
})
export default class Confirm extends Vue {
  order: any = {}

  mounted() {
    loadOrder({initFlag: 0}).then(res => {
      this.order = res.data
    })
  }
}
</script>

<style lang="scss">
.confirm{

}
</style>
