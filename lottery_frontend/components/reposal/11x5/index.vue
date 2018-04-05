<script>
import {unzip} from 'lodash'
import Tabs from '../Tabs'
import Both from './Both'
import createBall from './createBall'

import DragonTiger from '../DragonTiger'
import All5in1 from '../All5in1'
import reposalType from '~/util/mixins/reposal-type'

const Ball1 = createBall(1)
const Ball2 = createBall(2)
const Ball3 = createBall(3)
const Ball4 = createBall(4)
const Ball5 = createBall(5)

export default{
  name:'x11to5',
  mixins:[reposalType],
  created(){
    const {playList} = this

    let group = this.playList.map(
        (v, k) => {
          const name = v.content.show_name
          return [
            k >= 5  ? name.includes('龙虎')  ? '龙虎斗'  : name.replace('信用', '') : name,
            v.content.identifier
          ]
        }
      )
    group.splice(group.findIndex(([name]) => name.includes('总和')),1)
    const [name,panes] = unzip(group)
    this.panes = ['0'].concat(panes)
    this.labels = name
    this.$store.commit('reposal/setTabName',this.tabName = '0')
  },
  render(h){
    const {labels,panes} = this
    const props = {props:{...this._props,labels,vsLabels:['龙', '虎'],vsListIndex:6}}
    
    const views = [
        () => <Both {...props} />,
        () => <Ball1 {...props} />,
        () => <Ball2 {...props} />,
        () => <Ball3 {...props} />,
        () => <Ball4 {...props} />,
        () => <Ball5 {...props} />,
        () => <DragonTiger {...props} />,
        () => <All5in1 {...props} />
    ]

    return (
      <div class="reposal-content">
        <Tabs
          paneNames={['两面盘'].concat(labels)}
          views={views}
          panes={this.panes}
        />
      </div>
    )
  }
}
</script>