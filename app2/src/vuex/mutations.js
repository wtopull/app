import axios from 'axios';
import VueCookie from "vue-cookie";
export default {
  //increment(state) {
  //  state.count = state.count + 1
  //},
  login(state) {
    axios({
      method: 'post',
      url: state.url + '/api/user/login',
      headers: state.headers,
      data: { account: state.Globalusername, password: state.Globalpassword }
    }).then((response) => {
      VueCookie.set('username', state.Globalusername, 1);
      VueCookie.set('password', state.Globalpassword, 1);
      console.log(response.data)
    })
  },
  getCaptchaCode(state){
  	axios({
      method: 'GET',
			url: state.url+'checkCode?code=df&account=adfsdf&_='+state.newDate,
    }).then((response) => {
    	state.captchaCodeImg = response.data.content
    	
      console.log(state.captchaCodeImg)
    })
  }
}