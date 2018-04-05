<template>
  <div :class="['reposal-play-layout',{'reposal-last-list-border':is11x5}]">
    <ul>
      <li v-for="(v,k) in is11x5 ? 4 : 5">
        <div class="ht">
          <span>号码</span>
          <span>赔率</span>
          <span v-show="!shortcut">金额</span>
        </div>
        <ul>
          <li v-if="sequence(k,j) < 11" v-for="(v,j) in is11x5 ? 3 : 2" @click="select(sequence(k,j))" :class="{selected:shortcut && +all5in1[k*2 + j]}">
            <div>
              <div class="ball">{{is11x5 ? k *3 + j + 1 : k*2 + j}}</div>
            </div>
            <div>
              {{getOdds(listIndex,0,j) | round3}}
            </div>
            <el-autocomplete @input.native="validate(sequence(k,j))" v-model="all5in1[sequence(k,j)]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { round } from 'lodash'
import reposal from '~/util/mixins/reposal'

export default {
  name: 'all5-in1',
  data() {
    const is11x5 = this.lottoType === '11x5'
    const listIndex = is11x5 ? 7 : 10
    const {identifier} = this.playList[listIndex] ? this.playList[listIndex].bets[0] : ''
    return {
      sequence: (k, j) => (is11x5 ? 3 : 2) * k + j,
      //util/mixins/reposal.js:56,validOrder require modelType
      modelType: 'all5in1',
      orderStr: 'orderAll5in1',
      ...this.initData(),
      identifier,
      listIndex,
      is11x5
    }
  },
  mixins: [reposal],
  beforeCreate() {
    this.initData = () => ({
      all5in1: [...Array(this.is11x5 ? 11 : 10)]
    })
  },
  methods: {
    getOrder(valid = true) {
      if (valid && this.validOrder() !== true) return
      this.orderAll5in1 = this.all5in1
        .map((amount, index) => amount >= 1 && [
          index, //buyValue
          this.getOdds(this.listIndex, 0, index),
          round(amount, 6), 
          index
        ])
        .filter(Array.isArray)
    },
    order() {
      if (this.validOrder() !== true) return
      this.orderAll5in1.forEach((v, k) => (v[0] = '全5中1：' + (v[0] + (this.is11x5 ? 1 : 0))))
      this.setOrder(this.orderAll5in1)
      return true
    }
  }
}
</script>
