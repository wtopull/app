<template>
  <el-form :model="form" :rules="rules" status-icon ref="form" label-width="100px">
    <el-form-item label="原登录密码" prop="pw">
      <el-input ref="pw" type="password" v-model="form.pw"></el-input>
    </el-form-item>
    <el-form-item label="新登录密码" prop="newPw">
      <el-input ref="newPw" type="password" v-model="form.newPw"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPw">
      <el-input ref="checkPw" type="password" v-model="form.checkPw"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="close">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { zipObject } from 'lodash/fp'
import { mapGetters } from 'vuex'
import { pwReg, getRequiredRule } from '~/util/validator'
// import logout from '~/util/logout'
export default {
  props: ['visible'],
  data() {
    return {
      form: {
        pw: '',
        newPw: '',
        checkPw: ''
      },
      rules: {
        //this.form key and rules key must same
        pw: [
          getRequiredRule('请输入原登录密码'),
          {
            validator: (rule, value, callback) => {
              if (this.form.newPw !== '') {
                this.$refs.form.validateField('newPw')
              }
              callback()
            },
            trigger: 'blur'
          }
        ],
        newPw: [
          getRequiredRule('请输入新登录密码'),
          {
            validator: (rule, value, callback) => {
              if (value === this.form.pw) {
                callback(new Error('新登录密码不能与原登录密码相同'))
              } else if (!pwReg.test(value)) {
                callback(new Error('密码必须字母数字组合,6-18个字符'))
              } else {
                if (this.form.checkPw !== '') {
                  this.$refs.form.validateField('checkPw')
                }
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        checkPw: [
          getRequiredRule('请确认新登录密码'),
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.newPw) {
                callback(new Error('两次输入密码不一致!'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$form.validate(valid => {
        if (valid) {
          this.$axiosPlus(
            'user/change-login-password',
            zipObject(['old', 'new', 'confirm'].map(_ => `${_}_password`))(
              Object.values(this.form)
            ),
            () => {
              this.$message({
                message: '修改成功！',
                type: 'success',
                duration: 1500,
                // onClose:() => logout(this.$store,this.$router)
                onClose: this.close
              })
            }
          )
        } else {
          return false
        }
      })
    },
    close() {
      this.$emit('update:visible', false)
    }
  },
  mounted() {
    this.$form = this.$refs.form
  }
}
</script>