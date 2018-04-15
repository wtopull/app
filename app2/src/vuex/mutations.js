import axios from 'axios';
import VueCookie from "vue-cookie";
export default {
  //increment(state) {
  //  state.count = state.count + 1
  //},
  login(state) {
    axios({
      method: 'post',
      url: state.url + 'user/login',
      headers: state.headers,
      params: { username: state.Globalusername, password: state.Globalpassword }
    }).then((response) => {
      VueCookie.set('username', state.Globalusername, 1);
      VueCookie.set('password', state.Globalpassword, 1);
      console.log(response.data)
    })
  }
}