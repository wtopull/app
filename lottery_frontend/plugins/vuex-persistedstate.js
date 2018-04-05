import createPersistedState from 'vuex-persistedstate'

export default function({ store }) {
  createPersistedState({ paths: ['passwords','user', 'pay.bal','reposal.nums','reposal.hotEnabled'] })(store)
}