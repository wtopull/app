<template>
  <div>
    <data-tables-server :data="reportData" :total="total" v-loading="loading.on" :element-loading-text="loading.text" @query-change="get" :pagination-def="paginationDef">
      <el-table-column label="会员账号" v-if="isAgent">
        <template slot-scope="{row:{name,has_children}}">
          <nuxt-link :to="`/admin/agent/game_report/${name}`" class="el-button--text" v-if="has_children">{{name}}</nuxt-link>
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
    </data-tables-server>
  </div>  
</template>


<script>
import { paginationDef,style} from '~/util/mixins/data-tables'

export default {
  name: 'lotto-report',
  props: ['isAgent', 'reportData','total','get','currentPage','pageSize','loading'],
  created(){
    
  },
  methods: {
    style,
  },
  computed: {
    paginationDef() {
      const {currentPage,total,pageSize} = this
      return paginationDef(total,pageSize,currentPage)
    },
  }
}
</script>
