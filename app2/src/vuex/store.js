import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations'
import actions from './action'
import axios from 'axios';

Vue.use(Vuex)

const state = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  url: 'http://115.144.238.217/api/',
  loginStatus: null, //登陆状态
  Globalusername: "", //全局账号
  Globalpassword: "", //全局密码
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
})