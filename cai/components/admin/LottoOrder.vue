<template>
  <div class="admin-report">
    <!--data-tables-server :data="tableData" :total="total" :load-data="loadData">
      <el-table-column prop="sys_id" label="订单编号" sortable="custom" />
      <el-table-column prop="lottery_method_name" label="投注玩法" width="180" />
      <el-table-column prop="issue" width="100" label="投注期号" sortable="custom" />
      <el-table-column prop="amount" label="金额" sortable="custom" />
      <el-table-column prop="created_at" width="150" label="下单时间" sortable="custom" />
      <el-table-column prop="winAmount" label="奖金" sortable="custom" />
      <el-table-column  label="状态" width="70">
        <template slot-scope="{row}">
          <span :class="style(row.status)">{{row.status | statusLabel}}</span>
        </template>
      </el-table-column>
    </data-tables-server-->
    <el-form :inline="true" class="table-tool-bar" v-if="!hideForm">
      <el-form-item label="根据：">
        <el-select v-model="queryKey">
          <el-option v-for="(label,key) in queryKeyLabels" :label="label" :value="key" :key="key" />
        </el-select>
      </el-form-item>
      <el-form-item label="查询：">
        <el-input v-model="queryValue"></el-input>
      </el-form-item>
      <el-form-item label="游戏类别：">
        <!-- element-ui issue?select no but click not fold -->
        <el-cascader expand-trigger="hover" :options="lottoOptions" popper-class="el-scrollbar-show" v-model="lottoIds" filterable :show-all-levels="false" placeholder="搜索：分分彩" ref="cascader">
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
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column label="订单编号">
        <template slot-scope="{row}">
          <a class="el-button--text" @click="getDetail(row.id,row)">{{row.sys_id}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="所属会员" v-if="type" />
      <el-table-column prop="method" label="投注玩法" min-width="200" />
      <el-table-column prop="issue" min-width="150" label="投注期号" />
      <el-table-column prop="amount" label="金额" />
      <el-table-column prop="created_at" min-width="150" label="下单时间" />
      <el-table-column prop="bonus" label="奖金" />
      <el-table-column label="状态">
        <template slot-scope="{row:{status}}">
          <span :class="style(status)">{{status | statusLabel}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="multiple" label="倍数" v-if="type" />
      <el-table-column label="操作" v-if="!type">
        <template slot-scope="{row}">
          <el-button v-if="row.cancelable" type="text" @click="cancel(row)">撤单</el-button>
          <i class="el-icon-minus" v-else></i>
        </template>
      </el-table-column>
    </el-table>
    <component :is="view" v-bind={isChase} :detail.sync="detail" ref="detail" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { paramValidate,AsyncComp } from '~/plugins/common'
// import { DataTablesServer } from 'vue-data-tables'
// Vue.use(DataTablesServer)
import datepicker, {
  getNewDate,
  dateParam,
  checkDateFormat
} from '~/util/mixins/datepicker'
import dateTables, { round3,queryAll } from '~/util/mixins/data-tables'

let statusList = {...queryAll}

const initDate = () => ({
  lottoIds: [],
  status: '',
  queryKey: '0',
  queryValue: ''
})

export default {
  name: 'lotto-order',
  props: ['type', 'hideForm','isChase'],
  data() {
    return {
      total: 0,
      tableData: [],
      pageSize: 10,
      pageTotal: 0,
      cancelKey: 6,
      cancelable: 1,
      lottoOptions: [{ label: '全部游戏', value: '' }],
      // statusList: { '0': '全部', ...statusList },
      statusList,
      //todo : when use change to keyword_type_list
      // queryKeyLabels: ['系统编号', '投注期号', '会员账号'],
      queryKeyLabels: {...queryAll},
      view:'',
      detail:null,
      ...initDate()
    }
  },
  mixins: [datepicker],
  components:{
    OrderDetail:AsyncComp('admin', 'OrderDetail')
  },
  async created() {
    this.get()
    await this.$store.dispatch('lotto/getTypes')
    this.getLottoOptions()
    // ['lottoName'].forEach(i => this.$watch(i, () => {
    //   this.get()
    // }))
  },
  methods: {
    get() {
      const { queryValue, queryKey } = this
      if (
        this.queryKey === '3' &&
        paramValidate(queryValue, { context: this, ssr: false }) !== true
      )
        return

      if (this.checkDateFormat() === true) {
        const { type, lottoName, status, dateParam } = this
        this.$axiosPlus(
          'user-bet-lottery/get',
          {
                type,
                info_identifier: lottoName,
                status,
                keyword: queryValue,
                ...dateParam(),
                ...queryKey !== '0' ? {keyword_type: queryKey} : {}
              },
          ({ user_lottery_bets,drop_list }) => {
            this.queryKeyLabels = {...queryAll,...drop_list.keyword_type_list}
            statusList = this.statusList = {...queryAll,...drop_list.status_list}
            this.tableData = user_lottery_bets.map(_ => ({
              ...this.format(_.content)
            }))
          }
        )
      }
    },
    reset() {
      Object.assign(this, initDate())
      this.resetDate()
      this.get()
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
      ...props
    }) {
      const lottoInfo = this.listMap[lottery_info_identifier.toLowerCase()]
      const method = lottery_method_name.replace(lottoInfo.typeName,lottoInfo.name + '-')
      return {
        ...props,
        status,
        username,
        amount: round3(total_bet_amount),
        bonus: win_amount ? round3(win_amount) : 0,
        method,
        end_betted_at,
        cancelable:
          status === this.cancelable && new Date() < new Date(end_betted_at)
      }
    },
    style(status) {
      return `text-${{
        1: 'warning',
        2: 'warning',
        3: 'warning',
        4: 'success',
        5: 'danger',
        6: 'muted'
      }[status]}`
    },
    cancel(row) {
      //api/user-bet-lottery/create require end_betted_at
      if(new Date() >= new Date(row.end_betted_at)) {
        this.$message({
          message: '投注已超过撤单时间！',
          type: 'warning',
          duration: 2000
        })
        return this.cancelDone(row)
      }

      this.$axiosPlus('user-bet-lottery/cancel', { id: row.id }, () => {
        this.cancelDone(row)
        this.getBal()
        this.$message({
          message: '撤單成功！',
          type: 'success',
          duration: 2000
        })
      })
    },
    cancelDone(row){
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
    getDetail(id,rowData){
      this.detail = rowData
      if (this.view == 'OrderDetail') {
        return (this.$refs.detail.visible = true)
      }
      this.view = 'OrderDetail'
    },
    ...mapActions({
      getBal:'pay/getBal'
    })
  },
  filters: {
    statusLabel(status) {
      //filters this -> undefined
      return statusList[status]
    }
  },
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
