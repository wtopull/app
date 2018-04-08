<script>
import Tabs from '../Tabs'
import BigSmall from './BigSmall'
import reposalType from '~/util/mixins/reposal-type'

export default {
  name:'k3',
  mixins: [reposalType],
  created(){
    this.$store.commit('reposal/setTabName',this.tabName = '0')
  },
  render(h) {
    const props = { props: { ...this._props } }
    const views = [() => <BigSmall {...props} />]
    
    return (
      <div class="reposal-content">
        <Tabs
          paneNames={['大小骰宝']}
          views={views}
          panes={['0']}
        />
      </div>
    )
  }
}
</script>
