<template>
<div class="login">
  <div style="height:4.5rem;padding-top:1.5rem" class="loginlogo">
    <div class="content"></div>
  </div>
  <form @submit.prevent="">
    <div class="passItem">
      <p>
        <icon style="width:1rem;" name="user-o"></icon>
        <input v-model="$store.state.register.Globalusername" placeholder="请输入账号" type="text" class="input"/>
      </p>
      <p>
        <icon style="width:1.2rem;" name="lock"></icon>
        <input v-model="$store.state.register.Globalpassword" placeholder="请输入密码" type="password" class="input"/>
      </p>
    </div>
    <div class="passInter">
      <p>
        <v-touch @tap="login" tag="button" type="button" class="t_btn">登录</v-touch>
      </p>
    </div>
  </form>
  <v-touch ref="confirm" @tap="$store.commit('loginToreg')" style="margin-top:1.50rem;" class="Backindex">
    <icon name="user-plus"></icon><span>注册新用户</span>
  </v-touch>
  <v-touch @tap="$store.commit('regbackend','login')" style="margin:0.8rem auto" class="Backindex">
    <icon name="home"></icon><span style="width:3rem;text-align:center;">返回首页</span>
  </v-touch>
</div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    }
  },
  mounted: function() {
    this.$store.state.register.Globalusername = ""
    this.$store.state.register.Globalpassword = ""
  },
  methods: {
    login() {
			const username=this.$store.state.register.Globalusername
      const user_yz=/^[^A-Z][0-9a-z]{4,11}$/g;
      var yz=user_yz.test(username);
      if(this.$store.state.register.Globalusername==""||this.$store.state.register.Globalpassword==""){
             this.$store.commit('registerTip','请输入账号和密码')
        }else{
          if(yz==true){
             this.$store.dispatch('login');
           }else if(yz==false){
               this.$store.commit("registerTip","用户名格式错误");
           }
        }
    }
  }
}
</script>
<style lang="scss">
@import "../assets/css/main.scss";
.passItem {
    background-color: #fff;
    p:last-child {
        border-bottom: none;
    }
    p {
        margin: 0 auto;
        display: table;
        padding: rem2px(20) 0;
				width:rem2px(460);
        height: rem2px(100);
        border-bottom: 1px solid #dbdbdb;
				display:flex;
				justify-content:center;
				align-items:center;
        svg {
        	 @extend %posr;
            width:rem2px(38);
            height:rem2px(38);
            color: #000;
        }
    }
}
.login .input {
    @extend %font25,%posr;
    display: table-cell;
    padding-left: 0.5rem;
    width: rem2px(300);
    height: rem2px(60);
    line-height: rem2px(60);
    margin-left: rem2px(15);
    border: none;
    ::-webkit-input-placeholder {
        color: #a9a9a9;
    }
}
.passInter {
    margin-top: rem2px(60);
}
.toRegister {
	  @extend %font28;
    width: 8.6rem;
    height: 1.21875rem;
    outline: none;
    border: 2px solid #2a8fbd;
    border-radius: 0.2rem;
    background: none;
    color: #2a8fbd;
}
</style>
