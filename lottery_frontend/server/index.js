import express from 'express'
import { Nuxt, Builder } from 'nuxt'
import api from './api'
const app = express()
const bodyParser = require('body-parser')
// const session = require('express-session')
const host = process.env.HOST || require('../build/get-ip')

var proxyMiddleware = require('http-proxy-middleware');

/*
  don't use process.env.PORT in package.json PORT=3100
  .nuxt axios (process.env.API_URL || 'http://localhost:3200/api') will use npm_package_config_nuxt_port
  it dispkay server connect ECONNREFUSED 127.0.0.1:3200  when f5 refresh home page on pm2 server
*/
const port = process.env.npm_package_config_nuxt_port || 3100



app.set('port', port)
// app.disable('x-powered-by')
// can't app.set('x-powered-by','xxx')
app.use(function (req, res, next) {
  res.setHeader('X-Powered-By', 'caishi')
  next()
})

// app.use(bodyParser.json({limit:'900kb'}))
app.use(bodyParser.urlencoded({extended:false}))

// app.use(session({
//   secret: 'super-secret-key',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { maxAge: 60000 * 60 * 24}
// }))

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


// app.use(proxyMiddleware({
//   '/api/': {
//     target: 'http://alpha-api.test.bestsnake.com',
//     onProxyReq(proxyReq, req, res) {
//       proxyReq.setHeader('DeviceType', 1)
//       proxyReq.setHeader('Authorization', token.access_token)
//     }
//   },
//   '/sys-report/': {
//     target: 'http://lottery-detection-center.test.bestsnake.com'
//   }
// }))

// Give nuxt middleware to express
app.use(nuxt.render)


// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
// if(!config.dev){
//   require('localtunnel')(port, {local_host:host,subdomain:require('../package').name},function(err, tunnel) {
//     if (err) {
//       return console.log(err)
//     }
//     console.log(`localtunnel ${tunnel.url}`)
//   })
// }


require('opn')(`http://${host}:${port}`)