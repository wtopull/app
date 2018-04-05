const axios = require('axios')
const fs = require('fs-extra')
const chalk = require('chalk')
const { HOST, baseURL, oauthParms } = require('./api-config')
const token = require('../backpack_output/token')
const OUTPUT = 'assets/config/'
const _ = require('lodash')
const {toLlottoNavList,toLottoInfo,toReposalInfo} = require('./lotteries')
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
    let playHelps = {}
    let newHelpIndex = 0
    axios.post(`${baseURL}lotteries`)
      .then(({ data: { data } }) => {
    console.log('version',version)
        
        let lottoNavList = toLlottoNavList(data)
        lottoNavList.reduce((prev, next,index,array) => {
          return {infos:prev.infos.concat(next.infos.map(_ => ({typeName:array[index].name,type:array[index].identifier,..._})))}
        }, { infos: [] }).infos.map(_ => [_.i,_.typeName,_.type])
          .forEach(([identifier,typeName,type],index,array) => {
            axios.post(`${baseURL.replace('static-data','lottery')}lotteries-by-info-identifier`,{identifier})
              .then(({ data: { data } }) => {
                const {playInfo,playHelp} = toLottoInfo(data,typeName)
                !playHelps[type] && (playHelps[type] = playHelp)
                outPutFile(identifier,playInfo);
                // if (index === array.length - 1) {node.js forEach index 4,3,2,0,1
                const helpValues = Object.values(playHelps)
                if (++newHelpIndex === array.length){
                  let helps = _.flattenDeep(helpValues)
                  fs.outputFile(`${OUTPUT}play-helps.js`,'export default ' + JSON.stringify(_.zipObject(helps.map(_ => _.idf),    helps.map(({i,si}) => i ? [i,si] : si))),err => {
                    if (err) {
                      console.log(chalk.red(err))
                    }
                    console.log(chalk.green('play-helps.js build'))
                    // require('./copy-config')
                  })
                }
              })
            axios.post(`${baseURL.replace('static-data','lottery')}lotteries-reposal-by-info-identifier`,{identifier})
              .then(({data: { data } }) => {
                outPutFile(`${identifier}.reposal`,toReposalInfo(data,type));
              })
          })
        outPutFile('lotto-nav-list',lottoNavList)

      })

      axios.post(`${baseURL}districts`)
      .then(({ data: { data } }) => {
        outPutFile('districts',toDistricts(data))
      })


      axios.post(`${baseURL}banks`)
        .then(({ data: { data } }) => {
          outPutFile('banks',data.banks.map(({content}) => _.pickBy({...content},_ => _)))
        })

  })
  
