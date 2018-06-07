<template>
  <div
    class="home"
  >
    <swipe :autoplay="3000">
      <swipe-item>1</swipe-item>
      <swipe-item>2</swipe-item>
      <swipe-item>3</swipe-item>
      <swipe-item>4</swipe-item>
    </swipe>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Swipe, SwipeItem } from 'vant';

@Component({
  components: {
    Swipe,
    SwipeItem
  }
})
export default class Index extends Vue {

}
</script>

<style lang="scss">
</style>
