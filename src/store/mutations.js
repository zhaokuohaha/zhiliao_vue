import localStorage from './localStorage.js'
import axios from 'axios'

export default{
    
    login(state,userid){
      state.islogin = true;
      state.userid = userid;
      axios.defaults.headers.common["userid"] = userid;
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