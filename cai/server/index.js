import express from 'express'
import { Nuxt, Builder } from 'nuxt'
import api from './api'
const app = express()
// const bodyParser = require('body-parser')
const host = process.env.HOST || require('../build/get-ip')
/*
  don't use process.env.PORT in package.json PORT=3300
  .nuxt axios (process.env.API_URL || 'http://localhost:3200/api') will use npm_package_config_nuxt_port
  it dispkay server connect ECONNREFUSED 127.0.0.1:3200  when f5 refresh home page on pm2 server
*/
const port = process.env.npm_package_config_nuxt_port || 3200



app.set('port', port)
// app.disable('x-powered-by')
// can't app.set('x-powered-by','xxx')
app.use(function (req, res, next) {
  res.setHeader('X-Powered-By', 'alpha')
  next()
})
// Import API Routes
app.use('/api', api)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}


// Give nuxt middleware to express
app.use(nuxt.render)


// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
if(!config.dev){
  require('localtunnel')(port, {local_host:host,subdomain:require('../package').name},function(err, tunnel) {
    if (err) {
      return console.log(err)
    }
    console.log(`localtunnel ${tunnel.url}`)
  })
}


require('opn')(`http://${host}:${port}`)