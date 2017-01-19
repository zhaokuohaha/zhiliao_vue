<template>
    <div class="wrapper">
        <mu-appbar title="Title">
        <mu-icon-button icon='menu' slot="left" @click="toggle(true)" />导航
            <mu-drawer :open="open" :docked="docked" @close="toggle()">
              <div class="userinfomation" v-if="this.$store.state.islogin">
                  <mu-card>
                    <mu-card-media>
                      <div class="save-avatar" @click="open"></div>
                      <img  :src="avater" class="avatarImage">
                    <mu-card-title :title="username" :subTitle="summary" />
                    </mu-card-media>
                    <mu-card-actions class="text-center">
                      <router-link to="/userinfo">个人信息</router-link>
                      <mu-flat-button label="退出登录" @click="logoff"/>
                    </mu-card-actions>
                  </mu-card>
              </div>
              <div v-else>
                <mu-card-media>
                  <img src="./assets/logo.png" alt="">
                </mu-card-media>
                <div class="text-center">
                  <router-link to="/account/login"><mu-raised-button label="登录" class="demo-raised-button" primary/></router-link>
                  <router-link to="/account/register"><mu-raised-button label="注册" class="demo-raised-button"/></router-link>
                </div>
              </div>
              <div is="component-upload"></div>
              <mu-list>
                <mu-list-item>菜单2</mu-list-item>
                <mu-list-item>菜单3</mu-list-item>
              </mu-list> 
            </mu-drawer>
          </mu-icon-button>
      </mu-appbar>
      <router-view></router-view>
    </div>
</template>

<script>
import uploadAvatar from './components/Common/UploadAvatar'

export default{
    data(){
      return{
        username:'zhaokuo',
        summary:'知了应用开发者',
        open: false,
        docked:true,
        avater:'http://cttf-10068775.cos.myqcloud.com/QQ%E6%88%AA%E5%9B%BE20161221144932.png',
      }
    },
    methods: {
      toggle(flag){
        this.open = !this.open
        this.docked = !flag
      },
      logoff(){
        console.log("logoff");
      }
    },
    components:{
      'component-upload':uploadAvatar,
    }
  }
</script>

<style>
  .avatarImage{
    padding: 10px;
    height: 200px;
    border-radius: 50%;
  }

  .text-center{
    text-align: center;
  }

  .save-avatar{
    position: fixed;
    width: 100%;
    text-align: center;
    height: 200px;
    line-height: 200px;
  }
  .save-avatar:hover{
    cursor: pointer;
    background: rgba(33, 33, 33, .5);    
    background-repeat: no-repeat;
    background-image: url(./assets/相机.png);
    background-position: center;
  }
</style>