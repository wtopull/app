const fs = require('fs-extra')
fs.copy('assets/config', '.nuxt/dist/config', err => {
  if (err) return console.error(err)
})

fs.copy('docs/img', '.nuxt/dist/img/docs', err => {
  if (err) return console.error(err)
})

