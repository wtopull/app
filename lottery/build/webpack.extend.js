const path = require('path')
const webpack = require('webpack')
const markdown = require('./markdown')

const isDebug = process.env.DEBUG

module.exports = (config, { isClient, isDev: _isDev }) => {
  if (!_isDev) {
    //https://webpack.js.org/configuration/devtool/#production
    //nuxt default nosources-source-map,It can be used to map stack traces on the client without exposing all of the source code
    //sentry require source-map
    //todo .vue file source-map fail,dev mode success
    process.env.SOURCE_MAP
      ? (config.devtool = 'source-map')
      : !_isDev && (config.devtool = false)
    //reset uglifyjs config
    config.plugins = config.plugins.filter(
      plugin => plugin.constructor.name !== 'UglifyJsPlugin'
    )
    const PreloadWebpackPlugin = require('preload-webpack-plugin')
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
          drop_console: isDebug,
          drop_debugger: isDebug
        },
        sourceMap: true,
        //todo view version is version:v1.0.0-beta.2 ? webpack require update https://github.com/webpack-contrib/uglifyjs-webpack-plugin/releases
        parallel: true
      })
    )

    if (process.env.npm_config_monitor) {
      config.plugins.push(
        new (require('webpack-monitor'))({
          target: '../.nuxt/monitor/stats.json',
          launch: true // -> default 'false'
        })
      )
    }
  } else {
    config.module.rules.push({
      test: /\.json$/i,
      include: path.resolve(__dirname, '../assets/config'),
      //webpack not reference assets/config
      use: ['file-loader?name=config/[name].[ext]']
    })
  }
  //Module build failed: Error: Couldn't find preset "stage-2" relative to directory "D:\\Dev\\alpha-front\\node_modules\\vue-data-tables"
  // config.module.rules.push({
  //   test: /(vue-data-tables.src).*?js$/,
  //   loader: 'babel-loader'
  // })

  config.module.rules.push(markdown)
}