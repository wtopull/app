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
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="sys_id" label="订单编号" />
      <el-table-column prop="amount" label="金额" />
      <el-table-column prop="status" label="状态" />
      <el-table-column prop="created_at" label="申请时间" />
      <el-table-column prop="updated_at" label="处理时间" />

    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import datepicker from '~/util/mixins/datepicker'
import dateTables, { round3, style, queryAll } from '~/util/mixins/data-tables'

export default {
  name: 'charge-report',
  data() {
    return {
      total: 0,
      tableData: [],
      pageSize: 10,
      pageTotal: 0,
      statusList: { ...queryAll },
      status: ''
    }
  },
  mixins: [datepicker],
  created() {
    this.get()
  },
  methods: {
    get() {
      if (this.checkDateFormat() === true) {
        const { status, dateParam } = this
        this.$axiosPlus(
          'deposit/get',
          { ...dateParam(), ...(status ? { ...status } : {}) },
          ({ deposit, total, drop_list }) => {
            this.statusList = { ...queryAll, ...drop_list.status_list }
            this.tableData = deposit.map(_ => this.format(_.content))
          }
        )
      }
    },
    reset() {
      this.status = ''
      this.resetDate()
      this.$nextTick(this.get)
    },
    format({ ...props }) {
      return {
        ...props
      }
    },
    style
  },
  computed: {
    ...mapGetters({})
  }
}
</script>
