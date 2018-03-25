<template>
  <div class="login">
  	<div class="login-title">
      <div class="login-title-left">
        <router-link to="/" class="el-icon-close" tag="i"></router-link>
      </div>
      <div class="login-title-center">登陆</div>
      <div class="login-title-right"></div>
    </div>
    <div class="login-center">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="48px" class="demo-ruleForm">
        <el-form-item label="账号" prop="name">
          <el-input type="text" v-model.number="ruleForm2.name" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <div class="login-form">
          <el-checkbox label="记住密码" name="type"></el-checkbox>
          <a>忘记密码？</a>
        </div>
      </el-form>
      <div class="login-footer">
        <router-link to="" tag="a"><img src="../../assets/img/login/login-b1.jpg" alt=""></router-link>
        <router-link to="/" tag="a"><img src="../../assets/img/login/login-b2.jpg" alt=""></router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('账号不能为空'));
        }
        setTimeout(() => {
            if (value === '') {
              callback(new Error('账号不能为空'));
            } else {
              callback();
            }
        }, 2000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          name: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          name: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.push({ path: '/' });
          } else {
            return false;
          }
        });
      }
    }
  }
</script>
<style lang="scss">
  @import "../../assets/scss/login/login.scss";
</style>