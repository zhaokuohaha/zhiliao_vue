<template>
<div>
  <div class="avatar-container">
    <div class="save-avatar" @click="open"></div>
    <img  :src="avater" class="avatarImage">
  </div>
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
       avater:'http://cttf-10068775.cos.myqcloud.com/QQ%E6%88%AA%E5%9B%BE20161221144932.png',
    }
  },
  methods: {
    open () {
      this.dialog = true
    },
    close () {
      this.dialog = false
    }
  }
}
</script>
<style>
.avatar-container{
  text-align: center;
}
.save-avatar{
    position: absolute;
    width: 100%;
    height: 200px;
    line-height: 200px;
    z-index: 1;
  }
.save-avatar:hover{
    cursor: pointer;
    background: rgba(33, 33, 33, .5);    
    background-repeat: no-repeat;
    background-image: url(../../assets/相机.png);
    background-position: center;
  }
  .avatarImage{
    padding: 10px;
    height: 200px;
    width: 200px;
    border-radius: 50%;
    margin: auto;
  }
</style>