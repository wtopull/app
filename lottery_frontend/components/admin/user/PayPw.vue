<template>
  <el-form :model="form" :rules="rules" ref="form" label-width="100px" status-icon>
    <el-form-item label="旧密码" prop="pw" v-if="hasPayPw">
      <el-input ref="pw" type="password" v-model="form.pw"></el-input>
    </el-form-item>
    <el-form-item :label="`${hasPayPw ? '新' : ''}密码`" prop="newPw">
      <el-input ref="newPw" type="password" v-model="form.newPw"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPw">
      <el-input ref="checkPw" type="password" v-model="form.checkPw" @keyup.native.enter="submit"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="close">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { zipObject } from 'lodash/fp'
import { mapGetters, mapMutations } from 'vuex'
import { pwReg, getRequiredRule } from '~/util/validator'
export default {
  props: ['visible','userModel','setUser'],
  data() {
    return {
      form: {
        pw: '',
        newPw: '',
        checkPw: ''
      },
      rules: {
        pw: [
          getRequiredRule('请输入原资金密码'),
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
          getRequiredRule('请输入新资金密码'),
          {
            validator: (rule, value, callback) => {
              if (value === this.form.pw) {
                callback(new Error('新资金密码不能与原資金密码相同'))
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
          getRequiredRule('请确认新资金密码'),
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
          const { hasPayPw } = this
          this.$axiosPlus(
            `user/${hasPayPw ? 'change' : 'create'}-fund-password`,
            zipObject(
              hasPayPw
                ? ['old', 'new', 'confirm'].map(_ => `${_}_password`)
                : ['password', 'confirm_password']
            )(Object.values(this.form).slice(hasPayPw ? 0 : 1)),
            () => {
              this.$message({
                message: `${hasPayPw ? '修改' : '创建'}成功！`,
                type: 'success',
                duration: 1500,
                // onClose:() => logout(this.$store,this.$router)
                onClose: () => {
                  this.close()
                  !hasPayPw &&
                    setTimeout(() => {
                      this.setUser({
                        ...this.userModel,
                        is_set_fund_password: true
                      })
                    }, 300)
                }
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
    // ...mapMutations(['setUser'])
  },
  computed: {
    ...mapGetters(['hasPayPw'])
  },
  mounted() {
    this.$form = this.$refs.form
  }
}
</script>