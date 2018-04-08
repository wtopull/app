<template>
  <div class="reposal-play-layout reposal-play-col5">
    <div class="reposal-play-top reposal-play-col-auto">
      <h4>冠，亚军和</h4>
      <ul>
        <li v-for="(v,k) in 2">
          <div class="ht">
            <span>号码</span>
            <span>赔率</span>
            <span v-show="!shortcut">金额</span>
          </div>
          <div @click="select(k)" :class="{selected:shortcut && +topBigSmall[k]}">
            <div>冠亚{{size[k]}}</div>
            <div>{{getOdds(10,1,k) | round3}}</div>
            <el-autocomplete @input.native="validate(k)" v-model="topBigSmall[k]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </div>

        </li>
        <li v-for="(v,k) in 2">
          <div class="ht">
            <span>号码</span>
            <span>赔率</span>
            <span v-show="!shortcut">金额</span>
          </div>
          <div @click="select(k + 2)" :class="{selected:shortcut && +topOddEven[k]}">
            <div>冠亚{{size[k + 2]}}</div>
            <div>{{getOdds(10,2,k) | round3}}</div>
            <el-autocomplete @input.native="validate(k + 2)" v-model="topOddEven[k]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </div>
        </li>
      </ul>
    </div>
    <ul>
      <li v-for="(v,k) in 10">
        <h4>{{rank[k]}}</h4>
        <div class="ht">
          <span>号码</span>
          <span>赔率</span>
          <span v-show="!shortcut">金额</span>
        </div>
        <ul>
          <li v-for="(i,j) in 2" @click="select(sequence[k < 5 ? 0 : 3](k,j))" :class="{selected:shortcut && +bigSmall[k][j]}">
            <div>{{size[j]}}</div>
            <div>{{getOdds(k,1,j)}}</div>
            <el-autocomplete @input.native="validate(sequence[k < 5 ? 0 : 3](k,j))" v-model="bigSmall[k][j]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </li>
          <li v-for="(i,j) in 2" @click="select(sequence[k < 5 ? 1 : 4](k,j))" :class="{selected:shortcut && +oddEven[k][j]}">
            <div>{{size[j + 2]}}</div>
            <div>{{getOdds(k,2,j)}}</div>
            <el-autocomplete @input.native="validate(sequence[k < 5 ? 1 : 4](k,j))" v-model="oddEven[k][j]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </li>
          <li v-if="k < 5" v-for="(i,j) in 2" @click="select(sequence[2](k,j))" :class="{selected:shortcut && +vs[k][j]}">
            <div>{{k + 1}}<strong>V</strong>{{10 - k}}{{vsLabels[j]}}</div>
            <div>{{getOdds(k,3,j)}}</div>
            <el-autocomplete @input.native="validate(sequence[2](k,j))" v-show="!shortcut" v-model="vs[k][j]" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import reposal from '~/util/mixins/reposal'
import props from '~/util/lotto/reposal-props'
import { round, zip, flatten, camelCase } from 'lodash'

const vsLabels = ['龙', '虎']
export default {
  name: 'integrate',
  props:{...props,rank:Array,orderTopLabel:String},
  data() {
    const init = this.initData()
    const modelType = Object.keys(init)
    return {
      ...init,
      sequence: [
        (k, j) => 4 + 6 * k + j,
        (k, j) => 4 + 6 * k + j + 2,
        (k, j) => 4 + 6 * k + j + 4,
        (k, j) => 34 + 4 * (k - 5) + j,
        (k, j) => 34 + 4 * (k - 5) + j + 2
      ],
      vsLabels,
      modelType,
      orderType: modelType.map(i => camelCase('order ' + i))
    }
  },
  beforeCreate() {
    this.initData = () => ({
      bigSmall: [...Array(10)].map(i => [...Array(2)]),
      oddEven: [...Array(10)].map(i => [...Array(2)]),
      //vs length 10 not 5:Order.vue this.orderData.map(_ => [..._]),aviod undefined not iterable
      vs: [...Array(10)].map(i => [...Array(2)]),
      topBigSmall: [...Array(2)],
      topOddEven: [...Array(2)]
    })
  },
  mixins: [reposal],
  methods: {
    getLoopItem(data, buyValue, orderTypeIndex, deep = true) {
      if (deep == false) {
        return data
          .map(
            (amount, k) =>
              amount >= 1 && [
                buyValue[k],
                this.getOdds(10, orderTypeIndex - 3, k),
                round(amount, 6),
                orderTypeIndex > 2 ? 2 + k : k,
                orderTypeIndex,
                this.playList[10].bets[orderTypeIndex - 3].identifier
              ]
          )
          .filter(Array.isArray)
      }
      return this._getLoopItem(data, buyValue, orderTypeIndex, {
        fn:
          buyValue[0] == '龙'
            ? col => `VS${this.rank[9 - col]}：${col + 1}V${10 - col}`
            : null,
        col2: 3
      })
    },
    getOrder(orderTypeIndex) {
      let buyValue = null
      let deep = true
      const {size,orderTopLabel} = this
      switch (orderTypeIndex) {
        case 0:
          buyValue = ['大', '小']
          break
        case 1:
          buyValue = ['单', '双']
          break
        case 2:
          buyValue = vsLabels
          break
        case 3:
          // buyValue = ['大', '小']
          buyValue = size.slice(0,2).map(_ => `${orderTopLabel}：${_}`)
          deep = false
          break
        case 4:
          buyValue = size.slice(2).map(_ => `${orderTopLabel}：${_}`)
          deep = false
          break
      }

      this[this.orderType[orderTypeIndex]] = this.getLoopItem(
        this[this.modelType[orderTypeIndex]],
        buyValue,
        orderTypeIndex,
        deep
      )
    },
    order() {
      let orderTotal = this.orderTopBigSmall.concat(this.orderTopOddEven)
      if (
        !this.flattenOrder(this.orderType, [3, 2]).concat(orderTotal).length
      ) {
        return this.checkOrder()
      }
      let orderGroup = zip(
        this.orderBigSmall,
        this.orderOddEven,
        this.orderVs
      ).map(i => flatten(i))

      orderGroup.forEach((v, k) =>
        v.forEach(
          i => (i[0] = this.rank[k] + (i.length === 7 ? i[6] : '：') + i[0])
        )
      )

      // orderTotal.forEach((v, k) => (v[0] = '冠亚和值：' + v[0]))
      this.setOrder(flatten(orderGroup).concat(orderTotal))
      return true
    }
  },
  computed: {}
}
</script>
