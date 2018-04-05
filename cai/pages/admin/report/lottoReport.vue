<template>
  <div>
    <el-form :inline="true" class="table-tool-bar">
      <el-form-item label="时间：">
        <el-date-picker v-model="date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :range-separator="rangeSeparator" @change="handlePicker" ref="datepicker" :picker-options="pickerOptions" @focus="handleFocus" align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="get">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <lotto-report :users="users" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import datepicker from '~/util/mixins/datepicker'

import LottoReport from '~/components/admin/LottoReport'

export default {
  name: 'user-lotto-report',
  data() {
    return {
      users:[]
    }
  },
  components:{
    LottoReport
  },
  mixins: [datepicker],
  created() {
    this.get()
  },
  methods: {
    get() {

      if(this.checkDateFormat() === true) {
        this.$axiosPlus(
          'proxy-manage/lottery-game-report',
          {...this.dateParam()},
          ({users}) => {
            this.users = users
          }
        )
      }
    },
    reset() {
      this.resetDate()
      this.$nextTick(this.get)
    }

  },
  computed: {

  }

}
</script>
