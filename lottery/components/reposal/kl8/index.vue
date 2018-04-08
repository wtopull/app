<script>
import Tabs from '../Tabs'
import Integrate from './Integrate'
import reposalType from '~/util/mixins/reposal-type'
import Ball from './Ball'

export default {
  name: 'kl8',
  mixins: [reposalType],
  created() {
    const {playList} = this
    this.$store.commit(
      'reposal/setTabName',
      (this.tabName = playList[1] ? playList[1].content.identifier : '')
    )
  },
  render(h) {
    const props = { props: { ...this._props } }

    const views = [() => <Integrate {...props} />, () => <Ball {...props} />]
    const { tabName } = this
    return (
      <div class="reposal-content">
        <Tabs
          paneNames={['整合', '正码']}
          views={views}
          panes={[tabName, `${tabName}__road`]}
        />
      </div>
    )
  }
}
</script>