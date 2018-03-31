<template>
  <div>
    <div class="play-options">
      共&nbsp;&nbsp;
      <span class="play-count">{{count}}</span>&nbsp;&nbsp;注， 单注金额
      <el-autocomplete class="inline-input" v-model="betAmount" :fetch-suggestions="querySearch" auto-complete></el-autocomplete>
      <div class="play-amount-unit d-flex align-items-center">
        <el-button-group>
          <el-button v-for="(unit,index) in ['元','角','分']" :key="index" :class="{selected:index === unitIndex}" @click="select(index)">
            {{unit}}
          </el-button>
        </el-button-group>
      </div>
      <div class="d-flex align-items-center">
        共&nbsp;&nbsp;
        <strong>{{amount | defaultRound}}</strong>&nbsp;&nbsp;元
      </div>
      &nbsp;&nbsp;
      奖金调节：<el-slider v-model="groupVal" :min="minBonusGroup" :max="max" :step="2"></el-slider> {{calcPoint}}%
      &nbsp;&nbsp;
      当前奖金：<strong>{{bonus || baseBonusCal * unit * groupVal | defaultRound}}</strong>元</div>

      <!-- <div>
        奖金 <strong>{{bonus | defaultRound}}</strong>元，盈利 <strong>{{profit | defaultRound}}</strong>元
      </div> -->
      <!-- <div>
        倍數
        <el-input-number v-model="multiple" :min="1" :max="maxMultiple"></el-input-number>
      </div> -->
    </div>

  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import { minus, divide } from 'number-precision'
export default {
  name: 'lotto-options',
  inject: ['lottoRoot'],
  props: ['max', 'maxMultiple'],
  //max value is Number,it can't reactive
  // props:{
  //   max:{
  //     default(){
  //       const {getMaxBonus,playInfo} = this.lottoRoot
  //       return getMaxBonus(playInfo.max_bet_prize_group)
  //     }
  //   }
  // },
  data() {
    return {
      unitIndex: 0,
      betAmount: '',
      groupVal: this.max //reposal options named value
    }
  },
  methods: {
    select(index) {
      this.unitIndex = index
    },

    querySearch(queryString, cb) {
      const betAmountList = [
        { value: 1 },
        { value: 2 },
        { value: 5 },
        { value: 10 },
        { value: 20 },
        { value: 50 },
        { value: 100 },
        { value: 200 },
        { value: 500 },
        { value: 1000 },
        { value: 2000 },
        { value: 5000 },
        { value: 10000 },
        { value: 20000 },
        { value: 50000 }
      ]
      // 调用 callback 返回建议列表的数据
      cb(betAmountList)
    }
  },
  computed: {
    ...mapGetters({
      count: 'lotto/betCount'
    }),
    ...mapGetters(['bonusGroup', 'minBonusGroup']),
    baseBonusCal() {
      return this.lottoRoot.playInfo.cal_prize_base
    },
    unit() {
      //1=1元, 2=1角, 3=1分, 4=1厘
      return 10 / Math.pow(10, this.unitIndex + 1)
    },
    amount() {
      const { count, multiple, unitIndex, unit } = this
      return count * multiple * this.lottoRoot.betAmount * unit
    },
    bonus() {
      const { groupVal, amount, baseBonusCal, unit, multiple } = this
      return amount ? groupVal * baseBonusCal * unit * multiple : 0
    },
    profit() {
      return minus(this.bonus, this.amount)
    },
    calcPoint() {
      const { bonusGroup, groupVal } = this
      return divide(bonusGroup - groupVal, 20)
    },
    point() {
      // return divide(this.calcPoint,100)
      return this.calcPoint / 100
    },

    multiple() {
      return this.betAmount / this.lottoRoot.betAmount
    }
  }
}
</script>
