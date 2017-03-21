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
import {Message} from 'element-ui'

export default{
    data(){
        return{
            task:{
                title:'测试通知',
                date:'2017-06-03',
                time:'10:00',
                address:'计算机学院10楼1001',
                content:'毕业设计答辩\n请勿迟到',
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
            var tvm = this;
            axios.post("/api/Task/createtask",tvm.task)
                .then(function(response){
                    Message.success("创建成功");
                    console.log(response);
                }).catch(function(msg){
                    Message.error("创建失败");
                    console.error(msg);
                })
        },
        getgroup(){
            var tvm = this;
            axios.get('/api/Group/groupList')
            .then(function(response){
                console.log(response);
                if(response.data.res === 'true'){
                    let gls = response.data.data;
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
