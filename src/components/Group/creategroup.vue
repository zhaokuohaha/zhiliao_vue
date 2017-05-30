<template>
    <div class="text-center">
        <div is="component-upload" 
        avatar="http://zhiliao-10068775.cos.myqcloud.com/group.png"
        isgroup groupid="new" 
        v-on:updateGroupid=SaveAvatarPath></div>
        <mu-text-field labelFloat v-model="group.name" label="群名称"/><br/>
        <mu-text-field labelFloat v-model="group.summary" label="群简介"/><br/>
        <mu-text-field labelFloat v-model="group.secKey" label="群口令"/><br/>
        <mu-raised-button primary @click="creategroup">创建</mu-flat-button>
    </div>
</template>

<script>
    import axios from 'axios'
    import uploadAvatar from '../Common/UploadAvatar'
    import {Message} from 'element-ui'

    export default {
        data () {
            return {
                group:{
                    avatar:'',
                    name:'',
                    summary:'', 
                    secKey:'',      
                }
            }
        },
        components: {
            'component-upload':uploadAvatar
        },
        methods: {
            creategroup(){
                let g = this.group;
                let tvm = this;
                axios.post('/api/Group/creategroup',g)
                    .then(function(response){
                        console.log(response.data.res);
                        if(response.data.res == 'true'){
                            Message.success('创建群成功！');
                            tvm.$router.push('/group/myGroup');
                        }else{
                            Message.error("创建失败，请先上传头像， 或检查表单是否含有非法字符");
                        }
                    })
                    .catch(function(msg){
                        console.error(msg);
                    })
            },
            SaveAvatarPath(avatar){
                console.log(avatar);
                this.group.avatar = avatar;
            }
        }
    }
</script>
