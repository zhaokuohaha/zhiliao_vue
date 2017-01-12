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

//状态管理: vuex 
import store from './store'

Vue.use(VueRouter)
Vue.use(MuseUI)

//路由配置
const routes = [{
  path:'/',
  component:Home,
},{
  path:'/home',
  component:Home,
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