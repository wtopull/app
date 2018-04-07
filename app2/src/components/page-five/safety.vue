<template>
  <div class="safety">
    <div class="safety-top">
      <router-link to="/five" tag="i" class="el-icon-arrow-left"></router-link>
      <p>安全中心</p>
    </div>
    <div class="safety-content">
      <div class="safety-content-top">
        <p class="title">———— 您的账号安全级别为极低 ————</p>
        <div>
        	<i class="el-icon-star-on active"></i>
        	<i class="el-icon-star-on active"></i>
        	<i class="el-icon-star-on active"></i>
        	<i class="el-icon-star-on"></i>
        	<i class="el-icon-star-on"></i>
        </div>
        <p class="time">上次登陆：2018-04-07  14:14:14</p>
        <p class="land"><span>香港</span> | <span>不是我登陆？</span></p>
      </div>
      <ul>
      	<router-link to="verifyPwd" tag="li">
      		<p>修改登陆密码</p>
      		<div>
      			<p>修改</p>
      			<i class="el-icon-arrow-right"></i>
      		</div>
      	</router-link>
      	<router-link to="verifySafePwd" tag="li">
      		<p>设置安全密码</p>
      		<div>
      			<p>修改</p>
      			<i class="el-icon-arrow-right"></i>
      		</div>
      	</router-link>
      	<router-link to="" tag="li">
      		<p>设置密保手机</p>
      		<div>
      			<p>修改</p>
      			<i class="el-icon-arrow-right"></i>
      		</div>
      	</router-link>
      	<router-link to="setQuestion" tag="li">
      		<p>设置密保问题</p>
      		<div>
      			<p>修改</p>
      			<i class="el-icon-arrow-right"></i>
      		</div>
      	</router-link>
      	<router-link to="" tag="li">
      		<p>设置密保邮箱</p>
      		<div>
      			<p>修改</p>
      			<i class="el-icon-arrow-right"></i>
      		</div>
      	</router-link>
      	<router-link to="" tag="li">
      		<p>银行卡管理</p>
      		<div>
      			<p>设置</p>
      			<i class="el-icon-arrow-right"></i>
      		</div>
      	</router-link>
      </ul>
      <div class="logout">
      	<p>退出登陆</p>
      	<i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/scss/page-five/safety.scss';
</style>