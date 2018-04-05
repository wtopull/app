export const state = () => ({
  register:[],
  queryMembersOnline:'',
  queryLottoReportDate:[],
  inbox:{
    list:[]
  },
  outbox:{
    list:[]
  }
})

export const getters = {
  register: state => state.register,
  inbox: state => state.inbox,
  outbox: state => state.outbox,
  unreadCount:state => {
    //state.inbox may null in default.html when id login other session 
    return state.inbox ? state.inbox.list.filter(_ => _.read_status === 1).length : 0
  }
}

export const actions = {
  async getRegister({state:{register},commit},callback = () => {}){
    // if(register.length) return
    commit('regist',(await this.app.$axios.$post('user-register-link/get')).data.user_register_links.map(_ => ({..._.content})))
    callback()
  },
  async getBox({state,commit},{key = 'inbox',page = 0,limit_type = 1} = {}){
    commit('setStatus',{key,value:(await this.app.$axios.$post(`user-message/${key=== 'outbox' ? 'send-message-list' : 'get'}`,{content:0})).data})
  }
}

export const mutations = {
  regist(state,list){
    state.register = list
  },
  setStatus(state,{key,value}){
    state[key] = value
  }
}