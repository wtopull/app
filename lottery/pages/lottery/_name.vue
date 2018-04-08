<template>
  <div class="lottery">
    <div class="lottery_top">
      <div class="t_l">
        <!-- css selector not support '1min' -->
        <div class="c_pic" :class="lottoName"></div>
      </div>
      <div class="c_ld">
        <nuxt-link :to="`/${betType[0][1]}/${lottoName}`">
          {{betType[1][1]}}玩法
          <span class="transfer-type-icon"></span>
        </nuxt-link>
      </div>
      <issue ref="issue" />
      <div class="c_rd">
        <a :href="trendHref" target="_blank" v-if="trendHref">
          走势图
          <span class="trend_icon"></span>
        </a>
        <button disabled v-else>
          走势图
          <span class="trend_icon"></span>
        </button>
        <a href="admin/playhelp/ssc" target="_blank">
          玩法说明
          <span class="trend_icon"></span>
        </a>
      </div>
    </div>
    <div class="lottery_con">
      <play-nav />
      <div class="lottery-content">
        <div class="lottery-panel">
          <help :identifier="playIdentifier" />
          <layout :identifier="playIdentifier" :type="lottoType" v-bind={playText} ref="layout" />
        </div>
        <div class="lottery-record">
          <div class="lottery-record-head">
            <div>奖期</div>
            <div>开奖</div>
          </div>
          <el-scrollbar>
            <ul>
              <li v-for="issue in issueList" :key="issue.issue_no" class="lottery-record-item">
                <div class="qh">{{issue.issue_no}}</div>
                <div class="kj">
                  <span v-for="num in issue.win_number.split(',')">{{num}}</span>
                </div>
              </li>
            </ul>
          </el-scrollbar>
        </div>
      </div>
      <div class="lottery-operator">
        <options :max="getMaxBonus(playInfo.max_bet_prize_group)" :maxMultiple="maxMultiple" ref="options" />
        <div class="betting-actions">
          <el-button type="primary" class="btn btn-bg btn-betting" lottery="quick_bet" @click="bet(true)">一键投注</el-button>
          <el-button type="primary" class="btn btn-bg btn-add" id="betting-add" @click="getOrder">添加号码</el-button>
        </div>
      </div>
      <div class="lottery-basket">
        <div class="betting-lottery">
          <order ref="order" :setOrder="setOrder" />
        </div>
      </div>
      <component :is="view" ref="chase" />
    </div>
    <report ref="report" />
    <!-- <component :is="launchReport"></component> -->
  </div>
</template>
<style lang="scss">
@import '../../assets/scss/lotto';
@import '../../assets/scss/lotto/index';
</style>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { groupBy, flatten, sumBy } from 'lodash'
import { initLottoPlays } from '~/util/lotto/transform-plays'
import lotto from '~/util/mixins/lotto'
import PlayNav from '~/components/lotto/PlayNav'
import Help from '~/components/lotto/Help'
import Layout from '~/components/lotto/Layout'
import Options from '~/components/lotto/Options'
import Order from '~/components/lotto/Order'
import Report from '~/components/lotto/Report'
import { time } from '~/plugins/filters'
import { simpleCompress, transformCode } from '~/util/lotto/code'
import aesDecrypt from '~/util/aesDecrypt'
import { AsyncComp, noop } from '~/plugins/common'

export default {
  name: 'lotto',
  asyncData({ app, store, params, redirect, error }) {
    if (!params.name) return redirect('/lottery/cqssc')
    if (store.state.lotto.types.length == 0) {
      return {
        playList: []
      }
    }

    return initLottoPlays(store, params.name, app, error)
  },
  data() {
    return {
      bigWayIndex: 0,
      playIndex: [0, 0],
      playText: {},
      view: ''
    }
  },
  mixins: [lotto],
  components: {
    PlayNav,
    Help,
    Layout,
    Options,
    Order,
    Chase: AsyncComp('lotto', 'Chase'),
    Report
  },
  methods: {
    async authResolve() {
      //the first await to avoid repeat 'static-data/lottery-version'
      await this.$store.dispatch('lotto/getTypes')
      this.getIssue()
      this.getIssueList()
      this.getBal()
      Object.assign(
        this,
        await initLottoPlays(this.$store, this.lottoName, this)
      )
    },
    ...mapMutations({
      resetBallSet: 'lotto/_ballSet',
      setBetCount: 'lotto/setBetCount',
      setOrder: 'lotto/setOrder'
    }),
    async checkSinglePer() {
      const { betCount, singlePer } = this
      if (betCount < singlePer * this.playInfo.all_bet_count) {
        await this.$confirm('当前选号是单挑模式，是否继续投注?', '注意', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        return true
      } else {
        return true
      }
    },
    async getOrder(add = true) {
      //add params is MouseEvent
      const { betCount, isPlaySimple } = this
      if (betCount === 0) {
        return add ? this.checkOrder() : this.order
      }
      if (!isPlaySimple && (await this.checkSinglePer().catch(noop)) !== true)
        return
      const {
        playIdentifier,
        lottoName,
        lottoType,
        betAmount,
        ballSet,
        issue,
        isPlayCodeDouble
      } = this
      const {
        unitIndex,
        multiple,
        point,
        groupVal,
        amount,
        bonus
      } = this.$$options
      let { textArray, code, layout } = this.$layout
      const orderItem = {
        user_bet_self_return_point: point,
        user_bet_prize_group: groupVal,
        lottery_info_identifier: lottoName,
        lottery_method_identifier: playIdentifier,
        issue,
        buy_number: isPlaySimple
          ? simpleCompress(textArray, layout, isPlayCodeDouble)
          : Array.isArray(code[0]) ? code.join('|') : code.toString(),
        one_bet_amount: betAmount,
        bet_count: betCount,
        multiple,
        //1=1元, 2=1角, 3=1分, 4=1厘
        money_unit: unitIndex + 1,
        amount,
        bonus,
        playName: this.playInfo.name,
        lottoType
      }

      const order = this.order.concat(orderItem)

      if (add) {
        this.resetBallSet([])
        this.setOrder(order)
      } else {
        return order
      }
    },
    async bet(oneKey) {
      const isOneKey = oneKey === true
      if (
        !this.isInvoking &&
        this.checkBal(
          this.$order.totalAmount + (isOneKey ? this.$$options.amount : 0)
        ) === true
      ) {
        const {
          ip,
          order,
          betCount,
          isPlaySimple,
          playText,
          playIdentifier
        } = this
        if (betCount === 0 && order.length === 0) {
          return this.checkOrder()
        }
        this.isInvoking = true
        let { textArray, code, layout } = this.$layout
        let t1 = performance.now()
        const oneKeyOrder = await this.getOrder(false)
        if (!oneKeyOrder) return (this.isInvoking = false)
        let allBets = Object.values(
          groupBy(isOneKey ? oneKeyOrder : order, 'lottery_info_identifier')
        )
        let newData = []
        await Promise.all(
          allBets.map(bets => {
            let t2 = performance.now()
            this.$styleLog(t2 - t1, 'large')
            return this.$axiosPlus(
              'user-bet-lottery/create',
              {
                ip,
                //oneKey params is MouseEvent
                bets
              },
              data => newData.push(data)
            )
          })
        )
        if (!newData.length) return (this.isInvoking = false)
        this.$message({
          message: '投注成功！',
          type: 'success',
          duration: 1500
        })
        this.getBal()
        let tableData = this.$lottoOrder.tableData
        let length = tableData.length
        newData = flatten(newData)
        allBets = flatten(allBets)

        this.$lottoOrder.tableData = allBets
          .map(
            (
              {
                playName,
                issue,
                amount,
                lottery_info_identifier,
                buy_number,
                lottoType
              },
              index
            ) => {
              if (newData[index]) {
                const { ...props } = newData[index]
                const method =
                  this.listMap[lottery_info_identifier].name + '-' + playName
                return {
                  ...props,
                  buy_number: transformCode(buy_number, method, lottoType),
                  bonus: 0,
                  method,
                  issue,
                  amount:
                    isOneKey && index === allBets.length - 1
                      ? amount
                      : this.$order.amounts[index],
                  status: 1,
                  created_at: time(new Date()),
                  cancelable: true
                }
              }
              return false
            }
          )
          .filter(_ => _)
          .concat(
            tableData.slice(0, length >= 10 ? length - allBets.length : length)
          )
        this.setOrder([])
        isPlaySimple && (playText[playIdentifier] = '')
        isOneKey && !isPlaySimple && this.resetBallSet([])
        this.isInvoking = false
      }
    },
    getChase() {
      if (this.order.length === 0) {
        return this.$message({
          message: '请添加订单！',
          type: 'error',
          duration: 1500
        })
      }
      if (this.checkBal(sumBy(this.order, 'amount')) === true) {
        if (
          this.order.some(_ => _.lottery_info_identifier !== this.lottoName)
        ) {
          return this.$message({
            message: '只能对当前彩种追号！',
            type: 'error',
            duration: 1500
          })
        }
        if (this.view) {
          return (this.$refs.chase.visible = true)
        }
        this.view = 'Chase'
      }
    }
  },
  computed: {
    ...mapGetters({
      betCount: 'lotto/betCount',
      order: 'lotto/order',
      sysConfigs: 'sysConfigs'
    }),
    maxMultiple() {
      const maxMultiple = this.sysConfigs.find(
        _ => _.identify === 'bet_max_multiple'
      )
      return maxMultiple ? +aesDecrypt(maxMultiple.value) : 100000
    },
    smallWays() {
      return this.playList[this.bigWayIndex]
        ? this.playList[this.bigWayIndex].small_ways
        : []
    },
    playInfo() {
      const [i, j] = this.playIndex
      return this.smallWays[i] ? this.smallWays[i].bets[j] : {}
    },
    betAmount() {
      return this.playInfo.bet_prize
    },
    playIdentifier() {
      return this.playInfo.identifier
    },
    isPlaySimple() {
      const { playIdentifier } = this
      //三不同号单选 sanbutonghao_sanbutonghao_sbthds
      return (
        playIdentifier.includes('ds') &&
        !/danshuang|tonghao/.test(playIdentifier)
      )
    },
    singlePer() {
      const singlePer = this.sysConfigs.find(_ => _.identify === 'single_per')
      return singlePer ? aesDecrypt(singlePer.value) / 100 : 1
    }
  },
  mounted() {
    //$options is an Instance Properties https://vuejs.org/v2/api/#vm-options
    this.$$options = this.$refs.options
    this.$report = this.$refs.report
    this.$lottoOrder = this.$report.$refs.lottoOrder
    this.$chaseOrder = this.$report.$refs.chaseOrder
    this.$layout = this.$refs.layout
  },
  destroyed() {
    this.resetBallSet([])
    this.setBetCount(0)
  }
}
</script>
\
