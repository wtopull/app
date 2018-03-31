<template>
  <div>
    <transaction :serverData="serverData" />
  </div>
</template>

<script>
import Transaction from '~/components/admin/Transaction'

export default {
  name:'user-transaction',
  async asyncData({app}){
    if(process.server) return {serverData:false}
    return {
      serverData:(await app.$axios.$post('user-balance-transaction/get')).data || {}
    }
  },
  components:{
    Transaction
  }
}
</script>
