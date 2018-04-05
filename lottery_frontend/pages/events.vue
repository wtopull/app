<template src="../templates/active.html">

</template>

<style lang="scss">
.active_list{
  .el-collapse-item__header{
    height: 305px;
    line-height: $line-height-base;
  }
  .el-collapse-item__arrow{
    display: none;
  }
  .el-collapse-item__content{
    padding-bottom: 0;
  }
}
</style>


<script>
import '~/assets/c8css/active.css'
import Vue from 'vue'
import { Collapse, CollapseItem } from 'element-ui'
Vue.use(Collapse)
Vue.use(CollapseItem)

const getEvents = context => context.$axios.$post('event/get')

export default {
  name: 'events',
  async asyncData({ app }) {
    if(process.server) return {events:[]}
    return {
      events: (await getEvents(app)).data
    }
  },
  async created(){
    if(!this.events.length) {
      this.events = (await getEvents(this)).data
    }
  },
  methods: {
    change(activeNames){
      if(activeNames.length) {
        this.$axiosPlus('event/find',{id:activeNames[0]},data => {
          console.log('data',data)
        })
      }
    }
  }
}
</script>

