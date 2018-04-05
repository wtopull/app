import axios from 'axios'
import isLoginRoute from '~/util/free-login'
// import {DeviceType} from './UA'
export default function({ store, app, redirect, route: { name } }) {
  // app.$axios.setHeader('DeviceType',DeviceType)
  // axios.get('/api/auth')
  //   .then(({data:{access_token,ip}}) => {
  //     // app.$axios.setToken(access_token, 'Bearer')
  //     store.commit('setOauth','access_token')
  //     const {expires,token} = store.getters
  //     if (!expires || +new Date(expires) < Date.now()) {
  //       store.commit('setUser',{ip})
  //       redirect('/login')
  //     }else{
  //       app.$axios.setHeader('Token',token);
  //       (name === 'index' || name === 'login') && redirect('/home')
  //     }
  //   })
  //   .catch(() => redirect('/'))

  //expires is undefined before vuex-persistedstate localStorage,use axios delay.but below axios code can't be router middleware
  axios
    .get('/api/init')
    .then(({ data: { ip } }) => {
      const { expires, token } = store.getters
      if (isLoginRoute(name) && (!expires || +new Date(expires) < Date.now())) {
        store.commit('setUser', { ip })
        //https://stackoverflow.com/questions/35340969/setinterval-in-nodejs-returns-http-error-503
        // setTimeout(() => redirect('/login'),100)
        redirect('/login')
      } else if (token) {
        app.$axios.setHeader('Token', token)
        ;(name === 'index' || name === 'login') &&
          store.dispatch('lotto/getTypes').then(() => redirect('/home'))
      }
    })
    .catch(() => redirect('/'))
}
