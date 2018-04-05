require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {"name":"alpha","version":"1.0.0","description":"alpha go.","author":"Wu Ming","private":true,"scripts":{"nuxt":"node build/nuxt","copy:files":"node build/copy","static:json":"rimraf assets/config && node build/get-static","custom:jquery":"node build/jquery-custom","dev:opn":"cross-env NODE_ENV=development npm run nuxt","dev":"backpack dev","build":"nuxt build","build:source-map":"cross-env SOURCE_MAP=true nuxt build","start":"nuxt start","start:backpack":"cross-env NODE_ENV=production node backpack_output/app","backpack":"backpack build","build:prod":"run-s clean build nuxt","build:express":"cross-env DEBUG=true run-s clean build copy:files backpack start:backpack","dev-spa":"nuxt dev --spa","build-spa":"nuxt build --spa","start-spa":"nuxt start --spa","clean":"rimraf .nuxt/dist dist","generate":"nuxt generate","lint":"eslint --ext .js,.vue --ignore-path .gitignore .","precommit":"npm run lint","element-theme":"et","sentry:upload":"sentry-cli releases -o noop -p alpha files %npm_package_version% upload-sourcemaps --url-prefix ~/_nuxt .nuxt/dist","sentry":"run-s clean build:source-map sentry:upload","serve:pm2":"cross-env PORT=3300 HOST=127.0.0.1 pm2 start backpack_output/app.js","serve:build":"run-s clean build copy:json backpack serve:pm2","postinstall":"npm run custom:jquery"},"config":{"nuxt_port":"3200"},"dependencies":{"@nuxtjs/axios":"^4.5.2","@nuxtjs/component-cache":"^1.1.1","@nuxtjs/pwa":"^2.0.5","@xkeshi/vue-countdown":"^0.5.0","animejs":"^2.2.0","bootstrap":"^4.0.0-beta.2","clipboard":"^1.7.1","date-fns":"^1.29.0","echarts":"^3.8.5","element-ui":"^2.0.11","github-markdown-css":"^2.10.0","highlight.js":"^9.12.0","jquery":"^3.2.1","js-combinatorics":"^0.5.3","markdown-it-anchor":"^4.0.0","number-precision":"^1.2.0","nuxt":"^1.0.0","operative":"^0.4.6","push.js":"^1.0.5","qrcode":"^1.2.0","raven-js":"^3.21.0","ua-parser-js":"^0.7.17","vue-awesome-swiper":"^3.1.0","vue-lazyload":"^1.1.4","vuex-persistedstate":"^2.4.2","vuex-router-sync":"^5.0.0"},"devDependencies":{"@nuxtjs/proxy":"^1.1.3","babel-eslint":"^8.2.1","babel-plugin-component":"^1.0.0","babel-plugin-date-fns":"^0.1.0","babel-plugin-jsx-vue-functional":"^2.1.0","babel-plugin-lodash":"^3.3.2","babel-plugin-transform-optional-chaining":"^7.0.0-beta.3","backpack-core":"^0.5.0","cross-env":"^5.1.3","element-theme":"^2.0.1","element-theme-chalk":"^2.0.11","eslint":"^4.15.0","eslint-config-standard":"^11.0.0-beta.0","eslint-loader":"^1.9.0","eslint-plugin-html":"^4.0.1","eslint-plugin-import":"^2.8.0","eslint-plugin-node":"^5.2.1","eslint-plugin-promise":"^3.6.0","eslint-plugin-standard":"^3.0.1","localtunnel":"^1.8.3","lodash-webpack-plugin":"^0.11.4","markdown-it-attrs":"^1.2.1","node-sass":"^4.7.2","npm-run-all":"^4.1.2","preload-webpack-plugin":"^2.1.2","prepack":"^0.2.18","rimraf":"^2.6.2","sass-loader":"^6.0.6","sentry-cli-binary":"^1.25.0","transliteration":"^1.6.2","vue-markdown-loader":"^2.3.0","webpack-monitor":"^1.0.14"},"browserslist":["Chrome >= 45","Firefox ESR","Edge >= 12","Explorer >= 10","iOS >= 9","Safari >= 9","Android >= 4.4","Opera >= 30"],"element-theme":{"browsers":["ie >= 10"],"out":"./assets/element-theme","config":"./assets/element-variables.scss","theme":"element-theme-chalk","minimize":false}}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api__ = __webpack_require__(4);



const app = __WEBPACK_IMPORTED_MODULE_0_express___default()();
// const bodyParser = require('body-parser')
const host = process.env.HOST || __webpack_require__(6);
/*
  don't use process.env.PORT in package.json PORT=3300
  .nuxt axios (process.env.API_URL || 'http://localhost:3200/api') will use npm_package_config_nuxt_port
  it dispkay server connect ECONNREFUSED 127.0.0.1:3200  when f5 refresh home page on pm2 server
*/
const port = process.env.npm_package_config_nuxt_port || 3200;

app.set('port', port);
// app.disable('x-powered-by')
// can't app.set('x-powered-by','xxx')
app.use(function (req, res, next) {
  res.setHeader('X-Powered-By', 'alpha');
  next();
});
// Import API Routes
app.use('/api', __WEBPACK_IMPORTED_MODULE_2__api__["a" /* default */]);

// Import and Set Nuxt.js options
let config = __webpack_require__(8);
config.dev = !("development" === 'production');

// Init Nuxt.js
const nuxt = new __WEBPACK_IMPORTED_MODULE_1_nuxt__["Nuxt"](config);

// Build only in dev mode
if (config.dev) {
  const builder = new __WEBPACK_IMPORTED_MODULE_1_nuxt__["Builder"](nuxt);
  builder.build().catch(error => {
    console.error(error);
    process.exit(1);
  });
}

// Give nuxt middleware to express
app.use(nuxt.render);

// Listen the server
app.listen(port, host);
console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console
if (!config.dev) {
  __webpack_require__(22)(port, { local_host: host, subdomain: __webpack_require__(1).name }, function (err, tunnel) {
    if (err) {
      return console.log(err);
    }
    console.log(`localtunnel ${tunnel.url}`);
  });
}

__webpack_require__(23)(`http://${host}:${port}`);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth__ = __webpack_require__(5);




const router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

router.use(__WEBPACK_IMPORTED_MODULE_1__auth__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);

// import axios from 'axios'
// import {oauthParms,HOST,baseURL} from '../../build/api-config'
const router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

router.get('/init', function (req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // axios.post(`${HOST}/oauth/token`,oauthParms)
  // .then(({data:{access_token}}) => {
  //   res.json({access_token,ip})
  // })
  res.json({ ip });
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const getIp = () => {

  var networkInterfaces = __webpack_require__(7).networkInterfaces();
  var matches = [];

  Object.keys(networkInterfaces).forEach(function (item) {
    networkInterfaces[item].forEach(function (address) {
      if (address.internal === false && address.family === "IPv4") {
        matches.push(address.address);
      }
    });
  });

  return matches[0];
}

module.exports = getIp()

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {const path = __webpack_require__(9);
const webpack = __webpack_require__(10);
const LodashModuleReplacementPlugin = __webpack_require__(11);
const WebpackMonitor = __webpack_require__(12);
const _ = __webpack_require__(13);
const pkg = __webpack_require__(1);
const token = __webpack_require__(14);
const markdown = __webpack_require__(15);
const NODE_ENV = "development";
const isDev = NODE_ENV === 'development';
// const isProd = NODE_ENV === 'production'


const router = __webpack_require__(19);
let modules = ['@nuxtjs/axios', '@nuxtjs/proxy', ['@nuxtjs/component-cache', { maxAge: 1000 * 60 * 60 }]].concat(isDev ? [] : [['@nuxtjs/pwa', { icon: false }]]);

let build = {
  //npm run build --analyze
  analyze: process.env.npm_config_analyze ? { analyzerMode: 'static' } : false,
  publicPath: '/.nuxt/dist/',
  plugins: [new LodashModuleReplacementPlugin({
    shorthands: true, //gzip 8.5k -> 10.08k 
    collections: true,
    currying: true
  }), new webpack.ProvidePlugin({
    $: 'jquery/dist/jquery.custom.js',
    jQuery: 'jquery/dist/jquery.custom.js'
  })],
  babel: {
    plugins: ['lodash', 'date-fns', 'jsx-vue-functional', ["component", [{
      "libraryName": "element-ui",
      "styleLibraryName": "~assets/element-theme"
      // "styleLibraryName": "theme-chalk"
    }]]],
    presets: [['vue-app', {
      targets: isDev ? { chrome: 65 } : { ie: 10 }
    }]]
  },
  extend(config, { isClient, isDev: _isDev }) {
    if (!_isDev) {
      //https://webpack.js.org/configuration/devtool/#production
      //nuxt default nosources-source-map,It can be used to map stack traces on the client without exposing all of the source code
      //sentry require source-map
      //todo .vue file source-map fail,dev mode success
      process.env.SOURCE_MAP ? config.devtool = 'source-map' : !isDev && (config.devtool = false);
      //reset uglifyjs config
      config.plugins = config.plugins.filter(plugin => plugin.constructor.name !== 'UglifyJsPlugin');
      const PreloadWebpackPlugin = __webpack_require__(20);
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
      }));

      if (process.env.npm_config_monitor) {
        config.plugins.push(new WebpackMonitor({
          target: '../.nuxt/monitor/stats.json',
          launch: true // -> default 'false'
        }));
      }
    } else {
      config.module.rules.push({
        test: /\.json$/i,
        include: path.resolve(__dirname, 'assets/config'),
        //webpack not reference assets/config
        use: ['file-loader?name=config/[name].[ext]']
      });
    }

    config.module.rules.push(markdown);
  },
  extractCSS: !isDev,
  vendor: ['jquery/dist/jquery.custom.js']

};

if (!isDev) {
  build.postcss = __webpack_require__(21);
}

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'alpha',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' }, { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' }, { name: 'renderer', content: 'webkit' }, { hid: 'description', name: 'description', content: 'alpha go.' }, { name: 'google', value: 'notranslate' }],
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
  css: [{ src: '~assets/scss/index.scss', lang: 'scss' }, '~/assets/c8css/swiper.css', '~assets/c8css/common.css'],
  // layoutTransition: {
  //   name: 'page',
  //   mode: 'out-in'
  // },
  build,
  env: {
    appVersion: pkg.version
  },
  manifest: {
    name: 'Alpha',
    description: 'Alpha Go',
    theme_color: '#6FADE1'
  },
  modules,
  proxy: {
    '/api': { target: 'http://alpha-api.test.bestsnake.com', onProxyReq(proxyReq, req, res) {
        proxyReq.setHeader('DeviceType', 1);
        proxyReq.setHeader('Authorization', token.access_token);
      } },
    '/sys-report': {
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
      axios.defaults.timeout = '5000';
    },
    redirectError: {
      401: '/login'
    },
    responseInterceptor(response, { redirect, store }) {
      const { data: { errorCode } } = response;
      if (errorCode === 102901 || errorCode === 100002) {
        // require('./util/logout')(store),webpack Cannot read property 'call' of undefined
        store.commit('setUser', { ip: store.state.user.ip });
        store.commit('setLogout', errorCode);
        redirect('/login');
      }
      return response;
    }
  },
  plugins: ['~/plugins/vuex-router-sync', { src: '~/plugins/vuex-persistedstate', ssr: false }, '~/plugins/token', '~/plugins/filters', '~/plugins/mixin', '~/plugins/common', '~/plugins/ajax'],
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
  messages: {
    error_404: '查無此頁！'
  },
  debug: process.env.DEBUG
};
/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("lodash-webpack-plugin");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("webpack-monitor");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = {"version":1515312329,"access_token":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijg4MmRiYTRkYjg3N2Q4YWQ3ODM3NTBiZGZlZTVhOTU3ZjUwMmYzZWU3ZjliZjQ5MmVmYWM4YzQwMDk5MGNhZTk4ZDU2MjQ2OWQzYjY4NjRkIn0.eyJhdWQiOiIzIiwianRpIjoiODgyZGJhNGRiODc3ZDhhZDc4Mzc1MGJkZmVlNWE5NTdmNTAyZjNlZTdmOWJmNDkyZWZhYzhjNDAwOTkwY2FlOThkNTYyNDY5ZDNiNjg2NGQiLCJpYXQiOjE1MTU0ODUzNjIsIm5iZiI6MTUxNTQ4NTM2MiwiZXhwIjoxNTQ3MDIxMzYyLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.P36YkjRUaPbw9SEyjYKWjQAkq2Rq05Po6HZlQdzpm5KYddD1dQIkHdykgS3fBSy8ColXlqiUkKqtTVHFFSAdfVn418fcosPI7A4eQk97WMN77sViNl9j-U0eY0Y6VXFj-cJc9e3EDu_8tW5Xv7IOtJSnXhrp0YcM07eh-aaN2fvRVL63Xc2tHwKIQIWqwGVlin8A0O1GVYmG_WX7ENygxBciK0PYuIzAusOmQCS2w989QlQdYBewdan-PhAzCEu-y6rzWBzC0SW9luuvLHQIty5ysKwI746X3JS-pnDsa9iACU7F2mlgFhHNN3e9bKdG-kp6kEI1o4QzRarr2VkV_8_LTVUgw4tHX1WE_W99MrduIOBTrJ59xpy2AvrAqCetHAWrBjrmwoDnNp0tiECtt-6rClIM_Gxg9QKZt5tgB1xQ6jZfvWlpybK9SVI1406UHPKwldv9z7Db6BrVpm7zw7DTvPrfsN6aixwJiT-mltuvUhwZfv_gBs_o3ccC3Hvszs7I2wDAAYe2nm3iweHVEwjAlmHslu4898QXr8c-pOCju1ggMFmRYVa4afdPtbGIL0wBZ8y-63GyfbMBuzPZvym36ZwIb8anyoAZW6gxlYtqE9wSToSiNg1rokqmFjNhKbsYa5VnKDQ8kK2KLJqBbWFhRQx4UhRzBBuGFSkiKpY"}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

const slugify = __webpack_require__(16).slugify

module.exports = {
  test: /\.md$/,
  loader: 'vue-markdown-loader',
  options: {
    preprocess: function(markdownIt, source) {
      return source.replace(/img/g,'/.nuxt/dist/img/docs')
    },
    use:[
      [__webpack_require__(17), {
        level: 2,
        slugify,
        permalink: true,
        permalinkBefore: true,
        permalinkClass:'anchor',
        permalinkSymbol:'<svg aria-hidden="true" class="octicon octicon-link" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'
      }],
      __webpack_require__(18)
    ]
  }
}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("transliteration");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("markdown-it-anchor");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("markdown-it-attrs");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = {
  middleware: ['logout'],
  linkExactActiveClass: 'active',
  extendRoutes (routes, resolve) {
    // !isDev && _.remove(routes,_ => _.name === 'login-test')
    // function makeDefault(router) {
    //   const firstRouter = router.children[0]
    //   const children = firstRouter.children
    //   const component = children ? children[0].component : firstRouter.component
    //   router.children.unshift({ path: '', component })
    //   delete router.name
    //   if (children) makeDefault(firstRouter)
    // }
    // makeDefault(routes.find(_ => _.name === 'admin'))

    // routes.find(_ => _.name === 'admin').children.forEach(router => {
    //   if(router.children) {
    //     const component = router.children[0].component
    //     router.children.unshift({ path: '', component })
    //     delete router.name
    //   }
    // })
    return routes

  }
}

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("preload-webpack-plugin");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = {
  plugins: {
    cssnano:{safe :true,discardComments: {removeAll: true}}
  }
}

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("localtunnel");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("opn");

/***/ })
/******/ ]);
//# sourceMappingURL=app.map