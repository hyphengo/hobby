<template>
  <div
    class="addressCard van-hairline--bottom"
    @click="handleToSelectAddress"
    v-if="info"
  >
    <div>
      <p class="addressCard-info">
        <img :src="require('assets/images/address.png')" />
        {{info.consigneeName}}
        <span class="addressCard-phone">{{info.cellphone}}</span>
      </p>
      <p class="addressCard-detail">{{info.communityName}} {{info.detailAddress}}</p>
    </div>
    <van-icon
      class="addressCard-icon"
      name="arrow"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { Tabbar, TabbarItem } from 'vant'

@Component({
  components: {
    Tabbar,
    TabbarItem
  }
})
export default class Index extends Vue {
  @Prop() info: any
  @Getter('cart/count') cartCount: number
  @Action('cart/getCount') getCount: Function

  handleToSelectAddress() {
    this.$router.push('/address/list/select')
  }

  mounted() {
  }
}
</script>

<style lang="scss">
.addressCard{
  background-color: $--color-white;
  padding: 32px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-info{
    display: flex;
    align-items: center;

    img{
      margin-right: 16px;
    }
  }

  &-phone{
    margin-left: 10px;
  }

  &-detail{
    color: #888888;
    margin-top: 20px;
    margin-left: 40px;
  }
}
</style>
