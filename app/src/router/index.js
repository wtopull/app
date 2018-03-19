import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import one from '@/components/home/one'
import second from '@/components/home/second'
import three from '@/components/home/three'
import four from '@/components/home/four'
import five from '@/components/home/five'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'home',
        redirect: 'one',
        component: home,
        children: [{
                path: 'one',
                name: 'one',
                component: one
            },
            {
                path: 'second',
                name: 'second',
                component: second
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
    }]
})