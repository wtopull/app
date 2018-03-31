export const state = () => ({
  register: [],
  queryMembersOnline: '',
  queryLottoReportDate: [],
  inbox: {
    list: []
  },
  outbox: {
    list: []
  }
})

export const getters = {
  register: state => state.register,
  inbox: state => state.inbox,
  outbox: state => state.outbox,
  unreadCount: state => {
    //state.inbox may null in default.html when id login other session
    //components\admin\MessageBox.vue:171 status: read_status
    return state.inbox
      ? state.inbox.list.filter(_ => _.read_status === 1 || _.status === 1)
          .length
      : 0
  }
}

export const actions = {
  async getRegister({ state: { register }, commit }, callback = () => {}) {
    // if(register.length) return
    commit(
      'regist',
      (await this.$axios.$post(
        'user-register-link/get'
      )).data.user_register_links.map(_ => ({ ..._.content }))
    )
    callback()
  },
  async getBox({ state, commit }, { key = 'inbox', ...props } = {}) {
    // [vuex] unknown local mutation type: setState, global type: admin/setState
    const { data: value } = await this.$axios.$post(
      `user-message/${key === 'outbox' ? 'send-message-list' : 'get'}`,
      {
        content: 0,
        ...props
      }
    )
    commit('setState', { key, value })
    return value
  }
}

export const mutations = {
  regist(state, list) {
    state.register = list
  },
  setState(state, { key, value }) {
    state[key] = value
  }
}
