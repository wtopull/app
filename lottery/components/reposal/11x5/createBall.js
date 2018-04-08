import { zipObject } from 'lodash/fp'
import props from '~/util/lotto/reposal-props'
import Ball from './Ball'

const propsKeys = Object.keys(props)

export default (_index) => {
  return {
    props: {...props, labels: Array },
    name: `x11to5-ball${_index}`,
    data() {
      const index = _index - 1
      return {
        deep: true,
        label: this.labels[index],
        index
      }
    },
    created() {
      const { label,index } = this
      this._props = {
        props: {
          ...zipObject(propsKeys)(propsKeys.map(v => this[v])),
          label,index
        }
      }
    },
    render(h) {
      return ( <
        Ball {...this._props }
        />
      )
    }
  }
}