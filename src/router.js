import Vue from 'vue'
import VueRouter from 'vue-router'

// 自定义组件

import Home from './components/Home'
//Account
import Account from './components/Account/index'
import Login from './components/Account/login'
import Register from './components/Account/register'
import Info from './components/Account/info'

//Task
import TaskIndex from './components/Task/index'
import Tasklist from './components/Task/tasklist'
import CreateTask from './components/Task/createtask'
import SentTasks from './components/Task/senttask'

//Group
import GroupIndex from './components/Group/index'
import CreateGroup from './components/Group/creategroup'
import myGroup from './components/Group/mygroup'
import JoinGroup from './components/Group/joingroup'

//other
import usercard  from './components/Common/UserCard'

Vue.use(VueRouter)
//路由配置
const routes = [{
        path:'/',
        component:Home,
    },{
        path:'/home',
        component:Home,
    },{
        path:'/test',
        component:usercard
    },{
        path:'/account',
        component:Account,
        children:[{
            path:'login',
            component:Login,
        },{
            path:'register',
            component:Register
        },{
            path:'info',
            component:Info
        }]
    },{
        path: '/task',
        component: TaskIndex,
        children:[{
            path:'taskList',
            component:Tasklist,
        },{
            path:'create',
            component:CreateTask,
        },{
            path:'sentTasks',
            component:SentTasks
        }]
    },{
        path:'/group',
        component:GroupIndex,
        children:[{
            path:'createGroup',
            component:CreateGroup
        },{
            path:'myGroup',
            component:myGroup
        },{
            path:'joinGroup',
            component:JoinGroup
        }]
    }
];

export const router = new VueRouter({
  routes
});