<script>
import Tabs from '../Tabs'
import Integrate from './Integrate'
import DragonTiger from '../DragonTiger'
import All5in1 from '../All5in1'
import reposalType from '~/util/mixins/reposal-type'
export default{
  name:'ssc',
  mixins:[reposalType],
  created(){
    const {playList} = this
    this.$store.commit('reposal/setTabName',this.tabName = playList[0] ? playList[0].content.identifier : '')
    
  },
  computed:{
    specialLabels(){
      const playList = this.playList[6]
      return playList ? playList.bets.map(_ => _.show_name) : []
    }
  },
  render(h){
    const {specialLabels} = this
    const props = {props:{...this._props,specialLabels,vsLabels:['龙', '和', '虎'],vsListIndex:9}}

    // setTimeout(() => alert(this._props.playList.length),3000)
    // dev mode:Integrate playList length 0,production mode is true
    const views = [
        () => <Integrate {...props} />,
        () => <DragonTiger {...props} />,
        () => <All5in1 {...props} />
    ]

    return (
      <div class="reposal-content">
        <Tabs
          paneNames={['整合','龙虎斗','全5中1']}
          views={views}
          panes={[this.tabName,'vs']}
        />
      </div>
    )
  }
}
</script>