<template>
  <div class="admin-report">
    <el-form :inline="true" class="table-tool-bar">
      <el-form-item label="状态：">
        <el-select v-model="status">
          <el-option v-for="(label,key) in statusList" :label="label" :value="key == '0' ? '' : key" :key="key" />
        </el-select>
      </el-form-item>
      <el-form-item label="时间：">
        <el-date-picker v-model="date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :range-separator="rangeSeparator" @change="handlePicker" ref="datepicker" :picker-options="pickerOptions" @focus="handleFocus" align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="get">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <data-tables-server :data="tableData" :total="total" @query-change="get" v-loading="loading.on" :element-loading-text="loading.text" :pagination-def="paginationDef">
      <el-table-column prop="sys_id" label="订单编号" />
      <el-table-column prop="amount" label="金额" />
      <el-table-column prop="status" label="状态" />
      <el-table-column prop="created_at" label="申请时间" />
      <el-table-column prop="updated_at" label="处理时间" />

    </data-tables-server>
  </div>
</template>

<script>
import datepicker from '~/util/mixins/datepicker'
import dateTables from '~/util/mixins/data-tables'
export default {
  name: 'charge-report',
  async asyncData({ app }) {
    if(process.server) return {serverData:false}
    return {
      serverData: (await app.$axios.$post('deposit/get')).data
    }
  },
  mixins: [datepicker, dateTables],
  created() {
    this.fetch()
    this.listen()
  },
  methods: {
    get(loadProps) {
      console.log('loadProps',loadProps)
      const { loadType, page } = this.getQueryParams(loadProps)
      if (this.checkPageData(loadProps, page)) return
      if (this.checkDateFormat() === true) {
        const { status, dateParam, resetting } = this
        !resetting && this.spin()
        this.$axiosPlus(
          'deposit/get',
          {
            ...dateParam(),
            page,
            page_size: loadType ? loadProps.pageSize : this.pageSize,
            status,
          },
          data => this.pageDone(data, page)
        )
      }
    }
  }
}
</script>
