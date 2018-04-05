<template>
  <div>
    <div class="play-options">
      <span class="play-count">{{count}}</span>注
      <div class="play-amount-unit d-flex align-items-center">
        模式
        <el-button v-for="(unit,index) in ['元','角','分','厘']" :key="index" :class="{selected:index === unitIndex}" @click="select(index)">
          {{unit}}
        </el-button>
      </div>
      <div>
        倍數
        <el-input-number v-model="multiple" :min="1" :max="maxMultiple"></el-input-number>
      </div>
      <div>
        共 <strong>{{amount | defaultRound}}</strong>元
      </div>
      <div>
        奖金 <strong>{{bonus | defaultRound}}</strong>元，盈利 <strong>{{profit | defaultRound}}</strong>元
      </div>

    </div>
    <div class="play-slider">
    奖金调节：<el-slider v-model="groupVal" :min="minBonusGroup" :max="max" :step="2"></el-slider> {{point}}%
    </div>
    <div>当前奖金：<strong>{{bonus || baseBonusCal * unit * groupVal | defaultRound}}</strong>元</div>
    
  </div>
    
</template>

<script>
import { mapGetters } from 'vuex'
import {minus} from 'number-precision'
export default {
  name:'lotto-options',
  inject: ['lottoRoot'],
  props:['max','maxMultiple'],
  //max value is Number,it can't reactive
  // props:{
  //   max:{
  //     default(){
  //       const {getMaxBonus,playInfo} = this.lottoRoot
  //       return getMaxBonus(playInfo.max_bet_prize_group)
  //     }
  //   }
  // },
  data(){
    return {
      unitIndex:0,
      multiple:1,
      groupVal:this.max //reposal options named value
    }
  },
  methods:{
    select(index){
      this.unitIndex = index
    }
  },
  computed:{
    ...mapGetters({
      count:'lotto/betCount'
    }),
    ...mapGetters([
      'bonusGroup',
      'minBonusGroup'
    ]),
    baseBonusCal(){
      return this.lottoRoot.playInfo.cal_prize_base
    },
    unit(){
      //1=1元, 2=1角, 3=1分, 4=1厘
      return 10/Math.pow(10,this.unitIndex + 1)
    },
    amount(){
      const {count,multiple,unitIndex,unit} = this
      return count * multiple * this.lottoRoot.betAmount * unit
    },
    bonus(){
      const {groupVal,amount,baseBonusCal,unit,multiple} = this
      return amount ? groupVal * baseBonusCal * unit * multiple : 0
    },
    profit(){
      return minus(this.bonus,this.amount)
    },
    point(){
      const {bonusGroup,groupVal} = this
      return (bonusGroup - groupVal)/20
    }
    
  },
}
</script>
