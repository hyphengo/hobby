<template>
  <div
    class="invite-card"
  >
    <p
      class="invite-card-item van-hairline--bottom"
    >
      <img :src="require('assets/images/address.png')" />
      <span class="invite-card-tip">【自取地址】</span>
      {{info.communityName}}{{info.detailAddress}}
    </p>
    <ve-row class="invite-card-item label van-hairline--bottom" align="center">
      <ve-col :span="6">
        自送时间
      </ve-col>
      <ve-col :span="18">
        请在营业时间内自送到店（07:00-23:00）
      </ve-col>
    </ve-row>
    <ve-row class="invite-card-item label" align="center">
      <ve-col :span="6">
        自送手机号
      </ve-col>
      <ve-col :span="18">
        <input class="invite-card-phone" v-model="phone" type="number" placeholder="您自送到店的验证手机号码" />
      </ve-col>
    </ve-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator'

@Component
export default class InviteCard extends Vue {
  @Model('input') value: string
  @Prop() info: any

  phone: string = ''

  @Watch('phone')
  changePhone(newValue) {
    this.$emit('input', newValue)
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
