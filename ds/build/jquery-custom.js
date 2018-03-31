const fs = require('fs-extra')
const chalk = require('chalk')
//grunt custom:-ajax,-css,-deprecated,-dimensions,-effects,-offset,-wrap,-deferred,-core/ready

//assets/plugin/flipclock.js require event
fs.copy('assets/jquery.js','node_modules/jquery/dist/jquery.custom.js',err => {
  if (err) {
    console.log(chalk.red(err))
  }
  console.log(chalk.green('jquery.custom.js copyed!'))
})