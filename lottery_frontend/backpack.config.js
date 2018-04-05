const path = require('path')
const rootPath = path.resolve(process.cwd())
const buildPath = path.join(rootPath, 'backpack_output')

module.exports = {
  webpack: (config, options, webpack) => {
    config.entry = {app:'./server/index.js'}
    config.output.path = buildPath
    return config
  }
}
