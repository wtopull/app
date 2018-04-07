<template>
  <div class="verifyPwd">
    <div class="verifyPwd-top">
      <router-link to="/safety" tag="i" class="el-icon-arrow-left"></router-link>
      <p>验证原密码</p>
    </div>
    <div class="verifyPwd-input">
      <p>原密码</p>
      <input type="password" placeholder="请输入当前所使用的密码" v-focus/> </div>
    <div class="verifyPwd-but">
      <button @click="verifyPwd">确定</button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    methods: {
      verifyPwd() {
        this.$router.push({
          path: '/setPwd'
        })
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
  @import '../../../assets/scss/page-five/safety/verifyPwd.scss';
</style>