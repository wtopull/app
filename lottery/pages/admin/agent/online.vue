<template>
  <data-tables-server :data="teamData" :total="total" @query-change="get" v-loading="loading.on" :element-loading-text="loading.text" :pagination-def="paginationDef">
        <el-table-column label="会员账号" prop="name" />
        <el-table-column label="上级" prop="parent_name" />
        <el-table-column label="分组" prop="level" />
        <el-table-column label="返点" prop="point" />
        <el-table-column label="余额">
           <template slot-scope="{row:{amount}}">
            {{amount | defaultRound}}
          </template> 
        </el-table-column>
        <el-table-column label="最后登录时间" prop="loginTime" />
        <!--el-table-column label="操作">
          
        </el-table-column-->
      </data-tables-server >
</template>

<script>
import dateTables from '~/util/mixins/data-tables'
import team, { getChildren } from '~/util/mixins/team'

export default {
  name: 'team-online',
  async asyncData({ app, store, error }) {
    if (process.server)
      return { users: [], teamData: [], isSPA: true, online: 1 ,onlyOnline:true }
    const { data } = await getChildren(app, { children_type: 2, is_online: 1 })
    return {
      ...data,
      teamData: data.users.map(team.methods.format)
    }
  },
  mixins: [dateTables, team]
}
</script>
