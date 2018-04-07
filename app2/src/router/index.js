import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import one from '@/components/home/one'
import three from '@/components/home/three'
import four from '@/components/home/four'
import five from '@/components/home/five'
import login from '@/components/login/login'
import registered from '@/components/login/registered'
import reset from '@/components/login/reset'
import winning from '@/components/page-four/winning'
import profit from '@/components/page-four/profit'
import pop from '@/components/page-four/pop'
import agency from '@/components/page-five/agency'
import detail from '@/components/page-five/detail'
import datum from '@/components/page-five/details/datum'
import title from '@/components/page-five/details/title'
import mymsg from '@/components/page-five/mymsg'
import letter from '@/components/page-five/mymsg/letter'
import notice from '@/components/page-five/mymsg/notice'
import profits from '@/components/page-five/profit'
import safety from '@/components/page-five/safety'
import verifyPwd from '@/components/page-five/safety/verifyPwd'
import setPwd from '@/components/page-five/safety/setPwd'
import verifySafePwd from '@/components/page-five/safety/verifySafePwd'
import setSafePwd from '@/components/page-five/safety/setSafePwd'
import resetWay from '@/components/page-five/safety/resetWay'
import setQuestion from '@/components/page-five/safety/setQuestion'
Vue.use(Router)
export default new Router({
  //	mode: 'history',
  routes: [{
    path: "/login",
    name: 'login',
    component: login
  }, {
    path: '/',
    name: 'home',
    redirect: 'one',
    component: home,
    meta: {
      requiresAuth: true
    },
    children: [{
      path: 'one',
      name: 'one',
      component: one
    }, {
      path: 'three',
      name: 'three',
      component: three
    }, {
      path: 'four',
      name: 'four',
      redirect: 'four/winning',
      component: four,
      children: [{
        path: 'winning',
        name: 'winning',
        component: winning
      }, {
        path: 'profit',
        name: 'profit',
        component: profit
      }]
    }, {
      path: 'five',
      name: 'five',
      component: five
    }]
  }, {
    path: '/pop',
    name: 'pop',
    component: pop
  }, 
  {
    path: '/safety',
    name: 'safety',
    component: safety
  }, 
  {path:'/verifyPwd',name:'verifyPwd',component:verifyPwd},
  {path:'/setPwd',name:'setPwd',component:setPwd},
  {path:'/verifySafePwd',name:'verifySafePwd',component:verifySafePwd},
  {path:'/setSafePwd',name:'setSafePwd',component:setSafePwd},
  {path:'/resetWay',name:'resetWay',component:resetWay},
  {path:'/setQuestion',name:'setQuestion',component:setQuestion},
  {
    path: '/profits',
    name: 'profits',
    component: profits
  }, {
    path: '/mymsg',
    name: 'mymsg',
    redirect: 'mymsg/notice',
    component: mymsg,
    children: [{
      path: 'notice',
      name: 'notice',
      component: notice
    }, {
      path: 'letter',
      name: 'letter',
      component: letter
    }]
  }, {
    path: '/detail',
    name: 'detail',
    redirect: 'detail/datum',
    component: detail,
    children: [{
      path: 'datum',
      name: 'datum',
      component: datum
    }, {
      path: 'title',
      name: 'title',
      component: title
    }]
  }, {
    path: '/agency',
    name: 'agency',
    component: agency
  }]
})