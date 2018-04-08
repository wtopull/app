import Vue from 'vue'

export default function ({ store }) {
  Vue.mixin({
    data(){
      return {
        isInvoking:false
      }
    }
    // watch:{
    //   access_token(val){
    //     this.authResolve && this.authResolve()
    //   }
    // }
  })
}