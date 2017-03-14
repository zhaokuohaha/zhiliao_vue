<template>  
    <div>
        <h2>已发送的通知</h2>
        <div v-if="tasks.length <= 0" class="text-center">
            <mu-icon value="warning" :size=80 color="orange"></mu-icon> 
            <h1>没有已发送的通知 !</h1>
        </div>
        <div v-else >
            <mu-row gutter>
                <mu-col width="100" tablet="50" desktop="33">
                     <mu-list-item v-for="item in tasks" :title="item.task.title" :describeText="item.task.group" @click="getSentDetail(item.task.id)">
                        <mu-avatar :src="item.task.avatar" slot="leftAvatar"></mu-avatar>
                        <span style="position:absolute; right:10px;bottom:15px;">
                            <mu-avatar :backgroundColor="readClass(item) ? 'greenA400' : 'red600'">{{item.readedcount}}/{{item.taskcount}}</mu-avatar>已回复
                        </span>
                    </mu-list-item>
                </mu-col>
            </mu-row>
           
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {Message} from 'element-ui'

    export default {
        data(){
            return{
                tasks:[]
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
            getSentDetail(taskid){
                axios.post('/api/Task/sentdetail',{value:taskid})
                .then(function(response){
                    console.log(response)
                    Message.success("查看用户列表成功")
                }).catch(function(msg){
                    console.error(msg);
                })
            }
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