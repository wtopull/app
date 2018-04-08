import {remove} from 'lodash'
import { zipObject } from 'lodash/fp'
export const state = () => ({
  types: [],
  ballSet:[],
  betCount:0,
  order:[],
  renderer:{}
})

export const getters = {
  //mapGetters lotto/types,mapState no result
  types: state => state.types,
  order: state => state.order,
  renderer: state => state.renderer,
  listMap: ({ types }) => types.reduce((prev, next) => ({
    ...prev,
    ...next.infos
  }), {}),
  ballSet: state => state.ballSet,
  betCount: state => state.betCount,
}

export const actions = {
  getTypes({commit,state:{types}}){
    if(types.length){
      return Promise.resolve()
    }else{
      return this.app.$getJson('lotto-nav-list').then(({data}) => {
        commit('setTypes',data)
        commit('renderType',zipObject(data.map(({identifier:type}) => type))(data.map(_ => false)))
      })
    }
  }
}


export const mutations = {
  setTypes(state, data) {
    let list = data
    const ssc = list.find(_ => _.identifier === 'ssc')
    const {online_status,identifier} = ssc
    list.unshift(
      { 
        // infos:remove(_ => ['FLB15','1min','TXFFC'].includes(_.i))(ssc.infos),
        // lodash/fp can't remove days lotto but return not days lotto ,['cqssc','tjssc']... 
        infos:remove(ssc.infos,_ => ['flb15','s1min','txffc'].includes(_.i)),
        identifier,
        name: "全天彩",
        online_status
      }
    )
    state.types = list.map(({ infos, identifier: type, name:typeName }) => {
      return {
        infos: zipObject(infos.map(_ => _.i))(infos.map(({ id, n: name, ne: is_new, h: is_hot, d: description,mp:max_bet_prize_group,ic:max_trace_issue_count }) => ({
          id,
          name,
          is_new,
          is_hot,
          description,
          type,
          typeName,
          max_bet_prize_group,
          max_trace_issue_count
        }))),
        type,
        name:typeName
      }
    })
  },
  renderType(state,value){
    state.renderer = value
  },
  _ballSet(state,ballSet){
    state.ballSet = ballSet
  },
  setBetCount(state,count){
    state.betCount = count
  },
  setOrder(state,list){
    state.order = list
  }
}