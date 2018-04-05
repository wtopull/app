<template>
  <div class="reposal-options">
    <span>赔率调节：</span>
    <el-slider v-model="value" :min="minBonusGroup" :max="max" :step="2" @change="setBonus" /> {{point}}%
    <div style="margin-left:auto">
      <el-radio-group v-model="view" size="small" @change="toggleView">
        <el-radio-button label="一般"></el-radio-button>
        <el-radio-button label="快捷"></el-radio-button>
      </el-radio-group>
      <el-button type="primary" @click="lottoRoot.openHotNums">快选金额</el-button>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'reposal-options',
  inject: ['lottoRoot'],
  props:['max'],
  data() {
    return {
      value: this.max, //lotto options named groupVal
      view: '一般'
    }
  },
  methods: {
    ...mapMutations({
      setBonus: 'reposal/setBonus',
      toggleView: 'reposal/toggleView'
    })
  },
  computed: {
    ...mapGetters(['bonusGroup', 'minBonusGroup']),
    point() {
      const { bonusGroup, value } = this
      return (bonusGroup - value) / 20
    }
  }
}
</script>