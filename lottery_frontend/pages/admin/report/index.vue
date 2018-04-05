<template>
  <lotto-order :serverData="serverData" />
</template>

<script>
import LottoOrder from '~/components/admin/LottoOrder'

export default {
  name:'user-lotto-order',
  async asyncData({app}){
    if(process.server) return {serverData:false}
    return {
      serverData:(await app.$axios.$post('user-bet-lottery/get')).data || {}
    }
  },
  components:{
    LottoOrder
  }
}
</script>
