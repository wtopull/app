// const path = require('path')
const webpack = require('webpack')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const _ = require('lodash')
const pkg = require('./package')
const token = require('./backpack_output/token')
// const markdown = require('./build/markdown')
const NODE_ENV = process.env.NODE_ENV
const isDev = NODE_ENV === 'development'
// const isProd = NODE_ENV === 'production'
const extend = require('./build/webpack.extend')
const router = require('./build/router')
let modules = [
  '@nuxtjs/axios',
  // '@nuxtjs/proxy',
  ['@nuxtjs/component-cache', { maxAge: 1000 * 60 * 60 }]
].concat(isDev ? [] : [['@nuxtjs/pwa']])

let build = {
  //npm run build --analyze
  //todo https://github.com/samccone/bundle-buddy
  analyze: process.env.npm_config_analyze ? { analyzerMode: 'static' } : false,
  publicPath: '/.nuxt/dist/',
  plugins: [
    new LodashModuleReplacementPlugin({
      shorthands: true, //gzip 8.5k -> 10.08k
      collections: true,
      currying: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery/dist/jquery.custom.js',
      jQuery: 'jquery/dist/jquery.custom.js'
    })
  ],
  babel: {
    plugins: [
      'lodash',
      'date-fns',
      'jsx-vue-functional',
      [
        'component',
        [
          {
            libraryName: 'element-ui',
            styleLibraryName: '~assets/element-theme'
            // "styleLibraryName": "theme-chalk"
          }
        ]
      ]
    ],
    presets: [
      [
        'vue-app',
        {
          targets: isDev ? { chrome: 66 } : { ie: 10 }
        }
      ]
    ]
  },
  extend,
  extractCSS: !isDev,
  filenames: {
    chunk: `[${isDev ? 'name' : 'id'}].[chunkhash].js`
  },
  vendor: ['jquery/dist/jquery.custom.js'],
  // You cannot use ~/ or @/ here since it's a Webpack plugin
  styleResources: {
    scss: ['./assets/element-variables.scss', './assets/scss/variables.scss']
  }
}
//element-ui still has duplicates Selectors,http://cssnano.co/optimisations/uniqueselectors/
//use postcss-cli resolve
// if(!isDev) {
//   build.postcss = require('./build/postcss.config')
// }

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'Call of Duty',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'renderer', content: 'webkit' },
      { hid: 'description', name: 'description', content: 'alpha go.' },
      { name: 'google', value: 'notranslate' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: '#ff5574' },
  // <yt-page-navigation-progress aria-valuemin="0" aria-valuemax="100" id="" class="style-scope ytd-app" aria-valuenow="19">
  //   <div id="progress" class="style-scope yt-page-navigation-progress" style="transform: scaleX(0.19);"></div>
  // </yt-page-navigation-progress>
  //foreground & background

  // loadingIndicator: {
  //   name: 'rectangle-bounce',
  //   color: 'white',
  //   background: '#ff5574'
  // },
  css: [
    { src: '~assets/scss/index.scss', lang: 'scss' },
    '~/assets/c8css/swiper.css',
    '~assets/c8css/common.css'
  ],
  // layoutTransition: {
  //   name: 'page',
  //   mode: 'out-in'
  // },
  build,
  env: {
    appVersion: pkg.version,
    loginName:process.env.npm_config_name,
    loginPassword:process.env.npm_config_pw
  },
  manifest: {
    name: 'Alpha',
    description: 'Alpha Go',
    theme_color: '#6FADE1'
  },
  modules,

  // serverMiddleware:[
  //   // { path: '/api-front', handler: '~/server/auth.js' }
  //   '~/server/auth.js'
  // ],
  axios: {
    // https://github.com/nuxt-community/axios-module/issues/60#issuecomment-361089961
    prefix: '/api',
    proxy: true,
    progress:false,//requests is too more
    // init(axios) {
    //   axios.defaults.timeout = '10000000'
    // },
    // redirectError: {
    //   401: '/login'
    // },
    // responseInterceptor(response, { redirect, store }) {
    //   const { data: { errorCode } } = response
    //   if (errorCode === 102901 || errorCode === 100002) {
    //     // require('./util/logout')(store),webpack Cannot read property 'call' of undefined
    //     store.commit('setUser', { ip: store.state.user.ip })
    //     store.commit('setState', { key: 'isLogout', value: errorCode })
    //     redirect('/login')
    //   }
    //   return response
    // },
    // errorHandler(errorReason, { error, route }) {
    //   if (errorReason.message.includes('timeout') && route) {
    //     return error(route.path + '相关的的接口网络超时！')
    //   }
    // }
  },
  proxy: [
    [
      process.env.npm_package_config_api_host,
      {
        onProxyReq(proxyReq, req, res) {
          proxyReq.setHeader('DeviceType', 1)
          proxyReq.setHeader('Authorization', token.access_token)
        }
      }
    ],
    'http://lottery-detection-center.test.bestsnake.com/sys-report'
  ],
  plugins: [
    '~/plugins/vuex-router-sync',
    { src: '~/plugins/vuex-persistedstate', ssr: false },
    '~/plugins/token',
    '~/plugins/filters',
    '~/plugins/mixin',
    '~/plugins/common',
    '~/plugins/ajax'
  ],
  router,
  render: {
    resourceHints: false,
    // gzip: isDev ? {threshold: 0} : {level:9},
    bundleRenderer: {
      // https://ssr.vuejs.org/en/api.html#shouldpreload
      // this option fail
      // shouldPreload: (file, type) => {
      //   return file.includes('play-help')
      // }
    }
  },
  // ErrorPage:'~/components/ErrorPage',
  messages: {
    error_404: '查无此页！',
    // node_modules\nuxt\lib\app\components\nuxt-error.vue
    // client_error_details:'系统错误，请联系客服。',
    // client_error:'系统错误',
    nuxtjs: ''
  },
  debug: process.env.DEBUG
}
