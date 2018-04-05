import {round} from 'lodash'

export const state = () => ({
  bal:{},
  banks:[],
  bankCards:[]
})

export const getters = {
  // name:({user}) => user.name,
  // hasPayPw:({user}) => user.is_set_fund_password,
  bal:({bal}) => round(bal.allow_withdraw_balance,3) || 0,
  totalBal:({bal}) => bal.total_balance,
  banks:state => state.banks,
  bankCards:state => state.bankCards,
}

export const actions = {
  async getBal({commit},callback = () => {}){
    commit('setBal',(await this.$axios.$post('user-balance-account/find-info')).data)
    callback()
  },
  getBanks({commit,state:{banks}},callback = () => {}){
    if(banks.length){
      // element-select @visible-change cb params is Boolean
      typeof callback == 'function' && callback(banks)
    }else{
      this.app.$getJson('banks').then(({data}) => {
        commit('setBanks',data)
        typeof callback == 'function' && callback(data)
      })
    }
  },
  getBankCards({commit,state:{bankCards}}){
    //f5 refresh this.$axiosPlus is not a function
    // return this.$axiosPlus('user-bank-card/get',data => {
    //   data.user_bank_cards && commit('setBankCards',data.user_bank_cards.map(_ => ({..._.content})))
    // })
    if(bankCards.length) return Promise.resolve()
    //pages\admin\user\index.vue:171 fetch
    return this.$axios.$post('user-bank-card/get').then(({data}) => data && data.user_bank_cards && commit('setBankCards',data.user_bank_cards.map(_ => ({..._.content}))))
  }
}

export const mutations = {
  setBal(state, bal){
    state.bal = bal
  },
  setBanks(state,banks){
    state.banks = banks
  },
  setBankCards(state,bankCards){
    state.bankCards = bankCards
  }
}