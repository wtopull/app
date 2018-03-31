import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import one from '@/components/home/one'
import second from '@/components/home/second'
import three from '@/components/home/three'
import four from '@/components/home/four'
import five from '@/components/home/five'
import login from '@/components/login/login'
import registered from '@/components/login/registered'
import reset from '@/components/login/reset'
import lotto from '@/components/games/lotto'
import reality from '@/components/games/reality'
import electronic from '@/components/games/electronic'
import sports from '@/components/games/sports'
import winning from '@/components/four-page/winning'
import profit from '@/components/four-page/profit'
import pop from '@/components/four-page/pop'
Vue.use(Router)
export default new Router({
  routes: [
	  {
	    path: "/login",
	    name: 'login',
	    component: login
	  }, 
	  {
	    path: '/',
	    name: 'home',
	    redirect: 'one',
	    component: home,
	    meta: {
	      requiresAuth: true
	    },
	    children: [
	    {
	      path: 'one',
	      name: 'one',
	      component: one
	    }, 
	    {
	      path: 'second',
	      name: 'second',
	      redirect: 'second/lotto',
	      component: second,
	      children: [
		      {
		        path: 'lotto',
		        name: 'lotto',
		        component: lotto
		      }, 
		      {
		        path: 'reality',
		        name: 'reality',
		        component: reality
		      }, 
		      {
		        path: 'electronic',
		        name: 'electronic',
		        component: electronic
		      }, 
		      {
		        path: 'sports',
		        name: 'sports',
		        component: sports
		      }
	     	]
	    }, 
	    {
	      path: 'three',
	      name: 'three',
	      component: three
	    }, 
	    {
	      path: 'four',
	      name: 'four',
	      redirect: 'four/winning',
	      component: four,
	      children: [
		      {
		        path: 'winning',
		        name: 'winning',
		        component: winning
		      }, 
		      {
		        path: 'profit',
		        name: 'profit',
		        component: profit
		      } 
	      ]
	    }, 
	    {
	      path: 'five',
	      name: 'five',
	      component: five
	    } 
	    ]
	  },
	  {
	  	path: '/pop',
	  	name: 'pop',
	  	component: pop
	  }
  ]
})