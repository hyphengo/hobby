<template>
  <div class="detail">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { Swipe, SwipeItem } from 'vant'

@Component({
  components: {
    Swipe,
    SwipeItem,
  }
})
export default class Detail extends Vue {


  mounted() {
    console.log(this.$route.params.id)
  }
}
</script>

<style lang="scss">
.detail{

}
</style>
