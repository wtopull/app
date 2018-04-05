import Vue from 'vue'

export default function ({ store }) {
  Vue.mixin({
    jQueryRunEnd:false,
    // watch:{
    //   access_token(val){
    //     this.authResolve && this.authResolve()
    //   }
    // },
    computed:{
      // access_token(){
      //   return store.state.access_token
      // }

    }
  })
}