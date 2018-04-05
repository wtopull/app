<template>
  <div class="admin-report">
    <el-form :inline="true" class="table-tool-bar">
      <el-form-item label="交易类型：">
        <el-select v-model="transType">
          <el-option v-for="(label,key) in transList" :label="label" :value="key == '0' ? '' : key" :key="key" />
        </el-select>
      </el-form-item>
      <el-form-item label="用户名：" v-if="type == 2">
        <el-input v-model="name" @keyup.native.enter="get"></el-input>
      </el-form-item>
      <el-form-item label="操作状态：">
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
    <el-table :data="tableData" stripe border style="width: 100%" tooltip-effect="danger">
      <el-table-column prop="sys_id" label="订单编号" />
      <el-table-column prop="user_name" label="用户名" v-if="type == 2" />
      <el-table-column prop="transType" label="交易类型" />
      <el-table-column prop="beforeBal" label="操作前余额" />
      <el-table-column label="金额">
        <template slot-scope="{row:{amount}}">
          <span :class="style(amount)">{{amount | round3}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="afterBal" label="操作后余额" />
      <el-table-column prop="status" label="状态" />
      <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true">
        <template slot-scope="{row:{remark}}">
          <span v-if="remark">{{remark}}</span>
          <i class="el-icon-minus" v-else></i>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="时间" />
      
    </el-table>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import datepicker from '~/util/mixins/datepicker'
import dateTables,{ round3,style,queryAll } from '~/util/mixins/data-tables'
import { paramValidate } from '~/plugins/common'

const initDate = () => ({
  status:'',
  transType:'',
  name:''
})

export default {
  name: 'transaction',
  props:['type'],
  data() {
    return {
      total: 0,
      tableData: [],
      pageSize: 10,
      pageTotal: 0,
      statusList:{...queryAll},
      transList:{...queryAll},
      ...initDate()
    }
  },
  mixins: [datepicker],
  created() {
    this.get()
    // ['lottoName'].forEach(i => this.$watch(i, () => {
    //   this.get()
    // }))
  },
  methods: {
    get() {
      const {name:user_name,type} = this
      if(type === 2 && paramValidate(user_name,{context:this,ssr:false}) !== true) return
      if(this.checkDateFormat() === true) {
        const {status,dateParam,transType:trans_type,user_name} = this
        this.$axiosPlus(
          'user-balance-transaction/get',
          {...dateParam(),status,trans_type,user_name,...type ? {type} : {}},
          ({user_balance_transaction,total,drop_list}) => {
            this.statusList = {...queryAll,...drop_list.status_list}
            this.transList = {...queryAll,...drop_list.trans_type_list}
            this.tableData = user_balance_transaction.map(_ => this.format(_.content))
          }
        )
      }
      
    },
    reset(){
      Object.assign(this,initDate())
      this.resetDate()
      this.$nextTick(this.get)
    },
    format({trans_type,before_user_total_balance,admin_note,after_user_total_balance,status,...props}) {
      return {
        transType:this.transList[trans_type],
        beforeBal:round3(before_user_total_balance),
        afterBal:round3(after_user_total_balance),
        status:this.statusList[status],
        remark:admin_note,
        ...props
      }
    },
    style
  },
  computed:{
    ...mapGetters({
        
    })
  }
  
}
</script>
