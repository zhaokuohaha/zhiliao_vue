import localStorage from './localStorage.js'
import axios from 'axios'

export default{
    login(state,user){
      state.islogin = true;
      state.userid = user.userid;
      state.nickname = user.nickname;
      state.avatar = user.avatar;
      state.summary = user.summary;
      axios.defaults.headers.common["userid"] = user.userid;
    },
    logoff(state){
      state.islogin = false;
    },
    updateToken(state,token){
      state.jwtToken = "Bearer "+token;
      axios.defaults.headers.common['Authorization'] = state.jwtToken;
      localStorage.save('token',token);
    }
}