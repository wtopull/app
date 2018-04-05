<template>
  <invalid-api></invalid-api>
</template>

<script>
import invalidApi from '~/docs/invalid_api.md'

export default {
  head(){
    return {
      title:'问题API'
    }
  },
  scrollToTop: true,
  components:{
    invalidApi
  }
}
</script>
