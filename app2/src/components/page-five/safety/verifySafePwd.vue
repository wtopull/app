<template>
  <div class="verifySafePwd">
    <div class="verifySafePwd-top">
      <router-link to="/safety" tag="i" class="el-icon-arrow-left"></router-link>
      <p>验证安全密码</p>
    </div>
    <div class="verifySafePwd-input">
      <p>原安全密码</p>
      <input type="password" placeholder="请输入当前所使用的密码" v-focus/> </div>
    <router-link to="/resetWay" tag="p" class="zhaohui">找回安全密码？</router-link>
    <div class="verifySafePwd-but">
      <button @click="verifySafePwd">确定</button>
    </div>
    <div class="verifySafePwd-tisi"> 安全密码用于提现、绑定银行卡等操作，可保障资金安全。 </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    methods: {
      verifySafePwd() {
        this.$router.push({
          path: '/setSafePwd'
        });
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
  @import '../../../assets/scss/page-five/safety/verifySafePwd.scss';
</style>