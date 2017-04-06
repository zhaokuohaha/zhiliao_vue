<template>
    <div class="tasklist">
        <h2>通知列表</h2>
        <mu-list>
            <mu-list-item v-for="(item,index) in tasks" :title="item.group">
                 <mu-avatar :src="item.avatar" slot="leftAvatar"/>
                 <span slot="describe">
                    <mu-icon v-if="item.state"  color="greenA400" value="check_circle"></mu-icon>
                    <mu-icon v-else color="red" value="cancel"></mu-icon>
                 </span>
                <p>
                    <h2>{{item.title}}</h2>
                    {{item.content}}
                </p>
                <mu-flat-button icon="search" primary @click="showDetail(item)">查看</mu-flat-button>
                <mu-flat-button v-if="item.state==false" icon="check" color="greenA400" @click="setRead(item)">标记已读</mu-flat-button>
            </mu-list-item>
        </mu-list>
        <div class="text-right">
            <mu-float-button icon="refresh"  @click="getTasks" />
        </div>
        <mu-dialog :open="dialog" @close="hideDetail">
            <mu-list>
                <mu-list-item :title=activetask.group disabled>
                    <mu-avatar slot="left" :size="42" :src="activetask.avatar" />
                </mu-list-item>
            </mu-list>
             <mu-card-title :title="activetask.title"/>
             <p><mu-icon value="access_time"></mu-icon>  {{activetask.time}}</p>
             <p><mu-icon value="location_on"></mu-icon>  {{activetask.address}}</p>
             {{activetask.content}}
            <mu-flat-button slot="actions" primary @click="hideDetail" label="确定"/>
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
                axios.post('/api/Task/setreaded',{value:item.id}).then(function(res){
                    Message.info("设置已读成功");
                    item.state = true;
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