export const PLAY_LOTTO_API = 'user-play-lottery-setting'

export default (store,context,redirect) => {
  const { likes, active: likesActive } = store.state['play-likes']
  if (likesActive === false) {
    store.commit('play/setPre', likes)
    return Promise.resolve()
  } else if (likesActive === '') {
    // return context.$axios.$post(`${PLAY_LOTTO_API}/get`, { type: 1 })
    //         .then(({data: { infos }}) => store.dispatch('play-likes/get',infos))
    //         .catch(() => redirect ? redirect('/login') : context.$router.push('/login'))
    return context.$axiosPlus(`${PLAY_LOTTO_API}/get`,{type:1},({infos}) => store.dispatch('play-likes/get',infos),{catchCb:() => redirect ? redirect('/login') : context.$router.push('/login')})
  }
}