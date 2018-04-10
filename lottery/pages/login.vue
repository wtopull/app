<template src="../templates/login/index.html"></template>
<script>
  import { DeviceType as device_type } from '~/plugins/UA'
  import { mapMutations, mapGetters, mapState } from 'vuex'
  import { createQR } from '~/plugins/common'
  import { getRequiredRule } from '~/plugins/formValidate'
  import { pickBy } from 'lodash/fp'
  import { AsyncMultComp } from '~/plugins/common'
  const AsyncComp = AsyncMultComp('admin/user')
  const isProd = process.env.NODE_ENV === 'production'
  export default {
    name: 'login',
    layout: 'empty',
    components: {
      ProtectionAnswer: AsyncComp('ProtectionAnswer'),
      LoginPw: AsyncComp('LoginPw')
    },
    data() {
      return {
        form: {
          name: isProd ? '' : process.env.loginName,
          password: isProd ? '' : process.env.loginPassword,
          device_type,
          GAKey: '',
          captcha: ''
        },
        rules: {
          name: [getRequiredRule('请填写用户名')],
          password: [getRequiredRule('请输入密码')],
          captcha: [getRequiredRule('请填写验证码')]
        },
        transable: true,
        reloadTimer: null,
        capatchaCode: null,
        show: false,
        qrImgSrc: '',
        randCode: '',
        qrTimer: null,
        rememberPw: false,
        activeLoginModel: 'form',
        questionList: [],
        dialogTitle: '',
        visible: false,
        view: '',
        isBindGA: undefined
      }
    },
    watch: {
      isLogout(val) {
        val && this.reload(val)
      },
      storedPw(val) {
        if (val) {
          this.rememberPw = true
          this.form.password = val
        }
      }
    },
    created() {
      //fix app.html #cssload-loader
      process.browser && this.$root.$el.classList.add('loaded')
      this.getCaptcha()
      //preload lotto types
      this.$store.dispatch('lotto/getTypes')
      const passwords = Object.values(this.passwords)
      if (passwords.filter(_ => _).length) {
        this.form.password = passwords[0]
        this.form.name = Object.keys(this.passwords)[0]
        this.rememberPw = true
      }
    },
    methods: {
      async login() {
        await this.checkGA()
        const {
          ip,
          form
        } = this
        this.$form.validate(valid => {
          if (valid) {
            this.$axiosPlus('/user/login', {
              ip,
              ...pickBy((val, key) => val !== '', form),
              code: form.GAKey
            }, data => {
              if (data.user_token) {
                this.done(data)
                // this.$axios.$get('/login',{params: { token:data.user_token.token}}).then((res) => res && this.done(data))
                if (this.rememberPw) this.toggleStorePw(true)
              } else {
                this.$message({
                  message: data.errorCode === 100002 ? '系统更新，请稍后重新登录！' : data.sysErrMsg,
                  type: 'error'
                })
                if (data.errorCode === 100172) this.getCaptcha()
              }
            }, {
              errCb: true,
              showError: false
            })
          } else {
            return false
          }
        })
      },
      done(data) {
        const {
          currency_list,
          user_token: {
            token,
            expired_at: expires
          },
          user_role: role,
          user,
          user_balance_account
        } = data
        this.$axios.setHeader('Token', token)
        this.setUser({
          token,
          expires,
          role,
          ...user,
          ip: this.ip
        })
        this.setBal(user_balance_account)
        this.setState({
          key: 'pay.currencyList',
          value: currency_list
        })
        this.$router.push('/home')
      },
      async validateGA() {
        const {
          name
        } = this.form
        if (this.GACollection[name] !== undefined) return (this.isBindGA = this.GACollection[name])
        await this.checkGA()
      },
      async checkGA() {
        this.setState({
          key: 'GACollection',
          value: { ...this.GACollection,
            [`${this.form.name}`]: (this.isBindGA = await this.getGA())
          }
        })
      },
      async getGA() {
        const {
          name
        } = this.form
        if (this.GACollection[name] !== undefined) return this.GACollection[name]
        return name && (await this.$axios.$post('user-login-google-code/check-by-username', {
          name
        })).data.is_open_google
      },
      reload(errorCode) {
        this.$message({
          message: `${
          errorCode === 102901
            ? '网络超时，请'
            : errorCode === 100002 ? '系统更新，请稍后' : ''
        }重新登录！`,
          type: 'error'
        })
        if (isProd) this.reloadTimer = setTimeout(() => (location.href = '/'), 1e4)
      },
      ...mapMutations(['setState', 'setUser', 'spin']),
      ...mapMutations({
        setBal: 'pay/setBal'
      }),
      checkQrLogin() {
        this.$axiosPlus('user-login-qr-code/login-info', {
          rand_code: this.randCode
        }, data => {
          if (!data.user_token && !document.hidden) {
            if (this.$route.name === 'login') {
              //fix destroyed fail
              this.qrTimer = setTimeout(this.checkQrLogin, 2000)
            } else {
              clearTimeout(this.qrTimer)
            }
          } else {
            clearTimeout(this.qrTimer)
            this.done(data)
          }
        })
      },
      getCaptcha() {
        const {
          ip
        } = this
        this.$axiosPlus('/user/get-captcha', {
          device_type,
          ip
        }, data => {
          if (data) {
            this.capatchaCode = data.code
            this.show = data.show
          } else {
            // this.show = true
            this.$message({
              message: data.message,
              type: 'error'
            })
          }
        })
      },
      playDemo() {
        this.$axiosPlus('user/demo', {
          ip: this.ip,
          device_type
        }, data => {
          if (data.user_token) {
            this.done(data)
          }
        })
      },
      async handleTabClick(tab) {
        const isQrcode = tab.name === 'qrcode'
        if (isQrcode) {
          if (!this.qrImgSrc) {
            this.spin()
            await createQR(this, 'user-login-qr-code/create', 'rand_code')
            this.spin({
              on: false
            })
            document.addEventListener('visibilitychange', this.handleVisibilityChange)
          }
          this.checkQrLogin()
        } else {
          clearTimeout(this.qrTimer)
        }
      },
      handleVisibilityChange() {
        document.hidden ? clearTimeout(this.qrTimer) : this.checkQrLogin()
      },
      toggleStorePw(val) {
        const {
          name,
          password
        } = this.form
        name && this.setState({
          key: 'passwords',
          value: { ...this.passwords,
            [`${name}`]: val ? password : false
          }
        })
      },
      handleForgetPassword() {
        this.$axiosPlus('user-safety-question/get-list-no-login', {
          name: this.form.name
        }, data => {
          if (data) {
            if (data.totalCount === 0) {
              this.$message({
                message: '尚未设置密保问题，请询问客服',
                type: 'error'
              })
              return
            }
            this.questionList = data.list
            this.showDialog('ProtectionAnswer')
          } else {
            this.$message({
              message: data.message,
              type: 'error'
            })
          }
        })
      },
      showDialog(view) {
        if (this.view === view) {
          this.resetForm(true)
          return (this.visible = true)
        }
        this.dialogTitle = view === 'ProtectionAnswer' ? '回答密保问题' : '设置新密码'
        this.view = view
        this.visible = true
      },
      setPassword() {
        this.view = 'LoginPw'
        this.visible = true
      },
      resetForm(unselect) {
        const dialogForm = this.$refs.dialogForm
        unselect ? dialogForm.reset() : dialogForm.$form.resetFields()
      }
    },
    computed: { ...mapGetters(['ip', 'loading']),
      ...mapState(['passwords', 'GACollection']),
      isLogout() {
        return this.$store.state.isLogout
      },
      storedPw() {
        return this.passwords[this.form.name]
      }
    },
    mounted() {
      const {
        isLogout
      } = this
      if (isLogout === true) {
        this.$message({
          message: '登出成功！',
          type: 'success'
        })
      } else if (typeof isLogout === 'number') {
        this.reload(isLogout)
      }
      this.$form = this.$refs.form
    },
    destroyed() {
      clearTimeout(this.reloadTimer)
      clearTimeout(this.qrTimer)
      document.removeEventListener('visibilitychange', this.handleVisibilityChange)
    }
  }
</script>
<style lang="scss">
  .login-bg {
    background: url('~assets/img/login/login-bg.png') no-repeat;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    .login-form {
      width: 480px;
      height: 588px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 10px;
      box-shadow: 0 0 15px 0px rgba(0, 0, 0, 0.6);
      overflow: hidden;
    }
    .el-tabs__nav-wrap {
      margin-bottom: 0;
    }
    .el-tabs__header {
      border-bottom: 1px solid $--color-warning;
      margin: 0;
    }
    .el-tabs__nav {
      width: 100%;
      display: flex;
    }
    .el-tabs__active-bar {
      display: none;
    }
    .el-tabs__item {
      flex: 1;
      height: 90px;
      line-height: 90px;
      text-align: center;
      padding: 0;
      font-size: 32px;
      outline: none;
      color: $--color-text-secondary;
      &:hover {
        color: $--color-warning;
      }
    }
    .el-tabs__nav-wrap::after {
      background-color: transparent;
    }
    .el-tabs__item.is-active {
      background: white;
      color: $--color-warning;
    }
    .el-tabs__content {
      border-top: 1px solid $--color-primary;
      height: 498px;
    }
    .el-form {
      width: 432px;
      margin: 33px auto 15px;
      .input-area {
        max-height: 273px;
        border-radius: 5px;
        overflow: hidden;
      }
      .el-form-item {
        margin: 0;
      }
      .el-input__inner {
        height: 90px;
        font-size: $--font-size-large;
        padding-left: 70px;
        background: white;
        border-top: none;
        border-left: none;
        border-right: none;
        border-radius: 0;
      }
    }
    .password-area {
      padding: 0 25px 0 20px;
    }
    .el-checkbox__label {
      color: #806e64;
    }
    .el-button--text {
      color: rgba(153, 153, 153, 0.8);
      &.warning {
        color: $--color-warning;
        text-decoration: underline;
      }
    }
    .el-button--primary {
      width: 432px;
      height: 56px;
      position: absolute;
      bottom: 75px;
      font-size: 26px;
      border-radius: 5px;
    }
    .icon {
      display: inline-block;
      margin-top: 30px;
      margin: 31px 15px 0;
      &.username-icon {
        width: 29px;
        height: 29px;
        background: url('~assets/img/login/username-icon.png');
      }
      &.password-icon {
        width: 22px;
        height: 26px;
        margin-left: 20px;
        background: url('~assets/img/login/password-icon.png');
      }
      &.captcha-icon {
        width: 22px;
        height: 26px;
        margin-left: 20px;
        background: url('~assets/img/login/captcha-icon.png');
      }
    }
    .bottom-area {
      position: absolute;
      width: 430px;
      bottom: 14px;
      left: 24px;
      .link {
        color: $--color-warning;
        text-decoration: underline;
      }
    }
    .code {
      img {
        position: absolute;
        right: 20px;
        width: 150px;
        height: 40px;
        bottom: 28px;
      }
    }
    .qrcode {
      margin-top: 24px;
      img {
        width: 354px;
        height: 354px;
      }
      p {
        color: #666;
        font-size: 24px;
        text-align: center;
        margin-top: 20px;
      }
    }
    .el-form-item__error {
      right: 5px;
      z-index: 2;
      bottom: 5px;
    }
  }
  .login-bg~.el-dialog__wrapper {
    border-radius: 10px;
    overflow: hidden;
    .el-input__inner {
      border-radius: 5px;
      height: 56px;
    }
    .el-form-item__content {
      margin-left: 0;
      text-align: center;
    }
    .el-button {
      width: 136px;
      height: 46px;
      border-radius: 5px;
      font-size: 18px;
    }
    .el-button--primary.is-plain {
      background: white;
      &:hover, &:active {
        background: $--color-warning;
      }
    }
    .el-form-item__label {
      font-size: 16px;
      line-height: 56px;
    }
    .submit-area {
      margin-top: 50px;
    }
    .el-dialog__header {
      background: linear-gradient(to right, $--color-warning, $--color-primary);
      height: 50px;
      color: white;
      padding-top: 10px;
      >span {
        display: flex;
        align-items: center;
        font-size: 20px;
      }
      .header-icon {
        background: url('~assets/img/login/header-icon.png');
        width: 17px;
        height: 19px;
        display: inline-block;
        margin-right: 15px;
      }
      .el-dialog__headerbtn {
        top: 6px;
        font-size: 26px;
      }
      .el-icon-close {
        color: white;
        &:hover, &:active {
          color: white;
        }
      }
    }
  }
</style>