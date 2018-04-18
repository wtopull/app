/**
 * Created by DELL on 2018/4/5.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
  const state={
   count:1
  };
  const  mutation={
    add(state){
      state.count++
    },
    ruduce(state){
      state.count--
    }
  };

  export default  new Vuex.Store({
    state,mutation
  })
