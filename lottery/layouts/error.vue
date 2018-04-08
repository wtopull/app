<template>
  <section class="error-container">
    <div class="an_404m">
      <div class="h2">{{message }}</div>
      <div class="en">如果不能访问请尝试点击浏览器刷新按钮或联系客服。</div>
      <div class="button">
        <!-- <a class="button" to="/" v-if="error.statusCode === 404"> -->
          <nuxt-link class="button" to="/home">
            <i class="icon iconfont"></i>返回首页
          </nuxt-link>
          <button @click="reload" v-if="$route.name === 'home'"><i class="icon iconfont">&#xe659;</i>刷新</button>
          <button @click="$router.go(-1)" v-else><i class="icon iconfont">&#xe659;</i>返回上級</button>
      </div>
  </div>
  </section>
</template>
<style>
/* #cssload-loader{
    display: none;
  } */
  .error-container{
    position: absolute;
    left:0;right: 0;top:0;bottom:0;
    background: #ECF1F5;
  }
  .an_404m{background: url(../assets/img/404/404bg.jpg) no-repeat center 90px  #ECF1F5;height:140px;margin: 0 auto; padding-top: 550px; text-align: center;}
  .an_404m .h2{font-size: 25px;}
  .an_404m .en{color: #C5C5C5; padding: 10px 0;}
  .an_404m .button{}
  .an_404m .button a,.an_404m .button button{padding: 10px 25px; background: #6face2; border-radius: 50px; margin: 10px; color: #fff;}
  .an_404m .button a i,.an_404m .button button i{margin: 0 7px;}
  .an_404m .button a{border: 1px solid #6face2;}
  .an_404m .button a + button{background: #ff92a6; border: 1px solid #ff92a6;}
</style>
<script>
export default {
  props: ['error'],
  layout: 'empty',
  // transition: 'bounce',
  data(){
    const {error} = this 
    const statusCode = error.statusCode
    const isDev = process.env.NODE_ENV === 'development' || process.env.DEBUG
    const hasErrorMsg = isDev && (error instanceof Error || statusCode && statusCode === 500 || error.message)
    return {
      message:error.message.includes('timeout') || typeof statusCode === 'number' && statusCode !== 404 && statusCode !== 500 ? '访问超时，请联系客服！' : hasErrorMsg || statusCode === 404 ? error.message : '系统错误，请联系客服！'
      // statusCode,hasErrorMsg
    }
  },
  created(){
    process.browser && this.$root.$el.classList.add('loaded')
  },
  methods:{
    reload(){
      location.reload()
    }
  },
  //not reactive message,use the first time error,nuxt.config.js:206 errorHandler
  // computed:{
  //   message(){
  //     const {error,statusCode,hasErrorMsg} = this
  //     return error.message.includes('timeout') || typeof statusCode === 'number' && statusCode !== 404 && statusCode !== 500 ? '访问超时，请联系客服！' : hasErrorMsg || statusCode === 404 ? error.message : '系统错误，请联系客服！'
  //   }
  // }
}
</script>

