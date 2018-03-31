<template>
  <div class="admin-report">
    <el-form :inline="true" class="table-tool-bar" v-if="!hideForm">
      <el-form-item label="根据：">
        <el-select v-model="queryKey">
          <el-option v-for="(label,key) in queryKeyLabels" :label="label" :value="key" :key="key" />
        </el-select>
      </el-form-item>
      <el-form-item label="查询：">
        <el-input v-model="queryValue" @keyup.native.enter="get"></el-input>
      </el-form-item>
      <!-- <el-form-item label="彩系类别：">
        <el-select v-model="lottoType">
          <el-option v-for="(type,key) in lottoOptions" :label="type.label" :value="key == '0' ? '' : key" :key="key" />
        </el-select>
      </el-form-item> -->
      <el-form-item label="游戏类别：">
        <!-- element-ui issue?select no but click not fold -->
        <el-cascader expand-trigger="hover" :options="lottoOptions" popper-class="el-scrollbar-show lotto-type-cascader" v-model="lottoIds" filterable :show-all-levels="false" placeholder="搜索：分分彩" ref="cascader">
        </el-cascader>
      </el-form-item>
      <el-form-item label="订单状态：">
        <el-select v-model="status">
          <el-option v-for="(value,key) in statusList" :label="value" :value="key == '0' ? '' : key" :key="key" />
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
    <data-tables-server :data="tableData" :total="total" @query-change="get" v-loading="loading.on" :element-loading-text="loading.text" :pagination-def="paginationDef" :table-props="{height:fixTableHeight}">
      <!-- loadProps.sortInfo require prop sys_id -->
      <el-table-column label="订单编号" prop="sys_id" sortable="custom">
        <template slot-scope="{row}">
          <a class="el-button--text" @click="getDetail(row)">{{row.sys_id}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="所属会员" v-if="type" />
      <el-table-column prop="method" label="投注玩法" min-width="200" />
      <el-table-column prop="issue" min-width="150" label="投注期号" />
      <el-table-column prop="amount" label="投注金额" />
      <el-table-column prop="bonus" label="中奖金额" />

      <el-table-column label="状态">
        <template slot-scope="{row:{status}}">
          <span :class="style(status)">{{statusLabel(status)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" min-width="150" label="投注时间" />
      <el-table-column label="操作" v-if="!type">
        <template slot-scope="{row}">
          <el-button v-if="row.cancelable" type="text" @click="cancel(row)" style="margin-left: -12px;">撤单</el-button>
          <i class="el-icon-minus" v-else></i>
        </template>
      </el-table-column>
    </data-tables-server>
    <component :is="view" ref="detail" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {paramValidate} from '~/util/validator'
import { AsyncComp } from '~/plugins/common'
import datepicker, {
  dateParam,
  checkDateFormat
} from '~/util/mixins/datepicker'
import dateTables, { defaultRound, queryAll } from '~/util/mixins/data-tables'
import { transformCode } from '~/util/lotto/code'

export default {
  name: 'lotto-order',
  props: ['type', 'hideForm', 'isChase', 'serverData'],
  provide() {
    return {
      orderTable: this
    }
  },
  beforeCreate() {
    this.initDate = () => ({
      lottoIds: [],
      queryKey: '0',
      queryValue: ''
    })
  },
  data() {
    return {
      cancelKey: 0,
      cancelable: 1,
      lottoOptions: [{ label: '全部游戏', value: '' }],
      queryKeyLabels: { ...queryAll },
      view: '',
      // lottoType:null,
      detail: null,
      ...this.initDate(),
      fixTableHeight:this.$store.getters.token && 200 
    }
  },
  mixins: [datepicker, dateTables],
  components: {
    OrderDetail: AsyncComp('admin', 'OrderDetail')
  },
  async created() {
    this.fetch()
    await this.$store.dispatch('lotto/getTypes')
    this.getLottoOptions()
    this.listen('lottoName')
  },
  methods: {
    getActions(data) {
      this.queryKeyLabels = {
        ...queryAll,
        ...data.drop_list.keyword_type_list
      }
      //ensure cancelKey,statusList:{"0":"全部","1":"追号中","2":"已撤单","3":"追号结束"}
      !this.cancelKey &&
        (this.cancelKey = Object.keys(this.statusList)[
          Object.values(this.statusList).findIndex(_ => _.includes('撤单'))
        ])
    },
    get(loadProps) {
      console.log('loadProps', loadProps)
      // const loadType = loadProps && loadProps.type !== 'click' && loadProps.type
      // const page = loadType ? loadProps.page - 1 : 0
      const { loadType, page } = this.getQueryParams(loadProps)
      if (this.checkPageData(loadProps, page)) return
      const { queryValue, queryKey } = this
      if (
        queryKey === '3' &&
        paramValidate(queryValue, { context: this, ssr: false }) !== true
      )
        return
      if (this.checkDateFormat() === true) {
        if (this.sortChange(loadProps)) return true
        //reset loadProps is undefined
        !this.resetting && this.spin()
        const { type, lottoName, status, dateParam, isChase } = this
        this.$axiosPlus(
          `user-${isChase ? 'chase-' : ''}bet-lottery/get`,
          {
            type,
            info_identifier: lottoName,
            status,
            keyword: queryValue,
            page,
            // limit_type: loadType ? this.getPageSizes(loadProps.pageSize) : 1,
            page_size: loadType ? loadProps.pageSize : this.pageSize,
            ...dateParam(),
            ...(queryKey !== '0' ? { keyword_type: queryKey } : {})
          },
          data => this.pageDone(data, page)
        )
      }
    },
    format({
      total_bet_amount,
      win_amount,
      status,
      end_betted_at,
      user_name: username,
      lottery_info_identifier,
      lottery_info_name,
      lottery_method_name,
      money_unit,
      start_issue,
      is_cancel,
      self_return_amount,
      buy_number,
      profit_loss_amount,
      ...props
    }) {
      const lottoInfo = this.listMap[lottery_info_identifier]
      const method = lottery_method_name.replace(
        lottoInfo.typeName === '全天彩' ? '时时彩' : lottoInfo.typeName,
        lottoInfo.name + '-'
      )
      const { isChase } = this
      return {
        ...props,
        status,
        username,
        amount: defaultRound(total_bet_amount),
        bonus: win_amount ? defaultRound(win_amount) : 0,
        method,
        buy_number: transformCode(buy_number,method,lottoInfo.type),
        point: defaultRound(self_return_amount),
        end_betted_at,
        unit: ['元', '角', '分', '厘'][money_unit - 1],
        profit:defaultRound(profit_loss_amount),
        cancelable:
          // status === this.cancelable &&
          // (isChase ? true : new Date() < new Date(end_betted_at)),
          isChase
            ? is_cancel
            : status === this.cancelable &&
              new Date() < new Date(end_betted_at),
        ...(isChase ? { issue: start_issue } : {})
      }
    },
    style(status) {
      const { isChase } = this
      return `text-${
        {
          1: 'warning',
          2: isChase ? 'muted' : 'warning',
          3: isChase ? 'success' : 'warning',
          4: 'success',
          5: 'danger',
          6: 'muted'
        }[status]
      }`
    },
    cancel(row, callback) {
      const { isChase } = this
      //api/user-bet-lottery/create require end_betted_at
      if (isChase ? false : new Date() >= new Date(row.end_betted_at)) {
        this.$message({
          message: '投注已超过撤单时间！',
          type: 'warning',
          duration: 2000
        })
        return this.cancelDone(row)
      }

      this.$axiosPlus(
        `user-${isChase ? 'chase-' : ''}bet-lottery/cancel`,
        { id: row.id },
        res => {
          //todo check ffc timeout
          if (res && res.error) {
            this.$message({
              message: res.message,
              type: 'error',
              duration: 2000
            })
          } else {
            this.getBal()
            this.$message({
              message: '撤單成功！',
              type: 'success',
              duration: 2000,
              onClose: () => {
                callback &&
                  setTimeout(() => {
                    callback()
                    //components\admin\OrderDetail.vue:30 v-if="cancelable"
                    //components\admin\OrderDetail.vue:124 this.detail can't reactive tableData
                    this.cancelDone(this.tableData.find(_ => _.id === row.id))
                  }, 300)
              }
            })
          }
          !callback && this.cancelDone(row)
        },
        { showError: false, errCb: true }
      )
    },
    cancelDone(row) {
      Object.assign(row, { status: this.cancelKey, cancelable: false })
    },
    getLottoOptions() {
      //todo filter-method
      this.lottoOptions = this.lottoOptions.concat(
        this.lottoTypes.map(({ infos, name }) => {
          const lottoKeys = Object.keys(infos)
          return {
            value: name,
            label: name,
            children: Object.values(infos).map(({ name: label }, index) => ({
              value: lottoKeys[index],
              label
            }))
          }
        })
      )
    },
    getDetail(rowData) {
      this.detail = rowData
      if (this.view == 'OrderDetail') {
        return (this.$refs.detail.visible = true)
      }
      this.view = 'OrderDetail'
    },
    ...mapActions({
      getBal: 'pay/getBal'
    }),
    isPlayCodeDouble(lottoType) {
      return ['11x5', 'pk10'].some(type => lottoType === type)
    }
  },
  //filters may be overwrite between lottoOrder and chaseOrder
  // filters: {
  //   statusLabel(status) {
  //     //filters this -> undefined
  //     return statusList[status]
  //   }
  // },
  computed: {
    ...mapGetters({
      lottoTypes: 'lotto/types',
      listMap: 'lotto/listMap'
    }),
    lottoName() {
      return this.lottoIds[1] || ''
    }
  }
}
</script>
