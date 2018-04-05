<template>
  <div>
    <transaction :type="2" />
  </div>
</template>

<script>
import Transaction from '~/components/admin/Transaction'

export default {
  name:'agent-transaction',
  components:{
    Transaction
  }
}
</script>
