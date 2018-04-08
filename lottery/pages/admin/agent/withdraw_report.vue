<template>
  <div>
    <withdrawReport :serverData="serverData" :type="2" />
  </div>
</template>

<script>
import WithdrawReport from '~/components/admin/WithdrawReport'

export default {
  name: 'agent-withdraw-report',
  async asyncData({app}){
    if(process.server) return {serverData:false}
    return {
      serverData:(await app.$axios.$post('user-bank-withdraw/get',{type:2})).data || {}
    }
  },
  components:{
    WithdrawReport
  }
}
</script>
