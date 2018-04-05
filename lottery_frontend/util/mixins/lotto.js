import { mapGetters,mapActions } from 'vuex'
import Issue,{exampleIssue} from '~/components/lotto/Issue'
// pages\lottery\_name.vue import common,mixins can't import common
// import { exampleIssue } from '~/plugins/common'

import trendCfg from '~/util/trend-config'
import '~/assets/c8css/lottery.css'

const issue_no = exampleIssue()

export default {
  head() {
    const type = `${this.betType[1][0]}彩票`
    const title = this.lottoId ? `${type} ${this.lottoShowName}` : ''
    return {
      //https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-optional-chaining 
      // babel 7.0
      title,
      meta: [
        { hid: 'description', name: 'description', content: title }
      ]
    }
  },
  provide() {
    return {
      lottoRoot: this
    }
  },
  data(){
    return {
      issueData:{},
      issueList:[],
      issue:issue_no
    }
  },
  components:{
    Issue,
  },
  created(){
    // if(this.access_token){
    if(this.lotto){
      this.getIssue()
      this.getIssueList()
      this.getBal()
    }else{
      this.authResolve()
    }
  },
  methods:{
    getIssue(cb){
      //brower F5 refresh button require authResolve,so getIssue use in parent vue not issue.vue
      this.$axiosPlus('lottery-issue/find-info',{lottery_id:this.lottoId},(data) => {
        this.issueData = data
        this.issue = data.no_open_newest.issue_no
        cb && cb()
      })
    },
    getIssueList(){
      this.$axiosPlus('lottery-issue/get-opened-by-limit-type',{lottery_id:this.lottoId,limit_type :1},({issues}) => this.issueList = issues.map(_ => ({..._.content})))
    },
    checkOrder(msg = '选号有误！'){
      this.$msgbox(msg, '提示')
    },
    checkBal(val){
      return this.totalBal < val ? this.$message.error({duration:2000,message:'余额不足'}) : true
    },
    getIssueRef(){
      //computed props can't pass children components
      return this.$refs.issue
    },
    getMaxBonus(playMax){
      if(!this.lotto) return 0
      // int 玩家 1960
      // int 彩種 1900
      // int 玩法 1950

      // 上限 = 彩種; //1900
      // if (玩法存在) {
      //  上限 = 玩法; //1950
      // }

      // if (玩家 < 上限) {
      //  上限 = 玩家; 
      // }
      // 最終上限 = 上限 //1950
      const userMax = this.bonusGroup
      let max = playMax || this.lotto.max_bet_prize_group || userMax
      return userMax < max  ? userMax : max
    },
    ...mapActions({
      getBal:'pay/getBal'
    })
  },
  computed:{
    ...mapGetters({
      listMap:'lotto/listMap',
      bal:'pay/bal',
      totalBal:'pay/totalBal',
    }),
    ...mapGetters([
      'lottoName',
      'point',
      'bonusGroup',
      'ip',
      'loading'
    ]),
    betType(){
      const type = ['lottery','reposal']
      const name = ['官方','信用']
      if(this.$route.name.includes('reposal')) {
        type.reverse()
        name.reverse()
      }
      return [type,name]
    },
    lotto(){
      return this.listMap[this.lottoName]
    },
    lottoId(){
      return this.lotto ? this.listMap[this.lottoName].id : ''
    },
    lottoType(){
      return this.lotto ? this.lotto.type : ''
    },
    lottoShowName(){
      return this.lotto ? this.listMap[this.lottoName].name : ''
    },
    isPlayCodeDouble(){
      return ['11x5','pk10'].some(type => this.lottoType === type)
    },
    trendHref(){
      const lid = trendCfg[this.lottoName]
      return lid ? `http://www.happy916.com/chart.html?lid=${lid}` : false
    }
  },
  mounted(){
    this.$issue = this.$refs.issue
    this.$order = this.$refs.order
  },
} 