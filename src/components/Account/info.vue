<template>
    <div>
        <div class="text-center">
            <component :is="upload-avatar"></component>
        </div>
    </div>
</template>

<script>
    import UploadAvatar from '../Common/UploadAvatar'
    export default{
        data(){
            return{

            }
        },
        components:{
            'upload-avatar':UploadAvatar
        }
    }
</script>