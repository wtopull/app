const fs = require('fs-extra')
const chalk = require('chalk')
const Prepack = require('prepack')
const OUTPUT = 'assets/config/'

Prepack.prepackFile('util/lotto/play-config.js', {}, (err,{code}) => {
  fs.outputFile(`${OUTPUT}play-config.js`,code.replace('playConfig','module.exports'),err => {
    if (err) {
      console.log(chalk.red(err))
    }
    console.log(chalk.green('play-config.js build'))
  })
})

