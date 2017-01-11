import Vue from 'vue'
// 路由: vue-router
import VueRouter from 'vue-router'
// 状态管理: vuex
import Vuex from 'vuex'
// UI: muse-ui
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
// 自定义组件
import App from './App'
import Home from './components/Home'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(MuseUI)

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

const store = new Vuex.Store({
  state: {
    islogin:false,
  },
  mutations: {
    login(){
      state.islogin = true;
    }
  }
})


/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  store,
  ...App,
});