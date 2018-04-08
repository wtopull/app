<template>
  <div>
    <lotto-order :type="2" :serverData="serverData" />
  </div>
</template>

<script>
import LottoOrder from '~/components/admin/LottoOrder'

export default {
  name:'agent-lotto-order',
  async asyncData({app}){
    if(process.server) return {serverData:false}
    return {
      serverData:(await app.$axios.$post('user-bet-lottery/get',{type:2})).data || {}
    }
  },
  components:{
    LottoOrder
  }
}
</script>
