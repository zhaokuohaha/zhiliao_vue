import Vue from 'vue'
// 路由: vue-router
import {router} from './router'
// UI: muse-ui
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import App from './App'
//状态管理: vuex 
import store from './store'
//本地存储: localStorage
import localStorage from './store/localStorage.js'
//ui: muse-ui
Vue.use(MuseUI)
//ajax : axios
import axios from 'axios'
//axios配置
axios.defaults.baseURL='http://localhost:50521';
// axios.defaults.baseURL='http://zhiliao.server.yyonghua.com';



/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  store,
  ...App,
});