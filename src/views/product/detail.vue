<template>
  <div class="detail">
    <swipe
      class="detail-swipe"
      :autoplay="5000"
    >
      <swipe-item
        v-for="(item, index) in detail.images"
        :key="index"
      >
        <img :src="item" />
      </swipe-item>
    </swipe>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { Swipe, SwipeItem } from 'vant'

@Component({
  components: {
    Swipe,
    SwipeItem,
  }
})
export default class Detail extends Vue {
  @Action('product/getProductDetail') getProductDetail: any
  @Getter('product/detail') detail: Object

  mounted() {
    this.getProductDetail(this.$route.params.id)
  }
}
</script>

<style lang="scss">
.detail{

}
</style>
