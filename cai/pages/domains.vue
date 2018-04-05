<template src="../templates/domains.html">

</template>

<script>
import '~/assets/c8css/domains.css'
import axios from 'axios'

const check = ({page = 0,limit_type = 1,identify = 'alpha'} = {}) => axios.get('/sys-report', {
  params: {
    identify,
    page,
    limit_type
  }
})

export default {
  name: 'domains',
  layout: 'empty',
  async asyncData() {
    return (await check()).data.data
  },
  methods: {
    async check() {
      Object.assign(this,(await check()).data.data)
    }
  }
}
</script>

