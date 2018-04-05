const fs = require('fs-extra')
const chalk = require('chalk')
//grunt custom:-ajax,-css,-deprecated,-dimensions,-effects,-event,-offset,-wrap,-deferred,-core/ready

//this file:grunt custom:-ajax,-deferred
fs.copy('assets/jquery.js','node_modules/jquery/dist/jquery.custom.js',err => {
  if (err) {
    console.log(chalk.red(err))
  }
  console.log(chalk.green('jquery.custom.js copyed!'))
})