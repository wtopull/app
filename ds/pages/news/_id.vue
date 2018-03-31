<template src="../../templates/notice.html">
  
</template>

<style lang="scss">
.notice{
  a{
    color:$--color-text-primary;
  }
}
</style>

<script>
import '~/assets/c8css/notice.css'
import {apiIdValidate} from '~/util/validator'

import News from '~/components/News'
import cache from '~/util/cache'
const getdetail = (context,id) => context.$axios.$post('news-info/get-detail',{id})

export default {
  name:'news',
  async asyncData({store,app,params:{id},error}){
    if(apiIdValidate(id,'公告不存在',error) === true) {
      store.dispatch('getNews')
      const item = cache.news[id]
      if(item) {
        return item
      }
      if(id) {
        return (await getdetail(app,id)).data
      }
      return {
        id:'',
        content:''
      }
    }
  },
  created(){
    this.store({...this.news.find(_ => _.id === this.id),content:this.content})
  },
  components:{
      News
  },
  methods:{
    store(data){
      cache.news[this.id] = data
    },
    async change(id){
      let item = cache.news[id]
      if(item) {
        this.id = id
        return this.content = item.content
      }
      let {data} = await getdetail(this,id)
      Object.assign(this,data)
      this.store(data)
    }
  },
  computed: {
    news() {
      return this.$store.state.news
    }
  } 
}
</script>
