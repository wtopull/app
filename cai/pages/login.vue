<template src="../templates/login/index.html">
</template>
<style>
.qrcode {
}
</style>
<script>
import '~/assets/c8css/login.css'
import { DeviceType } from '~/plugins/UA'
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'login',
  layout: 'empty',
  data() {
    return {
      form: {
        name: `frank0${process.env.NODE_ENV === 'production' ? 2 : 1}`,
        password: '1234',
        device_type: DeviceType
      },
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
      qrImgSrc: '',
      randCode: '',
      qrTimer: null
    }
  },
  watch: {
    isLogout(val) {
      val && this.reload(val)
    }
  },
  async created() {
    //fix app.html #cssload-loader
    process.browser && this.$root.$el.classList.add('loaded')


    this.qrImgSrc = await (await import('qrcode')).toDataURL(
      (this.randCode = (await this.$axios.$post(
        'user-login-qr-code/create'
      )).data.rand_code),
      { width: 150, height: 150, margin: 1 }
    )
    this.checkQrLogin()
    document.addEventListener("visibilitychange", this.handleVisibilityChange)
  },
  methods: {
    login() {
      const { ip } = this
      this.$axiosPlus(
        '/user/login',
        { ip, ...this.form },
        data => {
          if (data.message) {
            //errorCode 100102 不存在的用户
            // 100131 密码错误
            this.errorMsg = data.message
          } else if (data.user_token) {
            this.done(data)
          }
        },
        { errCb: true, showError: false }
      )
    },
    done(data) {
      const {
        user_token: { token, expired_at: expires },
        user,
        user_balance_account,
        user_role: role
      } = data
      this.$axios.setHeader('Token', token)
      this.setUser({ token, expires, role, ...user, ip:this.ip })
      this.setBal(user_balance_account)
      this.$router.push('/home')
    },
    reload(errorCode) {
      this.$message({
        message: `${errorCode === 102901
          ? '网络超时，请'
          : errorCode === 100002 ? '系统更新，请稍后' : ''}重新登录！`,
        type: 'error'
      })
      this.reloadTimer = setTimeout(() => (location.href = '/'), 1e4)
    },
    ...mapMutations({
      setUser: 'setUser',
      setBal: 'pay/setBal'
    }),
    checkQrLogin() {
      this.$axiosPlus(
        'user-login-qr-code/login-info',
        { rand_code: this.randCode },
        data => {
          if (!data.user_token && !document.hidden) {
            this.qrTimer = setTimeout(this.checkQrLogin, 2000)
          } else {
            clearTimeout(this.qrTimer)
            this.done(data)
          }
        }
      )
    },
    handleVisibilityChange(){
      document.hidden ? clearTimeout(this.qrTimer) : this.checkQrLogin()
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
    }
  },
  computed: {
    ...mapGetters(['ip']),
    isLogout() {
      return this.$store.state.isLogout
    }
  },
  mounted() {
    const { isLogout } = this
    if (isLogout === true) {
      this.$message({
        message: '登出成功！',
        type: 'success'
      })
    } else if (typeof isLogout === 'number') {
      this.reload(isLogout)
    }
  },
  destroyed() {
    clearTimeout(this.reloadTimer)
    clearTimeout(this.qrTimer)
    document.removeEventListener('visibilitychange',this.handleVisibilityChange)
  }
}
</script>
