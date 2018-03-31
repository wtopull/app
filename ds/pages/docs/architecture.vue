<template>
  <component :is="view"></component>
</template>

<script>
import Api from '~/docs/architecture/api.md'
import HttpClient from '~/docs/architecture/http_client.md'
import ErrorCode from '~/docs/architecture/error_code.md'
import Issues from '~/docs/architecture/issues.md'
import { camelCase, kebabCase } from 'lodash'
import docs from '~/util/mixins/docs'
export default {
  head() {
    return {
      title: `框架详解 ${kebabCase(this.view).replace('-', ' ')}`
    }
  },
  mixins: [docs],
  components: {
    Api,
    HttpClient,
    ErrorCode,
    Issues
  },
  computed: {
    view(){
      this.$nextTick(this._blank) // just do it
      return camelCase(this.$route.query.view)
    }
    // view: {
    //   get(){
    //     return camelCase(this.$route.query.view)
    //   },
    //   //fail
    //   set(){
    //     this.$nextTick(this._blank)
    //   }
    // }
  }
}
</script>
