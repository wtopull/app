<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(member,index) in members" :key="index" :to="`/admin/agent/lottoReport/${index == 0 ? '' : member}`">
        {{member}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" class="table-tool-bar">
      <el-form-item label="用户名：">
        <el-input v-model="name" @keyup.native.enter="get"></el-input>
      </el-form-item>
      <el-form-item label="时间：">
        <el-date-picker v-model="queryDate" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :range-separator="rangeSeparator" @change="handlePicker" ref="datepicker" :picker-options="pickerOptions" @focus="handleFocus" align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="get">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <lotto-report :isAgent="true" :users="users" />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters,mapMutations } from 'vuex'
import {Breadcrumb,BreadcrumbItem} from 'element-ui'
import { paramValidate } from '~/plugins/common'
import datepicker,{getNewDate,dateParam,checkDateFormat} from '~/util/mixins/datepicker'

// proxy-manage/team-lottery-overview not finish to post proxy-manage/lottery-game-report will get 500 error
// ssr change to spa test it.
const getChildren = (context, props = {}) =>
  context.$axios.$post('proxy-manage/lottery-game-report', props)

import LottoReport from '~/components/admin/LottoReport'
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
export default {
  name: 'agent-lotto-report',
  async asyncData({ app, store, params: { name }, error }) {
    if (!store.state.user.token)
      return { users: [], total: 0, parent_names: [] }
    if (paramValidate(name, { error })) {
      let queryDate = store.state.admin.queryLottoReportDate
      if (!queryDate.length) {
        store.commit('admin/setStatus',{ key: 'queryLottoReportDate',value:getNewDate() })
        queryDate = store.state.admin.queryLottoReportDate
      }
      return {
        ...(await getChildren(app, {
          ...dateParam(queryDate),
          ...name ? { parent_name: name } : {}
        })).data,
        queryDate
      }
    }
  },
  data() {
    return {
      name:''
    }
  },
  components:{
    LottoReport
  },
  mixins: [datepicker],
  created() {},
  methods: {
    async get() {
      const {name} = this
      if(checkDateFormat(this,'queryDate') === true && paramValidate(name,{context:this,ssr:false}) === true) {
        const {dateParam,routeName:parent_name} = this

        Object.assign(
          this,
          (await getChildren(this, {
            name,
            ...dateParam(),
            parent_name,
          })).data
        )
      }
    },
    reset() {
      this.setDate([])
      if(this.routeName) {
        this.$router.push('/admin/agent/lottoReport')
      }else{
        this.name = ''
        this.queryDate = getNewDate()
        this.$nextTick(this.get)
      }
    },
    pick(val) {
      this.linkPanels(false)
      if (!this.queryDate) return
      this.setDate(val)
      this.get()
    },
    setDate(value) {
      this.setStatus({ key: 'queryLottoReportDate', value })
    },
    ...mapMutations({
      setStatus: 'admin/setStatus'
    })
  },
  computed: {
    members() {
      const { parent_names, username, routeName } = this
      return parent_names.length ? parent_names.concat(routeName || username) : [username]
    },
    routeName() {
      return this.$route.params.name
    },
    ...mapGetters(['username']),
    ...mapGetters({
      _queryDate:'admin/queryLottoReportDate'
    })
  },
  destroyed() {
    this.setDate([])
  }
}
</script>
