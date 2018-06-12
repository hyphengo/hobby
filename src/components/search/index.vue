<template>
<p class="coco-search" @click="handleClick"><van-icon name="search" />搜索商品、服务</p>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'

@Component
export default class Search extends Vue {
  @Action('search/clearText') clearText: any
  handleClick() {
    this.clearText()
    this.$router.push('/product/search')
  }
}
</script>
<style lang="scss">
  .coco-search{
    background-color: #EDF0F2;
    color: #B2B2B2;
    border-radius:10px;
    text-align: center;
    height: 56px;
    line-height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;

    .van-icon{
      margin-right: 10px;
    }
  }
</style>
