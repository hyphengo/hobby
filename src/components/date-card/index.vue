<template>
  <div
    class="date-card"
  >
    <ve-row v-if="info" @click="selectDateShow = true">
      <ve-col :span="23">
        配送时间：{{date}} {{info.shipHourRange}}
      </ve-col>
      <ve-col :span="1">
        <van-icon name="arrow" />
      </ve-col>
    </ve-row>
    <van-popup v-model="selectDateShow" position="bottom">
      <van-picker :columns="dateSelect" @change="(picker, val) => chosseDate = val" />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Picker, Popup } from 'vant'
import moment from 'moment'
import dateSelect from '@/util/dateSelect'

@Component({
  components: {
    'van-picker': Picker,
    'van-popup': Popup
  }
})
export default class DateCard extends Vue {
  @Prop() info: any

  selectDateShow: boolean = false

  dateSelect = dateSelect

  get date() {
    const today = moment().format('MM月DD日')

    const ship = moment(this.info.shipOnDate).format('MM月DD日')

    const text = today === ship ? '(今天)' : '(明天)'

    return `${text}${ship}`
  }

  handleToSelectAddress() {
    this.$router.push('/address/list/select')
  }

  mounted() {
  }
}
</script>

<style lang="scss">
.date-card{
  padding: 30px 15px 30px 60px;
  background-color: $--color-white;
}
</style>
