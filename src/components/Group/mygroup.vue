<template>
    <div>
        <mu-flexbox>
            <mu-flexbox-item>
                <h1>我的群列表</h1>
                 <mu-list>
                    <mu-sub-header>我创建的群</mu-sub-header>
                    <mu-list-item 
                        v-for="(item,index) in groups" 
                        v-if="item.ismine" 
                        :title="item.name"
                        @click = "showUsers(item.groupid)">
                        <mu-avatar :src="item.imagepath" slot="leftAvatar"/>
                        <span slot="describe">简介: {{item.summary}} <br>人数: {{item.usercount}}</span>
                        <mu-icon-button tooltip="删除群" iconClass="zl-delete-icon" slot="right" icon="delete" @click="deleteGroup(item,index)"/>
                    </mu-list-item>

                    <mu-divider inset/>

                    <mu-sub-header>我加入的群</mu-sub-header>
                    <mu-list-item 
                        v-for="(item,index) in groups" 
                        v-if="!item.ismine" 
                        :title="item.name"
                        disabled>
                        <mu-avatar :src="item.imagepath" slot="leftAvatar"/>
                        <span slot="describe">
                            群主: {{item.master}} <br>
                            简介: {{item.summary}}
                        </span>
                    </mu-list-item>
                </mu-list>
                <join-group></join-group>
            </mu-flexbox-item>

            <mu-flexbox-item>
                    <user-card v-for="user in users" :user="user"></user-card>
            </mu-flexbox-item>
        </mu-flexbox>

        <!--弹出框-->
        <mu-dialog :open="dialog" :title="curGroup.name">
            <h2>
                <mu-icon value='error_outline' color="red"></mu-icon> 确定删除 "{{curGroup.name}}" ?
                <mu-divider />
            </h2>
            删除后, 与群相关的通知信息, 群组织信息将被删除, <br>
            点击 <span style="color:#03A9F4;font-size:24px;">确定</span> 确认删除
            <mu-flat-button label="取消" slot="actions" primary @click="closeDialog"/>
            <mu-flat-button label="确定" slot="actions" primary @click="doDeleteGroup"/>            
        </mu-dialog>
    </div>
</template>

<script>
    import axios from 'axios'
    import UserCard from '../Common/UserCard'
    import JoinGroup from './joingroup'
    import {Message} from 'element-ui'
    export default {
        data () {
            return {
                dialog:false,
                groups:[],
                users:[],
                curGroup:{name:''}
            }
        },
        methods:{
            getGroups(){
                var _this = this;
                axios.get('/api/Group/groupList')
                    .then(function(response){
                        if(response.data.res === 'true')
                            _this.groups = response.data.data;
                        console.log(response);
                    }).catch(function(msg){
                        console.error(msg);
                    })
            },
            showUsers(groupid){
                let tvm = this;
                axios.get("/api/Group/getuserlist/"+groupid)
                .then(function(response){
                    tvm.users = response.data.data;
                });
            },
            deleteGroup(item,index){
                this.curGroup = item;
                this.curGroup["index"]=index;
                this.dialog=true;
                stopPropagation();
            },
            closeDialog(){this.dialog=false},
            doDeleteGroup(){
                let tvm = this;
                axios.post('/api/Group/deletegroup/'+tvm.curGroup.groupid)
                .then(function(response){
                    tvm.groups.splice(tvm.curGroup.index,1);
                    tvm.curGroup = {name:''};
                    tvm.dialog=false;
                    Message("删除成功");
                });
            }
        },
        components:{
            'user-card':UserCard,
            'join-group':JoinGroup
        },
        mounted () {
            this.getGroups();
        }
    }

     function stopPropagation(e) {  
            e = e || window.event;  
            if(e.stopPropagation) { //W3C阻止冒泡方法  
                e.stopPropagation();  
            } else {  
                e.cancelBubble = true; //IE阻止冒泡方法  
            }  
        }
</script>

<style>
.zl-delete-icon{
    color: red;
    font-size: 42px;
    margin-right: 35px;
}


</style>
