const host = process.env.HOST = require('./get-ip')

require(`nuxt/bin/nuxt-${process.env.NODE_ENV === 'development' ? 'dev' : 'start'}`)

require('opn')(`http://${host}:${process.env.PORT || process.env.npm_package_config_nuxt_port || 3000}`)