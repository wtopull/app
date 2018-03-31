<template src="../../../templates/admin/payment/third-platform.html">
</template>

<style lang="scss" src="../../../assets/scss/admin/third-platform.scss">

</style>


<script>
import { mapState,mapGetters, mapActions, mapMutations } from 'vuex'
import { isMobile } from '~/plugins/UA'
import {camelCase} from 'lodash'
import { pwReg, getRequiredRule } from '~/util/validator'

const initTransList = _ => ({
  ..._,
  disabled: _.prefix === 'NVR'
})

export default {
  name: 'third-platform',
  async asyncData({ app, store }) {
    const { data: list } = await app.$axios.$post(
      'static-data/third-party-game-platform'
    )
    const availableList = list.filter(
      _ =>
        _[`${isMobile ? 'mobile' : 'web'}_status`] !== 2 &&
        store.getters._3rdPlatformPrefix.includes(_.prefix)
    )
    const self = [{ prefix: 'self', name: '彩票' }]
    const transInList = self.concat(availableList.map(initTransList))
    const transOutList = self.concat(availableList.map(initTransList))
    const loadings = [...Array(list.length)]
    return {
      list,
      transInList,
      transOutList,
      loadings
    }
  },
  data() {
    return {
      types: ['in', 'out'],
      loading: false,
      form: {
        pw: '',
        transIn: '',
        transOut: '',
        transable: true,
        amount: '1000'
      },
      rules: {
        transIn: [getRequiredRule('请选择平台', 'change')],
        transOut: [
          getRequiredRule('请选择平台', 'change'),
          {
            validator: (rule, value, callback) => {
              const { form } = this
              if (
                !form.transable &&
                (this.isTransOut
                  ? this.bal
                  : this.availableGames[form.transOut].balance) < form.amount
              ) {
                callback(new Error('余额不足！'))
              }
              callback()
            },
            trigger: 'blur'
          }
        ],
        pw: [
          getRequiredRule('请输入资金密码')
          // {
          //   validator: (rule, value, callback) => {
          //     if (!pwReg.test(value)) {
          //       callback(new Error('密码必须字母数字组合,6-18个字符'))
          //     }
          //     callback()
          //   },
          //   trigger: 'blur'
          // }
        ]
      },
      hotAmount: '1000',
      hotAmounts: ['1000', '5000', '10000', '全部余额']
    }
  },
  created() {
    this.$store.dispatch('get3rdGames')
  },
  methods: {
    getStatus(item) {
      if (item[`${isMobile ? 'mobile' : 'web'}_status`] === 2) {
        return '未开放'
      } else if (this._3rdPlatformPrefix.includes(item.prefix) && item.prefix !== 'NVR') {
        return '进入'
      } else {
        return '注册'
      }
    },
    change(val, type) {
      const reverseProp = camelCase(`trans ${this.types.find(_ => _ !== type)}`)
      const reverseList = this[reverseProp + 'List']
      const isSelf = this.form[camelCase(`trans ${type}`)] === 'self'
      reverseList.forEach(
        (v, k) => k !== 0 && v.prefix !== 'NVR' && (v.disabled = !isSelf)
      )
      this.form[reverseProp] = isSelf ? '' : 'self'
      this.hotAmount === '全部余额' && this.hotAmountChange('全部余额')
    },
    hotAmountChange(amount) {
      const { form } = this
      this.form.amount =
        amount === '全部余额'
          ? this.isTransOut
            ? this.bal
            : form.transOut
              ? this.availableGames[form.transOut].balance
              : form.amount
          : amount
    },
    amountChange(amount) {
      this.hotAmount = this.hotAmounts.find(_ => _ == amount) || ''
    },
    reset() {
      this.$form.resetFields()
      this.loading = false
      this.form.amount = this.hotAmount = '1000'
      this.form.transIn = this.form.transOut = ''
      this.transInList = this.transInList.map(initTransList)
      this.transOutList = this.transOutList.map(initTransList)
    },
    sign(item, index) {
      const isSignUp = this.getStatus(item) === '注册'
      const { prefix: platform } = item
      //Vue cannot detect property additions
      this.$set(this.loadings,index,true)
      this.$axiosPlus(
        `third-party-game/${isSignUp ? 'register' : 'login'}`,
        { platform },
        _ => {
          this.$set(this.loadings,index,false)
          this.$message({
            message: `${platform}${isSignUp ? '注册' : '登录'}成功！`,
            type: 'success',
            duration: 1500,
            onClose: () => {
              if (isSignUp) {
                this.transInList.push(this.list[index])
                this.transOutList.push(this.list[index])
              }
            }
          })
          if (isSignUp) {
            this.setState({
              key: '_3rdGames',
              value: { ...this.availableGames, [platform]: { balance: 0 } }
            })
            this.setUser({
              ...this.userModel,
              third_party_game_platform_prefix:
                this._3rdPlatformPrefix + `,${platform}`
            })
          }
        }
      )
    },
    sumbit() {
      this.form.transable = false
      this.$form.validate(valid => {
        if (valid) {
          const { pw, amount } = this.form
          const { isTransOut } = this
          const type = this.isTransOut ? 1 : 2
          const platform = this.form[camelCase(`trans ${this.types[type - 1]}`)]
          this.loading = true
          this.$axiosPlus(
            'third-party-game/transfer',
            {
              type,
              user_password: pw,
              platform,
              money: amount
            },
            _ => {
              this.loading = false
              this.reset()
              this.$message({
                message: `转${isTransOut ? '入' : '出'}${platform}成功！`,
                type: 'success',
                duration: 1500,
                onClose: () => {
                  const { availableGames } = this
                  this.getBal()
                  this.setState({
                    key: '_3rdGames',
                    value: {
                      ...availableGames,
                      [platform]: {
                        balance:
                          +availableGames[platform].balance +
                          +amount * (isTransOut ? 1 : -1)
                      }
                    }
                  })
                }
              })
            }
          )
        } else {
          this.form.transable = true
          return false
        }
      })
    },
    ...mapActions({ getBal: 'pay/getBal' }),
    ...mapMutations(['setState', 'setUser'])
  },
  computed: {
    isTransOut() {
      return this.form.transOut === 'self'
    },
    ...mapState({
      userModel:'user'
    }),
    ...mapGetters({
      bal: 'pay/bal',
      totalBal: 'pay/totalBal',
      availableGames: '_3rdGames'
    }),
    ...mapGetters(['_3rdPlatformPrefix'])
  },
  mounted() {
    this.$form = this.$refs.form
  }
}
</script>
