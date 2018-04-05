<template>
  <div>
    <lotto-order :type="2" />
  </div>
</template>

<script>
import LottoOrder from '~/components/admin/LottoOrder'

export default {
  name:'agent-lotto-order',
  components:{
    LottoOrder
  }
}
</script>
