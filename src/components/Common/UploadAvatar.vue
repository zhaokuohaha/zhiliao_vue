<template>
<div>
  <div class="avatar-container">
    <div class="save-avatar" @click="open">
        <input id="upload"  type="file" @change="onFileChange">
    </div>
    <img  :src="avater" class="avatarImage">
  </div>
  <mu-raised-button v-if="isUploadButton" primary icon="cloud_upload" label="确定上传头像" @click="uploadAvatar"></mu-raised-button>
  <mu-dialog  :open="dialog" title="Dialog" @close="close">
    这是一个简单的弹出框
    <mu-flat-button slot="actions" @click="close" primary label="取消"/>
    <mu-flat-button slot="actions" primary @click="close" label="确定"/>
  </mu-dialog>
</div>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      isUploadButton:false,
       avater:'http://cttf-10068775.cos.myqcloud.com/QQ%E6%88%AA%E5%9B%BE20161221144932.png',
    }
  },
  methods: {
    open () {
      //this.dialog = true
    },
    close () {
      this.dialog = false
    }, 
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
      this.isUploadButton = true;
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.avater = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    uploadAvatar(){
      var element = document.getElementById('upload');
      var formData = new FormData();
      formData.append('files', element.files[0]);
      var request = new XMLHttpRequest();
      request.open("POST", "http://localhost:50521//api/User/uploadimage"); // change to your URL
      request.send(formData);
      this.isUploadButton = false;
    }
  }
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