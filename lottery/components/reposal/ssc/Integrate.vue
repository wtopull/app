<template>
  <div class="reposal-play-layout reposal-ssc-int">
    <ul>
      <li class="reposal-odds-view">
        <div>{{getOdds(0,0,0) | round3}}</div>
        <div>{{getOdds(0,2,0) | round3}}</div>
      </li>
      <li v-for="(v,k) in 5">
        <h4>{{labels[k]}}</h4>
        <ul>
          <li v-for="(i,j) in 2" :class="{selected:selected(bigSmall[k][j])}">
            <div @click="select(sequence[0](k,j))">{{size[j]}}</div>
            <el-input type="number" @input.native="validate(sequence[0](k,j))" v-model="bigSmall[k][j]" ref="input" />
          </li>
          <li v-for="(i,j) in 2" :class="{selected:selected(oddEven[k][j])}">
            <div @click="select(sequence[1](k,j))">{{size[j + 2]}}</div>
            <el-input type="number" @input.native="validate(sequence[1](k,j))" v-model="oddEven[k][j]" ref="input" />
          </li>
          <li v-for="(i,j) in 10" :class="{selected:selected(nums[k][j])}">
            <div @click="select(sequence[2](k,j))">{{j}}</div>
            <el-input type="number" @input.native="validate(sequence[2](k,j))" v-model="nums[k][j]" ref="input" />
          </li>
        </ul>
      </li>
    </ul>
    <div>
      <div class="reposal-content-right">
        <ul>
          <li class="reposal-odds-view">
            <div>
              {{getOdds(5,0,0) | round3}}
            </div>
            <h4>{{labels[5]}}</h4>
          </li>
          <li v-for="(i,j) in 2" :class="{selected:selected(totalBigSmall[j])}">
            <div @click="select(sequence[3](j))">总{{size[j]}}</div>
            <el-input type="number" @input.native="validate(sequence[3](j))" v-model="totalBigSmall[j]" ref="input" />
          </li>
          <li v-for="(i,j) in 2" :class="{selected:selected(totalOddEven[j])}">
            <div @click="select(sequence[4](j))">总{{size[j + 2]}}</div>
            <el-input type="number" @input.native="validate(sequence[4](j))" v-model="totalOddEven[j]" ref="input" />
          </li>
        </ul>
      </div>
      <ul class="reposal-play-special d-flex">
        <li>
          <ul>
            <li v-for="(label,j) in specialLabels" class="reposal-odds-view">
              <div>
                {{getOdds(6 + j,j,0) | round3}}
              </div>
              <h4>{{label}}</h4>
            </li>
          </ul>
        </li>
        <li v-for="(name,k) in ['前三','中三','后三']" :key="name">
          <ul>
            <li v-for="(label,j) in specialLabels" :class="{selected:selected(special[k][j])}">
              <div @click="select(sequence[5](k,j))">{{name}}</div>
              <el-input type="number" @input.native="validate(sequence[5](k,j))" v-model="special[k][j]" ref="input" />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss">
.reposal-ssc-int {
  li > ul {
    li {
      &:nth-child(4) {
        margin-right: 20px;
      }
    }
  }
  > ul .reposal-odds-view {
    > div {
      &:first-child {
        width: 202px;
        margin-left: 42px;
        margin-right: 10px;
      }
      &:last-child {
        width: 490px;
      }
    }
  }
  .reposal-content-right{
    margin-bottom: 5px;
  }
  .reposal-play-special {
    > li ul {
      display: block;
      li{
        margin-bottom: 10px;
      }
      .reposal-odds-view{
        &:first-child{
          margin-top: 6px;
        }
      }
    }
    > li {
      padding: 0;
      margin: 0;
      &:first-child {
        margin-left: 0px;
      }
      &:nth-child(3),
      &:nth-child(4) {
        margin-left: 25px;
      }
    }
    .reposal-odds-view{
      margin-bottom: 20px!important;
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
          k === 5
            ? v.content.show_name.replace('信用', '')
            : v.content.show_name
      ),
      // oddGroups:playList.map(_ => _.bets.map(_ => _.odds)),
      sequence: [
        (k, j) => 14 * k + j,
        (k, j) => 14 * k + j + 2,
        (k, j) => 14 * k + j + 4,
        k => 14 * 5 + k,
        k => 14 * 5 + k + 2,
        (k, j) =>
          14 * 5 +
          2 +
          2 +
          (this.specialLabels ? this.specialLabels.length : 3) * k +
          j
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
      special: [...Array(3)].map(() => [
        ...Array(this.specialLabels ? this.specialLabels.length : 3)
      ])
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
    }
  }
}
</script>
