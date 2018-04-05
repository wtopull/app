<template>
  <errorPage :error="{message:''}" />
</template>

<script>
import errorPage from '~/layouts/error'

export default {
  name:'not-found',
  layout:'empty',
  components:{
    errorPage
  }
}
</script>
