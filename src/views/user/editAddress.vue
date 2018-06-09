<template>
  <div class="edit">
    <cell-group>
      <van-cell :value="community.name?community.name:'选择小区'" is-link to="/my/city">
        <template slot="title">
          <span class="cell-text">小区</span>
        </template>
      </van-cell>
      <van-field
        v-model="detailAddress"
        label="门牌号"
        placeholder="几栋几单元几室，如8栋2单元2204室"
      />
      <div class="blank"></div>
      <van-field
        v-model="consigneeName"
        label="联系人"
        placeholder="请填写您的姓名"
      />
      <van-field
        v-model="phoneNumber"
        label="手机号码"
        placeholder="请填写您的手机号码"
      />
      <div class="blank"></div>
      <van-cell title="设为默认地址" >
        <van-checkbox v-model="defaultAddress" />
      </van-cell>
      <div class="save-box">
        <van-button class="save-btn" size="large" type="primary" @click="saveClick" >保存</van-button>
      </div>
    </cell-group>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell, CellGroup, Field, CheckboxGroup } from 'vant'
import { Getter } from 'vuex-class'
import { addAddress } from '@/api'

@Component({
  components: {
    'VanCell': Cell,
    CellGroup,
    'VanField': Field,
    CheckboxGroup,
  }
})
export default class Edit extends Vue {
  @Getter('address/community') community: any
  @Getter('address/addressInfo') addressInfo: any
  detailAddress: string = this.addressInfo.detailAddress
  consigneeName: string = this.addressInfo.consigneeName
  phoneNumber: string = this.addressInfo.phoneNumber
  defaultAddress: boolean = this.addressInfo.defaultAddress
  saveClick() {
    if (!this.community.name) {
      this.$toast('请选择小区')
    } else if (!this.detailAddress) {
      this.$toast('请填写门牌号')
    } else if (this.detailAddress.length > 15) {
      this.$toast('门牌号不得大于15个字')
    } else if (!this.consigneeName) {
      this.$toast('请填写联系人')
    } else if (this.consigneeName.length > 8) {
      this.$toast('联系人不得大于8个字')
    } else if (!this.phoneNumber) {
      this.$toast('请填写手机号码')
    } else if (!/^[1][1-9][0-9]{9}$/.test(this.phoneNumber)) {
      this.$toast('请填写11位手机号码')
    } else {
      let params = {
        province: this.community.provinceId,
        city: this.community.cityId,
        district: this.community.districtId,
        communityId: this.community.id,
        communityName: this.community.name,
        detailAddress: this.detailAddress,
        postcode: '',
        consigneeName: this.consigneeName,
        phoneNumber: this.phoneNumber,
        defaultAddress: this.defaultAddress
      }
      addAddress(params).then(() => {
        this.$router.push('/my/address')
      })
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
    .van-button--primary{
      background-color: $--color-base;
      border-color: $--color-base;
    }
  }
}
</style>
