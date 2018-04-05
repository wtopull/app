<template>
  <div>
    <el-form :inline="true" class="table-tool-bar">
      <el-form-item label="时间：">
        <el-date-picker v-model="date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :range-separator="rangeSeparator" @change="handlePicker" ref="datepicker" :picker-options="pickerOptions" @focus="handleFocus" align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="get">查询</el-button>
        <!-- <el-button type="success" @click="toggle(2)">标记已读</el-button>
        <el-button type="warning" @click="toggle(1)">标记未读</el-button> -->
        <el-button type="danger" @click="dekMult">批量删除</el-button>
        <el-button type="success">
          <nuxt-link to="/admin/message/compose">新消息</nuxt-link>
        </el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" stripe border style="width: 100%" @selection-change="val => multipleSelection = val" ref="table">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="username" :label="`${isOut ? '收' : '发'}件人`" />
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="created_at" label="时间" />
      <el-table-column prop="status" label="状态">
        <template slot-scope="{row:{status}}">
          <span :class="style(status)">{{status | statusLabel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row:{id}}">
          <el-button type="text" @click="detail(id)">详情</el-button>
          <el-button type="text" @click="del(id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
import { paramValidate } from '~/plugins/common'
import cache from '~/util/cache'
import dateTables, { style } from '~/util/mixins/data-tables'
import datepicker, {
  getNewDate,
  dateParam,
  checkDateFormat
} from '~/util/mixins/datepicker'

const statusLabel = ['未读', '已读']
const typesLabel = ['普通用戶', '系统', '管理員']

export default {
  name: 'message-box',
  props: ['type'],
  data() {
    return {
      multipleSelection: [],
      message: {},
      visible: false
    }
  },
  mixins: [datepicker],
  created() {
    if (this.isOut) {
      this.getBox({ key: this.type })
    }
  },
  methods: {
    get() {
      if (this.checkDateFormat() === true) {
        this.getBox({ key: this.type })
      }
    },
    style(value) {
      return style(value > 1 ? -1 : 1, 'success', 'warning')
    },
    detail(id) {
      let message = cache.message[id]
      if (message) {
        this.message = message
        return (this.visible = true)
      }
      this.$axiosPlus('user-message/get-detail', { id }, data => {
        this.message = cache.message[id] = data
        this.readReq(id).then(() => {
          this.tableData.find(_ => _.id === id).status = statusLabel.length
          this.set({
            ...this.inbox,
            list: [...this.tableData]
          })
          this.visible = true
        })
      })
    },
    del(id) {
      this.delReq(id).then(() =>
        this.set({
          ...this.inbox,
          list: this.tableData.filter(_ => _.id !== id)
        })
      )
    },
    delReq(id) {
      return this.$axiosPlus('user-message/delete', { id })
    },
    readReq(id) {
      return this.$axiosPlus('user-message/read', { id })
    },
    reset() {
      this.$table.clearSelection()
      this.resetDate()
      this.$nextTick(this.get)
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
    dekMult() {
      const { multipleSelection } = this
      if (!multipleSelection.length) return
      // Promise.all(
      //   multipleSelection.map(({ id }) => this.delReq(id))
      // ).then(() => {

      // })

      this.delReq(this.multipleSelection.map(_ => _.id).join()).then(() => {
        this.$message({
          message: '选中的消息已成功删除',
          type: 'success'
        })
        const ids = multipleSelection.map(_ => _.id)

        this.set({
          ...this.inbox,
          list: this.tableData.filter(({ id }) => !ids.includes(id))
        })
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
      return this.setStatus({ key: this.type, value })
    },
    ...mapActions({
      getBox: 'admin/getBox'
    }),
    ...mapMutations({
      setStatus: 'admin/setStatus'
    })
  },
  computed: {
    ...mapGetters({
      inbox: 'admin/inbox',
      outbox: 'admin/outbox'
    }),
    tableData() {
      return this[this.type].list.map(_ => this.format(_))
    },
    isOut() {
      return this.type === 'outbox'
    }
  },
  filters: {
    statusLabel(status) {
      return statusLabel[status - 1]
    }
  },
  mounted() {
    this.$table = this.$refs.table
  }
}
</script>
