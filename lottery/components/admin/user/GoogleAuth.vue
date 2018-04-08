<template>
  <div>
    <div v-if="GA">
      解除Google身份验证器绑定
      <br> 解除绑定后再次绑定Google验证器请重新扫描二维码
    </div>
    <div v-else>
      安装Google身份验证器 （
      <a href="https://support.google.com/accounts/answer/1066447" target="_black" class="text-muted">点击查看使用说明</a>）
      <div>
        <img class="qrcode" :src="qrImgSrc" alt="qrcode">

      </div>
    </div>
    <el-form :model="form" ref="form" label-width="100px" status-icon>
      <el-form-item label="动态密码：" prop="GAkey" :rules="GARules">
        <el-input v-model="form.GAkey" @keyup.native.enter="submit"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped>
.qrcode {
  height: 150px;
  display: block;
}
</style>
<script>
import { getRequiredRule, validNumber } from '~/util/validator'
import { createQR } from '~/plugins/common'
import cache from '~/util/cache'
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'google-auth',
  props: ['visible', 'userModel', 'setUser'],
  data() {
    return {
      qrImgSrc: '',
      form: {
        GAkey: ''
      },
      GARules: [
        getRequiredRule('请输入谷歌验证码'),
        validNumber('谷歌验证码必须为数字', { isPositive: false }),
        {
          validator: (rule, value, callback) => {
            if (value < 0) {
              callback(new Error('不能为负值'))
            } else {
              callback()
            }
          }
        }
      ]
    }
  },
  watch: {
    visible(val) {
      val && this.createQR()
    }
  },
  created() {
    this.createQR()
  },
  methods: {
    // async create() {
    //   this.qrImgSrc = await (await import(/* webpackChunkName: "qrcode" */ 'qrcode')).toDataURL(
    //     (this.randCode = (await this.$axios.$post(
    //       'user-login-google-code/create'
    //     )).data.google_secret_key),
    //     { width: 150, height: 150, margin: 1 }
    //   )
    // },
    async createQR() {
      if (this.GA) return
      const GAQrImgSrc = cache.GAQrImgSrc[this.username]
      if (GAQrImgSrc) return (this.qrImgSrc = GAQrImgSrc)
      // this.create()
      await createQR(this, 'user-login-google-code/create', 'google_secret_key')
      cache.GAQrImgSrc[this.username] = this.qrImgSrc
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { GA } = this
          this.$axiosPlus(
            `user-login-google-code/${GA ? 'close' : 'check'}`,
            { code: this.form.GAkey },
            () => {
              this.$message({
                message: `${GA ? '解绑' : '绑定'}成功！`,
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.close()
                  this.setUser({
                    ...this.userModel,
                    is_open_google: !GA
                  })
                  this.setState({
                    key: 'GACollection',
                    value: {
                      ...this.GACollection,
                      [`${this.username}`]: !GA
                    }
                  })
                }
              })

              GA && (cache.GAQrImgSrc[this.username] = '')
            }
          )
        } else {
          return false
        }
      })
    },
    close() {
      this.$emit('update:visible', false)
    },
    ...mapMutations(['setState'])
  },
  computed: {
    ...mapGetters(['GA', 'username']),
    ...mapState(['GACollection'])
  },
  mounted() {
    this.$form = this.$refs.form
  }
}
</script>
