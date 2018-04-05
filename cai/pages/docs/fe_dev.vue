<template>
  <fe-dev></fe-dev>
</template>

<script>
import feDev from '~/docs/fe_dev.md'

export default {
  head(){
    return {
      title:'前端未实现'
    }
  },
  scrollToTop: true,
  components:{
    feDev
  }
}
</script>
