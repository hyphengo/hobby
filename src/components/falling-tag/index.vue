<template>
  <div
    class="falling-tag"
    v-if="$slots.default"
  >
    <p>
      直降
    </p>
    <p>
      <slot />
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class FallingTag extends Vue {
  @Prop({default: false}) isShow: boolean

  mounted() {
  }
}
</script>

<style lang="scss">
.falling-tag{
  width: 60px;
  height: 70px;
  background-image: url('~assets/images/tag@3x.png');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  text-align: center;
  box-sizing: border-box;
  line-height: 1;

  > p {
    margin: 0 !important;
    padding: 0 !important;
    color: $--color-white !important;
  }
}
</style>
