<template>
  <div class="reposal-play-layout reposal-col-last-border">
    <ul>
      <li v-for="(v,k) in 3">
        <div class="ht">
          <span>号码</span>
          <span>赔率</span>
          <span v-show="!shortcut">金额</span>
        </div>
        <ul v-if="k === 0">
          <li v-for="(i,j) in 3" @click="select(j)" :class="{selected:shortcut && +bigSmall[j]}">
            <div>{{size[j === 2 ? 4 : j]}}</div>
            <div>{{getOdds(1,0,j) | round3}}</div>
            <el-autocomplete @input.native="validate(j)" v-model="bigSmall[j]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </li>
          <li v-for="(i,j) in 2" @click="select(j + 3)" :class="{selected:shortcut && +oddEven[j]}">
            <div>{{size[j + 2]}}</div>
            <div>{{getOdds(2,0,j) | round3}}</div>
            <el-autocomplete @input.native="validate(j + 3)" v-model="oddEven[j]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </li>
        </ul>
        <ul v-else>
          <li v-for="(i,j) in 3" @click="select(5 + (k - 1 )* 3 + j)" :class="{selected:shortcut && +(k === 2 ? oddEven2 : updown)[j]}">
            <div>{{j === 2 ? '和' : type[k == 2 ? j + 2 : j]}}</div>
            <div>{{getOdds(k + 1,0,j) | round3}}</div>
            <el-autocomplete @input.native="validate(5 + (k - 1 )* 3 + j)" v-model="(k === 2 ? oddEven2 : updown)[j]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.reposal-col-last-border {
  ul > li:not(:first-child) {
    ul li:last-child {
      border-bottom: 1px solid $--border-color-base;
    }
  }
}
</style>


<script>
import { round, flatten, camelCase } from 'lodash'
import reposal from '~/util/mixins/reposal'

export default {
  name: 'integrate',
  mixins: [reposal],
  data() {
    const cols = flatten(this.playList.slice(1).map(_ => _.bets))
    const init = this.initData()
    const modelType = Object.keys(init)
    return {
      ...init,
      type: ['上', '下', '奇', '偶'],
      cols,
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
      bigSmall: [...Array(3)],
      oddEven: [...Array(2)],
      updown: [...Array(3)],
      oddEven2: [...Array(3)]
    })
  },
  methods: {
    getLoopItem(data, buyValue, orderTypeIndex) {
      return data
        .map((amount, k) => {
          const index = orderTypeIndex < 2 ? 1 : orderTypeIndex
          const betIndex = orderTypeIndex === 1 ? 1 : 0
          return (
            amount >= 1 && [
              buyValue[k],
              this.getOdds(index, betIndex, k),
              round(amount, 6),
              (orderTypeIndex > 1
                ? (orderTypeIndex - 1) * 3 + 2
                : orderTypeIndex * 3) + k,
              orderTypeIndex,
              this.playList[index].bets[betIndex].identifier
            ]
          )
        })
        .filter(Array.isArray)
    },
    getOrder(orderTypeIndex) {
      let buyValue = null

      switch (orderTypeIndex) {
        case 0:
          buyValue = ['大', '小', '和'].map(_ => `大小：${_}`)
          break
        case 1:
          buyValue = ['单', '双']
          break
        case 2:
          buyValue = ['上', '下','和'].map(_ => `上下：${_}`)
          break
        case 3:
          buyValue = ['奇', '偶','和'].map(_ => `奇偶：${_}`)
          break
      }
      this[this.orderType[orderTypeIndex]] = this.getLoopItem(
        this[this.modelType[orderTypeIndex]],
        buyValue,
        orderTypeIndex
      )
    },
    order() {
      const orderAll = this.flattenOrder(this.orderType, false, false)
      if (!orderAll.length) {
        return this.checkOrder()
      }
      this.setOrder(orderAll)
      return true
    }
  }
}
</script>
