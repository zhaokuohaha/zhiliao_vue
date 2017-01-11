<template>
    <div class="text-center">
        <img src="../assets/logo.png" alt="">
        <h2>登录</h2>
        <mu-text-field v-model="username" hintText="用户名"/><br/>
        <mu-text-field v-model="password" hintText="密码"/><br/>
        <mu-raised-button class="gap-button" label="登录" icon="android" primary
            @click="dologin"/>
        
        <router-link to="/account/forgotpassword">找回密码</router-link>
    </div>
</template>

<script>
    import Axios from 'axios'

    export default{
        data(){
            return{
                username:'',
                password:'',
            }
        },
        methods: {
            dologin(){
                console.log(this.username+"="+this.password);
            }
        }
    }
</script>

<style lang="">
    .gap-button{
        margin: 30px;
    }
</style>