<template>
  <div>
    <el-table :data="tableData" stripe border @selection-change="val => multipleSelection = val" style="width: 100%;max-width:1200px" ref="table">
      <el-table-column type="selection" width="55" />
      <el-table-column label="注册编号">
        <template slot-scope="{row:{ sys_id,status,id}}">
          <el-button type="text" disabled v-if="status === statusLabel.length">{{sys_id}}</el-button>
          <nuxt-link class="el-button--text" :to="`/signup/${id}`" target="_blank" v-else>{{sys_id}}</nuxt-link>
        </template>
      </el-table-column>
      <el-table-column label="开户分组">
        <template slot-scope="{row:{level}}">
          {{levels[level - 1]}}
        </template>
      </el-table-column>
      <el-table-column prop="prize_group" label="注册返点">
        <template slot-scope="{row}">
          {{getPoint(row.prize_group)}}
        </template>
      </el-table-column>
      <el-table-column prop="registed_count" label="注册人数" />
      <el-table-column label="状态">
        <template slot-scope="{row:{status}}">
          <span :class="style(status)">{{status | statusLabel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="{row:{remark}}">
          <span v-if="remark">{{remark}}</span>
          <i class="el-icon-minus" v-else></i>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button type="text" @click="edit(row)">编辑</el-button>
          <el-tooltip effect="danger" content="复制成功" placement="top" :manual="true" ref="copyTip">
            <el-button type="text" :data-clipboard-text="getUrl(row.id)">复制</el-button>
          </el-tooltip>
          <el-button type="text" @click="del(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="delMult">删除选中</el-button>
    <component :is="view" v-bind={editorData,set,tableData} ref="editor" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { AsyncComp, clipboard } from '~/plugins/common'
import { levels, style } from '~/util/mixins/data-tables'
const statusLabel = ['启用', '停用']
export default {
  name: 'link-admin',
  props: ['getPoint', 'tableData', 'set'],
  data() {
    return {
      levels,
      multipleSelection: [],
      editorData: null,
      statusLabel,
      view: ''
    }
  },
  components: {
    Editor: AsyncComp('admin/agent', 'LinkRegisterEditor')
  },
  methods: {
    style(value) {
      return style(value > 1 ? -1 : 1, 'disabled')
    },
    del(id) {
      this.delReq(id).then(() => {
        this.set(this.tableData.filter(_ => _.id !== id))
        this.$message({
          message: '链接已删除',
          type: 'success'
        })
      })
    },
    delReq(id) {
      return this.$axiosPlus('user-register-link/delete', { id })
    },
    delMult() {
      const { multipleSelection } = this
      if (!multipleSelection.length) return
      Promise.all(
        multipleSelection.map(({ id }) => this.delReq(id))
      ).then(() => {
        this.$message({
          message: '选中的注册链接已成功删除',
          type: 'success'
        })
        const ids = multipleSelection.map(_ => _.id)
        this.set(this.tableData.filter(({ id }) => !ids.includes(id)))
      })
    },
    edit(rowData) {
      this.editorData = rowData
      if (this.view) {
        return (this.$refs.editor.visible = true)
      }
      this.view = 'Editor'
    },
    getUrl(id) {
      return `${location.protocol}//${location.host}/signup/${id}`
    },
    initCopy() {
      const elToolTips = this.$refs.table.$children
        .slice(-1)[0] //tablebody
        .$children.filter(_ => _.effect === 'danger') //tooltip exclude el-table show-overflow-tooltip

      ;[...this.$el.querySelectorAll('.el-tooltip')].forEach((button, k) =>
        clipboard(button, () => {
          const tooltip = elToolTips[k]
          tooltip.showPopper = true
          button.onmouseleave = () => {
            setTimeout(() => (tooltip.showPopper = false), 300)
            button.onmouseleave = {}
          }
        })
      )
    }
  },
  computed: {
    // ...mapGetters({
    //   register:'admin/register'
    // })
  },
  filters: {
    statusLabel(status) {
      //filters this -> undefined
      return statusLabel[status - 1]
    }
  },
  mounted() {
    //$nextTick get elToolTips
    this.$nextTick(this.initCopy)
  }
}
</script>