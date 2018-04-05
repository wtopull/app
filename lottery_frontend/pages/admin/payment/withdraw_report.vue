<template>
  <div>
    <withdrawReport :serverData="serverData" />
  </div>
</template>

<script>
import WithdrawReport from '~/components/admin/WithdrawReport'

export default {
  name: 'user-withdraw-report',
  async asyncData({app}){
    if(process.server) return {serverData:false}
    return {
      serverData:(await app.$axios.$post('user-bank-withdraw/get')).data || {}
    }
  },
  components:{
    WithdrawReport
  }
}
</script>
