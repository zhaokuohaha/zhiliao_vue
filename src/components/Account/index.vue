<template>
    <div class="container">
        <div class="text-center">
            <div class="avatarImage image-primary">
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>


<style>
    .image-primary{
        width: 200px;
        height: 200px;
        margin: 20px auto;
        background-image: url(../../assets/zhaokuohaha.jpg);
        background-size: cover;
    }
</style>