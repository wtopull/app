import { round } from 'lodash'
import { findKey } from 'lodash/fp'
export const state = () => ({
  currencyList: {},
  currency: '人民币',
  bal: {},
  banks: [],
  bankCards: []
})

export const getters = {
  currencyList:state => state.currencyList,
  //state currency -> value,getters currency -> key
  currency: state => findKey(_ => _ === state.currency)(state.currencyList),
  bal: ({ bal }, { currency }) =>
    currency ? round(bal[currency].allow_withdraw_balance, 3) : 0,
  totalBal: ({ bal }, { currency }) =>
    currency ? bal[currency].total_balance : 0,
  banks: state => state.banks,
  bankCards: state => state.bankCards
}

export const actions = {
  async getBal({ commit }, callback = () => {}) {
    const { list, currency_list } = (await this.$axios.$post(
      'user-balance-account/find-info'
    )).data
    commit('setBal', list)
    commit('setState', { key: 'currencyList', value: currency_list })
    callback()
  },
  getBanks({ commit, state: { banks } }, callback = () => {}) {
    if (banks.length) {
      // element-select @visible-change cb params is Boolean
      typeof callback == 'function' && callback(banks)
    } else {
      this.app.$getJson('banks').then(({ data }) => {
        commit('setState', { key: 'banks', value: data })
        typeof callback == 'function' && callback(data)
      })
    }
  },
  getBankCards({ commit, state: { bankCards } }) {
    //f5 refresh this.$axiosPlus is not a function
    // return this.$axiosPlus('user-bank-card/get',data => {
    //   data.user_bank_cards && commit('setBankCards',data.user_bank_cards.map(_ => ({..._.content})))
    // })
    if (bankCards.length) return Promise.resolve()
    //pages\admin\user\index.vue:171 fetch
    return this.$axios
      .$post('user-bank-card/get')
      .then(
        ({ data }) =>
          data &&
          data.user_bank_cards &&
          commit(
            'setBankCards',
            data.user_bank_cards.map(_ => ({ ..._.content }))
          )
      )
  }
}

export const mutations = {
  setBal(state, bal) {
    state.bal = bal
  },
  setBankCards(state, bankCards) {
    state.bankCards = bankCards
  },
  setState(state, { key, value }) {
    state[key] = value
  }
}
