<template>
  <div class="setPwd">
    <div class="setPwd-top">
      <router-link to="/safety" tag="i" class="el-icon-arrow-left"></router-link>
      <p>设置登陆密码</p>
    </div>
    <div class="setPwd-input">
    	<div>
    		<p>登陆密码</p>
      <input type="password" placeholder="请输入登陆密码" v-focus/> 
    	</div>
    	<div>
    		<p>确认密码</p>
      <input type="password" placeholder="请再次输入密码"/> 
    	</div>
    </div>
    <div class="setPwd-but">
      <button @click="setPwd">确定</button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    methods: {
      setPwd() {
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
  @import '../../../assets/scss/page-five/safety/setPwd.scss';
</style>