<template>
    <div class="user-card">
        <div class="single-member effect-1">
            <div class="member-image">
                <img :src="user.avatar" alt="Member">
            </div>
            <div class="member-info">
                <h3>{{user.nickname}}</h3>
                <h5>{{user.phonenum}}</h5>
                <p>{{user.summary}}</p>
                <a :href="mailLink(user.email)">
                    <div class="social-touch">
                       <mu-icon value="mail_outline"></mu-icon> {{user.email}}
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        //props:['user']
        data(){
            return{
                user:{
                    avatar:'http://zhiliao-10068775.file.myqcloud.com/68abc327-4e78-4e87-b995-74559d19b2c7.jpg',
                    email:'fangchaoznweg@qq.com',
                    phonenum:'13061980331',
                    summary:'俗尘渺渺,天意茫茫, 将你共我分开; 断肠声点点, 风雨声连连, 似是故人来',
                    nickname:'方朝增'
                }
            }
        },
        methods:{
            mailLink(email){
                return "mailto:"+email;
            }
        }
    }
</script>


<style>
/*= common css to all effects =*/
.single-member{width: 280px; float: left; margin: 30px 2.5%; background-color: #ddd; text-align: center; position: relative;}
.member-image img{max-width: 100%; vertical-align: middle;}
h3 {font-size: 24px; font-weight: normal; margin: 10px 0 0; text-transform: uppercase;}
h5 {font-size: 16px; font-weight: 300; margin: 0 0 15px; line-height: 22px;}
p {font-size: 14px; font-weight: 300; line-height: 22px; padding: 0 30px; margin-bottom: 10px;}
.social-touch a{display: inline-block; width: 27px; height: 26px; vertical-align: middle; margin: 0 2px; ; background-repeat: no-repeat; opacity: 0.7; transition: 0.3s;}
.social-touch a:hover{opacity: 1; transition: 0.3s;}
.fb-touch{background-position: 0 0;}
.tweet-touch{background-position: -35px 0;}
.linkedin-touch{background-position: -71px 0;}
.icon-colored .fb-touch{background-position: 0 -27px;}
.icon-colored .tweet-touch{background-position: -35px -27px;}
.icon-colored .linkedin-touch{background-position: -71px -27px;}
/*= common css to all effects end =*/

/*= effect-1 css =*/
.effect-1{border-radius: 5px 5px 0 0; padding-bottom: 40px;}
.effect-1 .member-image { width:70%;border: 2px solid #fff; border-radius: 60px 0; display: inline-block; margin-top: -72px; overflow: hidden; transition: 0.3s;}
.effect-1 .social-touch{background-color: #ef9a9a; position: absolute; left: 0; bottom: 0; height: 5px; overflow: hidden; padding: 5px 0 0; width: 100%; transition: 0.3s;}
.effect-1 .member-image img{transition: 0.3s; border-radius: 60px 0;}
.effect-1:hover .member-image{border-color: #e13157; transition: 0.3s; border-radius: 50%;}
.effect-1:hover .social-touch{padding: 6px 0; height: 38px; transition: 0.3s;}
/*= effect-1 css end =*/

</style>