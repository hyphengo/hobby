<template>
  <div class="community">
    <van-cell class="van-hairline--bottom" :title="city.regionName" is-link :to="{ path:'/address/city', query: { type:  $route.query.type } }"/>
    <div class="blank"></div>
    <van-cell v-for="item in communityList" :key="item.id" :value="item.name" @click="selectCommunity(item)"/>
    <p class="more">更多小区开发中~</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell } from 'vant'
import { Getter, Action } from 'vuex-class'
import { getCommunities, selectCommunity } from '@/api'

@Component({
  components: {
    'VanCell': Cell,
  }
})
export default class Community extends Vue {
  communityList: any = null
  @Getter('address/city') city: any
  @Action('address/setCommunity') setCommunity: Function
  selectCommunity(community) {
    this.setCommunity(community).then(res => {
      if (this.$route.query.type !== 'main') {
        this.$router.push(`/address/edit/${this.$route.query.type}`)
      } else if (this.$route.query.type === 'main') {
        selectCommunity({communityId: community.id}).then(res => {
          this.$router.replace('/index/home')
        })
      }
    })
  }
  mounted() {
    getCommunities({cityCode: this.city.code}).then(res => {
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
