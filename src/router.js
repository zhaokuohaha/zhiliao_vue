import Vue from 'vue'
import VueRouter from 'vue-router'

// 自定义组件

import Home from './components/Home'
import Account from './components/Account/index'
import Login from './components/Account/login'
import Register from './components/Account/register'
import Tasklist from './components/Task/tasklist'

Vue.use(VueRouter)
//路由配置
const routes = [{
        path:'/',
        component:Home,
    },{
        path:'/home',
        component:Home,
    },{
        path:'/account',
        component:Account,
        children:[{
            path:'login',
            component:Login,
        },{
            path:'register',
            component:Register
        }]
    },{
        path: '/tasklist',
        component: Tasklist,
    }];

export const router = new VueRouter({
  routes
});