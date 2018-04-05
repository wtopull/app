<template src="../../templates/signup/regist.html">
</template>

<style lang="scss">
#cssload-loader {
  display: none;
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
import '~/assets/c8css/regist.css'
import { zipObject } from 'lodash/fp'
import {apiIdValidate} from '~/plugins/common'
export default {
  name: 'sign-up',
  layout: 'empty',
  fetch({ app, store, params: { id }, error }) {
    // if(!isInteger(+params.sys_id)) {
    //   return error({ message: '注册编号无效' })
    // }
    if(apiIdValidate(id,'注册编号无效',error) === true) {
      return Promise.resolve()
    }
  },
  data() {
    return {
      form: {
        name: '',
        pw: '',
        realName: '',
        nickName: ''
      },
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
      }
    }
  },
  methods: {
    submit() {
      const client_ip = this.$store.state.user.ip
      const user_register_link_id = this.$route.params.id
      this.$axiosPlus(
        'user-register-link/open-account',
        {
          ...zipObject(['name', 'password', 'real_name', 'nick_name'])(
            Object.values(this.form)
          ),
          client_ip,
          user_register_link_id
        },
        data => {
          this.$message({
            message: '注册成功！',
            type: 'success'
          })
        }
      )
    }
  }
}
</script>