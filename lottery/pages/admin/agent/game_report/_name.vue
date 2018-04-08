<template>
  <div>
    <!-- <nuxt-link to="/admin/agent/lotto1_report">游戏报表</nuxt-link> -->
    <!-- <nuxt-link to="/admin/agent/lotto_report">游戏报表</nuxt-link> -->
    <!-- nuxt issue ? 
    {
      path: "lotto:order",
      component: _0449882c,
      name: "admin-agent-lottoorder"
    },
    {
      path: "lotto:report/:name?",
      component: _4c87865c,
      name: "admin-agent-lottoreport-name"
    }
    page components can't named lotto** 
    -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(member,index) in members" :key="index" :to="`/admin/agent/game_report/${index == 0 ? '' : member}`">
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
    <lotto-report v-bind={reportData,get,currentPage,pageSize,total,loading} :isAgent="true" />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import { Breadcrumb, BreadcrumbItem } from 'element-ui'
import { paramValidate } from '~/util/validator'
import datepicker, {
  getNewDate,
  dateParam,
  checkDateFormat
} from '~/util/mixins/datepicker'
import dateTables from '~/util/mixins/data-tables'
import gameReport, { request } from '~/util/mixins/gameReport'

import LottoReport from '~/components/admin/LottoReport'
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
export default {
  name: 'agent-lotto-report',
  async asyncData({ app, store, params: { name }, error }) {
    if (paramValidate(name, { error })) {
      let queryDate = store.state.admin.queryLottoReportDate
      if (!queryDate.length) {
        store.commit('setState', {
          key: 'admin.queryLottoReportDate',
          value: getNewDate()
        })
        queryDate = store.state.admin.queryLottoReportDate
      }
      if (process.server)
        return {
          users: [],
          total: 0,
          parent_names: [],
          reportData: [],
          queryDate,
          isSPA: true
        }
      const { data } = await request(app, {
        ...dateParam(queryDate),
        ...(name ? { parent_name: name } : {})
      })
      return {
        ...data,
        reportData: data.users.map(gameReport.methods.format),
        queryDate
      }
    }
  },
  data() {
    return {
      name: '',
      SSRInvoking: true
    }
  },
  components: {
    LottoReport
  },
  mixins: [datepicker, dateTables, gameReport],
  methods: {
    async get(loadProps) {
      const { loadType, page } = this.getQueryParams(loadProps)
      //fix game_report/:name router change and checkPageData -> getPageCache -> currentPage,emit pageChange
      if (page === 0 && loadType === 'pageChange' && this.SSRInvoking)
        return this.fetch()
      this.SSRInvoking = false
      if (this.checkPageData(loadProps, page)) return
      const { name } = this
      if (
        checkDateFormat(this, 'queryDate') === true &&
        paramValidate(name, { context: this, ssr: false }) === true
      ) {
        !this.resetting && this.spin()
        const { dateParam, routeName: parent_name } = this
        const { data } = await request(this, {
          name,
          ...dateParam(),
          parent_name,
          page,
          page_size: loadType ? loadProps.pageSize : this.pageSize
        })
        Object.assign(this, data)
        this.pageDone(data, page)
      }
    },
    reset() {
      this.resetting = true
      this.setDate([])
      if (this.routeName) {
        this.$router.push('/admin/agent/game_report')
      } else {
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
      this.setState({ key: 'admin.queryLottoReportDate', value })
    },
    ...mapMutations(['setState'])
  },
  computed: {
    members() {
      const { parent_names, username, routeName } = this
      return parent_names.length
        ? parent_names.concat(routeName || username)
        : [username]
    },
    routeName() {
      return this.$route.params.name
    },
    ...mapGetters(['username'])
  },
  destroyed() {
    this.setDate([])
  }
}
</script>
