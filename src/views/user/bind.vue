<template>
  <div class="bind">
    <cell-group>
      <vant-field
        v-model="phone"
        label="手机号"
        placeholder="请填写手机号码"
      ></vant-field>
      <vant-field
        center
        v-model="sms"
        label="短信验证码"
        placeholder="请输入短信验证码"
        icon="clear"
        @click-icon="sms = ''"
      >
        <vant-button slot="button" size="small" type="primary" :disabled="verify">发送验证码</vant-button>
      </vant-field>
    </cell-group>
  </div>

</template>

<script lang="ts">
import { Component, Vue, Provide, Watch } from 'vue-property-decorator'
import { Field, CellGroup, Button } from 'vant'

@Component({
  components: {
    'VantField': Field,
    CellGroup,
    'VantButton': Button
  }
})
export default class Bind extends Vue {
  @Provide() verify = true
  @Provide() phone = ''
  @Provide() sms = ''
  @Watch('phone')
  phoneChange(newValue) {
    if (/^[1][1-9][0-9]{9}$/.test(newValue)) {
      this.verify = false
    } else {
      this.verify = true
    }
  }
}
</script>

<style lang="scss">
.aaa{
  font-size: 24px;
}
</style>
