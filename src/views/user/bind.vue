<template>
  <div class="bind">
    <cell-group>
      <van-field
        v-model="phone"
        label="手机号"
        placeholder="请填写手机号码"
      />
      <van-field
        center
        v-model="sms"
        label="短信验证码"
        placeholder="请输入短信验证码"
        icon="clear"
        @click-icon="sms = ''"
      >
        <van-button slot="button" size="small" type="primary" :disabled="verify" @click="verifyClick" >{{ verifying }}</van-button>
      </van-field>
    </cell-group>
    <div class="save-box">
      <van-button class="save-btn" size="large" type="primary" :disabled="define" @click="defineClick" >确定</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Field, CellGroup } from 'vant'
import { sendVeriCode, bindingMobile } from '@/api'

@Component({
  components: {
    'VanField': Field,
    CellGroup
  }
})
export default class Bind extends Vue {
  verify: boolean = true
  define: boolean = true
  interval: any = null
  phone: string = ''
  sms: string = ''
  verifying: string = '发送验证码'
  verifyClick() {
    this.verify = true
    let iTime = 60
    this.verifying = `${iTime}S后重新获取`
    this.interval = setInterval(() => {
      this.verifying = `${iTime - 1}S后重新获取`
      if (iTime-- <= 0) {
        this.verify = false
        this.verifying = '重新获取验证码'
        clearInterval(this.interval)
      }
    }, 1000)
    sendVeriCode({mobile: this.phone, type: 2})
  }
  defineClick() {
    bindingMobile({mobile: this.phone, verificationCode: this.sms}).then(res => {
      this.$router.back()
    })
  }
  get defineBtn() {
    const { phone, sms } = this
    return {
      phone,
      sms
    }
  }
  @Watch('phone')
  phoneChange(newValue) {
    this.verify = !/^[1][1-9][0-9]{9}$/.test(newValue)
    if (!newValue) {
      clearInterval(this.interval)
      this.verify = true
      this.verifying = '发送验证码'
    }
  }
  @Watch('defineBtn')
  defineBtnChange(newValue) {
    let phoneVerify = !/^[1][1-9][0-9]{9}$/.test(newValue.phone)
    let smsVerify = !/^[0-9]{6}$/.test(newValue.sms)
    this.define = !(!phoneVerify && !smsVerify)
  }
}
</script>

<style lang="scss">
  .bind{
    .save-box{
      text-align: center;
      background-color: $--color-body;
      padding: 30px;
      .save-btn{
        height: 80px;
        line-height: 80px;
      }
    }
    .van-button{
      &--primary{
        color: $--color-white;
        background-color: $--color-base;
        border-color: $--color-base;
      }
      &--disabled{
        color: $--color-disabled;
        background-color: #eee;
        border-color: #e5e5e5;
      }
    }
  }
</style>
