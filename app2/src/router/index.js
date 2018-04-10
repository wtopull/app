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
import ErrorPage from '@/components/public/ErrorPage'
import lotterList from '@/components/lotter-all/lotterList'
import lotterAll from '@/components/lotter-all/lotterAll'
import k3 from '@/components/lotter-all/k3'
import ssc from '@/components/lotter-all/ssc'
import klc from '@/components/lotter-all/klc'
import etf from '@/components/lotter-all/etf'
import betbj10 from '@/components/lotter-all/lotterbet/betbj10'
import betbjkl8 from '@/components/lotter-all/lotterbet/betbjkl8'
import betetf from '@/components/lotter-all/lotterbet/betetf'
import betk3 from '@/components/lotter-all/lotterbet/betk3'
import betlhc from '@/components/lotter-all/lotterbet/betlhc'
import betssc from '@/components/lotter-all/lotterbet/betssc'


Vue.use(Router)
export default new Router({
    mode: 'history',
    routes: [
        { path: '*', name: 'ErrorPage', component: require('../components/public/ErrorPage'), meta: { title: '操作失败' } },
        { path: "/login", name: 'login', component: resolve => require(['@/components/login/login.vue'], resolve), meta: { keepAlive: true } },
        { path: "/betbj10", name: 'betbj10', component: resolve => require(['@/components/lotter-all/lotterbet/betbj10.vue'], resolve), meta: { keepAlive: true } },
        { path: "/betbjkl8", name: 'betbjkl8', component: resolve => require(['@/components/lotter-all/lotterbet/betbjkl8.vue'], resolve), meta: { keepAlive: true } },
        { path: "/betetf", name: 'betetf', component: resolve => require(['@/components/lotter-all/lotterbet/betetf.vue'], resolve), meta: { keepAlive: true } },
        { path: "/betk3", name: 'betk3', component: resolve => require(['@/components/lotter-all/lotterbet/betk3.vue'], resolve), meta: { keepAlive: true } },
        { path: "/betlhc", name: 'betlhc', component: resolve => require(['@/components/lotter-all/lotterbet/betlhc.vue'], resolve), meta: { keepAlive: true } },
        { path: "/betssc", name: 'betssc', component: resolve => require(['@/components/lotter-all/lotterbet/betssc.vue'], resolve), meta: { keepAlive: true } },
        {
            path: '/lotterList',
            name: 'lotterList',
            redirect: 'lotterList/lotterAll',
            component: resolve => require(['@/components/lotter-all/lotterList.vue'], resolve),
            meta: { keepAlive: true },
            children: [
                { path: 'lotterAll', name: 'lotterAll', component: lotterAll },
                { path: 'k3', name: 'k3', component: k3 },
                { path: 'ssc', name: 'ssc', component: ssc },
                { path: 'klc', name: 'klc', component: klc },
                { path: 'etf', name: 'etf', component: etf }
            ]
        },
        {
            path: '/',
            name: 'home',
            redirect: 'one',
            component: home,
            meta: { keepAlive: true },
            children: [{
                    path: 'one',
                    name: 'one',
                    component: resolve => require(['@/components/home/one.vue'], resolve),
                    meta: { keepAlive: true },
                },
                { path: 'three', name: 'three', component: resolve => require(['@/components/home/three.vue'], resolve), meta: { keepAlive: true } },
                {
                    path: 'four',
                    name: 'four',
                    redirect: 'four/winning',
                    component: resolve => require(['@/components/home/four.vue'], resolve),
                    meta: { keepAlive: true },
                    children: [
                        { path: 'winning', name: 'winning', component: winning, meta: { keepAlive: true } },
                        { path: 'profit', name: 'profit', component: profit, meta: { keepAlive: true } }
                    ]
                },
                { path: 'five', name: 'five', component: resolve => require(['@/components/home/five.vue'], resolve), meta: { keepAlive: true } },
            ]
        },
        { path: '/pop', name: 'pop', component: resolve => require(['@/components/page-four/pop.vue'], resolve), meta: { keepAlive: true } },
        { path: '/safety', name: 'safety', component: resolve => require(['@/components/page-five/safety.vue'], resolve), },
        { path: '/verifyPwd', name: 'verifyPwd', component: verifyPwd, meta: { keepAlive: true } },
        { path: '/setPwd', name: 'setPwd', component: setPwd, meta: { keepAlive: true } },
        { path: '/verifySafePwd', name: 'verifySafePwd', component: verifySafePwd, meta: { keepAlive: true } },
        { path: '/setSafePwd', name: 'setSafePwd', component: setSafePwd, meta: { keepAlive: true } },
        { path: '/resetWay', name: 'resetWay', component: resetWay, meta: { keepAlive: true } },
        { path: '/setQuestion', name: 'setQuestion', component: setQuestion, meta: { keepAlive: true } },
        { path: '/profits', name: 'profits', component: profits, meta: { keepAlive: true } },
        {
            path: '/mymsg',
            name: 'mymsg',
            redirect: 'mymsg/notice',
            component: mymsg,
            children: [
                { path: 'notice', name: 'notice', component: notice, meta: { keepAlive: true } },
                { path: 'letter', name: 'letter', component: letter, meta: { keepAlive: true } }
            ]
        }, {
            path: '/detail',
            name: 'detail',
            redirect: 'detail/datum',
            component: detail,
            meta: { keepAlive: true },
            children: [
                { path: 'datum', name: 'datum', component: datum, meta: { keepAlive: true } },
                { path: 'title', name: 'title', component: title, meta: { keepAlive: true } }
            ]
        },
        { path: '/agency', name: 'agency', component: agency, meta: { keepAlive: true } }
    ]
})