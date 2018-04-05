export const state = () => ({
  user:{},
  version:'',
  // access_token:'',
  isLogout:false,
  loading:{
    on:false,
    text:'拼命加载中'
  },
  news:[]
})

export const getters = {
  ip:({user}) => user.ip,
  news:state => state.news,
  expires:({user}) => user.expires,
  token:({user}) => user.token,
  username:({user}) => user.name,
  hasPayPw:({user}) => !!user.is_set_fund_password,
  point:({user}) => user.return_point_per,
  bonusGroup:({user}) => user.prize_group,
  minBonusGroup:({user}) => Number(user.minimum_prize_group),
  lottoName:({route}) => {
    if(route.name && /lottery|reposal/.test(route.name)){
      return route.params.name
    }
    return ''
  },
  loading: state => state.loading,
  
  
}

export const actions = {

  getUser({commit,state:{user}},callback = () => {}){
    return this.app.$axios.$post('user/find-info').then(({data}) => {
      const result = {...user,...data}
      commit('setUser',result)
      callback(result)
    })
  },
  getNews({commit}){
    return this.app.$axios.$post('news-info/get').then(({data}) => {
      commit('setNews',data.list)
    })
  },
  // async nuxtServerInit ({ commit,dispatch }, { app,req,route }) {
  //   await dispatch('getNews')
  // }
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setVersion(state,version){
    state.version = version
  },
  // setOauth(state,token){
  //   state.access_token = token
  // },
  setLogout(state,value){
    state.isLogout = value
  },
  setNews(state,list){
    state.news = list
  },
  spin(state,{on = true,text = '拼命加载中'} = {}){
    state.loading = {
      on,
      text
    }
  }
}