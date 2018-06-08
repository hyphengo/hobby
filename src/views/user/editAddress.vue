<template>
  <div class="edit">
    <cell-group>
      <vant-cell value="选择小区" is-link>
        <template slot="title">
          <span class="cell-text">小区</span>
          <span class="community">{{address}}</span>
        </template>
      </vant-cell>
      <vant-field
        v-model="card"
        label="门牌号"
        placeholder="几栋几单元几室，如8栋2单元2204室"
      ></vant-field>
      <div class="blank"></div>
      <vant-field
        v-model="name"
        label="联系人"
        placeholder="请填写您的姓名"
      ></vant-field>
      <vant-field
        v-model="phone"
        label="手机号码"
        placeholder="请填写您的手机号码"
      ></vant-field>
      <div class="save-box">
        <vant-button class="save-btn" size="large" type="primary" @click="saveClick" >保存</vant-button>
      </div>
    </cell-group>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell, CellGroup, Field, Button, Toast } from 'vant'

@Component({
  components: {
    'VantCell': Cell,
    CellGroup,
    'VantField': Field,
    'VantButton': Button
  }
})
export default class Edit extends Vue {
  address: string = ''
  card: string = ''
  name: string = ''
  phone: string = ''
  saveClick() {
    if (!this.address) {
      Toast('请选择小区')
    } else if (!this.card) {
      Toast('请填写门牌号')
    } else if (this.card.length > 15) {
      Toast('门牌号不得大于15个字')
    } else if (!this.name) {
      Toast('请填写联系人')
    } else if (this.name.length > 8) {
      Toast('联系人不得大于8个字')
    } else if (!this.phone) {
      Toast('请填写手机号码')
    } else if (!/^[1][1-9][0-9]{9}$/.test(this.phone)) {
      Toast('请填写11位手机号码')
    } else {
      Toast('保存')
    }
  }
}
</script>

<style lang="scss">
.edit{
  color: $--color-black;
  .blank{
    height: 15px;
    background-color: $--color-body;
  }
  .community{
    padding-left: 120px;
  }
  .save-box{
    padding-top: 30px;
    text-align: center;
    background-color: $--color-body;
    .save-btn{
      width: 80%;
    }
  }
}
</style>
