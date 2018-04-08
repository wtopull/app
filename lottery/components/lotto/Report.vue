<template>
  <div class="lottery-tabs">
    <el-tabs type="border-card">
      <el-tab-pane label="我的投注">
        <div class="t_li YouXiJiLu">
          <lotto-order :hideForm="true" ref="lottoOrder" />
        </div>
      </el-tab-pane>
      </el-tab-pane>
      <el-tab-pane label="我的追号">
        <div class="t_li YouXiJiLu">
          <lotto-order :hideForm="true" :isChase="true" ref="chaseOrder" />
        </div>
      </el-tab-pane>
    </el-tabs>
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
