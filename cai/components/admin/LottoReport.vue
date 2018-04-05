<template>
  <div>
    <el-table :data="tableData" stripe border ref="table">
      <el-table-column label="会员账号" v-if="isAgent">
        <template slot-scope="{row:{name,has_children}}">
          <nuxt-link :to="`/admin/agent/lottoReport/${name}`" class="el-button--text" v-if="has_children">{{name}}</nuxt-link>
          <span class="el-button el-button--text" v-else>{{name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="充值" prop="save" />
      <el-table-column label="提现" prop="withdraw" />
      <el-table-column label="投注" prop="bet" />
      <el-table-column label="派奖" prop="win" />
      <el-table-column label="返点" prop="point" />
      <el-table-column label="撤单" prop="cancelAmount" />
      <el-table-column label="活动" prop="event" />
      <el-table-column label="转账" prop="transfer" />
      <el-table-column label="盈亏" prop="profit">
        <template slot-scope="{row:{profit}}">
          <span :class="style(profit)">{{profit}}</span>
        </template>
      </el-table-column>
      <div slot="empty">
        <span class="text-danger">{{'测试空数据显示'}}</span>
      </div>
    </el-table>
  </div>  
</template>


<script>
import {plus,minus} from 'number-precision'
import { style,round3 } from '~/util/mixins/data-tables'
const format = ({self_return:point,bet_cancel:cancelAmount,event,trans_in:transfer,win,bet,...props}) => {
  const item = {
    point,
    cancelAmount,
    transfer,
    win,bet,event,
    // profit:plus(plus(minus(win,bet),point),event),
    profit:[minus(win,bet),point,event].reduce((a,b) => plus(a,b)),
    ...props
  }
  // Number.isNaN(+'asd')
  Object.keys(item).forEach((key) => {
    const value = item[key]
    typeof value !== 'boolean' && !Number.isNaN(+value) && (item[key] = round3(value))
  })
  return item
}

export default {
  name:'lotto-report',
  props:['users','isAgent'],
  data() {
    return {
      total: 0,
      pageSize: 10,
      pageTotal: 0,
    }
  },
  methods: {
    style,
  },
  computed: {
    tableData() {
      return this.users.map(_ => format(_.content))
    }
  }
}
</script>
