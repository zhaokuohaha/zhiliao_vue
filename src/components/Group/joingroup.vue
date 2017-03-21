<template>
    <div>
        <div v-if="group.show">
            <div class="text-center">
                <img :src="group.imagepath" alt="群头像">
                <h2>{{group.groupName}}</h2>
                <p>群主: {{group.master}}</p>
                <p>简介: {{group.summary}}</p>
                <p>口令: {{group.secKey}}</p>
            </div>
        </div>
        <mu-raised-button  label="加入群"  icon="group_add" primary @click="showDialog"/>
        <mu-dialog :open="dialog" title="加入群" @close="closeDialog">
            <mu-text-field labelFloat icon="group" iconClass="zl-big-icon" v-model="group.groupName" label="群名称"/><br/>
            <mu-text-field labelFloat icon="vpn_key" iconClass="zl-big-icon" v-model="group.secKey" label="口令"/><br/>
            <mu-flat-button slot="actions" @click="closeDialog" primary label="取消"/>
            <mu-raised-button slot="actions" primary @click="joinGroup" label="加入"/>
        </mu-dialog>
        
    </div>
</template>

<script>
    import axios from 'axios'

    export default{
        data () {
            return {
                dialog: false,
                group:{
                    groupName:'测试群',
                    secKey:'1234',
                    summary:'测试测试测试',
                    master:'我自己',
                    imagepath:'http://zhiliao-10068775.cos.myqcloud.com/知了.png',
                    show:false,
                }
            }
        },
        mounted () {
            
        },
        methods:{
            showDialog(){
                this.dialog = true;
            },
            closeDialog(){
                this.dialog  = false;
            },
            joinGroup(){
                var _this = this;
                axios.post('/api/Group/joingroup',{
                    'groupName': _this.group.groupName,
                    'secKey': _this.group.secKey
                }).then(function(response){
                        if(response.data.res == 'true'){
                            let info = response.data.data;
                            console.info(info);
                           _this.group.summary = info.summary;
                           _this.group.master = info.master;
                           _this.group.imagepath = info.imagepath;
                           _this.group.show = true;
                        }
                        _this.dialog = false;
                    });
            },
        }
    }
</script>