<template src="../../../templates/admin/agent/overview.html">
</template>
<style lang="scss">
.Team_member {
  .el-date-editor {
    margin-left: 10px;

    & + button {
      margin-left: 10px;
    }
  }
}
.chart-empty {
  text-align: center;
  font-size: 24px;
  height: 400px;
  display: flex;
  color: $--color-warning;
}
.chart-wrap {
  min-height: 400px;
  position: relative;
}
.chart-check-all {
  position: absolute;
  top: 2px;
  left: 420px;
}
</style>
<script>
import { floor } from 'lodash'
import { differenceInDays, isSameYear, addSeconds } from 'date-fns'
import datepicker, {
  getDaysRange,
  disabledDate
} from '~/util/mixins/datepicker'
import { mapGetters, mapMutations } from 'vuex'
import cache, { setExpires } from '~/util/cache'
let isMoreMonths
export default {
  name: 'team-overview',
  async asyncData({ app, store, req }) {
    const { value, expires } = cache.memberInfo
    if (process.server) return value
    // console.log('process.server ',req && req.session.token)
    // if (process.server && req.session && req.session.token) {
    //   const { token } = req.session
    //   app.$axios.setHeader('Token', token)
    // }
    if (+new Date() > expires) {
      // console.log('fuck',app.$axios.defaults.headers.common.Token)
      cache.memberInfo.value = (await app.$axios.$post(
        'proxy-manage/find-team-info'
      )).data
      setExpires(30, 'memberInfo')
    }
    return cache.memberInfo.value
  },
  data() {
    const { register_at } = this.$store.state.user
    return {
      chartName: {
        save: '充值',
        withdraw: '提现',
        bet: '投注',
        win: '派奖',
        self_return: '返点',
        trans_in: '转账',
        dividends: '分红'
      },
      chart: null,
      chartOpt: [],
      icons: ['&#xe628;', '&#xe602;', '&#xe683;', '&#xe640;', '&#xe676;'],
      dayIndex: '',
      daysRange: [['最近三天', 3], ['最近七天', 7], ['最近一个月', 30]],
      chartText: '',
      pickerOpt: {
        disabledDate(time) {
          // if(time.getTime() < +new Date(register_at)) {
          //     return true
          // }
          // return disabledDate(time,register_at)
          return disabledDate(time, register_at)
        }
      },
      isIndeterminate: true,
      legendSelected: ['充值', '投注', '派奖'],
      legendCheckAll: false
    }
  },
  mixins: [datepicker],
  methods: {
    getDaysRange(size, index, firstRender) {
      this.dayIndex = index
      this.date = getDaysRange(null, size)
      this.$nextTick(() => {
        this.$refs.datepicker.$emit('change', this.date)
      })
    },
    pick(val) {
      this.linkPanels(false)
      let range = this.$datepicker.displayValue
      let index = [-3, -7, -30].indexOf(differenceInDays(...range))
      if (!(differenceInDays(new Date(), range[1]) === 0 && index !== -1)) {
        this.dayIndex = ''
      } else if (index !== -1) {
        this.dayIndex = index
      }
      this.get()
    },
    get() {
      if (this.checkDateFormat() === true) {
        isMoreMonths = Math.abs(differenceInDays(...this.date)) > 30
        // this.spin()
        this.$store.commit('spin', { on: true })
        //   https://date-fns.org/v1.29.0/docs/eachDay
        this.$axiosPlus(
          'proxy-manage/team-lottery-overview',
          this.dateParam(),
          data => {
            this.chartData = data.overview.map(_ => ({ ..._.content }))
            this.chartData.length > 0
              ? import('~/util/echarts').then(
                  ({ renderTeamView, getChart }) => {
                    const { chartData, chartName } = this
                    this.chartText = ''
                    let date = chartData.map(_ => _.date_at)
                    isSameYear && (date = date.map(_ => _.slice(5)))
                    this.chartOpt = Object.keys(this.chartName).map((v, k) => ({
                      name: chartName[v],
                      data: chartData.map(_ => _[v]),
                      date
                    }))

                    this.$nextTick(() => {
                      renderTeamView(
                        this.chartOpt,
                        this.$refs.chart,
                        this.legendSelected
                      )
                      this.spin(false)
                      this.chart = getChart()

                      this.chart &&
                        this.chart.on('legendselectchanged', ({ selected }) => {
                          const result = [...new Set(Object.values(selected))]
                          this.isIndeterminate = result.length !== 1
                          result.length === 1 &&
                            (this.legendCheckAll = result[0])
                        })
                    })
                  }
                )
              : ((this.chartOpt = []),
                (this.chartText = '查无数据'),
                this.spin(false))
          }
        )
      }
    },
    spin(on = true) {
      ;(isMoreMonths || !this.chart) && this.$store.commit('spin', { on })
    },
    legendAllChange() {
      const { legendSelected, chartOpt } = this

      this.legendSelected =
        legendSelected.length !== chartOpt.length
          ? chartOpt.map(({ name }) => name)
          : []

      chartOpt.forEach(({ name }) =>
        this.chart.dispatchAction({
          type: `legend${
            this.legendSelected.length === chartOpt.length ? '' : 'Un'
          }Select`,
          name
        })
      )

      this.isIndeterminate = false
    }
  },
  filters: {
    sum(val) {
      if (Array.isArray(val) && val.length > 0) {
        let value = val.reduce((prev, next) => +prev + +next)
        if (value >= 1e4) {
          value = floor(value / 1e4, 2) + '万'
        } else {
          value = floor(value, 2).toString()
        }
        return value.toString()
      } else {
        return 0
      }
    }
  },
  computed: {
    ...mapGetters(['loading'])
  },
  mounted() {
    this.getDaysRange(7, 1, true)
  },
  destroyed() {
    this.chart && this.chart.dispose()
  }
}
</script>
