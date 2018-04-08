<template>
  <div>
    合约奖励记录
    <data-tables :data="tableData" :pagination-def="paginationDef" ref="table">
      <el-table-column label="系统编号" prop="sys_id" />
      <el-table-column label="期号" prop="issue" />
      <el-table-column label="创建时间" prop="created_at" />
      <el-table-column label="倍数" prop="multiple" />
      <el-table-column label="状态">
        <template slot-scope="{row:{status}}">
          <span :class="style(status)">{{status | statusLabel}}</span>
        </template>
      </el-table-column>
    </data-tables>
  </div>
</template>
<style lang="scss" scoped>

</style>

<script>
import Vue from 'vue'
import DataTables from '~/components/vue-data-tables/components/DataTables'
import { levels, style,paginationDef } from '~/util/mixins/data-tables'

DataTables.install = function(Vue) {
  Vue.component(DataTables.name, DataTables)
}
Vue.use(DataTables)

export default {
  props: ['tableData'],
  computed: {
    paginationDef() {
      const { tableData } = this
      return paginationDef(tableData ? tableData.length : 0, 5, 1)
    }
  }
}
</script>
