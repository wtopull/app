import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'
Vue.prototype.$message = Message
const publicPath = '/.nuxt/dist/'

const error = err => Message.error({ duration: 2000, message: '系統更新，請稍後刷新重新訪問' })

const axiosPlus = {}

const ajaxCallback = (
  res,
  cb, { duration = 2000, url, errCb, showError = true } = {}
) => {
  const { error, errorCode, message, data } = res;
  if (error) {
    if (showError) {
      // return swalErr(message, [
      //   () => (url == "login" || data || errCb) && callback(response),
      //   timer
      // ]);
      return Message.error({ duration, message })
    } else {
      return errCb && cb(res);
    }
  }
  cb(data)
}

export const delayAjax = ($axios, store,callback) => {
  if (!$axios.defaults.headers.common.Token) {
    //fix f5 refresh 
    return setTimeout(() => {
      $axios.setHeader('Token', store.state.user.token)
      callback()
    }, 50)
  }
  return callback()
}

export default ({ app, store }) => {
  axiosPlus.install = function(Vue) {
    Vue.prototype.$axiosPlus = app.$axiosPlus = function(url, _data = {}, cb = () => {}, cbCfg) {
      let data = _data;
      typeof _data === "function" && ((data = {}), (cb = _data));

      return delayAjax(this.$axios, store,() => {
        return this.$axios.$post(url, data)
          .then(res => ajaxCallback(res, cb, {...cbCfg, url }))
          .catch(err => {
            console.error("axios catch", url, err) //require!,it can be catch error,otherwise you don't know response error
            // if(isDevEnv) return swalErr(`${url}太慢！`,false)
            // swalErr(err.toString().includes('5000') ? "服务器错误，请联系客服！" : "网络错误，请刷新页面！");
            cbCfg && cbCfg.catchCb && cbCfg.catchCb()
          });
      })

    }

  }
  Vue.use(axiosPlus)

  Vue.prototype.$getJson = app.$getJson = function(api, callback) {
    const _v = store.state.version
    if (!_v) {
      return app.$axios.$post('static-data/lottery-version')
        .then(({ data: { version } }) => {
          store.commit('setVersion', version)
          if (process.env.NODE_ENV === 'development') {
            return import (`~/assets/config/${api}.${version}.json`)
              .then(() => axios.get(`${publicPath}config/${api}.${version}.json`))
          }

          return axios.get(`${publicPath}config/${api}.${version}.json`).catch(error)
        })
    }
    if (process.env.NODE_ENV === 'development') {
      return import (`~/assets/config/${api}.${_v}.json`)
        .then(() => axios.get(`${publicPath}config/${api}.${_v}.json`))
    }
    return axios.get(`${publicPath}config/${api}.${_v}.json`).catch(error)
  }
}