<template>
  <div
    class="browse"
  >
    <div class="browse-search">
      <search />
    </div>
    <div class="browse-list tabbar-padding">
      <div class="browse-list-left">
        <ul>
          <li
            :class="['browse-list-item', {
              'active': item.categoryId === active
            }]"
            v-for="(item) in twoClass"
            :key="item.categoryId"
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { searchCategories } from '@/api'
import Search from '@/components/search/index.vue'
import ProductList from '@/components/productList/index.vue'

@Component({
  components: {
    Search,
    ProductList
  }
})
export default class Browse extends Vue {
  @Action('browse/setActive') setActive: any
  @Getter('browse/active') active: any
  twoClass: any = null
  ids: Array<any> = []

  handleItem(item) {
    this.setActive(item.categoryId)
    this.ids = [`${item.dimValId}`]
  }

  mounted() {
    searchCategories().then(res => {
      this.twoClass = res.data
      if (!this.active) {
        this.setActive(res.data[0].categoryId)
        this.ids = [`${res.data[0].dimValId}`]
      }
    })
  }
}
</script>

<style lang="scss">
.browse{
  background-color: $--color-white;

  &-search{
    padding: 18px 20px;
  }

  &-list{
    height: 100%;
    display: flex;
    justify-content: space-between;

    &-left{
      flex-basis: 150px;
      flex-shrink: 0;
      overflow-y: auto;
    }

    &-right{
      flex-grow: 2;
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
