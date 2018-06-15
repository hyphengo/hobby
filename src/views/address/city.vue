<template>
  <div class="city">
    <van-cell v-for="item in cityList" :key="item.code" :value="item.regionName" @click="selectCity(item)"/>
    <p class="more">更多城市开发中~</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell } from 'vant'
import { Action } from 'vuex-class'
import { getCities } from '@/api'

@Component({
  components: {
    'VanCell': Cell,
  }
})
export default class City extends Vue {
  cityList: any = null
  @Action('address/setCity') setCity: Function
  selectCity(item) {
    this.setCity(item).then(res => {
      this.$router.push(`/address/community?type=${this.$route.query.type}`)
    })
  }
  mounted() {
    getCities().then(res => {
      this.cityList = res.data
    })
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
