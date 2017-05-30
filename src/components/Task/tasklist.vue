<template>
    <div class="tasklist">
        <h2>通知列表</h2>
        <mu-list>
            <div v-for="(item,index) in tasks"  @click="showDetail(item)"
                :class="['task-list',item.state ? 'task-readed' : 'task-notread']">
                <mu-list-item :title="item.group" disabled>
                    <mu-avatar :src="item.avatar" slot="leftAvatar"/>
                </mu-list-item>
                <p>
                    <h3>{{item.title}}</h3>
                    {{item.content}}
                </p>
            </div>
        </mu-list>
        <div style="text-align:right; margin:10px 30px 10px 0;">
            <mu-float-button slot="right" icon="refresh"  @click="getTasks" />
        </div>
        <mu-dialog :open="dialog" @close="hideDetail">
            <mu-list>
                <mu-list-item :title=activetask.group disabled>
                    <mu-avatar slot="left" :size="42" :src="activetask.avatar" />
                </mu-list-item>
            </mu-list>
             <mu-card-title :title="activetask.title"/>
             <p><mu-icon value="access_time" color="greenA200"></mu-icon>  {{activetask.time}}</p>
             <p><mu-icon value="location_on" color="greenA200"></mu-icon>  {{activetask.address}}</p>
             {{activetask.content}}
            <mu-flat-button slot="actions" v-if="activetask.state==false" icon="check" color="greenA400" @click="setRead(activetask)" label="标记已读" />
            <mu-flat-button slot="actions" @click="hideDetail" label="取消"/>
        </mu-dialog>
    </div>
</template>

<script>
    import axios from 'axios';
    import {Message} from 'element-ui'

    export default {
        data () {
            return {
                dialog:false,
                activetask:'',
                tasks:[]
            }
        },
        mounted () {
            //console.log("参考官方文档: 实例 - 生命周期");
            this.getTasks();
        },
        methods: {
            getTasks(){
                var tvm = this;
                axios.get('/api/Task/tasklist').then(function(res){
                    if(res.data.res == 'true'){
                        tvm.tasks = res.data.data;
                        Message.success("请求通知列表成功");
                    }
                }).catch(function(response){
                    Message.error("请求通知列表失败, 请重试");
                    console.error(response);    
                })
            },
            setRead(item){
                let tvm = this;
                axios.post('/api/Task/setreaded',{value:item.id}).then(function(res){
                    Message.info("设置已读成功");
                    item.state = true;
                    tvm.hideDetail();
                }).catch(function(error){
                    Message.error("设置已读失败");
                })
            },
            showDetail(task){
                this.activetask = task;
                console.log(task);
                this.dialog = true;
            },
            hideDetail(){
                this.dialog = false;
            }
        }
    };
</script>

<style>
    .task-list{
        cursor: pointer;
        padding: 15px;
    }

    .task-readed{
        background-color: #e8f5e9;
    }
    .task-readed:hover{
        background-color: #c8e6c9;
    }
    .task-notread{
        background-color: #ffebee;        
    }
    .task-notread:hover{
        background-color: #ffcdd2;        
    }
</style>