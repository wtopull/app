<template>
  <div>
    合约列表
    <data-tables :data="tableData" :pagination-def="paginationDef" ref="table">
      <el-table-column label="上级" prop="parentz_user_name" />
      <el-table-column label="下级" prop="user_name" />
      <el-table-column label="契约类型" prop="calculate_cycle" />
      <el-table-column label="币种" prop="calculate_cycle" />
      <el-table-column label="契约状态" prop="status" />
      <el-table-column label="操作">
        <!-- <template slot-scope="{row:{status}}"> -->
          <!-- <span :class="style(status)">{{status | statusLabel}}</span> -->
        <!-- </template> -->
      </el-table-column>
    </data-tables>
  </div>
</template>
<style lang="scss" scoped>

</style>

<script>
import Vue from 'vue'
import DataTables from '~/components/vue-data-tables/components/DataTables'
import { levels, style, paginationDef } from '~/util/mixins/data-tables'

DataTables.install = function(Vue) {
  Vue.component(DataTables.name, DataTables)
}
Vue.use(DataTables)

export default {
  data() {
    return {
      tableData: [
        {
          parentz_user_name: '我是上级',
          user_name: '我是上级',
          calculate_cycle: 1, // 1=日, 2=周, 3=半月, 4=月
          status: 1, // 1=未签约, 2=已同意，3=已拒绝，4=已终止，5=上级申请终止契约，6=下级申请终止契约，7=系统终止
        },
        {
          parentz_user_name: '我是上级',
          user_name: '我是上级',
          calculate_cycle: 1, // 1=日, 2=周, 3=半月, 4=月
          status: 1, // 1=未签约, 2=已同意，3=已拒绝，4=已终止，5=上级申请终止契约，6=下级申请终止契约，7=系统终止
        },
        {
          parentz_user_name: '我是上级',
          user_name: '我是上级',
          calculate_cycle: 1, // 1=日, 2=周, 3=半月, 4=月
          status: 1, // 1=未签约, 2=已同意，3=已拒绝，4=已终止，5=上级申请终止契约，6=下级申请终止契约，7=系统终止
        }
      ]
    }
  },

  moethods: {

  },
  computed: {
    paginationDef() {
      const { tableData } = this
      return paginationDef(tableData ? tableData.length : 0, 5, 1)
    },

    // contracType() {
    //   return this.tableData
    // }
  },

  mounted() {

  }
}
</script>
