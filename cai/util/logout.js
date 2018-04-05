import cache from '~/util/cache'

export default (context,isLogout = true) => {
  // context.$axios.$post('user/logout')
  let store,router
  store = context[`${context.$el ? '$' : ''}store`]
  router = context[`${context.$el ? '$' : ''}router`]
  store.commit('setUser',{ip:store.state.user.ip})
  //no f5 refresh
  store.commit('lotto/setOrder',[])
  store.commit('pay/setBankCards',[])
  cache.memberInfo.expires = 0
  store.commit('setLogout',isLogout)
  router && router.push('/login')
}