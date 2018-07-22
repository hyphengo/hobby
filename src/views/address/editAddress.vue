<template>
  <div class="edit">
    <cell-group>
      <van-cell :value="community.name?community.name:(addressInfo.communityName?addressInfo.communityName:'选择小区')" is-link :to="{ path:'/address/city', query: { type:  $route.params.name } }">
        <template slot="title">
          <span class="cell-text">小区</span>
        </template>
      </van-cell>
      <van-field
        v-model="addressInfo.detailAddress"
        label="门牌号"
        placeholder="几栋几单元几室，如8栋2单元2204室"
      />
      <div class="blank"></div>
      <van-field
        v-model="addressInfo.consigneeName"
        label="联系人"
        placeholder="请填写您的姓名"
      />
      <van-field
        v-model="addressInfo.phoneNumber"
        label="手机号码"
        placeholder="请填写您的手机号码"
      />
      <!-- <div class="blank"></div> -->
      <!-- <van-cell title="设为默认地址" >
        <van-checkbox v-model="addressInfo.defaultAddress" />
      </van-cell> -->
    </cell-group>
    <div class="save-box">
        <van-button class="save-btn" size="large" type="primary" @click="saveClick" >保存</van-button>
    </div>
    <div class="save-box" v-if="addressInfo.id">
      <van-button class="save-btn" size="large" @click="delClick" >删除</van-button>
    </div>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell, CellGroup, Field, CheckboxGroup } from 'vant'
import { Getter, Action } from 'vuex-class'
import { addAddress, updateAddress, removeAddress } from '@/api'

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
  @Action('address/setCommunity') setCommunity: Function
  saveClick() {
    if (!this.community.name && !this.addressInfo.communityName) {
      this.$toast('请选择小区')
    } else if (!this.addressInfo.detailAddress) {
      this.$toast('请填写门牌号')
    } else if (this.addressInfo.detailAddress.length > 15) {
      this.$toast('门牌号不得大于15个字')
    } else if (!this.addressInfo.consigneeName) {
      this.$toast('请填写联系人')
    } else if (this.addressInfo.consigneeName.length > 8) {
      this.$toast('联系人不得大于8个字')
    } else if (!this.addressInfo.phoneNumber) {
      this.$toast('请填写手机号码')
    } else if (!/^[1][1-9][0-9]{9}$/.test(this.addressInfo.phoneNumber)) {
      this.$toast('请填写11位手机号码')
    } else {
      let params = {
        id: this.addressInfo.id,
        province: this.community.provinceId || this.addressInfo.province,
        city: this.community.cityId || this.addressInfo.city,
        district: this.community.districtId || this.addressInfo.district,
        communityId: this.community.id || this.addressInfo.communityId,
        communityName: this.community.name || this.addressInfo.communityName,
        detailAddress: this.addressInfo.detailAddress,
        postcode: '',
        consigneeName: this.addressInfo.consigneeName,
        phoneNumber: this.addressInfo.phoneNumber,
        // defaultAddress: this.addressInfo.defaultAddress
      }
      if (params.id) {
        updateAddress(params).then(() => {
          this.$router.back()
          this.setCommunity({})
        })
      } else {
        addAddress(params).then(() => {
          this.$router.back()
          this.setCommunity({})
        })
      }
    }
  }
  delClick() {
    let tipO: any = {
      message: '确定删除该地址吗',
      cancelButtonText: '再想想'
    }
    this.$dialog.confirm(tipO).then(() => {
      removeAddress({
        id: this.addressInfo.id
      }).then(() => {
        this.$router.back()
      })
    }).catch(() => {
    })
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
    text-align: center;
    background-color: $--color-body;
    padding: 30px 30px 0;
    .save-btn{
      height: 80px;
      line-height: 80px;
    }
  }
  .van-button--primary, .van-checkbox--checked{
    background-color: $--color-base;
    border-color: $--color-base;
  }
}
</style>
