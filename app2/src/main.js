// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Carousel from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Icon,NoticeBar,Actionsheet } from 'vant';
import 'vant/lib/vant-css/index.css'
import 'lib-flexible/flexible.js'
import './assets/iconfont/iconfont.css'

Vue.use(Actionsheet);
Vue.use(NoticeBar);
Vue.use(Icon);
Vue.use(Carousel)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})