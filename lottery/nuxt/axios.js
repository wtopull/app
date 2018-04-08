import Axios from 'axios'


// Axios.prototype cannot be modified
const axiosExtra = {
  setHeader (name, value, scopes = 'common') {
    for (let scope of Array.isArray(scopes) ? scopes : [ scopes ]) {
      if (!value) {
        delete this.defaults.headers[scope][name];
        return
      }
      this.defaults.headers[scope][name] = value
    }
  },
  setToken (token, type, scopes = 'common') {
    const value = !token ? null : (type ? type + ' ' : '') + token
    this.setHeader('Authorization', value, scopes)
  },
  onRequest(fn) {
    this.interceptors.request.use(config => fn(config) || config)
  },
  onResponse(fn) {
    this.interceptors.response.use(response => fn(response) || response)
  },
  onRequestError(fn) {
    this.interceptors.request.use(undefined, error => fn(error) || Promise.reject(error))
  },
  onResponseError(fn) {
    this.interceptors.response.use(undefined, error => fn(error) || Promise.reject(error))
  },
  onError(fn) {
    this.onRequestError(fn)
    this.onResponseError(fn)
  }
}

// Request helpers ($get, $post, ...)
for (let method of ['request', 'delete', 'get', 'head', 'options', 'post', 'put', 'patch']) {
  axiosExtra['$' + method] = function () { return this[method].apply(this, arguments).then(res => res && res.data) }
}

const extendAxiosInstance = axios => {
  for (let key in axiosExtra) {
    axios[key] = axiosExtra[key].bind(axios)
  }
}







export default (ctx, inject) => {
  const axiosOptions = {
    // baseURL
    baseURL : process.browser
      ? '/api'
      : (process.env._AXIOS_BASE_URL_ || 'http://localhost:3100/api'),

    // Create fresh objects for all default header scopes
    // Axios creates only one which is shared across SSR requests!
    // https://github.com/mzabriskie/axios/blob/master/lib/defaults.js
    headers: {
      common : {
        'Accept': 'application/json, text/plain, */*'
      },
      delete: {},
      get: {},
      head: {},
      post: {},
      put: {},
      patch: {}
    }
  }

  
  // Proxy SSR request headers headers
  axiosOptions.headers.common = (ctx.req && ctx.req.headers) ? Object.assign({}, ctx.req.headers) : {}
  delete axiosOptions.headers.common['accept']
  delete axiosOptions.headers.common['host']
  

  // Create new axios instance
  const axios = Axios.create(axiosOptions)

  // Extend axios proto
  extendAxiosInstance(axios)

  // Setup interceptors
  
  
  
  

  // Inject axios to the context as $axios
  ctx.$axios = axios
  inject('axios', axios)
}
