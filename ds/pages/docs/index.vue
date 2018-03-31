<template>
  <awesome />
</template>

<script>
import Awesome from '~/docs/awesome.md'
import docs from '~/util/mixins/docs'
export default {
  head(){
    return {
      title:'technology stack '
    }
  },
  mixins:[docs],
  components:{
    Awesome
  }
}
</script>
