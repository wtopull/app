<template>
  <div class="registered">
    <div class="registered-title">
      <router-link to="/login" tag="i" class="el-icon-arrow-left"></router-link>
      <p>用户注册</p>
      <router-link to="" tag="b">客服</router-link>
    </div>
    <div class="registered-content">
      <ul>
        <li>
          <span>邀请码</span>
          <input type="text" onfocus="this.select()" v-model="invitationCode" v-focus placeholder="请输入8位数字邀请码" /> </li>
        <li>
          <span>账号</span>
          <input type="text" onfocus="this.select()" v-model="username" placeholder="请输入您要注册的账号" /> </li>
        <li>
          <span>设置密码</span>
          <input :type="pwd ? 'text' : 'password'" v-model="password1" onfocus="this.select()" placeholder="请输入您要设置的密码" />
          <i class="iconfont" :class="pwd ? 'icon-guanbi' : 'icon-buxianshimima'" @click="pwd = !pwd"></i>
        </li>
        <li>
          <span>确认密码</span>
          <input :type="pwd ? 'text' : 'password'" v-model="password2" onfocus="this.select()" placeholder="请再次输入您要设置的密码" /> </li>
        <li>
          <span>验证码</span>
          <input type="text" onfocus="this.select()" v-model="verification" placeholder="请输入验证码" />
          <img :src="captchaCodeImg" @click="getCaptchaCode"> </li>
      </ul>
    </div>
    <router-link to="">已有账号？立即登录</router-link>
    <div class="registered-go">
      <button @click="registeredGo">立即注册</button>
    </div>
    <div class="login-pop" v-show="pop" @click="pop = false">
      <div>
        <i class="iconfont icon-information"></i>{{content}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
      	pop: false,
      	content:'',
        pwd: false, //是否显示密码
        newDate:null,
        invitationCode:'',//邀请码
        username:'',//用户名
        password1:'',//密码
        password2:'',//确认密码
        verification:'',//验证码
        captchaCodeImg: '',//验证码图
      }
    },
    created() {
      this.getCaptchaCode();
    },
    methods: {
      getCaptchaCode() {
      	this.newDate=new Date().getTime();
        this.captchaCodeImg = "http://115.144.238.217/code.jpg?_=" + this.newDate;
      },
      registeredGo(){
      	const invitationCode_yz = /^[0-9][0-9]{8,20}$/;
      	const user_yz = /^[A-Za-z][A-Za-z1-9]{5,20}$/;
        const pwd1_yz = /^[A-Za-z1-9]{6,20}$/;
        let yzverification = invitationCode_yz.test(this.verification);
        let yzuser = user_yz.test(this.username);
        let yzpwd1 = pwd1_yz.test(this.password1);
      	if(this.invitationCode === ''){
      		this.content = '邀请码不能为空';
          this.pop = true;
      	}else if(this.username === ''){
      		this.content = '用户名不能为空';
          this.pop = true;
      	}else if(this.password1 === ''){
      		this.content = '密码不能为空';
          this.pop = true;
      	}else if(this.password2 === ''){
      		this.content = '确认密码不能为空';
          this.pop = true;
      	}else if(this.verification === ''){
      		this.content = '确认密码不能为空';
          this.pop = true;
      	}else if(yzverification == false){
          	this.content = "请输入8位数字邀请码";
          	this.pop = true;
          }
      	
      }
    },
    directives: {
      focus: {
        inserted: function(el) {
          el.focus()
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/login/registered.scss";
</style>