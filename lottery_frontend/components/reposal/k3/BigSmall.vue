<template>
  <div class="reposal-play-layout reposal-play-col5">
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
          <div @click="select(k)" :class="{selected:shortcut && +bigSmall[k]}">
            <div>
              {{size[k]}}
            </div>
            <div>{{getOdds(0,1,k) | round3}}</div>
            <el-autocomplete @input.native="validate(k)" v-model="bigSmall[k]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </div>
        </li>
      </ul>
    </div>
    <div class="reposal-play-top">
      <h4>{{title[1]}}</h4>
      <ul>
        <li>
          <div :class="{selected:shortcut && +all}">
            <div>
              {{playList[1] && playList[1].bets[0].show_name}}
            </div>
            <div>{{getOdds(1,0,0) | round3}}</div>
            <el-autocomplete @input.native="validate(9)" v-model="bigSmall[9]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </div>
        </li>
        <li v-for="(v,k) in 6">
          <div @click="select(k)" :class="{selected:shortcut && +santonghao[k]}">
            <div>
              <img :src="`/img/dice/${v}.png`" alt="">
            </div>
            <div>{{getOdds(1,1,k) | round3}}</div>
            <el-autocomplete @input.native="validate(k)" v-model="santonghao[k]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </div>
        </li>
      </ul>
    </div>
    <div class="reposal-play-top">
      <h4>{{title[2]}}</h4>
      <ul>
        <li v-for="(v,k) in hezhi">
          <div @click="select(k)" :class="{selected:shortcut && +v}">
            <div>
              {{k + 4}}点
            </div>
            <div>{{getOdds(2,0,k) | round3}}</div>
            <el-autocomplete @input.native="validate(k)" v-model="hezhi[k]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </div>
        </li>
      </ul>
    </div>
    <div class="reposal-play-top">
      <h4>{{title[3]}}</h4>
      <ul>
        <li v-for="(v,k) in recur">
          <div @click="select(k)" :class="{selected:shortcut && +erbutonghao[k]}">
            <div v-html="v"></div>
            <div>{{getOdds(3,0,k) | round3}}</div>
            <el-autocomplete @input.native="validate(k)" v-model="erbutonghao[k]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </div>
        </li>
      </ul>
    </div>
    <div class="reposal-play-top">
      <h4>{{title[4]}}</h4>
      <ul>
        <li v-for="(v,k) in 6">
          <div @click="select(k)" :class="{selected:shortcut && +ertonghao[k]}">
            <div>
              <img :src="`/img/dice/${v}.png`" alt="">
              <img :src="`/img/dice/${v}.png`" alt="">
            </div>
            <div>{{getOdds(4,0,k) | round3}}</div>
            <el-autocomplete @input.native="validate(k)" v-model="ertonghao[k]" v-show="!shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="input" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import reposal,{getRecur} from '~/util/mixins/reposal'

export default {
  name: 'big-small-dice',
  mixins: [reposal],
  data() {
    return {
      title: this.playList.map(_ => _.content.show_name),
      recur:getRecur([5,4,3,2,1],(a,b) => `<img src="/img/dice/${a}.png"><img src="/img/dice/${b}.png">`,15),
      ...this.initData()
    }
  },
  beforeCreate() {
    this.initData = () => {
      const { playList } = this
      return {
        budingwei: [...Array(6)],
        bigSmall: [...Array(2)],
        all: '',
        santonghao: [...Array(6)],
        hezhi: [...Array(playList[2] ? playList[2].bets[0].odds.length : 14)],
        erbutonghao: [...Array(15)],
        ertonghao: [...Array(6)],
      }
    }
  }
}
</script>

