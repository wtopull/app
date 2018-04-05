<template>
  <el-dialog :title="title" :visible.sync="visible" width="650px" @open="get">
    <div class="el-table order-detail el-table--fit el-table--border" v-loading="loading" :element-loading-text="loadingText">
      <table class="table el-table__body">
        <col width="90">
        <col>
        <col width="90">
        <col>
        <tbody>
          <tr v-for="(item,index) in labels" :key="item[0]">
            <td>{{item[0]}}</td>
            <td>{{tableDetail[index][0]}}</td>
            <td>{{item[1]}}</td>
            <td>{{tableDetail[index][1]}}</td>
          </tr>
          <tr>
            <td>投注号码</td>
            <td colspan="3">
              <el-scrollbar tag="div" v-if="orderTable.detail.buy_number.length > 200">
                {{orderTable.detail.buy_number}}
              </el-scrollbar>
              <div v-else>
                {{orderTable.detail.buy_number}}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <component :is="view" :tableData="detail.detail"></component>
    <div slot="footer" v-if="detail.cancelable">
      <el-button @click="submit" type="primary" size="mini">撤单</el-button>
      <el-button @click="close" size="mini">取消</el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss">
.order-detail {
  table{
    width: 100%;
  }
  td {
    text-align: left;
    padding-left: 15px;
    font-size: $font-size-base;
  }
  .el-scrollbar {
    .is-vertical {
      opacity: 1;
      .el-scrollbar__thumb {
        //fix height calc
        min-height: 50px;
      }
    }
  }
  .el-scrollbar__view {
    word-wrap: break-word;
    padding-right: 12px;
  }
  .el-scrollbar__wrap {
    max-height: 150px;
    overflow-x: hidden;
  }
}
</style>


<script>
import { flatten } from 'lodash'
import { chunk } from 'lodash/fp'
import { mapGetters } from 'vuex'
import { defaultRound } from '~/plugins/filters'
import {AsyncComp} from '~/plugins/common'
const groupTable = chunk(2)

export default {
  name: 'order-detail',
  inject: ['orderTable'],
  props:{
    isChase:{
      default () {
        return this.orderTable.isChase
      }
    }
  },
  data() {
    const labels = groupTable([
      '玩法',
      '编号',
      '期号',
      '金额',
      '注数',
      '倍数',
      '模式',
      '返点',
      '状态',
      '盈亏',
      '奖金',
      '中奖注数',
      '投注时间',
      '开奖号码'
    ])

    return {
      labels,
      visible: true,
      loading: true,
      view:this.isChase && 'ChaseList'
    }
  },
  components:{
    ChaseList:AsyncComp('admin', 'ChaseList')
  },
  created() {
    //before @open run,first visible true not  emit @open
    this.get()
  },
  methods: {
    get() {
      //this.detail not reactive this time,this.$nextTick fail
      // const detail = this.orderTable.detail
      const {detail,isChase} = this
      if (!detail.cancelable) return (this.loading = false)
      //reset loading
      this.loading = true
      const id = detail.id
      this.$axiosPlus(`user-${isChase ? 'chase-' : ''}bet-lottery/find`, { id }, data => {
        this.orderTable.detail = {
          ...this.orderTable.format(data),
          profit: defaultRound(data.profit_loss_amount)
        }
        this.loading = false
      })
    },
    close() {
      this.visible = false
    },
    submit() {
      this.orderTable.cancel(this.detail, this.close)
    }
  },
  computed: {
    title() {
      return `${this.isChase ? '追号' : '订单'}详情`
    },
    detail(){
      return this.orderTable.detail
    },
    tableDetail() {
      const { detail } = this.orderTable
      return groupTable([
        detail.method,
        detail.sys_id,
        detail.issue,
        detail.amount,
        detail.bet_count,
        detail.multiple,
        detail.unit,
        detail.point,
        this.orderTable.statusLabel(detail.status),
        detail.profit,
        detail.bonus,
        detail.win_count || 0,
        detail.created_at,
        detail.win_number || '无'
      ])
    },
    loadingText() {
      return this.$store.state.loading.text
    }
  }
}
</script>

