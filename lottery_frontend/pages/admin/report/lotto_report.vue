<template>
  <div>
    <el-form :inline="true" class="table-tool-bar">
      <el-form-item label="时间：">
        <el-date-picker v-model="date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :range-separator="rangeSeparator" @change="handlePicker" ref="datepicker" :picker-options="pickerOptions" @focus="handleFocus" align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="get">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- :total="total" change vscode vetur syntax highlight -->
    <lotto-report v-bind={reportData,get,currentPage,pageSize,total,loading} :total="total" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import datepicker, { dateParam, getNewDate } from '~/util/mixins/datepicker'
import gameReport, { request } from '~/util/mixins/gameReport'
import dateTables from '~/util/mixins/data-tables'
import LottoReport from '~/components/admin/LottoReport'

export default {
  name: 'user-lotto-report',
  async asyncData({ app, store, params: { name }, error }) {
    if (process.server)
      return { users: [], total: 0, parent_names: [], reportData: [],isSPA: true }
    const { data } = await request(app, {
      ...dateParam(getNewDate()),
      ...(name ? { parent_name: name } : {})
    })
    return {
      ...data,
      reportData: data.users.map(gameReport.methods.format)
    }
  },
  created(){
    this.listen()
  },
  components: {
    LottoReport
  },
  mixins: [datepicker, dateTables, gameReport],
  methods: {
    async get(loadProps) {
      const { loadType, page } = this.getQueryParams(loadProps)
      if (page === 0 && loadType === 'pageChange') return this.fetch()
      if (this.checkPageData(loadProps, page)) return
      if (this.checkDateFormat() === true) {
        !this.resetting && this.spin()
        const { data } = await request(this, {
          ...this.dateParam(),
          page,
          page_size: loadType ? loadProps.pageSize : this.pageSize
        })
        Object.assign(this, data)
        this.pageDone(data, page)
      }
    }
  }
}
</script>
