<template>
  <van-icon
    class="add-button"
    name="add"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AddButton extends Vue {
  hanleClick() {
    this.$emit('click')
  }
  mounted() {

  }
}
</script>

<style lang="scss">
  .add-button{
    color: $--color-base;
    font-size: 36px;
  }
</style>
