export default{
    login(state){
      state.islogin = true;
    },
    updateToken(state,token){
      state.jwtToken = "Bearer "+token;
    }
}