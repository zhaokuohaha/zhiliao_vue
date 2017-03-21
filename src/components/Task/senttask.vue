<template>  
    <div>
        <h2>已发送的通知</h2>
        <div v-if="tasks.length <= 0" class="text-center">
            <mu-icon value="warning" :size=80 color="orange"></mu-icon> 
            <h1>没有已发送的通知 !</h1>
        </div>
        <div v-else style="mragin: 0 50px;">
            <mu-row gutter>
                <mu-col width="100" tablet="50" desktop="35">
                     <mu-list-item v-for="item in tasks" :title="item.task.title" :describeText="item.task.group" @click="getSentDetail(item)">
                        <mu-avatar :src="item.task.avatar" slot="leftAvatar"></mu-avatar>
                        <span style="position:absolute; right:10px;bottom:15px;">
                            <mu-avatar :backgroundColor="readClass(item) ? 'greenA400' : 'red600'">{{item.readedcount}}/{{item.taskcount}}</mu-avatar>已回复
                        </span>
                    </mu-list-item>
                </mu-col>
                <mu-col width="100" tablet="50" desktop="60">
                    <template v-if="activeTask != null">
                        <mu-card>
                            <mu-list-item disabled :title="activeTask.task.group">
                                <mu-avatar slot="left" :src="activeTask.task.avatar"></mu-avatar>
                            </mu-list-item>
                            <mu-card-title :title="activeTask.task.title"></mu-card-title>
                            <mu-card-text>
                                <mu-icon color="tealA700" value="access_time"></mu-icon> {{activeTask.task.time}} &emsp;&emsp;&emsp;
                                <mu-icon color="tealA700" value="location_on"></mu-icon> {{activeTask.task.address}}<br>
                                <p>
                                    {{activeTask.task.content}}
                                </p>
                            </mu-card-text>
                        </mu-card>
                        <mu-row>
                            <div class="text-center">
                                <mu-circular-progress :size="90" v-show="userlistshow"/>
                            </div>
                            <mu-col v-show="!userlistshow" desktop="100">
                                <user-card v-for="item in userlist" :user="item"></user-card>
                            </mu-col>
                        </mu-row>
                        <mu-col v-show="userlist.length>0" desktop="100" class="text-center">
                            <mu-list-item @click="sendWranSms">
                                <mu-icon color="red600" :size="48" value="textsms"></mu-icon>
                                <span style="font-size:30px; margin-left:20px;">发 送 短 信 提 醒</span>
                            </mu-list-item>
                        </mu-col>
                    </template>
                </mu-col>
            </mu-row>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {Message,Notification} from 'element-ui'
    import UserCard from '../Common/UserCard'
    export default {
        data(){
            return{
                tasks:[],
                activeTask:null,
                userlistshow:false,
                userlist:[],
            }
        },
        methods:{
            getSentTask(){
                let tvm = this;
                axios.get('/api/Task/senttask')
                .then(function(response){
                    console.log(response.data.data);
                    tvm.tasks = response.data.data;
                    Message.success("请求成功");
                }).catch(function(msg){
                    console.error(msg);
                    Message.error("请求失败");
                })
            },
            readClass: function (item) {
                return item.readedcount >= item.taskcount;// ? 'allread' : 'partread';
            },
            getSentDetail(item){
                let taskid = item.task.id;
                let tvm = this;
                tvm.userlistshow = true;
                tvm.activeTask = item;
                axios.post('/api/Task/sentdetail',{value:taskid})
                .then(function(response){
                    console.log(response)
                    tvm.userlist = response.data.data;
                    Message.success("查看用户列表成功")
                tvm.userlistshow = false;                    
                }).catch(function(msg){
                    console.error(msg);
                })
            },
            sendWranSms(){
                let num = [];
                for(let item of this.userlist)
                    num.push(item.phonenum);
                axios.post("/api/Task/smsremind",{num:num})
                .then(function(response){
                    console.log(response.data);
                    Notification.success("提醒成功");
                }).catch(function(msg){
                    conscole.log(num);
                    Notification.error("提醒失败");
                });
            }
        },
        components:{
            'user-card':UserCard
        },
        mounted(){
            this.getSentTask();
        }
    }
</script>

<style>
.allread{
    color:greenA400
}

.partread{
    color:red600
}
</style>