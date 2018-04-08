import axios from 'axios'

export default function({app, store,req}) {
  // console.log('process.server ',req && req.session.token)
  // if (process.server && req.session && req.session.token) {
  //   const { token } = req.session
  //   app.$axios.setHeader('Token', token)
  //   // store.commit('setUser', { ...store.state.user, token })
  // }
  if (process.server) {
    axios.defaults.headers.common.cookie = req.headers.cookie
  }
}