<template>
    <div>
        <div class="text-center">
            <h2>修改信息</h2>
            <component is="upload-avatar" :avatar="info.avatar"></component>
            <mu-text-field type="text" labelFloat label="名字" icon="edit"  v-model="info.nickname"></mu-text-field><br>
            <mu-text-field type="email" labelFloat label="电子邮箱" icon="email"  v-model="info.email"></mu-text-field><br>
            <mu-text-field type="text" labelFloat label="手机号" icon="phone"  v-model="info.phonenum"></mu-text-field><br>
            <mu-text-field type="text" multiLine  labelFloat label="个人简介" icon="assignment"  v-model="info.summary" :rowsMax="5"></mu-text-field><br>
            <mu-text-field type="password" labelFloat label="密码, 不填写表示不更改" icon="fingerprint"  v-model="password"></mu-text-field><br>
            <mu-text-field type="password" labelFloat label="确认密码" icon="fingerprint" v-model="repassword" :errorText='validpasswod'></mu-text-field><br>
            <mu-raised-button @click="saveInfo" icon="check" label="保存"></mu-raised-button>
        </div>
    </div>
</template>

<script>
    import UploadAvatar from '../Common/UploadAvatar'
    import axios from 'axios'
    import {Message} from 'element-ui'

    export default{
        data(){
            return{
                info:{
                    userid:'',nickname:'',summary:'',phonenum:'',email:'',avatar:'',
                },
                password:'',
                repassword:'',
            }
        },
        methods:{
            getInfo(){
                var tvm = this;
                axios.get('/api/User/getinfo')
                .then(function(response){
                    tvm.info = response.data.data;
                    console.log(response)
                }).catch(function(msg){
                    console.error(msg)
                });
            },
            saveInfo(){
                var tvm = this;
                if(tvm.repassword != tvm.password){
                    Message.warning("密码不一致!");
                    return;
                }
                tvm.info['password'] = tvm.password
                console.log(tvm.info);
                axios.post('api/User/updateinfo',tvm.info)
                .then(function(response){
                    Message.success("信息更新成功");
                    tvm.$store.commit('login',tvm.info);
                })

            }
        },
        computed: {
            validpasswod:function(){
                if(this.repassword == this.password)
                    return "";
                return "密码不一致";
            }
        },
        components:{
            'upload-avatar':UploadAvatar
        },
        mounted(){
            this.getInfo();
        }
    }
</script>