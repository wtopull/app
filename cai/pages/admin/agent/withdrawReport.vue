<template>
  <div>
    <withdrawReport :type="2" />
  </div>
</template>

<script>
import WithdrawReport from '~/components/admin/WithdrawReport'

export default {
  name: 'agent-withdraw-report',
  components:{
    WithdrawReport
  }
}
</script>
