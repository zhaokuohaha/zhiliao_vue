<template>
    <div class="text-center">
        <img src="../assets/logo.png" alt="">
        <h2>登录</h2>
        <mu-text-field v-model="useremail" hintText="邮箱"/><br/>
        <mu-text-field v-model="password" hintText="密码"/><br/>
        <mu-raised-button class="gap-button" label="登录" icon="android" primary
            @click="dologin"/>
        <mu-raised-button @click="testaxios">axios测试</mu-raised-button>
        <router-link to="/account/forgotpassword">找回密码</router-link>
    </div>
</template>

<script>
    import axios from 'axios'


    export default{
        data(){
            return{
                useremail:'1014336691@qq.com',
                password:'123qwe',
            }
        },
        methods: {
            dologin(){
                var udata = this;
                console.log(udata.useremail+"="+udata.password);
               axios.post('/api/account/login',{
                        "email":udata.useremail,
                        "password":udata.password
                }).then(function(res){
                    console.log(res.data.access_token);
                    udata.$store.commit('updateToken',res.data.access_token);
                    udata.$store.commit('login');
                });
            },

            testaxios(){
                console.log("axiostest");
                axios.get('http://ip.taobao.com//service/getIpInfo.php?ip=49.52.99.27')
                .then(function(res){
                    console.info(res);
                }).catch(function(err){
                    console.error(err);
                })
            }
        }
    }
</script>

<style lang="">
    .gap-button{
        margin: 30px;
    }
</style>