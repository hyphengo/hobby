<template>
  <van-loading color="white" v-if="!data" />
  <div
    v-else
    class="home"
  >
    <pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="home-top">
        <p class="home-title">可可蛙-{{data.communityName}}</p>
        <p class="home-search"><van-icon name="search" />搜索商品、服务</p>
      </div>
      <swipe
        class="home-swipe"
        :autoplay="5000"
      >
        <swipe-item
          v-for="(item) in data.carouselItems"
          :key="item.id"
        >
          <img :src="item.image" />
        </swipe-item>
      </swipe>
      <div class="home-quiki">
        <div
          v-for="(item) in data.quikiNavig"
          :key="item.id"
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
        <img :src="item.bannerAds.image" >
        <div class="home-card-hot">
          <div
            class="home-card-hot-item"
            v-for="(sales) in item.hotSales"
            :key="sales.productId"
          >
            <img :src="sales.productImg" />
            <p class="van-ellipsis">{{sales.productName}}</p>
            <van-row>
              <van-col :span="20" class="home-card-price">
                {{sales.salePrice}}元
              </van-col>
              <van-col :span="4">
                +
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
    </pull-refresh>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Swipe, SwipeItem, PullRefresh } from 'vant'
import { getHome } from '@/api'

@Component({
  components: {
    Swipe,
    SwipeItem,
    PullRefresh
  }
})
export default class Index extends Vue {
  isLoading: boolean = false
  data: Object = null
  onRefresh() {
    getHome().then(res => {
      this.data = res.data
      this.isLoading = false
    })
  }
  mounted() {
    getHome().then(res => {
      this.data = res.data
    })
  }
}
</script>

<style lang="scss">
.home{
  &-top{
    background-color:: $--color-white;
    padding: 18px 20px;
  }
  &-title{
    font-size: 38px;
    color: $--color-black;
    text-align: center;
    margin-bottom: 54px;
  }
  &-search{
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
  &-swipe{
    padding: 10px 20px;

    img{
      border-radius: 10px;
    }

    .van-swipe__indicators{
      bottom: 30px;
    }

    .van-swipe__indicator{
      background-color: $--color-white;
      opacity: 0.5;
    }

    .van-swipe__indicator--active{
      opacity: 1;
    }
  }

  &-quiki{
    background-color: $--color-white;
    padding: 20px 38px 24px 38px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    color: #888888;
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

      &-item{
        width: 200px;
      }

      p{
        color: #333;
        margin: 18px 0;
      }

      img{
        width: 200px;
        height: 200px;
      }
    }

    &-price{
      color: #FC7818;
      font-size: 32px;
      font-family: PingFang-SC-Bold;
    }
  }
}
</style>
