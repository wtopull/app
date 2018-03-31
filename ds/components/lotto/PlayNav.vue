<template>
  <div>
    <ul class="lotto-group">
      <li v-for="(small_ways,index) in lottoRoot.playList" :key="index" @click="divide(index)" :class="{selected:lottoRoot.bigWayIndex === index}">
        {{small_ways.content.show_name}}
      </li>
    </ul>
    <ul class="lotto-play">
      <li v-for="(group,row) in lottoRoot.smallWays" :key="group.content.small_group_identifier">
        <label>{{group.content.show_name}}</label>
        <ul>
          <li v-for="(play,col) in group.bets" :key="play.identifier" @click="toggle(row,col)" :class="{selected:col === lottoRoot.playIndex[1] && row === lottoRoot.playIndex[0]}">
            {{play.show_name}}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'play-nav',
  inject: ['lottoRoot'],
  methods: {
    divide(index) {
      this.lottoRoot.bigWayIndex = index
      this.lottoRoot.playIndex = [0, 0]
      this.resetBallSet([])
    },
    toggle(row, col) {
      this.lottoRoot.playIndex = [row, col]
      this.resetBallSet([])
    },
    ...mapMutations({
      resetBallSet: 'lotto/_ballSet'
    })
  }
}
</script>

