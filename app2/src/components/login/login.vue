<template>
  <div class="login">
    <div class="login-title">
      <router-link to="/one" tag="i" class="el-icon-arrow-left"></router-link>
      <p>用户登录</p>
    </div>
    <div class="login-conter">
      <div class="login-center-img">
        <div></div>
      </div>
      <div class="login-form">
        <div class="login-user">
          <van-icon name="contact" />
          <input type="text" v-model="$store.state.Globalusername" placeholder="请输入用户名" onfocus="this.select()"> </div>
        <div class="login-pwd">
          <i class="iconfont icon-mima"></i>
          <input :type="pwd ? 'text' : 'password'" v-model="$store.state.Globalpassword" placeholder="请输入密码" onfocus="this.select()">
          <i class="iconfont" :class="pwd ? 'icon-guanbi' : 'icon-buxianshimima'" @click="pwd = !pwd"></i>
        </div>
        <div class="login-go">
          <button @click="login">立即登陆</button>
          <!--<button @click="axiosgo">接口测试</button>-->
        </div>
        <div class="login-live">
          <router-link to="registered">立即注册</router-link>
          <router-link to="">忘记密码</router-link>
        </div>
      </div>
    </div>
    <div class="login-pop" v-show="pop" @click="pop = false">
      <div>
        <i class="iconfont icon-information"></i>{{content}}</div>
    </div>
  </div>
</template>
<script>
  import md5 from 'js-md5';
  import headers from '../public/header';
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data() {
      return {
        pop: false,
        pwd: false,
        username:'',
        password:'',
        content: '',
        arr: md5("aaaaaaa")
      }
    },
    mounted: function() {
      this.$store.state.Globalusername = "";
      this.$store.state.Globalpassword = "";
    },
    methods: {
      login() {
        const username = this.$store.state.Globalusername;
        const password = this.$store.state.Globalpassword;
        const user_yz = /^[A-Za-z][A-Za-z1-9]{5,20}$/;
        const pwd_yz = /^[A-Za-z1-9]{6,20}$/;
        let yzuser = user_yz.test(username);
        let yzpwd = pwd_yz.test(password);
        if (this.$store.state.Globalusername === '') {
          this.content = '用户名不能为空';
          this.pop = true;
        } else if (this.$store.state.Globalpassword === '') {
          this.content = '密码不能为空';
          this.pop = true;
        } else if (yzuser == false) {
        // 用户名包括:最少6位，字母开头 + 数字/字母/下划线
        // 密码：最少6位，至少包括1个字母，1个数字
          this.content = '用户名：字母开头，6-20位，包括大小字母、数字'
          this.pop = true
        } else if (yzpwd == false) {
          this.content = '密码：6-20位，包括大小字母、数字'
          this.pop = true
        } else if (yzuser == true && yzpwd == true) {
          this.$router.push('/one')
          this.$store.dispatch('login');
        }
      }
    },
    components: {
      headers
    }
  }
</script>
<style lang="scss" scopde>
  @import '../../assets/scss/login/login.scss';
</style>