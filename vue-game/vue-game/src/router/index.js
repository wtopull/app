import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: (resolve) => {
        require(['@/components/Home'], resolve)
      }
    }, {
      path: '*',
      redirect: '/home'
    }
  ]
})
