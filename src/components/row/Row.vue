<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class VeRow extends Vue {
  @Prop({ default: 'top' }) align: string
  @Prop({ default: 'start' }) justify: string

  render(h) {
    return h(
      'div',
      {
        class: [
          'row',
          `row-justify-${this.justify}`,
          `row-align-${this.align}`
        ],
        on: this.$listeners
      },
      this.$slots.default
    )
  }
}
</script>
<style lang="scss">
.row {
  display: flex;

  // &:before,
  // &:after {
  //   display: none;
  // }

  &-justify-start {
    justify-content: flex-start;
  }

  &-justify-end {
    justify-content: flex-end;
  }

  &-justify-center {
    justify-content: center;
  }

  &-justify-between {
    justify-content: space-between;
  }

  &-justify-around {
    justify-content: space-around;
  }

  &-align-top {
    align-items: flex-start;
  }

  &-align-center {
    align-items: center;
  }

  &-align-bottom {
    align-items: flex-end;
  }
}
</style>
