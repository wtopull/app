import Vue from 'vue'

// import {round} from 'lodash/fp'
//not lodash/fp,use lodash
import {round} from 'lodash'

import {format} from 'date-fns'

export const round3 = value => round(value,3) || 0

export const round2 = value => round(value,2) || 0

export const time = value => format(value,'YYYY-MM-DD HH:mm:ss')


const filters = {
  round3,
  round2,
  time
}
export default filters

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
