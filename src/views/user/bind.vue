<template>
  <div class="index">
    <nav-bar
      title="绑定手机号"
      left-arrow
    />
    <cell-group>
      <vant-field
        v-model="phone"
        label="手机号"
        placeholder="请填写手机号码"
        error
      />
      <vant-field
        center
        v-model="sms"
        label="短信验证码"
        placeholder="请输入短信验证码"
        icon="clear"
        @click-icon="sms = ''"
      >
        <vant-button slot="button" size="small" type="primary" :disable="false">发送验证码</vant-button>
      </vant-field>
    </cell-group>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { NavBar, Field, CellGroup, Button } from 'vant'

@Component({
  components: {
    NavBar,
    'VantField': Field,
    CellGroup,
    'VantButton': Button
  }
})
export default class Index extends Vue {

}
</script>

<style lang="scss">
.aaa{
  font-size: 24px;
}
</style>
