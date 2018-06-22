<template>
  <div
    class="date-card"
  >
    <ve-row v-if="info" @click="disabled ? selectDateShow = false : selectDateShow = true" align="center">
      <ve-col :span="23">
        配送时间：{{date}} {{info.shipHourRange}}
      </ve-col>
      <van-icon v-if="!disabled" name="arrow" />
    </ve-row>
    <van-popup v-model="selectDateShow" position="bottom">
      <div class="date-card-top">
        <van-button
          @click="handleChangeDay(true)"
          type="default"
          :class="[
            'date-card-top-btn',
            {
              'active': day
            }
          ]"
          v-if="isShowToday"
        >
          今天
        </van-button>
        <van-button
          @click="handleChangeDay(false)"
          type="default"
          :class="[
            'date-card-top-btn',
            {
              'active': !day
            }
          ]"
        >
          明天
        </van-button>
      </div>
      <van-picker v-if="colShow" :columns="columns" @change="(picker, val, index) => {chosseDate = val}" />
      <div class="date-card-btns">
        <van-button bottom-action size="small" @click="selectDateShow = false">取消</van-button>
        <van-button bottom-action size="small" @click="confirm">确认</van-button>
      </div>
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
  @Prop() disabled: boolean

  // 是否是今天否为明天
  day: boolean = true

  // 当前选择时段
  chosseDate: any = ''

  selectDateShow: boolean = false

  dateSelect: any = dateSelect

  isShowToday: boolean = true

  columns: any = [
    {
      values: dateSelect,
      defaultIndex: 0
    }
  ]

  todayDefaultIndex: any = 0

  colShow: boolean = true

  get date() {
    const today = moment().format('MM月DD日')

    const addToDay = moment().add(1, 'days').format('MM月DD日')

    const ship = moment(this.info.shipOnDate).format('MM月DD日')

    let text = ''

    if (today === ship) {
      text = '(今天)'
    }

    if (addToDay === ship) {
      text = '(明天)'
    }

    return `${text}${ship}`
  }

  handleChangeDay(is) {
    this.day = is

    const date = moment()

    // 年-月-日
    const dateStr = date.format('YYYY-MM-DD')

    if (!is) {
      this.todayDefaultIndex = this.columns[0].defaultIndex
    }

    for (let i = 0; i < this.dateSelect.length; i++) {
      const itemDate = moment(`${dateStr} ${this.dateSelect[i].end}`)

      if (itemDate.isBefore(date) && is) {
        this.columns[0].values[i].disabled = true
      } else {
        this.columns[0].values[i].disabled = false
      }

      if (!is) {
        this.columns[0].defaultIndex = 0
      } else {
        this.columns[0].defaultIndex = this.todayDefaultIndex
      }
    }
    this.colShow = false

    Vue.nextTick(() => {
      if (is) {
        this.chosseDate = [this.columns[0].values[this.todayDefaultIndex]]
      } else {
        this.chosseDate = [this.columns[0].values[0]]
      }
      this.colShow = true
    })
  }

  confirm() {
    const dateTime = this.day ? moment().valueOf() : moment().add(1, 'days').valueOf()

    this.$emit('click', {
      dateTime,
      chosseDate: this.chosseDate[0].text
    })

    this.columns[0].defaultIndex = this.todayDefaultIndex

    this.selectDateShow = false
  }

  mounted() {
    const date = moment()

    // 年-月-日
    const dateStr = date.format('YYYY-MM-DD')

    // 当天 x月x日
    const today = date.format('MM月DD日')

    // 后端传给的日期
    const ship = moment(this.info.shipOnDate).format('MM月DD日')

    if (today !== ship) {
      this.day = false
    }

    for (let i = 0; i < this.dateSelect.length; i++) {
      const itemDate = moment(`${dateStr} ${this.dateSelect[i].end}`)

      if (itemDate.isBefore(date) && this.day) {
        this.columns[0].values[i].disabled = true
      }

      if (this.info.shipHourRange === this.dateSelect[i].text) {
        this.columns[0].defaultIndex = i
        this.chosseDate = [this.columns[0].values[i]]
        this.todayDefaultIndex = i
        break
      }
    }

    // 当前小时
    const curHour = date.hour()

    if (curHour >= 22 && curHour <= 23) {
      this.isShowToday = false
    }
  }
}
</script>

<style lang="scss">
.date-card{
  padding: 30px 15px 30px 60px;
  background-color: $--color-white;

  &-top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 124px;
    padding: 30px 190px;

    &-btn{
      width: 150px;
      height: 60px;
      line-height: 60px;
      font-size: 26px;
      padding: 0 20px;
      border: 0;

      &:active{
        background-color: #c6c6c6;
      }

      &.active{
        background-color: $--color-base;
        color: $--color-white;
      }

      &::before{
        display: none;
      }
    }
  }

  &-btns{
    display: flex;
    justify-content: space-between;
    align-items: center;

    .van-button--bottom-action{
      background-color: $--color-base;
    }
  }
}
</style>
