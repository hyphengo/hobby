<template>
  <div class="memo-card">
    <van-field
      v-model="message"
      label="备注"
      type="textarea"
      :placeholder="disabled ? '' : '还有什么要求呢~'"
      rows="1"
      autosize
      :disabled="disabled"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { Field } from 'vant'

@Component({
  components: {
    'van-field': Field
  }
})
export default class MemoCard extends Vue {
  @Prop({ default: false }) disabled: boolean
  @Prop({ default: '' }) value: any
  @Prop() note: any

  @Action('confirm/changeMemo') changeMemo: any

  message: any = this.value

  @Watch('message')
  inputPhone(newValue) {
    this.changeMemo(newValue)
  }

  @Watch('note')
  noteChange(val) {
    this.message = val
  }
}
</script>
<style lang="scss">
.memo-card{
  margin-top: 20px;

  .van-cell{
    padding: 25px 20px;
    font-size: $--base-font;

    span, textarea {
      color: #000 !important;
    }
  }
}
</style>
