import {round3} from '~/plugins/filters'

export {round3}

//el-select change value to be '0' but not 0 
export const queryAll = {'0':'全部'}

export const levels = ['顶级','主管','招商','特权','直属','普通']

//todo style insert component method
// style(value > 1 ? -1 : 1,'disabled') is default ?
export const style = (value,negative = 'danger',success = 'success') => value === 0 ? '' : `text-${[success,negative][value > 0 ? 0 : 1]}`

export default {
  data(){
    return {
      cancelKey:6,
      cancelable:1
    }
  }
}