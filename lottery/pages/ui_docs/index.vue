<template>
  <ElementTheme />
</template>

<script>
import ElementTheme from '~/docs/custom-theme/element_theme.md'
import docs from '~/util/mixins/docs'
export default {
  head(){
    return {
      title:'简易UI规范'
    }
  },
  mixins:[docs],
  components:{
    ElementTheme
  }
}
</script>
