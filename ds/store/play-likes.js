const PLAY_LOTTO_API = 'user-play-lottery-setting'

export const state = () => ({
  preLikes:[],
  likes: [],
  active:''
})

export const getters = {
  likes: state => state.likes,
  preLikes: state => state.preLikes,
}

export const actions = {
  get({ commit },likes) {
    // const { data: { infos } } = await this.$axios.$post(`${PLAY_LOTTO_API}/get`, { type: 1 })
    // commit('setPre', infos.map(({ content: { user_play_lottery_setting_id: setting_id, lottery_id: id, identifier, ...props } }) => {
    commit('setPre', likes.map(({ content: { user_play_lottery_setting_id: setting_id, lottery_id: id, identifier, ...props } }) => {
      return {
        setting_id,
        id,
        identifier: identifier.toLowerCase(),
        ...props
      }
    }))
    commit('setLikes')
    commit('setActive','complete')
  },
  async update({ commit, state }, { lotto, server = false,operate = 'add' } = {}) {
    if (server) {
      await this.$axios.$post(`${PLAY_LOTTO_API}/update-all`, { lottery_ids:state.preLikes.map(i => i.id).join(), type: 1 })
      commit('setLikes')
    }else if(operate == 'subtract'){
      commit('setPre', state.preLikes.filter(({ id }) => id !== lotto.id))
    }else if(!state.preLikes.find(({id}) => id === lotto.id)){
      commit('setPre',state.preLikes.concat(lotto))
    }
    commit('setActive',server)
  }
}

export const mutations = {
  setLikes(state) {
    state.likes = state.preLikes
  },
  setPre(state,list){
    state.preLikes = list
  },
  setActive(state,active){
    state.active = active
  }
}