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
        <vant-button slot="button" size="small" type="primary" :disabled="verify" @click="verifyClick" >{{ verifying }}</vant-button>
      </vant-field>
      <vant-button size="large" :disabled="define" @click="defineClick" >确定</vant-button>
    </cell-group>
  </div>

</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Field, CellGroup, Button, Toast } from 'vant'

@Component({
  components: {
    'VantField': Field,
    CellGroup,
    'VantButton': Button
  }
})
export default class Bind extends Vue {
  verify: boolean = true
  define: boolean = true
  phone: string = ''
  sms: string = ''
  verifying: string = '发送验证码'
  verifyClick() {
    this.verify = true
    let iTime = 60
    this.verifying = `${iTime}S后重新获取`
    let interval = setInterval(() => {
      this.verifying = `${iTime - 1}S后重新获取`
      if (iTime-- <= 0) {
        this.verify = false
        this.verifying = '重新获取验证码'
        clearInterval(interval)
      }
    }, 1000)
  }
  defineClick() {
    Toast('验证码不对，请换个姿势~')
  }
  get defineBtn() {
    const { verify, sms } = this
    return {
      verify,
      sms
    }
  }
  @Watch('phone')
  phoneChange(newValue) {
    this.verify = !/^[1][1-9][0-9]{9}$/.test(newValue)
  }
  @Watch('defineBtn')
  defineBtnChange(newValue) {
    let smsVerify = !/^[0-9]{6}$/.test(newValue.sms)
    this.define = !(newValue.verify && !smsVerify)
  }
}
</script>

<style lang="scss">
.aaa{
  font-size: 24px;
}
</style>
