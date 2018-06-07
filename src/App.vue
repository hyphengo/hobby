<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  isRouterAlive: boolean = true

  @Provide()
  reload() {
    this.isRouterAlive = false
    this.$nextTick(() => {
      this.isRouterAlive = true
    })
  }
}
</script>
