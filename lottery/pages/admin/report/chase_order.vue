<template>
  <lotto-order :isChase="true" :serverData="serverData" />
</template>

<script>
import LottoOrder from '~/components/admin/LottoOrder'

export default {
  name:'user-chase-order',
  async asyncData({app}){
    if(process.server) return {serverData:false}
    return {
      serverData:(await app.$axios.$post('user-chase-bet-lottery/get')).data || {}
    }
  },
  components:{
    LottoOrder
  }
}
</script>
