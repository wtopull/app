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

Vue.use(Router)

export default new Router({
    routes: [{
            path: "/login",
            name: 'login',
            component: login
        },
        {
            path: '/',
            name: 'home',
            redirect: 'one',
            component: home,
            meta: { requiresAuth: true },
            children: [{
                    path: 'one',
                    name: 'one',
                    component: one
                },
                {
                    path: 'second',
                    name: 'second',
                    redirect: 'second/lotto',
                    component: second,
                    children: [{
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
                    component: four
                },
                {
                    path: 'five',
                    name: 'five',
                    component: five
                }
            ]
        }
    ]
})