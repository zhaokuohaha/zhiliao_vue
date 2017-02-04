import localStorage from './localStorage.js'

export default{
    login(state,userid){
      state.islogin = true;
      state.userid = userid;
    },
    updateToken(state,token){
      state.jwtToken = "Bearer "+token;
      localStorage.save('token',token);
    }
}