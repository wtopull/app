<template>
  <div :class="['reposal-play-layout','reposal-vs',{'reposal-vs-only':labelLength === 2}]">
    <ul>
      <li v-for="(v,k) in 4">
        <div class="title" v-html="title[k]"></div>
        <div class="reposal-odds-view">
          <div v-for="(i,j) in labelLength">
              {{getOdds(vsListIndex,k,j) | round3}}
          </div>
        </div>
        <ul>
          <li v-for="(i,j) in labelLength" :class="{selected:selected(vs[k][j])}">
            <div @click="select(sequence[0](k,j))">{{vsLabels[j]}}</div>
            <el-input type="number" @input.native="validate(sequence[0](k,j))" v-model="vs[k][j]" ref="input" />
          </li>
        </ul>
      </li>
    </ul>
    <ul>
      <li v-for="(v,k) in 3">
        <div class="title" v-html="title[k + 4]"></div>
        <div class="reposal-odds-view">
          <div v-for="(i,j) in labelLength">
              {{getOdds(vsListIndex,k+4,j) | round3}}
          </div>
        </div>
        <ul>
          <li v-for="(i,j) in labelLength" :class="{selected:selected(vs[k + 4][j])}">
            <div @click="select(sequence[1](k,j))">{{vsLabels[j]}}</div>
            <el-input type="number" @input.native="validate(sequence[1](k,j))" v-model="vs[k + 4][j]" ref="input" />
          </li>
        </ul>
      </li>
    </ul>
    <ul>
      <li v-for="(v,k) in 2">
        <div class="title" v-html="title[k + 7]"></div>
        <div class="reposal-odds-view">
          <div v-for="(i,j) in labelLength">
              {{getOdds(vsListIndex,k+7,j) | round3}}
          </div>
        </div>
        <ul>
          <li v-for="(v,j) in labelLength" :class="{selected:selected(vs[k + 7][j])}">
            <div @click="select(sequence[2](k,j))">{{vsLabels[j]}}</div>
            <el-input type="number" @input.native="validate(sequence[2](k,j))" v-model="vs[k + 7][j]" ref="input" />
          </li>
        </ul>
      </li>
    </ul>
    <ul>
      <li>
        <div class="title" v-html="title[title.length - 1]"></div>
        <div class="reposal-odds-view">
          <div v-for="(i,j) in labelLength">
              {{getOdds(vsListIndex,title.length - 1,j) | round3}}
          </div>
        </div>
        <ul>
          <li v-for="(v,j) in labelLength" :class="{selected:selected(vs[title.length - 1][j])}">
            <div @click="select(sequence[3](j))">{{vsLabels[j]}}</div>
            <el-input type="number" @input.native="validate(sequence[3](j))" v-model="vs[title.length - 1][j]" ref="input" />
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" src="../../assets/scss/reposal/vs.scss">
</style>


<script>
import { flatten, round } from 'lodash'
import reposal from '~/util/mixins/reposal'
import props from '~/util/lotto/reposal-props'

export default {
  name: 'dragon-tiger',
  props: { ...props, vsLabels: Array,vsListIndex:Number },
  data() {
    const playList = this.playList[this.vsListIndex]
    const labelLength = this.vsLabels.length
    const sequence = (length => {
      return [
        (k, j) => length * k + j,
        (k, j) => length * 4 + length * k + j,
        (k, j) => length * 4 + length * 3 + length * k + j,
        j => length * 4 + length * 3 + length * 2 + j
      ]
    })(labelLength)

    return {
      //playList ? f5 refresh,name[name.length - 1]
      titleText: playList ? playList.bets.map(_ => _.show_name) : [[]],
      title: playList ? playList.bets.map(_ => {
        const [pos,label] = _.show_name.split(' ')
        const [t1,t2] = label.split('VS')
        return `<strong>${pos}</strong>` + [t1,'VS',t2].map(_ => `<div>${_}</div>`).join('')
      }) : [[]],
      labelLength,
      sequence,
      modelType: 'vs',
      orderStr: 'orderVS',
      ...this.initData()
    }
  },
  mixins: [reposal],
  beforeCreate() {
    this.initData = () => ({
      vs: [...Array(10)].map(i => [...Array(this.labelLength)])
    })
  },
  methods: {
    getOrder(valid = true) {
      if (valid && this.validOrder() !== true) return //avoid iterable
      this.orderVS = this.vs.map((i, col) =>
        i
          .map(
            (amount, index) =>
              amount >= 1 && [
                this.vsLabels[index],
                this.getOdds(this.vsListIndex, col, index),
                round(amount, 6),
                this.labelLength * col + index, //it has not orderType,components/reposal/Order.vue:85,Order update()
                ,
                this.playList[this.vsListIndex].bets[col].identifier
              ]
          )
          .filter(Array.isArray)
      )
    },
    order() {
      if (this.validOrder() !== true) return
      let order = [...this.orderVS]
      order.forEach((v, k) =>
        v.forEach(i => (i[0] = this.titleText[k] + '：' + i[0]))
      )
      this.setOrder(flatten(order))
      return true
    },
    submit() {}
  }
}
</script>

