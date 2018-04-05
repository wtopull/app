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
        </tbody>
      </table>
    </div>
    <div slot="footer">
      <el-button @click="submit" type="primary" size="mini">撤单</el-button>
      <el-button @click="close" size="mini">取消</el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss">
@import '../../assets/element-variables';
@import '../../assets/scss/variables';
.order-detail {
  td {
    text-align: left;
    padding-left: 15px;
    font-size: $font-size-base;
  }
}
</style>


<script>
import { flatten } from 'lodash'
import { chunk } from 'lodash/fp'
import { mapGetters } from 'vuex'
import {round3,round2} from '~/plugins/filters'
const groupTable = chunk(2)

export default {
  name: 'order-detail',
  props: ['isChase', 'detail'],
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
      fuck11: null
    }
  },
  created() {
    //before @open run,first visible true not  emit @open
    this.get()
  },
  methods: {
    get() {
      const id = this.detail.id
      this.$axiosPlus('user-bet-lottery/find', { id }, data => {
        const {
          self_return_amount,
          win_count,
          profit_loss_amount,
          win_number,
          status
        } = data

        this.$emit('update:detail',{...this.detail,point: round2(self_return_amount),
          win_count,
          profit: round3(profit_loss_amount),
          win_count,
          win_number,
          //$emit change make the detail observe,Object.assign can't do this
          status})
        this.loading = false
      })
    },
    submit() {},
    close() {
      this.visible = false
    }
  },
  computed: {
    title() {
      return `${this.isChase ? '追号' : '订单'}详情`
    },
    tableDetail() {
      const {detail} = this
      return groupTable([
        detail.method,
        detail.sys_id,
        detail.issue,
        detail.amount,
        detail.bet_count,
        detail.multiple,
        detail.money_unit,
        detail.point,
        detail.status,
        detail.profit,
        detail.bonus,
        detail.win_count,
        detail.created_at,
        detail.win_number
      ])
    },
    loadingText(){
      return this.$store.state.loading.text
    },
    ...mapGetters({
      listMap: 'lotto/listMap'
    })
  }
}
</script>

