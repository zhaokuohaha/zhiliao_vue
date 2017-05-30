<template>
    <div class="text-center">
        <h2>编辑通知</h2>
        <mu-text-field labelFloat v-model="task.title" label="标题" :maxLength="10" @textOverflow="handleInputOverflow"></mu-text-field><br>
        <mu-date-picker  labelFloat v-model="task.date"  label="日期"></mu-date-picker><br>
        <mu-time-picker labelFloat format="24hr" v-model="task.time" label="时间"></mu-time-picker><br>
        <mu-text-field labelFloat v-model="task.address" label="地址" :maxLength="12"></mu-text-field><br>
        <mu-text-field labelFloat v-model="task.content" label="通知内容" multiLine ></mu-text-field><br>
        <mu-select-field labelFloat v-model="task.group" label="发送的群" multiple><br>
            <mu-menu-item v-for="item in mygroups" :value="item.groupid" :title="item.name"></mu-menu-item>
        </mu-select-field>
        <mu-icon-button @click="getgroup" icon="refresh"/><br>
        <mu-switch labelLeft v-model="task.isemail" label="邮件通知"></mu-switch>&emsp;&emsp;&emsp;&emsp;
        <mu-switch labelLeft v-model="task.issms" label="短信通知"></mu-switch><br><br><br>
        <mu-raised-button @click="sendTask" primary class="ct-btn-block" icon="send" label="发送"></mu-raised-button>
    </div>
</template>

<script>
import axios from 'axios'
import {Message,Loading} from 'element-ui'

export default{
    data(){
        return{
            task:{
                title:'',
                date:'',
                time:'',
                address:'',
                content:'',
                isemail:true,
                issms:false,
                group:[],
            },
            mygroups:[],
        }
    },
    methods:{
        handleInputOverflow (isOverflow) {
            if(isOverflow){
                this.task.title = this.task.title.substring(0,10);
            }
        },
        sendTask(){
            let tvm = this;
            let loading = Loading.service({fullscreen:'true', text:'正在发送...'});
            axios.post("/api/Task/createtask",tvm.task)
                .then(function(response){
                    loading.close();
                    if(response.data.res == "true"){
                        Message.success("通知发送成功");
                        tvm.$router.push('/task/sentTasks');
                    }
                    else
                        Message.error("通知发送失败："+response.data.data);
                }).catch(function(msg){
                    Message.error("操作失败，发生异常！");
                    loading.close();                    
                    console.error(msg);
                })
        },
        getgroup(){
            let tvm = this;
            axios.get('/api/Group/groupList')
            .then(function(response){
                console.log(response);
                if(response.data.res === 'true'){
                    let gls = response.data.data;
                    tvm.mygroups=[];
                    for(let item of gls){
                        if(item.ismine)              //只能发送给我创建的群
                            tvm.mygroups.push(item);
                    }
                }
                    
                else
                    Message.warning("请求数据失败")
            }).catch(function(msg){
                console.error(msg)
            })
        }
    },
    mounted(){
        this.getgroup();
    }
}
    
</script>

<style>
.ct-btn-block{
    width:50%;
    margin:50px;
    font-size:1.6em;
}
</style>
