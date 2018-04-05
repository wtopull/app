<template src="../templates/domains.html">

</template>

<style src="../assets/c8css/domains.css">

</style>


<style>
#cssload-loader {
  display: none;
}
</style>


<script>
//loacal node.js f5 refresh fail,but ubuntu can be success
// https://github.com/axios/axios/issues/543

// import request from 'superagent'
//localhost f5 refresh ECONNREFUSED error,but Ubuntu success
const check = async (context,{ page = 0, limit_type = 1, identify = 'alpha' } = {}) =>
  (await context.$axios.$get('/sys-report', {
    params: {
      identify,
      page,
      limit_type
    },
    baseURL:'/'
  })).data

  // request.get('/sys-report').query({
  //   identify,
  //   page,
  //   limit_type
  // })

export default {
  name: 'domains',
  layout: 'empty',
  async asyncData({app}) {
    if(process.server) return {list:[]}
    return await check(app)
    // return (await check()).body.data //superagent use body
  },
  created(){
    if(!this.list.length) {
      this.check()
    }
  },
  methods: {
    async check() {
      Object.assign(this, await check(this))
    }
  }
}
</script>
