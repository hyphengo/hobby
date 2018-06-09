<template>
  <div class="community">
    <van-cell class="van-hairline--bottom" :title="getCityName" is-link to="/my/community"/>
    <div class="blank"></div>
    <van-cell v-for="item in communityList" :key="item.id" :value="item.name" @click="selectCommunity(item)"/>
    <p class="more">更多城市开发中~</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell } from 'vant'
import { Getter, Action } from 'vuex-class'
import { getCommunities } from '@/api'

@Component({
  components: {
    'VanCell': Cell,
  }
})
export default class Community extends Vue {
  communityList: any = null
  @Getter('address/getCityCode') getCityCode: String
  @Getter('address/getCityName') getCityName: String
  @Action('address/setCommunity') setCommunity: Function
  selectCommunity(community) {
    this.setCommunity(community).then(res => {
      this.$router.push('/my/edit')
    })
  }
  mounted() {
    getCommunities({cityCode: this.getCityCode}).then(res => {
      this.communityList = res.data
    })
  }
}
</script>

<style lang="scss">
  .community{
    .blank{
      height: 15px;
      background-color: $--color-body;
    }
    .more{
      text-align: center;
      padding-top: 22px;
      font-size: 22px;
    }
  }
</style>
