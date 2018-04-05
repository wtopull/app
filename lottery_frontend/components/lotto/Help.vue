<template>
  <div class="play-help">
      <el-popover 
        placement="bottom-start"
        trigger="hover"
        popper-class="lotto-play-note"
        :visible-arrow="false"
      > 
        <div>{{help[1]}}</div>
        <i class="el-icon-question" slot="reference"></i>
      </el-popover>
      <span>{{help[0]}}</span>
    </div>
</template>

<script>
import Vue from 'vue'
import { Popover } from 'element-ui'
import cache from '~/util/cache'
import { getFirstNum } from '~/util/lotto/code'
Vue.use(Popover)

const specialHelp = (identifier, func, defaultVal) => {
  return func(identifier, getFirstNum(identifier), defaultVal)
}

const RENXUAN = (identifier, num, defaultVal) => [
  identifier.includes('ds')
    ? `从01-11共11个号码中选择${num}个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。`
    : identifier.includes('fs')
      ? `从01-11共11个号码中选择${num}个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。`
      : '',
  defaultVal || ''
]

const DANTUO = (identifier, num, defaultVal) => [
  `分别从胆码和拖码的01-11中，至少选择1个胆码和${num -
    1}个拖码组成一注，只要当期顺序摇出的5个开奖号码中同时${
    num < 6
      ? `包含所选的1个胆码和${num - 1}个拖码，所选胆码必须全中`
      : '存在于胆码和拖码的任意组合中'
  }，即为中奖。`,
  defaultVal || ''
]

export default {
  name: 'play-help',
  props: ['identifier'],
  serverCacheKey: props => props.identifier, //notice can be use
  data() {
    return {
      helps: cache.helps || {}
    }
  },
  created() {
    if (cache.helps) return
    import(/* webpackChunkName: "play-help" */ '~/assets/config/play-helps').then(
      data => {
        cache.helps = this.helps = data.default
      }
    )
  },
  computed: {
    help() {
      const { identifier, helps } = this
      // if (typeof identifier === 'string' && identifier.includes('renxuan_renxuan')){
      //   let index = identifier.match(/\d/).index
      //   let num = identifier.slice(index,index + 1)
      //   return [identifier.includes('ds') ? `从01-11共11个号码中选择${num}个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。` : identifier.includes('fs') ? `从01-11共11个号码中选择${num}个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。` : '' ,helps[identifier] || '']
      // }
      if (
        typeof identifier === 'string' &&
        /renxuan_renxuan|dantuo_dantuo_dt/.test(identifier)
      ) {
        const defaultVal = helps[identifier]
        if (identifier.includes('renxuan_renxuan')) {
          return specialHelp(identifier, RENXUAN, defaultVal)
        }
        if (identifier.includes('dantuo_dantuo_dt')) {
          return specialHelp(identifier, DANTUO, defaultVal)
        }
      }
      return helps[identifier] || []
    }
  }
}
</script>
