import Vue from 'vue'
import VueRouter from 'vue-router'

// 自定义组件

import Home from './components/Home'
//Account
import Account from './components/Account/index'
import Login from './components/Account/login'
import Register from './components/Account/register'

//Task
import TaskIndex from './components/Task/index'
import Tasklist from './components/Task/tasklist'

//Group
import GroupIndex from './components/Group/index'
import CreateGroup from './components/Group/creategroup'


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
        path: '/task',
        component: TaskIndex,
        children:[{
            path:'taskList',
            component:Tasklist,
        }]
    },{
        path:'/group',
        component:GroupIndex,
        children:[{
            path:'createGroup',
            component:CreateGroup
        }]
    }
];

export const router = new VueRouter({
  routes
});