<template>
<div>
  <div class="avatar-container">
    <div class="save-avatar">
        <input id="upload"  type="file" @change="onFileChange">
    </div>
    <img  :src="avatar" class="avatarImage">
  </div>
  <mu-raised-button v-if="isUploadButton" primary icon="cloud_upload" label="确定上传头像" @click="uploadAvatar"></mu-raised-button>
</div>
</template>

<script>
import axios from 'axios'
import {Message} from 'element-ui'


export default {
  props:{
    avatar:String,
    isgroup:Boolean,
    groupid:String
  },
  data () {
    return {
      isUploadButton:false,
      formdata:null,
    }
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
      this.formdata = files[0];
      this.isUploadButton = true;
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;
      reader.onload = (e) => {
        vm.avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    uploadAvatar(){
      var tvm = this;
      var formData = new FormData();
      formData.append('files', tvm.formdata);
      var instance;
      if(tvm.isgroup)
        instance = axios.create({headers:{'groupid':tvm.groupid}});
      else instance = axios.create({});
      instance.post('/api/User/uploadimage',formData)
        .then(function(res){
          console.log(res);
          if(res.data.code != 0)
            Message.error("更新失败");
          else{
              Message.success("更新成功")
              if(tvm.isgroup){
                tvm.$emit('updateGroupid',res.data.data.access_url);
              }
              else
                tvm.saveAvatar(res.data.data.access_url);
            }
        }).catch(function(msg){
          console.error(msg)
        })
      this.isUploadButton = false;
    },
    saveAvatar(url){
      axios.post('/api/User/saveavatar',{value:url});
    }
  },
}
</script>
<style>
#upload{
  opacity:0;
  cursor:pointer;
}


.avatar-container{
  text-align: center;
}

.save-avatar{
    position: absolute;
    width: 200px;
    height: 200px;
    left:50%;
    margin-left:-100px;
    line-height: 200px;
    z-index: 1;
}

.save-avatar:hover{
    border-radius:50%;
    background-color: rgba(33, 33, 33, .5);    
    background-repeat: no-repeat;
    background-image: url(../../assets/相机.png);
    background-position: center;
}
.avatarImage{
  height: 200px;
  width: 200px;
  border-radius: 50%;
  margin: auto;
}

</style>