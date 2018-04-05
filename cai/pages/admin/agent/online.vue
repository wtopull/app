<template>
  <el-table
        :data="tableData" stripe border
        ref="table"
    >
        <el-table-column label="会员账号" prop="name" />
        <el-table-column label="上级" prop="parent_name" />
        <el-table-column label="分组" prop="level" />
        <el-table-column label="返点" prop="point" />
        <el-table-column label="余额">
           <template slot-scope="{row:{amount}}">
            {{amount | round3}}
          </template> 
        </el-table-column>
        <el-table-column label="最后登录时间" prop="loginTime" />
        <!--el-table-column label="操作">
          
        </el-table-column-->
      </el-table>
</template>

<script>
import team,{getChildren} from '~/util/mixins/team'

export default {
  name:'team-online',
  async asyncData({app,store,error}){
    if(!store.state.user.token) return {users:[],total:0}
    return (await getChildren(app,{children_type:2,is_online:1})).data
  },
  data(){

  },
  mixins:[team]
}
</script>
