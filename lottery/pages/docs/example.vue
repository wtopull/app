<template>
<component :is="view" class="code-example"></component>
</template>

<style lang="scss">
.code-example{
  .hljs-comment{
    font-style: normal;
  }
}
</style>


<script>
import thirdPlatform from '~/docs/example/third-platform.md'
import { camelCase, kebabCase } from 'lodash'
import docs from '~/util/mixins/docs'
export default {
  head() {
    return {
      title: `程序范例-${kebabCase(this.view).replace('-', ' ')}`
    }
  },
  mixins:[docs],
  components: {
    thirdPlatform
  },
  computed:{
    view(){
      this.$nextTick(this._blank)
      return camelCase(this.$route.query.view)
    }
  }
}
</script>
