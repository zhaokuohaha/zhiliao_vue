<template>
    <div class="tasklist">
        <h1>任务列表</h1>
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
            <mu-chip backgroundColor="white">
                <mu-avatar :size="42" :src="activetask.avatar" />{{activetask.owner}}
            </mu-chip>
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

    export default{
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
                item.state = true;
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
    }
</script>