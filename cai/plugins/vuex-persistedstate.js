import createPersistedState from 'vuex-persistedstate'

export default function({ store }) {
  createPersistedState({ paths: ['user', 'pay.bal','reposal.nums','reposal.hotEnabled'] })(store)
}