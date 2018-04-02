import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import VueResource from 'vue-resource';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';

Vue.use(VueRouter);        //gister the component of vue-router
Vue.use(VueResource);     //gister the component of vue-resource

//定义路由
const routes = [
  {path: '/',name:'/',component: goods},  //set the default vue-router;
  {path: '/goods/:goodsId',name:'goods',component: goods},
  { path: '/ratings/:ratingsId',name:'ratings',component: ratings },
  { path: '/seller/:sellerId',name:'seller',component: seller },
]

const router = new VueRouter({routes});

 var vue=new Vue({
 	router:router,
 	render:h=>h(App)    //直接给绑定节点渲染APP组件;
}).$mount('#app');     //将vue实例挂载到id为app的实例上去，启动

