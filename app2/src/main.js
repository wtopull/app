// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Carousel from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Icon, NoticeBar, Actionsheet } from 'vant';
import 'vant/lib/vant-css/index.css'
import 'lib-flexible/flexible.js'
import './assets/iconfont/iconfont.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './vuex/store'
import { Tab, Tabs } from 'vant';


//axios.defaults.baseURL = 'http://api.douban.com/v2/movie/';
//Vue.prototype.axios = axios;
Vue.use(Tab).use(Tabs);
Vue.use(VueAxios, axios);
Vue.use(Actionsheet);
Vue.use(NoticeBar);
Vue.use(Icon);
Vue.use(Carousel)
Vue.config.productionTip = false
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})