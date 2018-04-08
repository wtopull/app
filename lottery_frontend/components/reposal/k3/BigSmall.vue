<template>
  <div class="reposal-play-layout reposal-play-col5">
    <div class="reposal-play-top">
      <ul>
        <li v-for="i in 5">
          <div class="ht">
            <span>号码</span>
            <span>赔率</span>
            <span v-show="!shortcut">金额</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="reposal-play-top">
      <h4>{{title[0]}}</h4>
      <ul>
        <li v-for="(v,k) in 6">
          <div @click="select(k)" :class="{selected:shortcut && +budingwei[k]}">
            <div>
              <img :src="`/img/dice/${v}.png`" alt="">
            </div>
            <div>{{getOdds(0,0,k) | round3}}</div>
            <el-autocomplete @input.native="validate(k)" v-model="budingwei[k]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </div>
        </li>
        <li v-for="(v,k) in 2">
          <div @click="select(sequence[1](k))" :class="{selected:shortcut && +bigSmall[k]}">
            <div>
              {{size[k]}}
            </div>
            <div>{{getOdds(0,1,k) | round3}}</div>
            <el-autocomplete @input.native="validate(sequence[1](k))" v-model="bigSmall[k]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </div>
        </li>
      </ul>
    </div>
    <div class="reposal-play-top">
      <h4>{{title[1]}}</h4>
      <ul>
        <!-- <li> reuqire v-for 1,$refs.input can be success,otherwise santonghao[0] is the firsr $refs.input-->
        <li v-for="(v,k) in 1">
          <div @click="select(8)" :class="{selected:shortcut && +all[0]}">
            <div>
              {{playList[1] && playList[1].bets[0].show_name}}
            </div>
            <div>{{getOdds(1,0,0) | round3}}</div>
            <el-autocomplete @input.native="validate(8)" v-model="all[0]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </div>
        </li>
        <li v-for="(v,k) in 6">
          <div @click="select(sequence[3](k))" :class="{selected:shortcut && +santonghao[k]}">
            <div>
              <img :src="`/img/dice/${v}.png`" alt="">
            </div>
            <div>{{getOdds(1,1,k) | round3}}</div>
            <el-autocomplete @input.native="validate(sequence[3](k))" v-model="santonghao[k]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </div>
        </li>
      </ul>
    </div>
    <div class="reposal-play-top">
      <h4>{{title[2]}}</h4>
      <ul>
        <li v-for="(v,k) in hezhi">
          <div @click="select(sequence[4](k))" :class="{selected:shortcut && +v}">
            <div>
              {{k + 4}}点
            </div>
            <div>{{getOdds(2,0,k) | round3}}</div>
            <el-autocomplete @input.native="validate(sequence[4](k))" v-model="hezhi[k]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </div>
        </li>
      </ul>
    </div>
    <div class="reposal-play-top">
      <h4>{{title[3]}}</h4>
      <ul>
        <li v-for="(v,k) in recur">
          <div @click="select(sequence[5](k))" :class="{selected:shortcut && +erbutonghao[k]}">
            <div>
              <img :src="`/img/dice/${v[0]}.png`"><img :src="`/img/dice/${v[1]}.png`">
            </div>
            <div>{{getOdds(3,0,k) | round3}}</div>
            <el-autocomplete @input.native="validate(sequence[5](k))" v-model="erbutonghao[k]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </div>
        </li>
      </ul>
    </div>
    <div class="reposal-play-top">
      <h4>{{title[4]}}</h4>
      <ul>
        <li v-for="(v,k) in 6">
          <div @click="select(sequence[6](k))" :class="{selected:shortcut && +ertonghao[k]}">
            <div>
              <img :src="`/img/dice/${v}.png`" alt="">
              <img :src="`/img/dice/${v}.png`" alt="">
            </div>
            <div>{{getOdds(4,0,k) | round3}}</div>
            <el-autocomplete @input.native="validate(sequence[6](k))" v-model="ertonghao[k]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { round, camelCase } from 'lodash'
import reposal, { getRecur } from '~/util/mixins/reposal'

export default {
  name: 'big-small-dice',
  mixins: [reposal],
  data() {
    const init = this.initData()
    const modelType = Object.keys(init)
    return {
      ...init,
      title: this.playList.map(_ => _.content.show_name),
      recur: getRecur([5, 4, 3, 2, 1], (a, b) => [a, b], 15),
      sequence: [
        k => k,
        k => k + 6,
        k => 8,
        k => k + 9,
        k => k + 15,
        k => k + 29,
        k => k + 44
      ],
      modelType,
      orderType: modelType.map(i => camelCase('order ' + i))
    }
  },
  beforeCreate() {
    this.initData = () => {
      const { playList } = this
      return {
        budingwei: [...Array(6)],
        bigSmall: [...Array(2)],
        all: [,],
        santonghao: [...Array(6)],
        hezhi: [...Array(playList[2] ? playList[2].bets[0].odds.length : 14)],
        erbutonghao: [...Array(15)],
        ertonghao: [...Array(6)]
      }
    }
  },
  methods: {
    getLoopItem(data, _buyValue, orderTypeIndex) {
      return data
        .map((amount, k) => {
          const index =
            orderTypeIndex <= 1
              ? 0
              : orderTypeIndex < 3 && orderTypeIndex > 0
                ? 1
                : orderTypeIndex - 2
          const betIndex = orderTypeIndex === 1 || orderTypeIndex === 3 ? 1 : 0
          const buyValue = Array.isArray(_buyValue) ? _buyValue[k] : _buyValue(k)
          const buyNumber = buyValue.split('：')[1]
          return (
            amount >= 1 && [
              buyValue,
              this.getOdds(index, betIndex, k),
              round(amount, 6),
              this.sequence[orderTypeIndex](k),
              orderTypeIndex,
              this.playList[index].bets[betIndex].identifier,
              orderTypeIndex === 4
                ? buyNumber.replace('点','')
                : orderTypeIndex > 4 ? [...buyNumber].join(',') : undefined
            ]
          )
        })
        .filter(Array.isArray)
    },
    getOrder(orderTypeIndex) {
      let buyValue = null
      const label = this.title[orderTypeIndex - 2]
      switch (orderTypeIndex) {
        case 0:
          buyValue = k => this.title[0] + '：' + (k + 1)
          break
        case 1:
          buyValue = ['大小：大', '大小：小']
          break
        case 2:
          buyValue = ['全骰']
          break
        case 3:
          buyValue = k => '围骰：' + (k + 1)
          break
        case 4:
          buyValue = k => label + '：' + (k + 4) + '点'
          break
        case 5:
          buyValue = k => label + '：' + this.recur[k].join('')
          break
        case 6:
          buyValue = k => label + '：' + `${k + 1}`.repeat(2)
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

