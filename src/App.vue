<template>
  <div class="wrapper">
    <mu-appbar title="Title">
      <mu-icon-button icon='menu' slot="left" @click="toggle(true)" /></mu-icon-button>
      <mu-icon-button icon='home' slot="left" @click="toHome"></mu-icon-button>
      
      <mu-drawer :open="open" :docked="docked" @close="toggle()" >
        <div class="userinfomation" v-if="this.$store.state.islogin">
          <mu-card>
            <mu-card-media>
              <div is="component-upload" :avatar="avatar"></div>
              <mu-card-title :title="username" :subTitle="summary" />
            </mu-card-media>
            <mu-card-actions class="text-center">
              <router-link to="/account/info">个人信息</router-link>
              <mu-flat-button label="退出登录" @click="logoff" />
            </mu-card-actions>
          </mu-card>
        </div>
        <div v-else>
          <mu-card-media>
            <img src="./assets/logo.png" alt="">
          </mu-card-media>
          <div class="text-center">
            <router-link to="/account/login">
              <mu-raised-button label="登录" class="demo-raised-button" primary/>
            </router-link>
            <router-link to="/account/register">
              <mu-raised-button label="注册" class="demo-raised-button" />
            </router-link>
          </div>
        </div>
        <mu-list>
          <mu-list-item   title="通知管理" toggleNested>
            <mu-list-item slot="nested" title="所有通知" href="#/task/taskList"></mu-list-item>            
            <mu-list-item slot="nested" title="新建通知" href="#/task/create"></mu-list-item>
            <mu-list-item slot="nested" title="已发送通知" href="#/task/sentTasks"></mu-list-item>
          </mu-list-item>
          <mu-list-item title="群管理" toggleNested>
            <mu-list-item slot="nested" title="我的群" href="#/group/myGroup"></mu-list-item>
            <mu-list-item slot="nested" title="创建群" href="#/group/createGroup"></mu-list-item>
          </mu-list-item>
        </mu-list>
      </mu-drawer>
    </mu-appbar>
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="footer">
      <hr> 版权所有 &copy www.zhaokuo.cc
    </div>
  </div>
</template>

<script>
  import uploadAvatar from './components/Common/UploadAvatar'
  import { mapState } from 'vuex'
  import localStorage from './store/localStorage.js'
  import {Message} from 'element-ui'
  import axios from 'axios'

  export default {
    data() {
      return {
        open: false,
        docked: true,
      }
    },
    methods: {
      toggle(flag) {
        this.open = !this.open
        this.docked = !flag
      },
      logoff() {
        this.$store.commit('logoff');
        console.log("logoff");
      },
      toHome(){
        this._router.push('/');
      }
    },
    components: {
      'component-upload': uploadAvatar
    },
    computed: mapState({
        avatar:state => state.avatar,
        username: state => state.nickname,
        summary: state => state.subTitle,
    }),
    beforeCreate(){
      let tvm = this;
      let token = localStorage.fetch('token')
      if(token){
        //刷新权限
        tvm.$store.commit('updateToken',token);
        axios.get('/api/account/refreshauth')
        .then(function(res){
              tvm.$store.commit('updateToken',res.data.access_token);
              tvm.$store.commit('login',res.data);
          }).catch(function(msg){
              Message.warning("帐号已失效, 请重新登录!");
              tvm.$router.push('/account/login');
          });
      }else{
        Message("请登录");
        tvm.$router.push('/account/login');
      }
    }
  }
</script>

<style>
  a{
    font-size: 18px;
    color: #00acc1;
  }
  .text-center{
    text-align: center;
  }
  .footer{
    text-align:center;
    margin: 15px;
  }
  .footer-hr{
    width: 300px;
  }
  .zl-big-icon{
    font-size: 36px;
  }

  .content{
    margin: 10px 80px;
  }
</style>