<template>
  <div class="admin-team">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(member,index) in members" :key="index" :to="`/admin/agent/team/${index == 0 ? '' : member}`">
        {{member}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" class="table-tool-bar">
      <el-form-item label="用户名：">
        <el-input v-model="name" @keyup.native.enter="get"></el-input>
      </el-form-item>
      <el-form-item label="在线状态：">
        <el-select v-model="online" popper-class="tool-bar-select" @change="setOnline">
          <el-option v-for="(label,index) in ['全部'].concat(statusLabel)" :label="label" :value="index == 0 ? '' : index" :key="index" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="get">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" stripe border ref="table">
      <el-table-column label="会员账号">
        <template slot-scope="{row:{name,has_children}}">
          <nuxt-link :to="`/admin/agent/team/${name}`" class="el-button--text" v-if="has_children">{{name}}</nuxt-link>
          <!-- el-button ,button,tag can not be select -->
          <span class="el-button el-button--text" v-else>{{name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="分组" prop="level" />
      <el-table-column label="返点" prop="point" />
      <el-table-column label="余额">
        <template slot-scope="{row:{amount}}">
          {{amount | round3}}
        </template>
      </el-table-column>
      <el-table-column label="在线状态">
        <template slot-scope="{row:{status}}">
          <span :class="style(status)">{{status | statusLabel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后登录时间" prop="loginTime" />
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <div v-if="row.parent_name === username">
            <el-button type="text" @click="transfer(row)">转账</el-button>
            <el-button type="text" @click="setPoint(row)">返点</el-button>
          </div>
          <i class="el-icon-minus" v-else></i>
        </template>
      </el-table-column>
      <div slot="empty">
        <span class="text-danger">{{'测试空数据显示'}}</span>
      </div>
    </el-table>
    <el-dialog :title="editorTitle" :visible.sync="visible" @open="openDialog" width="30%">
      <component :is="view" v-bind={editorData} :visible.sync="visible" ref="editor" />
    </el-dialog>
  </div>
</template>

<!--https://github.com/vuejs/vetur/issues/461
Empty style tag with src attribute,end tag must be a new line
-->

<style lang="scss" src="../../../../assets/scss/admin/team.scss">

</style>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import {Breadcrumb,BreadcrumbItem} from 'element-ui'
import { style,round3 } from '~/util/mixins/data-tables'
import { AsyncMultComp,paramValidate } from '~/plugins/common'
import team, { getChildren } from '~/util/mixins/team'
const AsyncComp = AsyncMultComp('admin/agent')
const statusLabel = ['在线', '离线']
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
export default {
  name: 'team',
  async asyncData({ app, store, params: { name }, error }) {
    if (!store.state.user.token)
      return { users: [], total: 0, parent_names: [] }
    if(paramValidate(name,{error})) {
      const online = store.state.admin.queryMembersOnline
      return {
        online,
        ...(await getChildren(app, {
          is_online: online,
          //https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence ...not require ()
          ...name ? { parent_name: name } : {}
        })).data
      }
    }
    
  },
  data() {
    return {
      name: '',
      statusLabel,
      // dialogMounted: '',
      editorData: null,
      view: '',
      visible:false,
    }
  },
  mixins: [team],
  components: {
    Transfer: AsyncComp('Transfer'),
    UpdatePoint: AsyncComp('UpdatePoint')
  },
  created() {},
  methods: {
    async get() {
      //name is query self not inlucde children
      const {name} = this
      //context.$message return Promise
      if(paramValidate(name,{context:this,ssr:false}) === true) {
        const {  online: is_online, routeName:parent_name } = this
        Object.assign(
          this,
          (await getChildren(this, {
            name,
            is_online,
            parent_name,
            children_type: name ? 2 : 1
          })).data
        )
      }  
      
    },
    reset() {
      this.setOnline('')
      if(this.routeName) {
        this.$router.push('/admin/agent/team')
      }else{
        this.name = ''
        this.online = ''
        this.get()
      }
    },
    style(value){
      return style(value > 1 ? -1 : 1,'disabled')
    },
    edit(view, rowData) {
      this.editorData = rowData
      if (this.view === view) {
        this.view === 'Transfer' && this.$refs.editor.$form.resetFields()
        // return this.$refs.editor.visible = true
        return this.visible = true
      }
      this.view = view
      this.visible = true
    },
    transfer(rowData) {
      this.edit('Transfer', rowData)
    },
    setPoint(rowData) {
      this.edit('UpdatePoint', rowData)
    },
    setOnline(value) {
      this.setStatus({ key: 'queryMembersOnline', value })
    },
    ...mapMutations({
      setStatus: 'admin/setStatus'
    }),
    openDialog(){

    }
  },
  computed: {
    members() {
      const { parent_names, username, routeName } = this
      return parent_names.length ? parent_names.concat(routeName || username) : [username]
    },
    routeName() {
      return this.$route.params.name
    },
    editorTitle(){
      const {view} = this
      return view ? view === 'Transfer' ? '下级转账' : '更新下级返点' : ''
    },
    ...mapGetters(['username'])
  },
  filters: {
    statusLabel(status) {
      //filters this -> undefined
      return statusLabel[status - 1]
    }
  },
  destroyed() {
    this.setOnline('')
  }
}
</script>
