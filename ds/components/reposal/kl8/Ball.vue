<template>
  <div class="reposal-play-layout">
    <ul>
      <li v-for="(v,k) in 5">
        <div class="ht">
          <span>号码</span>
          <span>赔率</span>
          <span v-show="!shortcut">金额</span>
        </div>
        <ul>
          <li v-for="(i,j) in 16" @click="select(sequence(k,j))" :class="{selected:shortcut && +zhengma[sequence(k,j)]}">
            <div>
              <div class="ball">{{sequence(k,j) + 1}}</div>
            </div>
            <div>{{getOdds(0,0,sequence(k,j))}}</div>
            <el-autocomplete @input.native="validate(sequence(k,j))" v-model="zhengma[sequence(k,j)]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
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
  name: 'kl8-zhengma',
  mixins: [reposal],
  data() {
    const { identifier } = this.playList[0] ? this.playList[0].bets[0] : ''
    return {
      sequence: (k, j) => j + 16 * k,
      identifier,
      modelType: 'zhengma',
      orderStr: 'orderZhengma',
      ...this.initData()
    }
  },
  beforeCreate() {
    this.initData = () => ({
      zhengma: [...Array(80)]
    })
  },
  methods: {
    getOrder(valid = true) {
      if (valid && this.validOrder() !== true) return
      this.orderZhengma = this.zhengma
        .map(
          (amount, index) =>
            amount >= 1 && [
              index + 1,
              this.getOdds(0, 0, index),
              round(amount, 6),
              index
            ]
        )
        .filter(Array.isArray)
    },
    order() {
      if (this.validOrder() !== true) return
      this.orderZhengma.forEach((v, k) => (v[0] = '正码：' + v[0]))
      this.setOrder(this.orderZhengma)
      return true
    }
  }
}
</script>
