import { round } from 'lodash'
const nums = [100, 200, 500, 1000, 5000]

export const state = () => ({
  order: [],
  //reslut 
  //   [
  //     buyValue:'大',
  //   odds:1.95,
  //   amount:100,
  //   14:$refs.input index,
  //   orderTypeIndex,
  //   playIdentifier
  // ]
  nums,
  hotable: true,
  shortcut: false,
  tabName: '',
  bonus: 0,
  tabMounted: false
})

export const getters = {
  order: state => state.order,
  nums: (state) => {
    state.nums
    if (!state.hotable) {
      return []
    }
    return state.nums.map(i => ({ value: i + '' }))
      //value:i + '' : type check failed for prop "value". Expected String, got Number.<ElAutocomplete>
  },
  hotable: state => state.hotable,
  shortcut: state => state.shortcut,
  tabName: state => state.tabName,
  tabMounted: state => state.tabMounted,
  bonus: state => state.bonus,
}

export const actions = {


}

export const mutations = {
  setOrder(state, list) {
    state.order = list
  },
  setNums(state, nums) {
    state.nums = nums.map(num => round(num, 5)).sort((a, b) => a - b)
  },
  toggleView(state, view) {
    state.shortcut = view !== '一般'
  },
  toggleHot(state, value) {
    state.hotable = value
  },
  setBonus(state, value) {
    state.bonus = value
  },
  setTabName(state, name) {
    state.tabName = name
  },
  tabMount(state, value) {
    state.tabMounted = value
  }
}