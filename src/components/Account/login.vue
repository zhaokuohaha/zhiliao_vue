<template>
    <div class="text-center">
        <h2>登录</h2>
        <mu-text-field labelFloat v-model="useremail" label="邮箱"/><br/>
        <mu-text-field labelFloat v-model="password" label="密码"/><br/>
        <mu-raised-button class="gap-button" label="登录" icon="android" primary
            @click="dologin"/>
        <!--router-link to="/account/forgotpassword">找回密码</router-link-->
        <div class="loding" v-show="loding_show">
            <mu-circular-progress :size="100" :strokeWidth="5" style="top:45%"/>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {MessageBox} from 'element-ui'

    export default{
        data(){
            return{
                useremail:'1014336691@qq.com',
                password:'123qwe',
                loding_show:false
            }
        },
        methods: {
            dologin(){
                var tvm = this;
                tvm.loding_show = true;
               axios.post('/api/account/login',{
                        "email":tvm.useremail,
                        "password":tvm.password
                }).then(function(res){
                    console.log(res.data);
                    //更新状态信息
                    tvm.$store.commit('updateToken',res.data.access_token);
                    tvm.$store.commit('login',res.data);
                    tvm.loding_show = false;
                    tvm.$router.push('/task/taskList');
                }).catch(function(msg){
                    tvm.loding_show = false;                    
                    MessageBox.alert("登录失败， 请检查用户名密码或者联系管理员反馈");
                });
            },
        }  
    }
</script>

<style>
    .gap-button{
        margin: 30px;
    }

    .loding{
        background-color: rgba(0,0,0,.3);
        position:fixed;
        width:100%;
        text-align: center;
        height:100%;
        left:0;
        top:0px;
        vertical-align:middle;
    }
</style>