import createPersistedState from 'vuex-persistedstate'

export default function({ store }) {
  createPersistedState({
    paths: [
      'passwords',
      'GACollection',
      'user',
      'pay.bal',
      'pay.currencyList',
      'pay.currency',
      'reposal.nums',
      'reposal.hotEnabled'
    ]
  })(store)
}
