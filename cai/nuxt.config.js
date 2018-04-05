const path = require('path')
const webpack = require('webpack')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const WebpackMonitor = require('webpack-monitor');
const _ = require('lodash')
const pkg = require('./package')
const token = require('./backpack_output/token')
const markdown = require('./build/markdown')
const NODE_ENV = process.env.NODE_ENV
const isDev = NODE_ENV === 'development'
  // const isProd = NODE_ENV === 'production'


const router = require('./build/router')
let modules = [
  '@nuxtjs/axios',
  '@nuxtjs/proxy',
  ['@nuxtjs/component-cache', { maxAge: 1000 * 60 * 60 }]
].concat(isDev ? [] : [
  ['@nuxtjs/pwa', { icon: false }]
])

let build = {
  //npm run build --analyze
  analyze: process.env.npm_config_analyze ? { analyzerMode: 'static' } :  false,
  publicPath: '/.nuxt/dist/',
  plugins: [
    new LodashModuleReplacementPlugin({
      shorthands:true,//gzip 8.5k -> 10.08k 
      collections: true,
      currying: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery/dist/jquery.custom.js',
      jQuery: 'jquery/dist/jquery.custom.js',
    })
  ],
  babel: {
    plugins: [
      'lodash', 'date-fns','jsx-vue-functional',
      ["component", [
        {
          "libraryName": "element-ui",
          "styleLibraryName": "~assets/element-theme"
          // "styleLibraryName": "theme-chalk"
        }
      ]]
    ],
    presets: [
      ['vue-app', {
        targets: isDev ? { chrome: 65 } : { ie: 10 }
      }]
    ]
  },
  extend(config, { isClient, isDev:_isDev }) {
    if (!_isDev) {
      //https://webpack.js.org/configuration/devtool/#production
      //nuxt default nosources-source-map,It can be used to map stack traces on the client without exposing all of the source code
      //sentry require source-map
      //todo .vue file source-map fail,dev mode success
      process.env.SOURCE_MAP ? (config.devtool = 'source-map') : (!isDev && (config.devtool = false))
        //reset uglifyjs config
      config.plugins = config.plugins.filter((plugin) => plugin.constructor.name !== 'UglifyJsPlugin')
      const PreloadWebpackPlugin = require('preload-webpack-plugin');
      config.plugins.push(
        // new PreloadWebpackPlugin({
        //   include: ['play-help']
        // }),
        new webpack.optimize.UglifyJsPlugin({
          extractComments: {
            filename: 'LICENSES'
          },
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true
          },
          sourceMap: true,
          //todo view version is version:v1.0.0-beta.2 ? webpack require update https://github.com/webpack-contrib/uglifyjs-webpack-plugin/releases
          parallel: true
        })
      )

      if(process.env.npm_config_monitor) {
        config.plugins.push(
          new WebpackMonitor({
            target:'../.nuxt/monitor/stats.json',
            launch: true, // -> default 'false'
          }),
        )
      }

    }else{
      config.module.rules.push({
        test: /\.json$/i,
        include: path.resolve(__dirname, 'assets/config'),
        //webpack not reference assets/config
        use: ['file-loader?name=config/[name].[ext]']
      })
    }

    config.module.rules.push(markdown)
  },
  extractCSS:!isDev,
  vendor: [
    'jquery/dist/jquery.custom.js'
  ]
  
}

if(!isDev) {
  build.postcss = require('./build/postcss.config')
}

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'alpha',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'renderer', content: 'webkit' },
      { hid: 'description', name: 'description', content: 'alpha go.' },
      {name:'google',value:'notranslate'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
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
  css:[
    { src: '~assets/scss/index.scss', lang: 'scss' },
    '~/assets/c8css/swiper.css',
    '~assets/c8css/common.css',
  ],
  // layoutTransition: {
  //   name: 'page',
  //   mode: 'out-in'
  // },
  build,
  env:{
    appVersion:pkg.version
  },
  manifest: {
    name: 'Alpha',
    description: 'Alpha Go',
    theme_color: '#6FADE1'
  },
  modules,
  proxy:{
    '/api': { target: 'http://alpha-api.test.bestsnake.com', onProxyReq(proxyReq, req, res) {
      proxyReq.setHeader('DeviceType', 1)
      proxyReq.setHeader('Authorization',token.access_token)
    }},
    '/sys-report':{
      target: 'http://lottery-detection-center.test.bestsnake.com'
    }
  },
  // serverMiddleware:[
  //   // { path: '/api-front', handler: '~/server/auth.js' }
  //   '~/server/auth.js'
  // ],
  axios: {
    baseURL: '/api',
    init(axios) {
      axios.defaults.timeout = '5000'
    },
    redirectError: {
      401: '/login'
    },
    responseInterceptor(response, {redirect,store}){
      const {data:{errorCode}} = response
      if(errorCode === 102901 || errorCode === 100002) {
        // require('./util/logout')(store),webpack Cannot read property 'call' of undefined
        store.commit('setUser',{ip:store.state.user.ip})
        store.commit('setLogout',errorCode)
        redirect('/login')
      }
      return response
    }
  },
  plugins: [
    '~/plugins/vuex-router-sync',
    { src: '~/plugins/vuex-persistedstate', ssr: false },
    '~/plugins/token',
    '~/plugins/filters',
    '~/plugins/mixin',
    '~/plugins/common',
    '~/plugins/ajax',
  ],
  router,
  render:{
    resourceHints:false,
    // gzip: isDev ? {threshold: 0} : {level:9},
    bundleRenderer: {
      // https://ssr.vuejs.org/en/api.html#shouldpreload
      // this option fail
      // shouldPreload: (file, type) => {
      //   return file.includes('play-help')
      // }
    }
  },
  messages:{
    error_404:'查無此頁！'
  },
  debug:process.env.DEBUG
}