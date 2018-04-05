<template>
  <div class="lottery-tabs">
        <div class="tab_left">
            <a v-for="(label,index) in ['游戏记录','追号记录']" :key="label" @click="tabIndex = index" :class="{active:tabIndex === index}">
              {{label}}
            </a>
        </div>
        <div class="tab_right">
            <div class="t_li YouXiJiLu" v-show="tabIndex === 0">
              <lotto-order :hideForm="true" ref="lottoOrder" />
            </div>
            <div class="t_li YouXiJiLu" v-show="tabIndex === 1">
              <lotto-order :hideForm="true" :isChase="true" ref="chaseOrder" />
            </div>
        </div>
    </div>
</template>

<script>
import LottoOrder from '~/components/admin/LottoOrder'
export default {
  name: 'report',
  data() {
    return {
      tabIndex: 0
    }
  },
  components: {
    LottoOrder
  }
}
</script>
