<template src="../../../templates/admin/payment/withdraw.html"> </template>

<style lang="scss">
.withdraw-form {
  .el-select,
  .el-input {
    width: 170px;
  }
  .el-input {
    margin-right: 10px;
  }
}
</style>


<script>
import { mapGetters, mapActions } from 'vuex'
import { pick, zipObject } from 'lodash/fp'
import { delayAjax } from '~/plugins/ajax'
import cache from '~/util/cache'
import { getRequiredRule } from '~/util/validator'
const isSever = process.server

const getInfo = async context =>
  (await context.$axios.$post('user-balance-account/get-account-info')).data

const setBal = (store, data) =>
  store.commit(
    'pay/setBal',
    pick(['allow_withdraw_balance', 'total_balance', 'frozen_balance'])(data)
  )

const BIND_CARD_URL = '/admin/user?noBankCards=true'

export default {
  name: 'withdraw',
  async fetch({ store, redirect }) {
    if (isSever) return Promise.resolve()
    if (!store.getters.hasPayPw) {
      redirect('/admin/user?paypw=true')
    }
    if (cache.isRequestBankCards) {
      if (!store.getters['pay/bankCards'].length) redirect(BIND_CARD_URL)
      return Promise.resolve()
    }
    await store.dispatch('pay/getBankCards')
    if (!store.getters['pay/bankCards'].length) redirect(BIND_CARD_URL)
    return Promise.resolve()
  },
  async asyncData({ app, store }) {
    if (
      isSever ||
      (cache.isRequestBankCards && !store.getters['pay/bankCards'].length)
    )
      return {
        lottery_to_consume: '',
        withdraw_amount_today: 0,
        withdraw_count_today: 0,
        withdraw_limit_amount_per_day: '',
        withdraw_limit_count_per_day: 0,
        withdraw_count_without_fee: ''
      }
    const data = await getInfo(app)
    setBal(store, data)
    return data
  },
  data() {
    const form = {
      bankId: '',
      amount: '',
      pw: ''
    }
    return {
      payIndex: 0,
      game_acc: [
        {
          name: '彩票账户'
        },
        {
          name: '百家乐账户'
        },
        {
          name: '快乐彩账户'
        }
      ],
      form,
      rules: {
        bankId: [
          getRequiredRule('请选择银行卡'),
          {
            validator: (rule, value, callback) => {
              if (
                +new Date(
                  this.bankCards.find(_ => value === _.id).end_locked_at
                ) >= Date.now()
              ) {
                return callback(new Error('该银行卡已锁定'))
              }
              callback()
            },
            trigger: 'change'
          }
        ],
        amount: [
          getRequiredRule('请输入提现金额'),
          {
            validator: (rule, value, callback) => {
              if (value > this.availableAmount) {
                return callback(
                  new Error(`提现金额不能超过${this.availableAmount}！`)
                )
              }
              callback()
            },
            trigger: 'blur'
          }
        ],
        pw: getRequiredRule('请输入资金密码')
      }
    }
  },
  created() {
    if (!cache.isRequestBankCards) {
      delayAjax(this.$axios, this.$store, () => {
        this.$store.dispatch('pay/getBankCards').then(() => {
          if (this.bankCards.length) {
            getInfo(this).then(data => {
              Object.assign(this, data)
              setBal(this.$store, data)
            })
          } else {
            this.$router.push(BIND_CARD_URL)
          }
        })
      })
    }
  },
  methods: {
    submit() {
      this.$form.validate(valid => {
        if (valid) {
          const { form, client_ip } = this
          this.$axiosPlus(
            'user-bank-withdraw/create',
            {
              ...zipObject(['user_bank_id', 'amount', 'fund_password'])(
                Object.values(form)
              ),
              client_ip
            },
            data => {
              this.getBal()
              this.$message({
                message: `提现成功！`,
                type: 'success',
                duration: 1500
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
    currentCard() {
      return this.bankCards.find(_ => _.id === this.form.bankId)
    },
    availableAmount() {
      const { bal, currentCard } = this
      return Math.min(bal, currentCard && currentCard.bank_max_withdraw_load)
    },
    frozenBal() {
      return this.$store.state.pay.bal.frozen_balance
    },
    ...mapGetters({
      bal: 'pay/bal',
      client_ip: 'ip',
      totalBal: 'pay/totalBal',
      bankCards: 'pay/bankCards'
    })
  },
  mounted() {
    this.$form = this.$refs.form
  }
}
</script>
