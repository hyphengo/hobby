<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class VeCol extends Vue {
  @Prop({ default: 24 }) span: number
  @Prop({ default: false }) width: string | boolean
  @Prop({ default: 'left' }) textAlign: string

  handleClick(event) {
    this.$emit('click', event)
  }

  render(h) {
    const props = {
      class: `col col-${this.span} col-text-align-${this.textAlign}`,
      ...(this.width && { style: { width: this.width } }),
      on: {
        click: this.handleClick
      }
    }

    return h(
      'div',
      props,
      this.$slots.default
    )
  }
}
</script>
<style lang="scss">
.col {
  width: 50%;
  // overflow: hidden;
}

.col-text-align-center {
  text-align: center;
}

.col-text-align-right {
  text-align: right;
}

@for $i from 0 through 24 {
  .col-#{$i} {
    width: (1 / 24 * $i * 100) * 1%;
  }
}
</style>
