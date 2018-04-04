<template>
  <div class="login">
    <!-- <headers></headers> -->
    <div class="login-title">
      <router-link to="/one" tag="i" class="el-icon-arrow-left"></router-link>
      <p>用户登录</p>
    </div>
    <div class="login-conter">
      <div class="login-center-img">
        <div></div>
      </div>
      <div class="login-form">
        <form>
          <div class="login-user">
            <i class="iconfont icon-accountfilling"></i>
            <input type="text" v-model="username" placeholder="请输入用户名">
          </div>
          <div class="login-pwd">
            <i class="iconfont icon-iconset0114"></i>
            <input :type="pwd ? 'text' : 'password'" v-model="password" placeholder="请输入密码">
            <i class="iconfont icon-buxianshimima" :class="pwd ? 'icon-buxianshimima' : 'icon-xianshimima1'" @click="pwd = !pwd"></i>
          </div>
          <div class="login-go">
            <button @click="form">立即登陆</button>
          </div>
          <div class="login-live">
            <router-link to="">立即注册</router-link>
            <router-link to="">忘记密码</router-link>
          </div>
        </form>
      </div>
    </div>
    <div class="login-pop" v-show="pop" @click="pop = false">
      <div>
        <i class="iconfont icon-information"></i>{{content}}</div>
    </div>
  </div>
</template>
<script>
import headers from '../public/header'
export default {
  data() {
    return {
      pop: false,
      pwd: false,
      username: '',
      password: '',
      content: ''
    }
  },
  methods: {
    form() {
      if (!this.username) {
        this.content = '用户名不能为空'
        this.pop = true
      } else if (!this.password) {
        this.content = '密码不能为空'
        this.pop = true
      } else if (this.username) {
        this.content = '用户名必须包括：字母，数字，下划线'
        this.$router.push('/one')
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