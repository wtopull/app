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
          <!-- after ball 19 4 * 4 + 1 + 3 == 20 -->
          <li v-if="k*4 + j + 3 < 20" v-for="(v,j) in 4" @click="select(sequence[0](k,j))" :class="{selected:shortcut && +nums[k*4 + j]}">
            <div>
              <div class="ball">{{k*4 + j + 3}}</div>
            </div>
            <div>
              {{getOdds(10,0,k*4 + j)}}
            </div>
            <el-autocomplete @input.native="validate(sequence[0](k,j))" v-model="nums[k*4 + j]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </li>
          <li v-if="k < 2" @click="select(sequence[1](k))" :class="{selected:shortcut && +topBigSmall[k]}">
            <div>{{size[k]}}</div>
            <div>{{getOdds(10,1,k) | round3}}</div>
            <el-autocomplete @input.native="validate(sequence[1](k))" v-model="topBigSmall[k]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </li>
          <li v-else-if="k < 4" @click="select(sequence[1](k))" :class="{selected:shortcut && +topOddEven[k - 2]}">
            <div>{{size[k]}}</div>
            <div>{{getOdds(10,2,k - 2) | round3}}</div>
            <el-autocomplete @input.native="validate(sequence[1](k))" v-model="topOddEven[k - 2]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { round, camelCase } from 'lodash'
import reposal from '~/util/mixins/reposal'
import props from '~/util/lotto/reposal-props'

export default {
  name: 'top-sum',
  props:{...props,orderTopLabel:String},
  data() {
    const init = this.initData()
    const modelType = Object.keys(init)
    return {
      ...init,
      sequence: [(k, j) => 5 * k + j, k => 5 * k + 4],
      modelType,
      orderType: modelType.map(i => camelCase('order ' + i))
    }
  },
  beforeCreate() {
    this.initData = () => ({
      nums: [...Array(17)],
      topBigSmall: [...Array(2)],
      topOddEven: [...Array(2)]
    })
  },
  mixins: [reposal],
  methods: {
    getLoopItem(data, buyValue, orderTypeIndex) {
      let sequence = () => {}
      switch (orderTypeIndex) {
        case 0:
          sequence = k => round(k / 4) + k
          break
        case 1:
          sequence = k => k * 5 + 4
          break
        case 2:
          sequence = k => 10 + k * 5 + 4
      }
      return data
        .map(
          (v, k) =>
            v >= 1 && [
              buyValue ? buyValue[k] : k + 3,
              this.getOdds(10, orderTypeIndex, k),
              round(v, 5),
              sequence(k),
              orderTypeIndex,
              this.playList[10].bets[orderTypeIndex].identifier
            ]
        )
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
      }

      this[this.orderType[orderTypeIndex]] = this.getLoopItem(
        this[this.modelType[orderTypeIndex]],
        buyValue,
        orderTypeIndex
      )
    },
    order() {
      const orderRaw = this.flattenOrder(this.orderType, false, false)
      if (
        !orderRaw.length
      ) {
        return this.checkOrder()
      }

      let orderList = orderRaw.slice()
      orderList.forEach((v, k) => (v[0] = this.orderTopLabel + '：' + v[0]))
      this.setOrder(orderList)
      return true
    }
  }
}
</script>
