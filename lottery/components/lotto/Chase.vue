<template>
  <el-dialog :visible.sync="visible" custom-class="lotto-chase" @open="get" @close="handleClose" width="730px">
    <div slot="title" class="el-dialog__title">
      <h3>我要追号</h3>
      当前销售第{{issue}}期
      <countdown :time="countdown" :auto-start="false" @countdownend="timeStart" ref="countdown">
        <template slot-scope="props">剩余投注时间：{{ props.hours }}:{{ props.minutes }}:{{ props.seconds }} </template>
      </countdown>
    </div>
    <el-form :inline="true">
      <el-radio-group v-model="type" size="medium" @change="typeChange">
        <el-radio-button v-for="label in ['同倍','翻倍','利润率']" :key="label" :label="`${label}追号`"></el-radio-button>
      </el-radio-group>
      <el-form-item label="追号期数">
        <el-input-number v-model="periods" controls-position="right" :min="1" :max="max" size="small"></el-input-number>
      </el-form-item>
      <el-form-item label="起始倍数">
        <el-input-number v-model="multiple" controls-position="right" :min="1" size="small" :max="lottoRoot.maxMultiple"></el-input-number>
      </el-form-item>
      <div v-if="type === '翻倍追号'" class="chase-options">
        <el-form-item label="隔">
          <el-input-number v-model="times" controls-position="right" :min="1" :max="periods - 1" size="small"></el-input-number> 期
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="operator" size="small">
            <el-radio-button v-for="(label,index) in ['+','*']" :key="label" :label="label" :class="`el-icon-${['plus','close'][index]}`"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-input-number v-model="nums" controls-position="right" :min="1" :max="lottoRoot.maxMultiple" size="small"></el-input-number> 倍
        </el-form-item>
      </div>
      <div v-else-if="isProfit" class="chase-options">
        <el-form-item label="最低收益率">
          <el-input-number v-model="profit" controls-position="right" :min="1" size="small"></el-input-number> %
        </el-form-item>
      </div>

    </el-form>
    <div>
      已选择：
      <strong class="text-danger">{{multipleSelection.length}}</strong> 期，总追号金额：
      <strong class="text-danger">{{amounts}}</strong>元，
      <el-checkbox v-model="is_win_stop">中奖后停止追号</el-checkbox>
      <el-button type="primary" size="medium" @click="createList">生成追号单</el-button>
    </div>
    <el-table :data="tableData" stripe border style="width: 100%" @selection-change="val => multipleSelection = val" @select="select" @select-all="select" v-loading="loading" :element-loading-text="loadingText" max-height="520" ref="table">
      <el-table-column type="selection" width="50" />
      <el-table-column type="index" width="50" />
      <el-table-column label="期号" prop="issue" />
      <el-table-column label="倍数" prop="multiple">
        <template slot-scope="{row}">
          <el-input-number v-model="row.multiple" class="input-number-super-mini" controls-position="right" :min="1" :max="lottoRoot.maxMultiple" size="mini"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="金额" prop="amount" />
      <el-table-column label="时间" prop="time" />
    </el-table>
    <div slot="footer">
      <span class="text-danger">{{validateMessage}}</span>
      <el-button @click="submit" type="primary" size="mini" :disabled="!!validateMessage">确认追号</el-button>
      <el-button size="mini" @click="close">取消</el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss" src="../../assets/scss/lotto/chase.scss">

</style>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Countdown from '@xkeshi/vue-countdown'
// import { differenceInMinutes, addMinutes } from 'date-fns'
// import { time } from '~/plugins/filters'
import { sumBy, groupBy } from 'lodash'

const validateMessage = '请选择1期追号！'

const initDate = () => ({
  multiple: 1,
  periods: 10,
  times: 3,
  nums: 2,
  profit: 30,
  type: '同倍追号'
})

export default {
  name: 'chase',
  inject: ['lottoRoot'],
  props: {
    max: {
      default() {
        const { lotto } = this.lottoRoot
        return lotto ? lotto.max_trace_issue_count : 0
      }
    }
  },
  data() {
    return {
      visible: true,
      operator: '*',
      loading: true,
      countdown: 0,
      clock: null,
      list: [],
      multipleSelection: [],
      is_win_stop: true,
      tableData: [],
      isChange: false,
      validateMessage: '',
      ...initDate()
    }
  },
  components: {
    Countdown
  },
  watch: {
    orderLength() {
      //ensure is not sumbit this.setOrder([])
      if (!this.visible) {
        Object.assign(this, initDate())
      }
    },
    issue() {
      if (this.visible) this.get()
      Object.assign(this, initDate())
    }
  },
  // created() {
  //   ;['issue', 'orderLength'].forEach(i =>
  //     this.$watch(i, () => {
  //       Object.assign(this, initDate())
  //       // this.isChange = true
  //       if(this.visible) this.get()
  //     })
  //   )
  // },
  methods: {
    // get(render = false) {
    get() {
      // ;(render || this.isChange) && this.render()
      this.$axiosPlus(
        'lottery-issue/get-by-date',
        { is_future: 1, lottery_id: this.lottoRoot.lottoId },
        _ => {
          // this.list = _.issues.map(_ => _.content)
          //do not map _.content,less iteration tableData.map
          this.list = _.issues
          this.createList(false)
          this.loading = false
        }
      )
      this.timeStart()
    },
    timeStart() {
      if (this.visible) {
        this.clock = this.lottoRoot.getIssueRef().clock
        this.countdown = this.clock.time.time * 1000
        setTimeout(this.$countdown.start, 1000)
      }
    },
    handleClose() {
      //don't do,this clock use issue.vue
      // this.clock.timer._destroyTimer()
      this.$countdown.stop()
      this.validateMessage = ''
      this.loading = true
    },
    close() {
      this.visible = false
    },
    select() {
      this.validateMessage = ''
    },
    // render(val) {
    //   const $vmIssue = this.lottoRoot.getIssueRef()
    //   const { end_betted_at, begin_betted_at } = $vmIssue.newest
    //   const { num, multiple } = this
    //   let { issue } = this
    //   let hasSeparator = issue.includes('-')
    //   if (hasSeparator) {
    //     const [first, end] = issue.split('-')
    //   }
    //   this.tableData = [...Array(num)].map((v, index) => ({
    //     issue: hasSeparator ? first + (+end + index) : +issue + index,
    //     multiple,
    //     amount: this.order[0] ? this.order[0].amount : 0,
    //     time: time(
    //       addMinutes(
    //         end_betted_at,
    //         differenceInMinutes(end_betted_at, begin_betted_at) * index
    //       )
    //     )
    //   }))
    //   if (val) {
    //     this.$refs.table.store.commit('toggleAllSelection')
    //   }
    //   this.isChange = false
    // },
    typeChange() {
      if (
        this.isProfit &&
        Object.keys(groupBy(this.order, 'lottery_method_identifier')).length > 1
      ) {
        this.validateMessage = '只能对同一玩法利润率追号！'
      } else {
        this.validateMessage = ''
      }
    },
    getMultiple(index) {
      const { type, multiple } = this
      if (type === '同倍追号') {
        return multiple
      } else {
        // else if (type === '翻倍追号') {
        const increase = Math.ceil(index / this.times) - 1
        if (this.operator === '*') return Math.pow(this.nums, increase)
        else return increase * this.nums + 1
      }
    },
    createList(unselect) {
      // this.$nextTick(() => this.render(this.num))
      const { periods, list, order, isProfit, profit } = this
      const { amount, bonus } = order[0]
      // let amountAll = 0
      let c = 0
      let multiple = this.multiple

      // 投注总成本 = 每一期金额 + 之前金额总和

      // 中奖金额/投注总成本 >1+设置利润率/100

      this.tableData = [
        ...Array(Math.min(periods, list.length))
      ].map((v, index) => {
        if (isProfit) {
          // console.log(index + 1,'中奖金额:' + bonus + '投注金额:' + amount + '之前累加金额：' + amountAll)

          // // multiple = Math.ceil((1+profit/100) / (bonus / (amountAll + amount) ) )

          // multiple = Math.ceil((bonus/(1+profit/100) - amountAll)/amount)

          // console.log('求得倍数',multiple,'累加金额 更新',amountAll + multiple * amount)
          // amountAll = amountAll + multiple * amount

          if (index > 0) {
            c += multiple
            multiple = Math.max(
              this.multiple,
              Math.ceil(
                c *
                  amount *
                  (1 + profit / 100) /
                  (bonus - amount * (1 + profit / 100))
              )
            )
          }
        } else {
          multiple = this.getMultiple(index + 1)
        }
        return {
          issue: list[index].content.issue_no,
          multiple,
          amount: (isProfit ? amount : sumBy(order,'amount') )* multiple,
          time: list[index].content.begin_betted_at
        }
      })
      if (unselect !== false)
        this.$refs.table.store.commit('toggleAllSelection')
    },
    submit() {
      if (
        !this.validateMessage &&
        this.lottoRoot.checkBal(this.amounts) === true
      ) {
        const { multipleSelection, order } = this
        // if(multipleSelection[0].issue < this.issue) {
        //   return this.$message.error({duration:2000,message:'期号已过期'})
        // }
        // issue already watch
        const chase_issue_count = multipleSelection.length
        if (chase_issue_count === 0)
          return (this.validateMessage = validateMessage)
        const { ip, is_win_stop } = this
        const { lottery_info_identifier } = order[0]
        this.$axiosPlus(
          'user-chase-bet-lottery/create',
          {
            ip,
            lottery_info_identifier,
            chase_issue_count,
            is_win_stop,
            chasebets: order,
            chaseissues: multipleSelection.map(({ issue, multiple }) => ({
              issue,
              multiple
            }))
          },
          data => {
            this.setOrder([])
            this.$message({
              message: '追号成功！',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false
              }
            })
            this.lottoRoot.$chaseOrder.get()
            this.lottoRoot.$report.tabIndex = 1
          }
        )
      }
    },
    ...mapMutations({
      setOrder: 'lotto/setOrder'
    })
  },
  computed: {
    amounts() {
      return sumBy(this.multipleSelection, _ => _.amount * _.multiple)
    },
    ...mapGetters({
      order: 'lotto/order',
      ip: 'ip'
    }),
    loadingText() {
      return this.$store.state.loading.text
    },
    orderLength() {
      return this.order.length
    },
    issue() {
      return this.lottoRoot.issue
    },
    isProfit() {
      return this.type === '利润率追号'
    }
  },
  mounted() {
    this.$countdown = this.$refs.countdown
    //before @open run,first visible true not  emit @open
    // this.get(true)
    this.get()
  }
}
</script>

