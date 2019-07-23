import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import First from '@/components/First'
import Manager from '@/components/Manager'
import ShowClass from '@/components/ShowClass'
import GenClass from '@/components/GenClass'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },

        {
            path: '/',
            name: 'Home',
            component: First,
            //1、

            // children: [

            // ]
        },
        {
            path: '/Manager',
            name: 'Manager',
            component: Manager,
            //1、

            // children: [

            // ]
        },
        {
            path: '/ShowClass',
            name: 'ShowClass',
            component: ShowClass,
            //1、

            // children: [

            // ]
        },
        {
            path: '/GenClass',
            name: 'GenClass',
            component: GenClass,
            //1、

            // children: [

            // ]
        },



    ],
    linkActiveClass: "active-router",
    linkExactActiveClass: "exact-router"
})