<template>
  <div class="setSafePwd">
    <div class="setSafePwd-top">
      <router-link to="/safety" tag="i" class="el-icon-arrow-left"></router-link>
      <p>设置安全密码</p>
    </div>
    <div class="setSafePwd-input">
    	<div>
    		<p>安全密码</p>
      <input type="password" placeholder="请输入登陆密码" v-focus/> 
    	</div>
    	<div>
    		<p>确认密码</p>
      <input type="password" placeholder="请再次输入密码"/> 
    	</div>
    </div>
    <div class="setSafePwd-but">
      <button @click="setSafePwd">确定</button>
    </div>
    <div class="setSafePwd-tisi">
    	安全密码用于提现、绑定银行卡等操作，可保障资金安全。
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    methods: {
      setSafePwd() {
        this.$router.push({
          path: '/safety'
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
  @import '../../../assets/scss/page-five/safety/setSafePwd.scss';
</style>