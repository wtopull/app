<template>
  <div class="reposal-play-layout reposal-1st-col-last-border">
    <ul>
      <li v-for="(v,k) in 4">
        <div class="ht">
          <span>号码</span>
          <span>赔率</span>
          <span v-show="!shortcut">金额</span>
        </div>
        <ul v-if="k !== 3">
          <li v-for="(i,j) in 3" @click="select(sequence[0](k,j))" :class="{selected:shortcut && +nums[k*3 + j]}">
            <div>
              <div class="ball">{{k*3 + j + 1}}</div>
            </div>
            <div>{{getOdds(index,2,k*3 + j) | round3}}</div>
            <el-autocomplete @input.native="validate(sequence[0](k,j))" v-model="nums[k*3 + j]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </li>
          <li v-for="(i,j) in 2" @click="select(sequence[1](k,j))" :class="{selected:shortcut && (k == 2 ? +totalBigSmall[j] : k == 1 ? +oddEven[j] : +bigSmall[j])}">
            <div>{{k == 2 ? '总' + size[j] : size[k*2 + j]}}</div>
            <div>{{k == 2 ? getOdds(5,0,j) : getOdds(index,k,j) | round3}}</div>
            <el-autocomplete @input.native="validate(sequence[1](k,j))" v-if="k == 2" v-model="totalBigSmall[j]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
            <el-autocomplete @input.native="validate(sequence[1](k,j))" v-else-if="k == 1" v-model="oddEven[j]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
            <el-autocomplete @input.native="validate(sequence[1](k,j))" v-else v-model="bigSmall[j]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </li>
        </ul>
        <ul v-else>
          <li v-for="(i,j) in 2" @click="select(sequence[0](k,j))" :class="{selected:shortcut && +nums[k*3 + j]}">
            <div>
              <div class="ball">{{k*3 + j + 1}}</div>
            </div>
            <div>{{getOdds(index,2,k*3 + j) | round3}}</div>
            <el-autocomplete @input.native="validate(sequence[0](k,j))" v-model="nums[k*3 + j]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </li>
          <li></li>
          <li v-for="(i,j) in 2" @click="select(sequence[2](j))" :class="{selected:shortcut && +totalOddEven[j]}">
            <div>总{{size[j + 2]}}</div>
            <div>{{getOdds(5,1,j) | round3}}</div>
            <el-autocomplete @input.native="validate(sequence[2](j))" v-show="!shortcut" v-model="totalOddEven[j]" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </li>
          <li v-for="(i,j) in 2" @click="select(sequence[3](j))" :class="{selected:shortcut && +tailBigSmall[j]}">
            <div>总尾{{size[j]}}</div>
            <div>{{getOdds(5,2,j) | round3}}</div>
            <el-autocomplete @input.native="validate(sequence[3](j))" v-show="!shortcut" v-model="tailBigSmall[j]" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { round, zip, flatten, camelCase } from 'lodash'
import reposal from '~/util/mixins/reposal'
import props from '~/util/lotto/reposal-props'
export default {
  //Component names can only contain alphanumeric characters and the hyphen, and must start with a letter.
  name: 'x11-5-ball',
  props: { ...props, label: String, index: Number },
  data() {
    const init = this.initData()
    const modelType = Object.keys(init)
    return {
      ...init,
      sequence: [
        (k, j) => 5 * k + j,
        (k, j) => 5 * k + 3 + j,
        k => 5 * 3 + 2 + k,
        k => 5 * 3 + 4 + k
      ],
      modelType,
      orderType: modelType.map(i => camelCase('order ' + i))
    }
  },
  mixins: [reposal],
  beforeCreate() {
    this.initData = () => ({
      // updown:[...Array(3)],
      // oddEven2: [...Array(3)],
      // bigSmall: [...Array(2)],
      // oddEven: [...Array(2)],
      // nums: [...Array(11)],
      // totalBigSmall: [...Array(2)],
      // totalOddEven: [...Array(2)],
      // tailBigSmall: [...Array(2)]

      nums: [...Array(11)],
      bigSmall: [...Array(2)],
      oddEven: [...Array(2)],
      totalBigSmall: [...Array(2)],
      totalOddEven: [...Array(2)],
      tailBigSmall: [...Array(2)]
    })
  },
  methods: {
    getSequence(orderTypeIndex, k) {
      const isSameType = [1, 2, 3].some(
        typeIndex => typeIndex === orderTypeIndex
      )
      let _k = k
      let _j = k
      switch (orderTypeIndex) {
        case 0:
          _k = Math.floor(k / 3)
          _j = k % 3
          break
      }
      return this.sequence[
        //totalOddEven:orderTypeIndex 4 -> sequence 2
        isSameType ? 1 : orderTypeIndex > 3 ? orderTypeIndex - 2 : 0
      ](isSameType ? orderTypeIndex - 1 : _k, _j)
    },
    getLoopItem(data, buyValue, orderTypeIndex) {
      return data
        .map((amount, k) => {
          const index = orderTypeIndex > 2 ? 5 : this.index
          const betIndex =
            orderTypeIndex > 2 ? orderTypeIndex - 3 : orderTypeIndex
          return (
            amount >= 1 && [
              buyValue ? buyValue[k] : k,
              this.getOdds(index, betIndex, k),
              round(amount, 6),
              this.getSequence(orderTypeIndex, k),
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
        case 1:
          buyValue = ['大', '小']
          break
        case 2:
          buyValue = ['单', '双']
          break
        case 3:
          buyValue = ['总和：总大', '总和：总小']
          break
        case 4:
          buyValue = ['总和：总单', '总和：总双']
          break
        case 5:
          buyValue = ['总尾：总尾大', '总尾：总尾小']
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
      this.orderNums.forEach(v => (v[0] = this.label + '：' + (v[0] + 1)))
      this.orderOddEven.forEach(v => (v[0] = this.label + '：' + v[0]))
      this.orderBigSmall.forEach(v => (v[0] = this.label + '：' + v[0]))
      this.setOrder(orderAll)
      return true
    }
  }
}
</script>

