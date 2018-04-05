// cycel impory make module sequence error!
// import '~/components/reposal/DragonTiger'
// import '~/components/reposal/All5in1'

import { mapGetters } from 'vuex'
import {defaultRound} from '~/plugins/filters'
import { flatten,round } from 'lodash'
import props from '~/util/lotto/reposal-props'
import mapMethods from '~/util/lotto/reposal-methods'
export default {
  props,
  methods:{
    getOdds(listIndex,betIndex,_index){
      if(!this.playList.length) return 0
      let index = _index
      if(this.orderStr === 'orderVS') {
        index = _index === 2 ? 1 : _index == 1  ?  2 : _index
      }
      return defaultRound((this.bonus || this.playMaxGroup)/2000/this.playList[listIndex].bets[betIndex].odds[index])
    },
    flattenOrder(orderType,splice = false,_flatten = flatten){
      let _orderType = orderType
      if (splice) {
        _orderType = orderType.slice()
        _orderType.splice(...splice)
      }
      let result = _orderType.reduce((a,b) => Array.isArray(a) ? a.concat(this[b]) : this[a].concat(this[b]),[])
      if(!_flatten) return result
      return _flatten(result)
    },
    _getLoopItem(data,_buyValue,orderTypeIndex,{fn,col2} = {}){
      return data.map((i,col) => i.map((amount,j) => {
          if (amount >= 1){
              let buyValue = j
              if(Array.isArray(_buyValue)) {
                buyValue = _buyValue[j]
              }
              if (typeof buyValue == 'function') {
                buyValue = _buyValue(j)
              }
              //reslut [buyValue:'大',odds:1.95,amount:100,14:$refs.input index,orderTypeIndex,playIdentifier]
              let result = [
                buyValue,
                this.getOdds(col,orderTypeIndex,j),
                round(amount,5),
                this.sequence[col > 4 && col2 ? col2 + orderTypeIndex : orderTypeIndex](col,j),
                orderTypeIndex,
                this.playList[col].bets[orderTypeIndex].identifier
              ]
              if(fn) result.push(fn(col,j)) //pk10 integrate.vue getLoopItem，order item[0],eg:冠军VS第十名：1V10龙:
              return result
          }
        }).filter(Array.isArray))
    },
    validOrder(_flatten = flatten){
      if (!(_flatten ? _flatten(this[this.modelType]) : this[this.modelType]).join('')) {
        return this.checkOrder()
      }
      return true
    },
    ...mapMethods.methods,
    setOrder(order){
      this.$store.commit('reposal/setOrder', order)
    }
  },
  computed:{
    ...mapGetters({
      bonus:'reposal/bonus',
      shortcut:'reposal/shortcut',
      hotNums:'reposal/nums'
    }),
    // odds(){
    //   return this.playList.map(_ => _.bets.map(_ => _.odds.map(_ => defaultRound((this.bonus || this.playMaxGroup)/2000/eval(_)))))
    // }
    
  },
  mounted(){
    this.validate = i => this._validate(this.$refs.input[i])
    this.select = i => this._select(this, i)
    
  },
}

export const getRecur = (recur,temp,length) => {
  let startRecur = 0
  let step = 0

  const sequence = () => {
    if(step == recur.length) return
    if (recur[step] == startRecur){
      step++
      startRecur = 0
    }
    let result = temp(step + 1,startRecur + 2 + step)
    startRecur++
    return result
  }

  return [...Array(length)].map(sequence)
}