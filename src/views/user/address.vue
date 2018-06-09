<template>
  <div class="address">
    <div class="address-info" v-for="item in list" :key="item.id">
      <div class="info">
        <p>{{item.consigneeName}}，{{item.phoneNumber}}</p>
        <span>详细地址：{{item.communityName}}{{item.detailAddress}}</span>
      </div>
      <div class="edit">
        <van-icon name="edit" @click="onEdit(item)"/>
      </div>
    </div>
    <van-cell class="fix" is-link @click="addEdit">
      <template slot="title">
        <span class="cell-text"><van-icon name="add" />新增地址</span>
      </template>
    </van-cell>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell } from 'vant'
import { getAddress } from '@/api'
import { Action } from 'vuex-class'

@Component({
  components: {
    'VanCell': Cell
  }
})
export default class Address extends Vue {
  @Action('address/setEditAddress') setEditAddress: Function
  list: any = []
  onEdit(item) {
    this.setEditAddress(item).then(() => {
      this.$router.push('/my/edit')
    })
  }
  addEdit() {
    this.setEditAddress({}).then(() => {
      this.$router.push('/my/edit')
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
    display: flex;
    flex-flow: row;
    align-items: center;
    height: 140px;
    padding: 15px 35px;
    background-color: $--color-white;
    margin-bottom: 10px;
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
      width: 100px;
      font-size: 50px;
    }
  }
  .fix{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 9999;
    padding-left: 25px;
    .cell-text{
      display: flex;
      align-items: center;
      .van-icon-add{
        color: $--color-base;
        font-size: 36px;
        margin-right: 15px;
      }
    }
  }
}
</style>
