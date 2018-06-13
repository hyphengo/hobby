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
      <van-picker :columns="columns" @change="(picker, val, index) => {chosseDate = val, columns[0].defaultIndex = index}" />
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
  chosseDate: string = ''

  selectDateShow: boolean = false

  dateSelect = dateSelect

  columns = [
    {
      values: dateSelect,
      defaultIndex: 0
    }
  ]

  get date() {
    const today = moment().format('MM月DD日')

    const ship = moment(this.info.shipOnDate).format('MM月DD日')

    const text = today === ship ? '(今天)' : '(明天)'

    return `${text}${ship}`
  }

  handleChangeDay(is) {
    this.day = is
  }

  confirm() {
    const dateTime = this.day ? moment().valueOf() : moment().add(1, 'days').valueOf()

    this.$emit('click', {
      dateTime,
      chosseDate: this.chosseDate[0]
    })

    this.selectDateShow = false
  }

  mounted() {
    const today = moment().format('MM月DD日')

    const ship = moment(this.info.shipOnDate).format('MM月DD日')

    if (today !== ship) {
      this.day = false
    }

    for (let i = 0; i < this.dateSelect.length; i++) {
      if (this.info.shipHourRange === this.dateSelect[i]) {
        this.columns[0].defaultIndex = i
        break
      }
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
