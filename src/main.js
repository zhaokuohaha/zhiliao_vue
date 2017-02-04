import Vue from 'vue'
// 路由: vue-router
import VueRouter from 'vue-router'

// UI: muse-ui
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
//ajax : axios
import axios from 'axios'

// 自定义组件
import App from './App'
import Home from './components/Home'
import Account from './components/Account/index'
import Login from './components/Account/login'
import Register from './components/Account/register'

//状态管理: vuex 
import store from './store'

//本地存储: localStorage
import localStorage from './store/localStorage.js'

Vue.use(VueRouter)
Vue.use(MuseUI)

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
  children:[
    {
      path:'login',
      component:Login,
    },{
      path:'register',
      component:Register
    }
  ]
}];

const router = new VueRouter({
  routes
});


//axios配置
axios.defaults.baseURL='http://localhost:50521';
axios.defaults.headers.common['Authorization'] = store.state.jwtToken;



/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  store,
  ...App,
});