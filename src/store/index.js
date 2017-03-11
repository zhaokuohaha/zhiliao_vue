import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'



Vue.use(Vuex);

const state =  {
    islogin:false,
    jwtToken:'hello token',
    userid:'userid',
    avatar:'http://zhiliao-10068775.cos.myqcloud.com/user.png',
    nickname:'请登录',
    summary:'知了不是来自知乎,知了就是知了'
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
});