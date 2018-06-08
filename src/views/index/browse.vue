<template>
  <div
    class="browse"
  >
    <div class="browse-search">
      <search />
    </div>
    <div class="browse-list">
      <div class="browse-list-left">
        <ul>
          <li
            :class="['browse-list-item', {
              'active': item.categoryId === active
            }]"
            v-for="(item) in twoClass"
            @click="handleItem(item)"
          >
            {{item.name}}
          </li>
        </ul>
      </div>
      <div class="browse-list-right">

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Badge, BadgeGroup } from 'vant'
import { searchCategories } from '@/api'
import Search from '@/components/search/index.vue'

@Component({
  components: {
    Search,
    Badge,
    BadgeGroup
  }
})
export default class Browse extends Vue {
  active: string = null
  twoClass: any = null

  handleItem(item) {
    this.active = item.categoryId

  }

  mounted() {
    searchCategories().then(res => {
      this.twoClass = res.data
      this.active = res.data[0].categoryId
    })
  }
}
</script>

<style lang="scss">
.browse{
  background-color:: $--color-white;

  &-search{
    padding: 18px 20px;
  }

  &-list{
    height: 100%;
    display: flex;
    justify-content: space-between;

    &-left{
      flex-basis: 150px;
      overflow: auto;
    }

    &-item{
      width: 150px;
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
