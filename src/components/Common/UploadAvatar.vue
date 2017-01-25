<template>
<div>
  <div class="save-avatar" @click="open"></div>
  <img  :src="avater" class="avatarImage">
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
   .avatarImage{
    padding: 10px;
    height: 200px;
    border-radius: 50%;
  }
  .save-avatar{
    position: fixed;
    width: 100%;
    text-align: center;
    height: 200px;
    line-height: 200px;
  }
</style>