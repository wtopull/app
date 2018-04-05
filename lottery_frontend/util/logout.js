import cache from '~/util/cache'

export default (context,isLogout = true) => {
  // context.$axios.$post('user/logout')
  let store,router
  store = context[`${context.$el ? '$' : ''}store`]
  router = context[`${context.$el ? '$' : ''}router`]
  const user = store.state.user
  store.commit('setUser',{ip:user.ip})
  //no f5 refresh
  store.commit('lotto/setOrder',[])
  store.commit('pay/setBankCards',[])
  cache.memberInfo.expires = 0
  cache.isRequestBankCards = false
  //save username
  cache.mySafeQuestions[user.name] = null
  store.commit('setState', {key:'isLogout',value:isLogout})
  router && router.push('/login')
}