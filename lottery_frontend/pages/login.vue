<template src="../templates/login/index.html"> </template>
<style src="../assets/c8css/login.css">

</style>
<style lang="scss">
  .login-form {
    min-height: 190px;
    width: 70%;
    margin: 60px 60px 60px 0;
    .misc {
      .el-button--text, .el-checkbox__label {
        color: #999;
      }
      .el-checkbox {
        margin-right: 10px;
      }
    }
    .qrcode {
      display: block;
    }
  }
</style>
<script>
  import { DeviceType as device_type } from '~/plugins/UA'
  import { mapMutations, mapGetters, mapState } from 'vuex'
  import { getRequiredRule } from '~/util/validator'
  import { pickBy } from 'lodash/fp'
  import { AsyncMultComp, createQR } from '~/plugins/common'
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
          name: getRequiredRule('请填写用户名'),
          password: getRequiredRule('请输入密码'),
          captcha: getRequiredRule('请填写验证码')
        },
        transable: true,
        reloadTimer: null,
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          },
          paginationClickable: true,
          simulateTouch: false,
          autoplay: 10000,
          loop: true,
          speed: 1400,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
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
        view: ''
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
      login() {
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
        this.$router.push('/home')
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
        this.$axiosPlus('user/get-captcha', {
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
      jQueryRun() {
        //SSR can't DOM manipulation
        if (!this.jQueryRunEnd) {
          // if(process.browser) {
          //     import('~/assets/plugin/swiper.min').then((Swiper) => {
          //         var swiper = new Swiper('.swiper-container', {
          //     pagination : '.swiper-pagination',
          //     paginationClickable :true,
          //     simulateTouch:false,
          //     autoplay: 10000,
          //     loop : true,
          //     speed:1400,
          //     nextButton: '.swiper-button-next',
          //     prevButton: '.swiper-button-prev',
          // });
          //     })
          // }
          $('.down_btn').click(function() {
            // var index=$(this).index();
            $('.box-shade').show()
            $('.box-shade .two_code').show()
          })
          $('.close_list').click(function() {
            $('.box-shade,.two_code').hide()
          })
          // document.querySelector('#cssload-loader').style.display = 'none'
        }
        this.jQueryRunEnd = true
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
      ...mapState(['passwords']),
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