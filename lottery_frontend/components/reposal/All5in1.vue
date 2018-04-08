<template>
  <div :class="['reposal-play-layout','reposal-all5in1',{'reposal-last-list-border':is11x5}]">
    <div class="reposal-odds-view">
      <div>
        {{getOdds(listIndex,0,0) | round3}}
      </div>
    </div>
    <ul class="d-flex justify-content-between">
      <li v-for="(v,k) in is11x5 ? 11 : 10" :class="{selected:selected(all5in1[k])}">
        <div @click="select(k)">
          {{is11x5 ? k + 1 : k}}
        </div>
        <el-input type="number" @input.native="validate(k)" v-model="all5in1[k]" ref="input" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.reposal-play-layout {
  &.reposal-all5in1 {
    display:block;//nest flex can't enable justify-content
    margin-bottom: 20px;
    > ul > li {
      display: block;
      > div:first-child{
        margin-bottom: 3px;
      }
    }
    .el-input__inner{
      width: 56px;
    }
    .reposal-odds-view{
      margin-bottom: 8px!important;
    }
  }
}
</style>


<script>
import { round } from 'lodash'
import reposal from '~/util/mixins/reposal'

export default {
  name: 'all5-in1',
  data() {
    const is11x5 = this.lottoType === '11x5'
    const listIndex = is11x5 ? 7 : 10
    const { identifier } = this.playList[listIndex]
      ? this.playList[listIndex].bets[0]
      : ''
    return {
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
        .map(
          (amount, index) =>
            amount >= 1 && [
              index, //buyValue
              this.getOdds(this.listIndex, 0, index),
              round(amount, 6),
              index
            ]
        )
        .filter(Array.isArray)
    },
    order() {
      if (this.validOrder() !== true) return
      this.orderAll5in1.forEach(
        (v, k) => (v[0] = '全5中1：' + (v[0] + (this.is11x5 ? 1 : 0)))
      )
      this.setOrder(this.orderAll5in1)
      return true
    }
  }
}
</script>
