<template src="../../templates/signup/regist.html">
</template>

<style src="../../assets/c8css/regist.css">

</style>


<style lang="scss">
#cssload-loader {
  display: none;
}

.code {
  img {
    position: absolute;
    right: 1px;
    top: 1px;
    height: 38px;
  }
}

@media (max-width: 414px) {
  .l_logo,
  .yhzc,
  .dlk_r,
  .loginform .help-inline {
    display: none;
  }
  .regist {
    .l_min {
      margin-right: 0;
    }
    .loginform input {
      width: 98%;
    }
  }
}
</style>

<script>
import { zipObject, pickBy, isUndefined } from 'lodash/fp'
import {
  apiIdValidate,
  validUsername,
  validPassword,
  getRequiredRule
} from '~/util/validator'
import { DeviceType as device_type } from '~/plugins/UA'
export default {
  name: 'sign-up',
  layout: 'empty',
  fetch({ app, store, params: { id }, error }) {
    // if(!isInteger(+params.sys_id)) {
    //   return error({ message: '注册编号无效' })
    // }
    if (apiIdValidate(id, '注册编号无效', error) === true) {
      return Promise.resolve()
    }
  },
  head() {
    return {
      title: `${this.isCommonUser ? '直营' : '代理'}注册`
    }
  },
  data() {
    return {
      captchaCode: '',
      form: {
        name: '',
        password: '',
        real_name: '',
        nick_name: '',
        code: '',
        checkPassword: ''
      },
      validateCaptcha: false,
      rules: {
        name: [getRequiredRule('请填写用户名'), validUsername()],
        password: [getRequiredRule('请填写密码'), validPassword()],
        real_name: getRequiredRule('请填写真实姓名'),
        nick_name: getRequiredRule('请填写昵称'),
        code: [
          getRequiredRule('请填写验证码'),
          {
            validator: (rule, value, callback) => {
              if (this.validateCaptcha) {
                return callback(new Error('验证码错误'))
              }
              callback()
            }
          }
        ],
        checkPassword: [
          getRequiredRule('请填写确认密码'),
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.password) {
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
          const client_ip = this.ip
          const user_register_link_id = this.$route.params.id
          let api
          if (this.isCommonUser) {
            api = 'user/register'
          } else {
            api = 'user-register-link/open-account'
          }
          this.$axiosPlus(
            api,
            pickBy(value => !isUndefined(value))({
              ...zipObject([
                'name',
                'password',
                'real_name',
                'nick_name',
                'code'
              ])(Object.values(this.form)),
              client_ip,
              user_register_link_id
            }),
            res => {
              if (res && res.error) {
                if (res.errorCode === 100172) {
                  this.validateCaptcha = true
                  this.captchaFields.validate()
                }else{
                  this.$message({
                  message: res.message,
                  type: 'error',
                  duration:2000
                })
                }
              } else {
                this.validateCaptcha = false
                this.$message({
                  message: '注册成功！',
                  type: 'success'
                })
              }
            },
            { showError: false, errCb: true }
          )
        } else {
          return false
        }
      })
    },

    getCaptcha() {
      const { ip } = this
      this.$axiosPlus('user/captcha', {}, data => {
        if (data) {
          this.captchaCode = data.code
        } else {
          // this.show = true
          this.$message({
            message: data.message,
            type: 'error'
          })
        }
      })
    }
  },
  computed: {
    ip() {
      return this.$store.getters.ip
    },
    isCommonUser() {
      return !this.$route.params.id
    }
  },

  mounted() {
    this.$form = this.$refs.form
    this.captchaFields = this.$form && this.$form.fields.slice(-1)[0] //cache this.$form validateField
    if (this.isCommonUser) {
      this.getCaptcha()
    }
  }
}
</script>
