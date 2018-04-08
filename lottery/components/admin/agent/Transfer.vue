<template>
  <el-form :model="form" :rules="rules" status-icon label-width="8em" ref="form">
    <el-form-item label="转入账户：">
      {{name}}
    </el-form-item>
    <el-form-item label="转账金额：" prop="amount">
      <el-input-number v-model="form.amount" controls-position="right" :min="1"></el-input-number>
    </el-form-item>
    <el-form-item label="资金密码：" prop="pw">
      <el-input v-model="form.pw" :min="1" type="password" @keyup.native.enter="submit"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="submit" type="primary">提交</el-button>
      <el-button @click="close">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions } from 'vuex'
import { getRequiredRule } from '~/util/validator'
import { plus } from 'number-precision'
export default {
  name: 'transfer',
  props: ['editorData','visible'],
  data() {
    return {
      form: {
        amount: '',
        pw: ''
      },
      rules: {
        pw: getRequiredRule('请输入资金密码')
      }
    }
  },
  methods: {
    close() {
      this.$emit('update:visible',false)
    },
    submit() {
      this.$form.validate(valid => {
        if (valid) {
          const { amount, pw: fund_password } = this.form
          this.$axiosPlus(
            'user/trans-child',
            { fund_password, amount, child_user_id: this.id },
            data => {
              this.$message({
                message: '转账成功！',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.close()
                  const _amount = this.editorData.amount
                  Object.assign(this.editorData, {
                    amount: plus(amount, _amount)
                  })
                  this.getBal()
                }
              })
            }
          )
        } else {
          return false
        }
      })
    },
    ...mapActions({
      getBal: 'pay/getBal'
    })
  },
  computed: {
    name() {
      return this.editorData.name
    },
    id() {
      return this.editorData.id
    }
  },
  mounted() {
    // this.$emit('update:dialogMounted','Transfer')
    // this.$nextTick(() => (this.$form = this.$refs.form))
    this.$form = this.$refs.form
  }
}
</script>
