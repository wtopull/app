<template>
  <div>
    <el-form :inline="true" class="table-tool-bar">
      <!-- <el-form-item label="时间：">
        <el-date-picker v-model="date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :range-separator="rangeSeparator" @change="handlePicker" ref="datepicker" :picker-options="pickerOptions" @focus="handleFocus" align="right">
        </el-date-picker>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="get">查询</el-button>
        <!-- <el-button type="success" @click="toggle(2)">标记已读</el-button>
        <el-button type="warning" @click="toggle(1)">标记未读</el-button> -->
        <el-button type="danger" @click="delMult">批量删除</el-button>
        <el-button type="success">
          <nuxt-link to="/admin/message/compose">新消息</nuxt-link>
        </el-button>
        <el-button @click="resetTable">重置</el-button>
      </el-form-item>
    </el-form>
    <data-tables-server :data="tableData" :total="total" @query-change="get" v-loading="loading.on" :element-loading-text="loading.text" @selection-change="val => multipleSelection = val" :pagination-def="paginationDef" ref="table">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="username" :label="`${isOut ? '收' : '发'}件人`" />
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="created_at" label="时间" />
      <el-table-column prop="status" label="状态">
        <template slot-scope="{row:{status}}">
          <span :class="style(status)">{{statusLabel(status)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row:{id}}">
          <el-button type="text" @click="detail(id)">详情</el-button>
          <el-button type="text" @click="del(id)">删除</el-button>
        </template>
      </el-table-column>
    </data-tables-server>
    <el-dialog :title="message.title" :visible.sync="visible">
      <div>
        时间：{{message.created_at}}
        <br> 内容：{{message.content}}
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { paramValidate } from '~/util/validator'
import cache from '~/util/cache'
import dateTables, { style } from '~/util/mixins/data-tables'
import datepicker, {
  getNewDate,
  dateParam,
  checkDateFormat
} from '~/util/mixins/datepicker'
import { delayAjax } from '~/plugins/ajax'
const typesLabel = ['普通用戶', '系统', '管理員']

export default {
  name: 'message-box',
  props: ['type', 'serverData', 'isSPA'],
  data() {
    return {
      multipleSelection: [],
      message: {},
      visible: false,
      statusList: { 1: '未读', 2: '已读' },
      SPAInvoking:false
    }
  },
  mixins: [datepicker, dateTables],
  created() {
    if (!this.serverData)
      return delayAjax(this.$axios, this.$store, () => {
        this.SPAInvoking = true
        this.get()
      })
    this.fetch()
  },
  methods: {
    async get(loadProps) {
      const { loadType, page } = this.getQueryParams(loadProps)
      //prevevt DataTablesServer->this.getBox
      if (this.checkPageData(loadProps, page) || !this.serverData && !this.SPAInvoking) return
      if (this.checkDateFormat() === true) {
        !this.resetting && this.spin()
        this.pageDone(await this.getBox({
          key: this.type,
          page,
          page_size: loadType ? loadProps.pageSize : this.pageSize
        }), page)
      }
    },
    style(value) {
      return style(value > 1 ? -1 : 1, 'success', 'warning')
    },
    getStatus() {},
    detail(id) {
      let message = cache.message[id]
      if (message) {
        this.message = message
        return (this.visible = true)
      }
      this.$axiosPlus('user-message/get-detail', { id }, data => {
        this.message = cache.message[id] = data
        this.readReq(id).then(() => {
          const tableData = this.tableData.map(_ => ({ ..._ }))
          tableData.find(_ => _.id === id).status = 2
          this.tableData = tableData
          this.set({
            ...this[this.type],
            list: this.tableData
          })
          this.visible = true
        })
      })
    },
    del(id) {
      this.delReq(id).then(() => {
        this.tableData = this.tableData.filter(_ => _.id !== id)
        this.total--
        this.set({
          ...this[this.type],
          list: this.tableData
        })
      })
    },
    delReq(id) {
      return this.$axiosPlus('user-message/delete', { id })
    },
    readReq(id) {
      return this.$axiosPlus('user-message/read', { id })
    },
    resetTable() {
      this.$table.clearSelection()
      this.reset()
    },
    // toggle(status) {
    //   //status may be click mouseEvent,do not set default params
    //   const { multipleSelection } = this
    //   if (!multipleSelection.length) return

    //   Promise.all(
    //     multipleSelection.map(({ id }) => this.readReq(id))
    //   ).then(data => {
    //     const ids = multipleSelection.map(_ => _.id)
    //     this.tableData.forEach(
    //       row => ids.includes(row.id) && (row.status = status)
    //     )
    //     this.set({
    //       ...this.inbox,
    //       list: [...this.tableData]
    //     })
    //     // this.$nextTick(() => multipleSelection.forEach(row => this.$table.toggleRowSelection(row)))
    //     //require this.tableData.filter & toggleRowSelection true
    //     this.$nextTick(() =>
    //       this.tableData
    //         .filter(({ id }) => ids.includes(id))
    //         .forEach(row => this.$table.toggleRowSelection(row, true))
    //     )
    //   })
    // },
    delMult() {
      const { multipleSelection } = this
      const { length } = multipleSelection
      if (length === 0) return
      this.delReq(this.multipleSelection.map(_ => _.id).join()).then(() => {
        this.$message({
          message: '选中的消息已成功删除',
          type: 'success'
        })
        if (length === this.pageSize) {
          this.resetting = true
          this.get()
        } else {
          const ids = multipleSelection.map(_ => _.id)
          this.pageData[
            this.currentPage - 1
          ] = this.tableData = this.tableData.filter(
            ({ id }) => !ids.includes(id)
          )
          this.total = this.total - ids.length
          this.set({
            ...this[this.type],
            list: this.tableData
          })
        }
      })
    },
    format({ read_status, type, send_user_name, receive_user_name, ...props }) {
      return {
        status: read_status,
        type: typeof type === 'number' ? typesLabel[type - 1] : type,
        username: this.isOut ? receive_user_name : send_user_name,
        ...props
      }
    },
    set(value) {
      return this.setState({ key: this.type, value })
    },
    ...mapActions({
      getBox: 'admin/getBox'
    }),
    ...mapMutations({
      setState: 'admin/setState'
    })
  },
  computed: {
    ...mapGetters({
      inbox: 'admin/inbox',
      outbox: 'admin/outbox'
    }),
    isOut() {
      return this.type === 'outbox'
    }
  },
  mounted() {
    this.$table = this.$refs.table.$refs.elTable
  }
}
</script>
