<template>
  <div class="address">
    <address-list
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AddressList } from 'vant'

@Component({
  components: {
    AddressList
  }
})
export default class Address extends Vue {
  chosenAddressId: string = '1'
  list: any = [
    {
      id: '1',
      name: '张三',
      tel: '13000000000',
      address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
    },
    {
      id: '2',
      name: '李四',
      tel: '1310000000',
      address: '浙江省杭州市拱墅区莫干山路 50 号'
    }
  ]
  onAdd() {
    this.$router.push('/my/edit')
  }
  onEdit(item, index) {
    this.$toast('编辑收货地址:' + index)
    this.$router.push('/my/edit')
  }
}
</script>

<style lang="scss">
.address{
  .address-info{
    display: flex;
    flex-flow: row;
    align-items: center;
    height: 180px;
    padding: 15px 35px;
    background-color: $--color-white;
    margin-bottom: 20px;
    .info{
      flex-grow: 1;
      font-size: 24px;
      p{
        color: $--color-black;
        margin-bottom: 20px;
      }
      span{
        color: #888888;
      }
    }
    .edit{
      width: 100px;
      font-size: 50px;
    }
  }
  .add-btn{
    color: $--color-white;
    background-color: $--color-base;
    border: 2px solid $--color-base;
  }
}
</style>
