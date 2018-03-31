<script>
import Tabs from '../Tabs'
import Integrate from './Integrate'
import _1to10 from './1to10'
import Sum from './Sum'
import reposalType from '~/util/mixins/reposal-type'
export default{
  name:'pk10',
  mixins:[reposalType],
  created(){
    const {playList} = this
    this.rank = playList.slice(0,10).map(_ => _.content.show_name)
    this.$store.commit('reposal/setTabName',this.tabName = playList[0] ? playList[0].content.identifier : '')
  },
  render(h){
    const {rank} = this
    const orderTopLabel = '冠亚和值'
    const props = {props:{...this._props,rank,orderTopLabel}}
    const views = [
      () => <Integrate {...props} />,
      () => <_1to10 {...props} />,
      () => <Sum {...props} />,
    ]

    const {tabName} = this

    return (
      <div class="reposal-content">
        <Tabs
          paneNames={['整合','第1-10名',orderTopLabel]}
          views={views}
          panes={[tabName,`${tabName}__road`]}
        />
      </div>
    )
  }
}
</script>
