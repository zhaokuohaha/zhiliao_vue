<template>
    <div class="text-center">
        <h1>注册</h1>
        <mu-text-field type="email" labelFloat label="电子邮箱" icon="email"  v-model="email"></mu-text-field><br>
        <mu-text-field type="password" labelFloat label="密码" icon="fingerprint"  v-model="password"></mu-text-field><br>
        <mu-text-field type="password" labelFloat label="确认密码" icon="fingerprint" v-model="repassword" :errorText='validpasswod'></mu-text-field><br>
        <mu-text-field type="text" labelFloat label="手机号, 用于发送短信" icon="phone"  v-model="phone"></mu-text-field><br>
        <mu-text-field type="text" labelFloat label="名字" icon="edit"  v-model="nickname"></mu-text-field><br>
        <mu-text-field type="text" multiLine  labelFloat label="个人简介" icon="assignment"  v-model="summary" :rowsMax="5"></mu-text-field><br>
        <mu-raised-button @click="register" label="注册" primary></mu-raised-button>
        <mu-raised-button @click="resetForm" label="重置"></mu-raised-button>
    </div>
</template>

<script>
    import axios from 'axios'

    export default{
        data(){
            return {
                email:'',
                password:'',
                repassword:'',
                phone:'',
                nickname:'',
                summary:'',
            }
        },
        computed: {
            validpasswod:function(){
                if(this.repassword == this.password)
                    return "";
                return "密码不一致";
            }
        },
        methods:{
            resetForm(){
                this.email = this.password = this.phone = this.nickname = this.summary = '';
            },
            register(){
                var regform = this;
                axios.post('/api/account/register',{
                    email:regform.email,
                    password:regform.password,
                    phone:regform.phone,
                    nickname:regform.nickname,
                    summary:regform.summary
                }).then(function(res){
                    regform.$store.commit('updateToken',res.data.access_token);
                    regform.$store.commit('login',res.data);
                    regform.$router.push('/task/taskList');
                }).catch(function(message){
                    console.warn('register error');
                    console.warn(message);
                })
            }
        }
    }
</script>
