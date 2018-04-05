<template src="../../../templates/admin/payment/charge.html">

</template>

<script>
import { mapGetters } from 'vuex'

const getPayments = context => context.$axios.$post('payment-platform/get')

export default {
  name: 'charge',
  async asyncData({ store, app }) {
    if (!store.state.user.token) return { types: [] }
    return (await getPayments(app)).data
  },
  data() {
    return {
      typeIndex: 0,
      step: 0,
      payIndex: 0,
      amount: '',
      form: {
        data: '',
        link: '',
        signature: ''
      },
      note: ''
    }
  },
  created() {},
  methods: {
    submit() {
      const {
        client_ip,
        bankList,
        amount,
        platform: { content },
        payItem: { id: bank_id, public_bank_card_id },
        note: postscript
      } = this
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
          } else if (res.request_url) {
            const {
              request_data: { signature, data },
              request_url: link
            } = res
            this.step = 1
            this.form = { link, signature, data }
          } else {
            this.$message.success({
              duration: 2000,
              message: '转账成功！'
            })
          }
        }
      )
    }
  },
  computed: {
    platform() {
      return this.types[this.typeIndex].payment_platforms[0]
    },
    bankList() {
      const { banks, content } = this.platform
      return banks.length ? banks.map(_ => _.content) : [content]
    },
    payItem() {
      return this.bankList[this.payIndex]
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
