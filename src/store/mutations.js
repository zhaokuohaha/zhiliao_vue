import localStorage from './localStorage.js'
import axios from 'axios'

export default{
    login(state,user){
      state.islogin = true;
      state.userid = user.userid;
      state.nickname = user.nickname;
      if(user.avatar)
        state.avatar = user.avatar;
      state.summary = user.summary;
      axios.defaults.headers.common["userid"] = user.userid;
      localStorage.save('username',user.nickname);
      localStorage.save('userid',user.userid);
      localStorage.save('avatar',user.avatar);
    },
    logoff(state){
      state.islogin = false;
    },
    updateToken(state,token){
      state.jwtToken = "Bearer "+token;
      axios.defaults.headers.common['Authorization'] = state.jwtToken;
      localStorage.save('token',token);
    },
}