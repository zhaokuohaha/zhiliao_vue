<template>
    <div class="tasklist">
        <h1>任务列表<mu-icon-button icon="refresh" size="48" @click="getTasks"></mu-icon-button></h1>
        <mu-list>
            <mu-list-item v-for="(item,index) in tasks" :title="item.owner">
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
        <mu-dialog :open="dialog" @close="hideDetail">
            <mu-list>
                <mu-list-item :title=activetask.owner disabled>
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

    export default {
        data () {
            return {
                dialog:false,
                activetask:'',
                tasks:[{
                    id:'1',
                    state:false,
                    title: '重要通知',
                    time:'2017-2-16',
                    address:'静安寺中欣大厦',
                    content:'2月16日上午9:30请准时到公司报道',
                    owner: '国双科技公司人力资源部',
                    avatar: 'http://zhiliao-10068775.cos.myqcloud.com/logo.png'
                },{
                    id:'1',
                    state:true,
                    title: '重要通知',
                    time:'2017-2-16',
                    address:'静安寺中欣大厦',
                    content:'2月16日上午9:30请准时到公司报道',
                    owner: '国双科技公司人力资源部',
                    avatar: 'http://zhiliao-10068775.cos.myqcloud.com/logo.png'
                }]
            }
        },
        mounted () {
            //console.log("参考官方文档: 实例 - 生命周期");
            this.getTasks();
        },
        methods: {
            getTasks(){
                axios.get('/api/Task/tasklist').then(function(res){
                    console.log("请求任务列表成功");
                    console.log(res);
                }).catch(function(response){
                    console.log("请求任务列表失败");
                    console.error(response);
                })
            },
            setRead(item){
                axios.post('/api/Task/setreaded',{id:1}).then(function(res){
                    console.log("设置已读成功");
                    item.state = true;
                }).catch(function(error){
                    console.error("设置已读失败");
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