<template>
  <style-guide></style-guide>
</template>

<script>
import styleGuide from '~/docs/style_guide.md'
import docs from '~/util/mixins/docs'
export default {
  head(){
    return {
      title:'编码规范'
    }
  },
  mixins:[docs],
  components:{
    styleGuide
  }
}
</script>
