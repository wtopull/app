<template>
  <div class="d-flex">
    <div class="b_list">
      <div class="order-head d-flex">
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shopcar"></use>
          </svg>
          购彩篮
        </div>
        <div class="d-flex">
          <a class="btn btn-bg" id="betting-append" data-command="ZhuiHao" @click="lottoRoot.getChase">
            追号投注
          </a>
          <div class="clean" @click="setOrder([])">清空</div>
        </div>
      </div>
      <div class="hd">
        <span class="play">玩法</span>
        <span class="zhu">号码</span>
        <!-- <span class="multi">倍</span> -->
        <span class="multi">注数</span>
        <span class="multi">单注金额</span>
        <span class="mode">模式</span>
        <span class="mode">返点</span>
        <span class="money">总金额</span>
        <span class="money">操作</span>
      </div>
      <div class="bd">
        <ul class="betting-list">
          <li v-for="({playName,bet_count,money_unit, buy_number, one_bet_amount, user_bet_self_return_point, multiple}, index) in order" :key="index">
            <el-tooltip placement="top" :content="playName" :disabled="tipable(playName)">
              <span>{{playName}}</span>
            </el-tooltip>
            <span>{{buy_number}}</span>
            <span>{{bet_count}}注</span>
            <el-input-number v-model="one_bet_amounts[index]" controls-position="right" :min="1" size="mini" @change="change(null,index)" class="input-number-super-mini"></el-input-number>
            <span>{{money_units[index]}}</span>
            <span>{{user_bet_self_return_point * 100 }}%</span>
            <span>{{amounts[index] | round2}}元</span>
            <span>
              <i class="el-icon-close" @click="del(index)"></i>
            </span>
          </li>
        </ul>
        <div class="betting-total">
          共<em class="total-amount" lottery="total-bet-number">{{count}}</em>注，
          总金额<em class="total-money" lottery="total-bet-money">{{totalAmount | defaultRound}}</em>元，
          可用余额<em class="total-money" lottery="total-bet-money">{{bal | defaultRound}}</em>元
        </div>
      </div>
    </div>
    <a class="btn btn-bg betting-confirm" id="betting-confirm" lottery="add_bet" @click="lottoRoot.bet">
      确认投注
      <div class="countdown-clock">
        截止时间
        <div>{{clock}}</div>
      </div>
    </a>
  </div>
</template>

<script>
import { sumBy } from 'lodash'
import { mapMutations,mapGetters } from 'vuex'
export const exampleIssue = () =>
  new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, '') + '000'

const issue_no = exampleIssue()

export default {
  name: 'play-order',
  data() {
    return {}
  },

  props: ['setOrder'],
  inject: ['lottoRoot'],
  methods: {
    change(val, i) {
      this.$nextTick(() => {
        const { order } = this
        //[vuex] Do not mutate vuex store state outside mutation handlers.
        // order[i].multiple = this.multiples[i]
        order[i] = { ...order[i], multiple: this.multiples[i], one_bet_amount: this.one_bet_amounts[i], money_unit: this.money_units[i]}
        // this.set(order) test multiples only change 3 times
        this.set([...order])
      })
    },
    del(index) {
      const order = [...this.order]
      order.splice(index, 1)
      this.set(order)
    },
    tipable(value) {
      let length = value.length
      let cn = value.match(/[\u4e00-\u9fa5]/g)
      return (cn ? cn.length + length : length) <= 10
    },
    ...mapMutations({
      set: 'lotto/setOrder'
    })
  },
  computed: {
    order() {
      return this.$store.state.lotto.order
    },
    count() {
      // return this.order.reduce((prev,next) => ({bet_count:prev.bet_count + next.bet_count}),{bet_count:0}).bet_count
      return sumBy(this.order, 'bet_count')
    },
    amounts() {
      return this.order.map(
        ({ bet_count, money_unit }, index) =>
          bet_count *
          this.lottoRoot.betAmount *
          this.multiples[index] *
          (10 / Math.pow(10, money_unit))
      )
    },

    totalAmount() {
      return this.amounts.reduce((prev, next) => prev + next, 0)
    },
    multiples() {
      return this.order.map(_ => _.multiple)
    },
    one_bet_amounts() {
      return this.order.map(_ => _.one_bet_amount * _.multiple)
    },
    money_units() {
      return this.order.map(_ => {
        console.log(_.money_unit)
        if (_.money_unit === 1) {
          return '元'
        } else if (_.money_unit === 2) {
          return '角'
        } else if (_.money_unit === 3) {
          return '分'
        }
      })
    },
    newest() {
      const { no_open_newest } = this.lottoRoot.issueData
      return no_open_newest ? no_open_newest : { issue_no }
    },
    countdown() {
      return this.newest.countdown_time || 0
    },

    clock() {
      const date = new Date(1970,0,1);
      date.setSeconds(this.countdown);
      return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    },
    ...mapGetters({
      bal:'pay/bal'
    })
  },

  mounted() {
    // clearInterval(this.intervalCountdown)
    // this.intervalCountdown = setInterval(() => {
    //   this.lottoRoot.getIssue()
    // }, 1000)
  },

  beforeDestroy() {
    if (this.intervalCountdown){
      clearInterval(this.intervalCountdown)
    }
  }
}
</script>

