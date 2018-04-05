<template>
  <div class="reposal-play-layout reposal-1st-col-last-border">
    <ul>
      <li v-for="(v,k) in 6">
        <h4>{{k === 5 ? '总和' : labels[k]}}</h4>
        <div class="ht">
          <span>号码</span>
          <span>赔率</span>
          <span v-show="!shortcut">金额</span>
        </div>
        <ul v-if="k !== 5">
          <li v-for="(i,j) in 2" @click="select(sequence[0](k,j))" :class="{selected:shortcut && +bigSmall[k][j]}">
            <div>{{size[j]}}</div>
            <div>{{getOdds(k,0,j) | round3}}</div>
            <el-autocomplete @input.native="validate(sequence[0](k,j))" v-model="bigSmall[k][j]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </li>
          <li v-for="(i,j) in 2" @click="select(sequence[1](k,j))" :class="{selected:shortcut && +oddEven[k][j]}">
            <div>{{size[j + 2]}}</div>
            <div>{{getOdds(k,1,j) | round3}}</div>
            <el-autocomplete @input.native="validate(sequence[1](k,j))" v-model="oddEven[k][j]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </li>
        </ul>
        <ul v-else>
          <li v-for="(i,j) in 2" @click="select(sequence[2](j))" :class="{selected:shortcut && +totalBigSmall[j]}">
            <div>总{{size[j]}}</div>
            <div>{{getOdds(5,0,j) | round3}}</div>
            <el-autocomplete @input.native="validate(sequence[2](j))" v-show="!shortcut" v-model="totalBigSmall[j]" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </li>
          <li v-for="(i,j) in 2" @click="select(sequence[3](j))" :class="{selected:shortcut && +totalOddEven[j]}">
            <div>总{{size[j + 2]}}</div>
            <div>{{getOdds(5,1,j) | round3}}</div>
            <el-autocomplete @input.native="validate(sequence[3](j))" v-show="!shortcut" v-model="totalOddEven[j]" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </li>
          <li v-for="(i,j) in 2" @click="select(sequence[4](j))" :class="{selected:shortcut && +tailBigSmall[j]}">
            <div>总尾{{size[j]}}</div>
            <div>{{getOdds(5,2,j) | round3}}</div>
            <el-autocomplete @input.native="validate(sequence[4](j))" v-show="!shortcut" v-model="tailBigSmall[j]" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.reposal-1st-col-last-border {
  ul > li:not(:last-child) {
    ul li:last-child {
      border-bottom: 1px solid $--border-color-base;
    }
  }
}
</style>


<script>
import { round, zip, flatten, camelCase } from 'lodash'
import reposal from '~/util/mixins/reposal'
import props from '~/util/lotto/reposal-props'

export default {
  name: 'both',
  props: { ...props, labels: Array },
  mixins: [reposal],
  data() {
    const init = this.initData()
    const modelType = Object.keys(init)
    return {
      ...init,
      sequence: [
        (k, j) => 4 * k + j,
        (k, j) => 4 * k + j + 2,
        j => 5 * 4 + j,
        j => 5 * 4 + j + 2,
        j => 5 * 4 + j + 4
      ],
      modelType,
      orderType: modelType.map(i => camelCase('order ' + i))
    }
  },
  beforeCreate() {
    this.initData = () => ({
      bigSmall: [...Array(5)].map(i => [...Array(2)]),
      oddEven: [...Array(5)].map(i => [...Array(2)]),
      totalBigSmall: [...Array(2)],
      totalOddEven: [...Array(2)],
      tailBigSmall: [...Array(2)]
    })
  },
  methods: {
    getLoopItem(data, buyValue, orderTypeIndex, deep = true) {
      if (deep == false) {
        return data
          .map(
            (amount, k) =>
              amount >= 1 && [
                buyValue[k],
                this.getOdds(5, orderTypeIndex - 2, k),
                round(amount, 6),
                this.sequence[orderTypeIndex](k),
                orderTypeIndex,
                this.playList[5].bets[orderTypeIndex - 2].identifier
              ]
          )
          .filter(Array.isArray)
      }
      return this._getLoopItem(data, buyValue, orderTypeIndex)
    },
    getOrder(orderTypeIndex) {
      let buyValue = null
      let deep = true

      switch (orderTypeIndex) {
        case 0:
          buyValue = ['大', '小']
          break
        case 1:
          buyValue = ['单', '双']
          break
        case 2:
          buyValue = ['总和：总大', '总和：总小']
          deep = false
          break
        case 3:
          buyValue = ['总和：总单', '总和：总双']
          deep = false
          break
        case 4:
          buyValue = ['总尾：总尾大', '总尾：总尾小']
          deep = false
      }
      this[this.orderType[orderTypeIndex]] = this.getLoopItem(
        this[this.modelType[orderTypeIndex]],
        buyValue,
        orderTypeIndex,
        deep
      )
    },
    order() {
      let orderTotal = this.orderTotalBigSmall.concat(this.orderTotalOddEven,this.orderTailBigSmall)
      if (
        !this.flattenOrder(this.orderType, [2, 3]).concat(orderTotal).length
      ) {
        return this.checkOrder()
      }
      let orderGroup = zip(
        this.orderBigSmall,
        this.orderOddEven
      ).map(i => flatten(i))

      orderGroup.forEach((v, k) =>
        v.forEach(i => (i[0] = this.labels[k] + '：' + i[0]))
      )
      this.setOrder(
        flatten(orderGroup).concat(orderTotal)
      )
      return true
    }
  }
}
</script>

