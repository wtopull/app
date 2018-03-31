<template>
  <div class="reposal-play-layout reposal-play-col5">
    <ul>
      <li v-for="(v,k) in 10">
        <h4>{{rank[k]}}</h4>
        <div class="ht">
          <span>号码</span>
          <span>赔率</span>
          <span v-show="!shortcut">金额</span>
        </div>
        <ul>
          <li v-for="(i,j) in 10" @click="select(sequence(k,j))" :class="{selected:shortcut && +nums[k][j]}">
            <div>
              <div class="ball">{{j}}</div>
            </div>
            <div>{{getOdds(k,0,j)}}</div>
            <el-autocomplete @input.native="validate(sequence(k,j))" v-show="!shortcut" v-model="nums[k][j]" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import reposal from '~/util/mixins/reposal'
import props from '~/util/lotto/reposal-props'
import { round, zip, flatten } from 'lodash'

export default {
  //Component names can only contain alphanumeric characters and the hyphen, and must start with a letter.
  name:'one2ten',
  props:{...props,rank:Array},
  data(){
    return {
      modelType:'nums',
      orderStr: 'orderNums',
      sequence: (k, j) => 10 * k + j,
      ...this.initData()
    }
  },
  beforeCreate() {
    this.initData = () => ({
      nums: [...Array(10)].map(_ => [...Array(10)])
    })
  },
  mixins: [reposal],
  methods:{
    getOrder(valid = true) {
      if (valid && this.validOrder() !== true) return //avoid iterable
      this.orderNums = this.nums.map((i, col) =>
        i
          .map(
            (amount, index) =>
              amount >= 1 && [
                index,
                this.getOdds(col, 0, index),
                round(amount, 6),
                10 * col + index,
                ,
                this.playList[col].bets[0].identifier
              ]
          )
          .filter(Array.isArray)
      )
    },
    order(){
      if(this.validOrder() !== true) return
      let order = [...this.orderNums]
      order.forEach((v,k) => v.forEach(i => i[0] = this.rank[k] + '：' + i[0]))
      this.setOrder(flatten(order))
      return true
    }
  }  
}
</script>
