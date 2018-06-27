<template>
  <div
    class="invite-card"
  >
    <p
      class="invite-card-item van-hairline--bottom"
    >
      <img :src="require('assets/images/address.png')" />
      <span class="invite-card-tip">【{{text}}地址】</span>
      {{info.communityName}}{{info.detailAddress}}
    </p>
    <ve-row class="invite-card-item label van-hairline--bottom" align="center">
      <ve-col :span="6">
        {{text}}时间
      </ve-col>
      <ve-col :span="18">
        <span v-if="orderType === '2'">商品采购到店之后，</span>
        {{info.collectGoodsTime}}
      </ve-col>
    </ve-row>
    <ve-row class="invite-card-item label" align="center">
      <ve-col :span="6">
        {{text}}手机号
      </ve-col>
      <ve-col :span="18">
        <span v-if="disabled">{{info.cellphone}}</span>
        <input v-else class="invite-card-phone" v-model="phone" type="number" :placeholder="`您${text}到店的验证手机号码`" />
      </ve-col>
    </ve-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Action } from 'vuex-class'

@Component
export default class InviteCard extends Vue {
  @Prop() info: any
  @Prop() orderType: any
  @Prop() value: any
  @Prop({default: false}) disabled: any

  @Action('confirm/changePhone') changePhone: any

  phone: string = this.value

  get text() {
    switch (this.orderType) {
      case '0':
      case '2':
        return '自取'
      case '1':
        return '自送'
    }
  }

  @Watch('phone')
  inputPhone(newValue) {
    this.changePhone(newValue)
  }

  mounted() {
    if (!this.disabled && this.info.cellphone && !this.phone) {
      this.phone = this.info.cellphone
    }
  }
}
</script>

<style lang="scss">
.invite-card{
  background-color: $--color-white;

  &-tip{
    color: $--color-base;
    margin-right: 10px;
  }

  &-item{
    padding: 32px 20px;
    display: flex;
    align-items: center;

    &.label{
      padding-left: 55px;
    }
  }

  &-phone{
    width: 100%;
    height: 100%;
    border: 0;
  }
}
</style>
