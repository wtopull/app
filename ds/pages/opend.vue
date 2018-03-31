<template>
  <div>
      <h3>彩种已开奖期</h3>
    <ul>
      <li v-for="{opened_at,issue_no} in openList" :key="issue_no">
        {{opened_at}} {{issue_no}}
      </li>
    </ul>
  </div>

</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  name:'open-list',
  async asyncData({app,store}){
    if(!store.state.access_token) return {openList:[]}
    return {
      openList:(await app.$axios.$post('lottery-issue/get-lottery-info-opened')).data.issues.map(_ => ({..._.content}))
    }
  },
  methods:{
    authResolve(){
      this.$axiosPlus('lottery-issue/get-lottery-info-opened',({issues}) => {
        this.openList = issues.map(_ => ({..._.content}))
      })
    }
  }
}
</script>
