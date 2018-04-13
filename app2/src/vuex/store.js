import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	headers:{'Content-Type':'application/x-www-form-urlencoded'},
    platform: '',
    loginStatus: null, //登陆状态
    Globalusername: "",//全局账号
		Globalpassword: "",//全局密码
  },
  mutations: {
    SET_APP(state, platform) {
      state.platform = platform;
    }
  },
  actions: {
    setApp({
      commit
    }, platform) {
      commit('SET_APP', platform);
    }
  },
  getters: {
    getApp: (state) => state.platform
  }
})
