<template>
  <div
    :class="['browse', {
      'tabbar-padding': isShowBar
    }]"
  >
    <div class="browse-search">
      <search />
    </div>
    <p class="browse-tip" v-if="empty">真想不到，竟然没有商品诶~</p>
    <div
      v-else
      :class="['browse-list', {
        'pb': isShowBar,
        's-p': !isShowBar
      }]"
    >
      <div class="browse-list-left">
        <ul>
          <li
            :class="['browse-list-item', {
              'active': item.dimValId === active
            }]"
            v-for="(item) in twoClass"
            :key="item.dimValId"
            @click="handleItem(item)"
          >
            {{item.name}}
          </li>
        </ul>
      </div>
      <div class="browse-list-right">
        <product-list
          :ids="ids"
        />
      </div>
    </div>
    <float-cart :isShow="!isShowBar" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { searchCategories, searchSecondCategories } from '@/api'
import Search from '@/components/search/index.vue'
import ProductList from '@/components/productList/index.vue'
import FloatCart from '@/components/float-cart/index.vue'

@Component({
  components: {
    Search,
    ProductList,
    FloatCart
  }
})
export default class Browse extends Vue {
  @Prop() isShowBar: boolean

  @Action('browse/setActive') setActive: any
  @Action('browse/setType') setType: any
  @Getter('browse/active') active: any
  @Getter('browse/type') type: any
  twoClass: any = null
  ids: Array<any> = []
  empty: boolean = false

  handleItem(item) {
    this.setActive(item.dimValId)
    this.ids = [`${item.dimValId}`]
  }

  mounted() {
    const id = this.$route.query.id

    if (id) {
      searchSecondCategories({
        dimValId: id
      }).then(res => {
        this.twoClass = res.data

        if (res.data.length > 0) {
          this.setActive(res.data[0].dimValId)
          this.ids = [`${this.active}`]
        } else {
          this.empty = true
        }
        this.setType(true)
      })
    } else {
      searchCategories().then(res => {
        this.twoClass = res.data
        if (!this.active || this.type) {
          this.setActive(res.data[0].dimValId)
        }
        this.ids = [`${this.active}`]
        this.setType(false)
      })
    }
  }
}
</script>

<style lang="scss">
.browse{
  background-color: $--color-white;
  overflow: hidden !important;

  &-tip{
    text-align: center;
    color: #999;
    padding: 20px 0;
  }

  &-search{
    padding: 18px 20px;
  }

  &-list{
    height: 100%;
    display: flex;
    justify-content: space-between;


    &.pb{
      padding-bottom: 92px;
    }

    &.s-p{
      padding-bottom: 46px;
    }

    &-left{
      flex-basis: 150px;
      flex-shrink: 0;
      overflow-y: auto;
      background-color: #F5F5F7;
    }

    &-right{
      flex-grow: 2;
      height: 100%;
    }

    &-scroll{
      height: 100%;
      overflow-y: auto;

      &-tip{
        text-align: center;
        color: #999;
        padding: 20px 0;
      }
    }

    &-item{
      width: 100%;
      height: 100px;
      color: #888888;
      background-color: #F5F5F7;
      text-align: center;
      line-height: 100px;

      &.active{
        color: $--color-base;
        background-color: $--color-white;
      }
    }
  }
}
</style>
