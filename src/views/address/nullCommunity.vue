<template>
  <div class="nullCommunity">
    <img src="../../assets/images/user/community.png" alt="">
    <p class="more">没有找到你在哪个小区</p>
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
    this.$router.push('/address/city')
  }
}
</script>

<style lang="scss">
  .city{
    .more{
      text-align: center;
      padding-top: 22px;
      font-size: 22px;
    }
  }
</style>
