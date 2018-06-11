<template>
  <div class="nullCommunity">
    <img src="../../assets/images/user/community.png" alt="">
    <p>没有找到你在哪个小区</p>
    <van-button size="large" type="primary" @click="deterClick" >走，去选择一个</van-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell } from 'vant'

@Component({
  components: {
    'VanCell': Cell,
  }
})
export default class NullCommunity extends Vue {
  deterClick() {
    this.$router.push('/address/community/main')
  }
}
</script>

<style lang="scss">
  .nullCommunity{
    padding: 0 31px;
    text-align: center;
    img{
      width: 132px;
      height: 132px;
      margin-top: 94px;
    }
    p{
      font-size: 28px;
      margin: 19px 0 78px;
      color: #c6c6c6;
    }
    .van-button--primary{
      background-color: $--color-base;
      border-color: $--color-base;
    }
  }
</style>
