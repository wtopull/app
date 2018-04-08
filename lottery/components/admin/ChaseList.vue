<template>
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
</template>

<script>
import Vue from 'vue'
import DataTables from '~/components/vue-data-tables/components/DataTables'
import { style,paginationDef } from '~/util/mixins/data-tables'
DataTables.install = function(Vue) {
  Vue.component(DataTables.name, DataTables)
}
Vue.use(DataTables)
const statusLabel = ['未生成','生成追号单','撤单']
export default {
  name: 'chase-list',
  props: ['tableData'],
  methods:{
    style(status) {
      return style(status < 3 ? status - 1 : -1,'disabled')
    }
  },
  computed: {
    paginationDef() {
      const { tableData } = this
      return paginationDef(tableData ? tableData.length : 0, 5, 1)
    }
  },
  filters: {
    statusLabel(status) {
      //filters this -> undefined
      return statusLabel[status - 1]
    }
  }
}
</script>

