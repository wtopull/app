import props from '~/util/lotto/reposal-props'
import { zipObject } from "lodash/fp"

const propsKeys = Object.keys(props)

export default {
  props,
  created() {
    this._props = zipObject(propsKeys)(propsKeys.map(v => this[v]))
    this.$store.commit('lotto/renderType', {...this.renderer,[this.lottoType]:true})
    this.$store.commit('reposal/tabMount', true)
  },
  computed:{
    renderer(){
      return this.$store.state.lotto.renderer
    }
  }
}