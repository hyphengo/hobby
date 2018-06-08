<template>
  <div class="address">
    <div class="address-info">
      <div class="info">
        <p>用户姓名  13209209301</p>
        <span>宏达世纪城 7栋5单元3302室</span>
      </div>
      <div class="edit">
        <vant-icon name="edit" />
      </div>
    </div>
    <div class="address-info">
      <div class="info">
        <p>用户姓名  13209209301</p>
        <span>宏达世纪城 7栋5单元3302室</span>
      </div>
      <div class="edit">
        <vant-icon name="edit" />
      </div>
    </div>
    <vant-button class="add-btn" size="large" type="primary" @click="addClick">+ 新增地址</vant-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Icon, Button } from 'vant'

@Component({
  components: {
    'VantIcon': Icon,
    'VantButton': Button
  }
})
export default class Address extends Vue {
  addClick() {
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
