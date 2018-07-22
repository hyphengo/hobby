<template>
  <div class="address">
    <div :class="['address-info', {'address-info-click': $route.params.name==='select'}]" v-for="item in list" :key="item.id" @click.stop="selectAddress(item)">
      <div class="info">
        <p>{{item.consigneeName}}，{{item.phoneNumber}}</p>
        <span>{{item.communityName}}{{item.detailAddress}}</span>
      </div>
      <div class="edit">
        <van-icon name="edit" @click.stop="onEdit(item)"/>
      </div>
      <!-- <div v-if="item.defaultAddress" class="default-type">
        <van-icon name="success"/>
      </div> -->
    </div>
    <div class="fix" is-link @click="addEdit">
      <span>新增地址</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell } from 'vant'
import { getAddress, applyShippingAddress } from '@/api'
import { Action } from 'vuex-class'

@Component({
  components: {
    'VanCell': Cell
  }
})
export default class Address extends Vue {
  @Action('address/setEditAddress') setEditAddress: Function
  @Action('address/setSelectAddress') setSelectAddress: Function
  list: any = []
  selectAddress(item) {
    if (this.$route.params.name === 'select') {
      this.setSelectAddress(item).then(() => {
        applyShippingAddress({addressId: item.id}).then(() => {
          this.$router.back()
        })
      })
    }
  }
  onEdit(item) {
    this.setEditAddress(item).then(() => {
      this.$router.push(`/address/edit/${this.$route.params.name}`)
    })
  }
  addEdit() {
    this.setEditAddress({}).then(() => {
      this.$router.push(`/address/edit/${this.$route.params.name}`)
    })
  }
  mounted() {
    getAddress().then(res => {
      this.list = res.data
    })
  }
}
</script>

<style lang="scss">
.address{
  .address-info{
    position: relative;
    display: flex;
    flex-flow: row;
    align-items: center;
    height: 140px;
    padding: 15px 35px 15px 40px;
    background-color: $--color-white;
    margin-bottom: 10px;
    overflow: hidden;
    &-click:active{
      background-color: #eee;
    }
    .info{
      flex-grow: 1;
      p{
        font-size: 28px;
        color: $--color-black;
        margin-bottom: 20px;
      }
      span{
        font-size: 24px;
        color: #888888;
      }
    }
    .edit{
      font-size: 50px;
    }
    .default-type{
      position: absolute;
      left: -29px;
      top: -7px;
      display: inline-block;
      width:0;
      height:0;
      border-width:0 45px 45px 45px;
      border-style:solid;
      border-color:transparent transparent $--color-base transparent;
      margin-left: 0;
      transform:rotate(-45deg);
      color: $--color-white;
      .van-icon-success{
        transform:rotate(45deg);
        margin-top: 15px;
        margin-left: -10px;
      }
    }
  }
  .fix{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 9999;
    width: 100%;
    height: 80px;
    line-height: 80px;
    text-align: center;
    background: $--color-base;
    color: #fff;
    font-size: 32px;
  }
}
</style>
