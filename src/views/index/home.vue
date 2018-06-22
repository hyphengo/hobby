<template>
  <div
    class="home tabbar-padding"
  >
    <pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="home-top">
        <p class="home-title">可可蛙-{{data.communityName}}</p>
        <search />
      </div>
      <swipe
        class="home-swipe"
        :autoplay="5000"
      >
        <swipe-item
          v-for="(item) in data.carouselItems"
          :key="item.id"
        >
          <img :src="item.image || require('assets/images/product.png')" @click="handleJump(item)" />
        </swipe-item>
      </swipe>
      <div class="home-quiki">
        <div
          v-for="(item) in data.quikiNavig"
          :key="item.id"
          @click="handleJump(item)"
        >
          <img :src="item.image" />
          <p>{{item.name}}</p>
        </div>
      </div>
      <div
        class="home-card"
        v-for="(item, index) in data.floorVos"
        :key="index"
      >
        <img :src="item.bannerAds.image" @click="handleJump(item.bannerAds)" >
        <div class="home-card-hot">
          <div
            class="home-card-hot-item"
            v-for="(sales) in item.hotSales"
            :key="sales.productId"
            @click="handleToDetail(sales)"
          >
            <img :src="sales.productImg" />
            <p class="van-ellipsis">{{sales.productName}}</p>
            <div class="home-card-add">
              <span class="home-card-price">
                {{sales.salePrice}}元
              </span>
              <add-button @click.stop="handleToCart(sales)" />
            </div>
          </div>
        </div>
      </div>
    </pull-refresh>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import { Swipe, SwipeItem, PullRefresh } from 'vant'
import { getHome, initLocation, selectCommunity } from '@/api'
import AddButton from '@/components/add-button/index.vue'
import Search from '@/components/search/index.vue'
import { IsURL } from '@/util/util'
import ls from '@/util/localStorage'
import { COCOWO_COMMUNITY_ID } from '@/constants'
import wxs from '@/wxsdk'

@Component({
  components: {
    Swipe,
    SwipeItem,
    PullRefresh,
    AddButton,
    Search
  }
})
export default class Index extends Vue {
  @Action('cart/addCart') addCart: any
  @Action('home/setLocation') setLocation: any
  @Getter('home/location') location: any

  isLoading: boolean = false
  data: Object = {}

  // 添加到购物车
  handleToCart(sales) {
    this.addCart({
      id: sales.productId,
      num: 1
    }).then(res => {
      if (res.code === 200) {
        this.$toast('添加购物车成功~')
      }
    })
  }

  // 跳转至商品详情
  handleToDetail(sales) {
    this.$router.push(`/product/detail/${sales.productId}`)
  }

  /**
   * 判断是否是完整URL
   *
   * 完整的URL直接跳外链
   *
   * 非完整 正则取出一级分类ID 跳转分类页面
   */
  judgeType(url) {
    const type = IsURL(url)

    if (type) {
      window.location.href = url
    } else {
      const id = url.replace(/^.*?id=(\d+).*$/, '$1')
      this.$router.push({
        path: '/index/browse?show=hidden',
        query: { id }
      })
    }
  }

  handleJump(item) {
    this.judgeType(item.url)
  }

  onRefresh() {
    getHome().then(res => {
      this.data = res.data
      this.isLoading = false
    })
  }

  mounted() {
    const communityId = ls.get(COCOWO_COMMUNITY_ID)

    if (!this.location) {
      if (communityId) {
        selectCommunity({ communityId }).then(data => {
          ls.set(COCOWO_COMMUNITY_ID, data.data.communityId)
        })
      } else {
        wxs.getLocation({
          type: 'wgs84',
          success: (res) => {
            initLocation({
              longitude: res.longitude,
              latitude: res.latitude
            }).then(data => {
              if (data.data.communityId) {
                selectCommunity({
                  communityId: data.data.communityId
                }).then(() => {
                  ls.set(COCOWO_COMMUNITY_ID, data.data.communityId)
                })
              } else {
                this.$router.replace('/address/nullCommunity')
              }
            })
          },
          cancel: (res) => {
            this.$router.replace('/address/nullCommunity')
          }
        })
      }
      this.setLocation()
    }

    getHome().then(res => {
      this.data = res.data
    })
  }
}
</script>

<style lang="scss">
.home{
  overflow: auto;
  height: 100%;
  &-top{
    background-color: $--color-white;
    padding: 18px 20px;
  }
  &-title{
    font-size: 38px;
    color: $--color-black;
    text-align: center;
    margin-bottom: 20px;
  }
  &-swipe{
    padding: 10px 0;
    margin: 0 20px;

    img{
      border-radius: 10px;
      width: 100% !important;
    }
  }

  &-quiki{
    background-color: $--color-white;
    padding: 20px 38px 24px 38px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    color: #888888;

    img{
      height: 70px;
      width: 70px;
    }
  }

  &-card{
    background-color: $--color-white;
    padding: 15px 20px 22px;
    margin-top: 15px;

    img{
      height: 150px;
      width: 100%;
      border-radius: 10px;
    }

    &-hot{
      display: flex;
      justify-content: space-between;
      margin-top: 32px;
      overflow-x: auto;
      text-align: center;

      &-item{
        width: 200px;
        margin-right: 20px;

        &:last-child{
          margin-right: 0;
        }
      }

      p{
        color: #333;
        margin: 18px 0;
      }

      img{
        width: 150px;
        height: 150px;
      }
    }

    &-add{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
    }

    &-price{
      color: $--color-price;
      font-size: 28px;
      font-family: PingFang-SC-Bold;
    }
  }
}
</style>
