<template>
  <div>
    <transaction :type="2" :serverData="serverData" />
  </div>
</template>

<script>
import Transaction from '~/components/admin/Transaction'

export default {
  name:'agent-transaction',
  async asyncData({app}){
    if(process.server) return {serverData:false}
    return {
      serverData:(await app.$axios.$post('user-balance-transaction/get',{type:2})).data || {}
    }
  },
  components:{
    Transaction
  }
}
</script>
