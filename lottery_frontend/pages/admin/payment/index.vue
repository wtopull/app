<template src="../../../templates/admin/payment/charge.html">

</template>

<style lang="scss">

</style>


<script>
import { mapGetters } from 'vuex'
import { getRequiredRule, validNumber } from '~/util/validator'
import { delayAjax } from '~/plugins/ajax'
const getPayments = context => context.$axios.$post('payment-platform/get')

export default {
  name: 'charge',
  async asyncData({ store, app }) {
    if (process.server) return { types: [] }
    return (await getPayments(app)).data
  },
  data() {
    return {
      typeIndex: 0,
      step: 0,
      payIndex: 0,
      form: {
        data: '',
        link: '',
        signature: '',
        amount: ''
      },

      rules: {
        amount: [
          getRequiredRule('请填写充值金额'),
          validNumber('', { intMsg: false })
        ]
      },

      chargeId: '',
      note: ''
    }
  },
  created() {
    if (!this.types.length) {
      // delayAjax can't use async/await
      delayAjax(this.$axios, this.$store, () =>
        getPayments(this).then(({ data }) => (this.types = data.types))
      )
    }
  },
  methods: {
    submit() {
      this.$form.validate(valid => {
        if (valid) {
          const {
            client_ip,
            bankList,
            platform: { content },
            payItem: { id: bank_id, public_bank_card_id },
            note: postscript
          } = this
          const { amount } = this.form
          const id = content.id
          //todo : location.origin -> location.href ,require f5 refresh fix
          this.$axiosPlus(
            'payment-platform/deposit',
            {
              id,
              client_ip,
              amount,
              redirect: location.origin,
              ...(content.need_bank
                ? {
                    bank_id,
                    ...(public_bank_card_id
                      ? { public_bank_card_id, postscript }
                      : {})
                  }
                : {})
            },
            res => {
              if (res.request_error) {
                this.$message.error({
                  duration: 2000,
                  message: res.request_error || '该商户号通道已关闭！'
                })
              } else if (res.request_url || res.request_qrcode_url) {
                const {
                  request_data: { signature, data },
                  request_url: link,
                  deposit_id
                } = res
                this.chargeId = deposit_id
                this.step = 1
                this.form = { link, signature, data, amount }
              } else {
                this.$message.success({
                  duration: 2000,
                  message: '转账成功！'
                })
              }
            }
          )
        } else {
          return false
        }
      })
    }
  },
  computed: {
    platform() {
      return this.types.length
        ? this.types[this.typeIndex].payment_platforms[0]
        : {}
    },
    bankList() {
      const { banks, content } = this.platform
      if (!banks) return []
      return banks.length ? banks.map(_ => _.content) : [content]
    },
    payItem() {
      return this.bankList.length ? this.bankList[this.payIndex] : {}
    },
    isTransfer() {
      return this.payItem.public_bank_card_id
    },
    ...mapGetters({
      bal: 'pay/bal',
      client_ip: 'ip'
    })
  },
  mounted() {
    this.$form = this.$refs.form
  }
}
</script>
