<template>
  <div class="reposal-play-layout reposal-ssc-int reposal-last-list-border">
    <ul>
      <li v-for="(v,k) in 6">
        <h4>{{labels[k]}}</h4>
        <div class="ht">
          <span>号码</span>
          <span>赔率</span>
          <span v-show="!shortcut">金额</span>
        </div>
        <ul v-if="k !== 5">
          <li v-for="(i,j) in 2" @click="select(sequence[0](k,j))" :class="{selected:shortcut && +bigSmall[k][j]}">
            <div>{{size[j]}}</div>
            <div>{{getOdds(k,0,j)}}</div>
            <el-autocomplete @input.native="validate(sequence[0](k,j))" v-model="bigSmall[k][j]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </li>
          <li v-for="(i,j) in 2" @click="select(sequence[1](k,j))" :class="{selected:shortcut && +oddEven[k][j]}">
            <div>{{size[j + 2]}}</div>
            <div>{{getOdds(k,1,j)}}</div>
            <el-autocomplete @input.native="validate(sequence[1](k,j))" v-model="oddEven[k][j]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </li>
          <li v-for="(i,j) in 10" @click="select(sequence[2](k,j))" :class="{selected:shortcut && +nums[k][j]}">
            <div>
              <div class="ball">{{j}}</div>
            </div>
            <div>{{getOdds(k,2,j)}}</div>
            <el-autocomplete @input.native="validate(sequence[2](k,j))" v-show="!shortcut" v-model="nums[k][j]" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </li>
        </ul>
        <ul v-else>
          <li v-for="(i,j) in 2" @click="select(sequence[3](j))" :class="{selected:shortcut && +totalBigSmall[j]}">
            <div>总{{size[j]}}</div>
            <div>{{getOdds(5,0,j)}}</div>
            <el-autocomplete @input.native="validate(sequence[3](j))" v-show="!shortcut" v-model="totalBigSmall[j]" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </li>
          <li v-for="(i,j) in 2" @click="select(sequence[4](j))" :class="{selected:shortcut && +totalOddEven[j]}">
            <div>总{{size[j + 2]}}</div>
            <div>{{getOdds(5,1,j)}}</div>
            <el-autocomplete @input.native="validate(sequence[4](j))" v-show="!shortcut" v-model="totalOddEven[j]" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </li>
        </ul>
      </li>
    </ul>
    <el-tabs type="card" class="reposal-play-special">
      <el-tab-pane :label="label" v-for="(label,k) in ['前三','中三','后三']" :key="label">
        <ul>
          <li v-for="(label,j) in specialLabels">
            <div class="ht">
              <span>号码</span>
              <span>赔率</span>
              <span v-show="!shortcut">金额</span>
            </div>
            <div @click="select(sequence[5](k,j))" :class="{selected:shortcut && +special[k][j]}">
              <div>{{label}}</div>
              <div>{{getOdds(6 + j,j,0) | round3}}</div>
              <el-autocomplete @input.native="validate(sequence[5](k,j))" v-show="!shortcut" v-model="special[k][j]" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
            </div>

          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style lang="scss">
.reposal-ssc-int {
  .ht {
    > span {
      &:last-child {
        flex: 1.9 auto;
      }
    }
  }
  > ul {
    border-bottom: none;
  }
}

.reposal-play-special {
  border-bottom: 1px solid $--border-color-base;
  .el-tabs__item {
    flex-basis: 0;
    flex-grow: 1;
    text-align: center;
    background: $--color-primary;
  }
  .el-tabs__nav {
    display: flex;
    float: none;
    border: none !important;
  }
  .el-tabs__header {
    background: transparent;
    margin-bottom: 0;
    .el-tabs__item {
      margin-left: 0;
      margin-right: 0;
      border: none;
      border-right: 1px solid $--border-color-base;
      height: 30px;
      line-height: 30px;
      color: #fff;
      &:last-child {
        border-right: none;
      }
      &.is-active {
        background: $--color-danger;
        color: #fff;
      }
    }
  }
}
</style>
<script>
import { round, zip, flatten, camelCase } from 'lodash'
//lodash/fp :_.zip(['a', 'b'])([1, 2])([true, false]) error
import reposal from '~/util/mixins/reposal'
import props from '~/util/lotto/reposal-props'

export default {
  name: 'integrate',
  mixins: [reposal],
  props: { ...props, specialLabels: Array },
  data() {
    const init = this.initData()
    const modelType = Object.keys(init)
    const { playList } = this
    return {
      ...init,
      labels: playList.map(
        (v, k) =>
          k === 5 ? v.content.show_name.replace('信用', '') : v.content.show_name
      ),
      // oddGroups:playList.map(_ => _.bets.map(_ => _.odds)),
      sequence: [
        (k, j) => 14 * k + j,
        (k, j) => 14 * k + j + 2,
        (k, j) => 14 * k + j + 4,
        k => 14 * 5 + k,
        k => 14 * 5 + k + 2,
        (k, j) => 14 * 5 + 2 + 2 + (this.specialLabels ? this.specialLabels.length : 3) * k + j
      ],
      modelType,
      orderType: modelType.map(i => camelCase('order ' + i))
    }
  },
  beforeCreate() {
    this.initData = () => ({
      bigSmall: [...Array(5)].map(i => [...Array(2)]),
      //deep copy,not slice()
      oddEven: [...Array(5)].map(i => [...Array(2)]),
      nums: [...Array(5)].map(i => [...Array(10)]),
      totalBigSmall: [...Array(2)],
      totalOddEven: [...Array(2)],
      special: [...Array(3)].map(() => [...Array(this.specialLabels ? this.specialLabels.length : 3)])
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
                this.getOdds(5, orderTypeIndex - 3, k),
                round(amount, 6),
                this.sequence[orderTypeIndex](k),
                orderTypeIndex,
                this.playList[5].bets[orderTypeIndex - 3].identifier
              ]
          )
          .filter(Array.isArray)
      }
      if (orderTypeIndex === 5) {
        return data.map((i, col) =>
          i
            .map(
              (amount, j) =>
                amount >= 1 && [
                  buyValue[j],
                  this.getOdds(6 + col, j, 0),
                  round(amount, 6),
                  this.sequence[5](col, j),
                  orderTypeIndex,
                  this.playList[col + 6].bets[j].identifier
                ]
            )
            .filter(Array.isArray)
        )
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
        case 3:
          buyValue = ['总和：总大', '总和：总小']
          deep = false
          break
        case 4:
          buyValue = ['总和：总单', '总和：总双']
          deep = false
          break
        case 5:
          buyValue = this.specialLabels
      }

      this[this.orderType[orderTypeIndex]] = this.getLoopItem(
        this[this.modelType[orderTypeIndex]],
        buyValue,
        orderTypeIndex,
        deep
      )
    },
    order() {
      let orderTotal = this.orderTotalBigSmall.concat(this.orderTotalOddEven)
      if (
        !this.flattenOrder(this.orderType, [3, 2]).concat(orderTotal).length
      ) {
        return this.checkOrder()
      }
      let orderGroup = zip(
        this.orderBigSmall,
        this.orderOddEven,
        this.orderNums
      ).map(i => flatten(i))
      orderGroup.forEach((v, k) =>
        v.forEach(i => (i[0] = this.labels[k] + '：' + i[0]))
      )
      // orderTotal.forEach((v, k) => (v[0] = '总和：' + v[0]))
      this.orderSpecial.forEach((v, k) =>
        v.forEach(i => (i[0] = ['前三', '中三', '后三'][k] + '：' + i[0]))
      )
      this.setOrder(
        flatten(orderGroup).concat(orderTotal, flatten(this.orderSpecial))
      )
      return true
    },
    submit(cb) {
      // this.playList.map((v,k) => {
      //     // if(k !== 5) {
      //     //     return v.map()
      //     // }
      //     return v.bets.map((i,j) => ({
      //         lottery_method_identifier:i.identifier,
      //         buy_number:'',
      //         ...this.getBet()
      //     }))
      // })
    }
  },
  computed: {},
  mounted() {}
}
</script>
