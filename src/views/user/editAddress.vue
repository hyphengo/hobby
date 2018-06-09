<template>
  <div class="edit">
    <cell-group>
      <van-cell :value="getCommunityName?getCommunityName:'选择小区'" is-link to="/my/city">
        <template slot="title">
          <span class="cell-text">小区</span>
        </template>
      </van-cell>
      <van-field
        v-model="card"
        label="门牌号"
        placeholder="几栋几单元几室，如8栋2单元2204室"
      />
      <div class="blank"></div>
      <van-field
        v-model="name"
        label="联系人"
        placeholder="请填写您的姓名"
      />
      <van-field
        v-model="phone"
        label="手机号码"
        placeholder="请填写您的手机号码"
      />
      <div class="save-box">
        <van-button class="save-btn" size="large" type="primary" @click="saveClick" >保存</van-button>
      </div>
    </cell-group>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell, CellGroup, Field } from 'vant'
import { Getter } from 'vuex-class'

@Component({
  components: {
    'VanCell': Cell,
    CellGroup,
    'VanField': Field,
  }
})
export default class Edit extends Vue {
  @Getter('address/getCommunityName') getCommunityName: string
  card: string = ''
  name: string = ''
  phone: string = ''
  saveClick() {
    if (!this.getCommunityName) {
      this.$toast('请选择小区')
    } else if (!this.card) {
      this.$toast('请填写门牌号')
    } else if (this.card.length > 15) {
      this.$toast('门牌号不得大于15个字')
    } else if (!this.name) {
      this.$toast('请填写联系人')
    } else if (this.name.length > 8) {
      this.$toast('联系人不得大于8个字')
    } else if (!this.phone) {
      this.$toast('请填写手机号码')
    } else if (!/^[1][1-9][0-9]{9}$/.test(this.phone)) {
      this.$toast('请填写11位手机号码')
    } else {
      this.$toast('保存')
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
