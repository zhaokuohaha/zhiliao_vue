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

    export default {
        data () {
            return {
                group:{
                    avatar:'',
                    name:'测试群',
                    summary:'用于测试通知的群', 
                    secKey:'1234',      
                }
            }
        },
        components: {
            'component-upload':uploadAvatar
        },
        methods: {
            creategroup(){
                var g = this.group;
                axios.post('/api/Group/greategroup',g)
                    .then(function(response){
                        console.log(response);
                        
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
