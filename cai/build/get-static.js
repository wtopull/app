const axios = require('axios')
const fs = require('fs-extra')
const chalk = require('chalk')
const { HOST, baseURL, oauthParms } = require('./api-config')
const token = require('../backpack_output/token')
const OUTPUT = 'assets/config/'
const _ = require('lodash')

const toDistricts = require('./districts')

axios.post(`${HOST}/oauth/token`, oauthParms)
  .then(({ data: { access_token } }) => {
    axios.defaults.headers.common['Authorization'] = token.access_token = 'Bearer ' + access_token
    return axios.post(`${baseURL}lottery-version`)
  })
  .then(({ data: { data: { version } } }) => {
    if (token.version != version) {
      fs.writeJson('./backpack_output/token.json', {...token,version},{spaces:'\t'}, err => {
        if (err) return console.error(err)
        console.log(chalk.green('token.json build version ' + version))
      })
    }
    const outPutFile = (filename,data,v) => {
      fs.outputJson(`${OUTPUT}${filename}.${v || version}.json`, data, err => {
        if (err) {
          console.log(chalk.red(err))
        }
        console.log(chalk.green(`${filename}.${v || version}.json build`))
      })
    }

      axios.post(`${baseURL}districts`)
      .then(({ data: { data } }) => {
        outPutFile('districts',toDistricts(data))
      })


      axios.post(`${baseURL}banks`)
        .then(({ data: { data } }) => {
          outPutFile('banks',data.banks.map(({content}) => _.pickBy({...content},_ => _)))
        })

  })
  
