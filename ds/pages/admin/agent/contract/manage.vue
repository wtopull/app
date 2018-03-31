<template>
  <div class="contract-manage">
    <el-tabs type="border-card" @tab-click="handleClick">
      <el-tab-pane label="建立契约">
        <contract-create></contract-create>
      </el-tab-pane>
      <el-tab-pane label="契约管理">
        <el-form :model="form">
          <div class="block">
            <el-form-item label="下级用户名：">
              <el-input v-model="form.user_name" placeholder="下级用户名"></el-input>
            </el-form-item>
            <div class="d-flex">
              <el-form-item label="契约状态：">
                <el-select v-model="form.status" placeholder="契约状态">
                  <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="币种：">
                <el-select v-model="form.currencyList" placeholder="币种">
                  <el-option v-for="item in currencyList" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-button type="primary" class="query-button" @click="getContractList">搜索</el-button>
            </div>
          </div>
        </el-form>
        <data-tables :data="tableData" ref="table" v-loading="loading" :pagination-def="paginationDef">
          <el-table-column label="上级" prop="" />
          <el-table-column label="下级" prop="user_name" />
          <el-table-column label="契约类型">
            <template slot-scope="{row: {calculate_cycle}}">
              <span>{{formatCalculateCycle(calculate_cycle)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="币种" prop="currency" />
          <el-table-column label="契约状态" prop="status">
            <template slot-scope="{row:{status}}">
              <span>{{formatStatus(status)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row: {id, status}}">
              <el-button @click="checkContractDetail(id, status)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </data-tables>
      </el-tab-pane>
      <el-tab-pane label="我的契约">
        <data-tables :data="tableData" ref="table" v-loading="loading" :pagination-def="paginationDef">
          <el-table-column label="上级" prop="parentz_user_name" />
          <el-table-column label="下级" prop="" />
          <el-table-column label="契约类型">
            <template slot-scope="{row: {calculate_cycle}}">
              <span>{{formatCalculateCycle(calculate_cycle)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="币种" prop="currency" />
          <el-table-column label="契约状态" prop="status">
            <template slot-scope="{row:{status}}">
              <span>{{formatStatus(status)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row: {id, status}}">
              <el-button @click="checkContractDetail(id, status)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </data-tables>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="分红契约" :visible.sync="showContract" width="535px">
      <div class="dialog-label">
        契约状态：
        <span>{{dialogData.status}}</span>
      </div>
      <div class="dialog-list">
        <div class="list-head">
          契约条件
        </div>
        <div class="list-content">
          <div v-for="(condition_level, index) in dialogData.list.condition_list">
            <div class="list-title">等级{{index + 1}}</div>
            <div v-for="({condition_type, condition_target_start, condition_target_end}, condition_index) in condition_level">
              <p>条件{{condition_index + 1}}：{{formatCondition(condition_type)}}，起始值：{{condition_target_start}}，达标值：{{condition_target_end}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="dialog-list">
        <div class="list-head">
          契约奖励
        </div>
        <div class="list-content">
          <div v-for="(prize_level, index) in dialogData.list.prize_list">
            <div class="list-title">等级{{index + 1}}</div>
            <div v-for="({prize_type, prize_num}, prize_index) in prize_level">
              <p>奖励{{prize_index + 1}}：{{formatPrize(prize_type)}}，数额：{{prize_num}}</p>
            </div>
          </div>
        </div>

      </div>
      <div v-if="dialogData.showSign || dialogData.showAgree || dialogData.showStop" class="dialog-footer">
        <span slot="footer">
          <div v-if="dialogData.showSign">
            <el-button @click="handleContract('sign', currentContractId, false)">否绝此契约</el-button>
            <el-button type="primary" @click="handleContract('sign', currentContractId, true)">同意此契约</el-button>
          </div>
          <div v-else-if="dialogData.showAgree">
            <el-button @click="handleContract('agree', currentContractId, false)">否决终止契约</el-button>
            <el-button type="primary" @click="handleContract('agree', currentContractId, true)">同意终止契约</el-button>
          </div>
          <el-button v-else-if="dialogData.showStop" type="primary" @click="stopContract(currentContractId)">终止契约</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.contract-manage {
  margin-top: 20px;
  min-height: 570px;

  /deep/ .el-tabs--border-card > .el-tabs__content {
    padding: 20px 0 0;
  }

  /deep/ .el-tabs--border-card > .el-tabs__header {
    background-color: white;
    border-bottom: none;
  }

  /deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item {
    border: 1px solid #ccc;
    margin-right: 5px;
    margin-top: 5px;
    margin-left: 1px;
    height: 30px;
    line-height: 30px;
    padding: 0;
    width: 80px;
    text-align: center;

    &.is-active {
      border: 1px solid $--color-primary;
    }
  }

  /deep/ .el-tabs--border-card {
    border: none;
    box-shadow: none;
  }

  /deep/ .el-tabs__nav-wrap {
    margin-bottom: 0;
  }

  /deep/ .el-input__inner {
    width: 145px;
    height: 32px;
  }

  /deep/ .el-form-item__label {
    font-size: 14px;
    color: #7b7b7b;
    width: 85px;
    margin-right: 10px;
    padding: 0;
  }
}
.el-dialog__body {
  height: 500px;
  overflow: scroll;
}

.dialog-label {
  font-size: 16px;
  span {
    font-weight: bold;
  }
}

.dialog-list {
  margin-top: 30px;
  font-size: 12px;
  border: 1px solid #ccc;

  .list-head {
    background: #f9f9f9;
    border-bottom: 1px solid #ccc;
    line-height: 30px;
    height: 30px;
    font-size: 14px;
    padding: 0 20px;
  }

  .list-content {
    padding: 20px 20px 0;
    > div {
      margin-bottom: 20px;
    }
    p {
      margin-left: 15px;
    }
  }
  .list-title {
    font-size: 14px;
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.block {
  padding: 17px 17px 25px 17px;

  .el-form-item {
    display: flex;
  }

  &:nth-child(odd) {
    background: #f9f9f9;
  }

  &:nth-child(1) {
    background: white;
  }

  .block-select {
    /deep/ .el-input__inner {
      width: 200px;
      height: 32px;
      margin-right: 5px;
    }
  }

  .block-input {
    /deep/ .el-input__inner {
      width: 122px;
      height: 32px;
      margin-right: 5px;
    }
  }

  .el-button {
    width: 70px;
    height: 28px;
    line-height: 28px;
    padding: 0;
    border-radius: 3px;
  }
}

.query-button {
  margin-top: 5px;
  margin-left: 50px;
}
</style>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { map, find, remove, pick } from 'lodash/fp'
import contractCreate from '~/components/contract/create'
import contractList from '~/components/contract/list'
import { levels, style, paginationDef } from '~/util/mixins/data-tables'
import typeList from '~/util/contract/type'
import conditionList from '~/util/contract/condition'
import prizeList from '~/util/contract/prize'
import DataTables from '~/components/vue-data-tables/components/DataTables'

DataTables.install = function(Vue) {
  Vue.component(DataTables.name, DataTables)
}
Vue.use(DataTables)

export default {
  data() {
    return {
      loading: true,
      contractToChild: false,

      showContract: false,

      tableData: [],
      prizeTableData: [],

      currentContractId: '',

      form: {
        user_name: null,
        status: null,
        currency: null
      },

      statusList: [
        { value: 1, name: '下级未签约' },
        { value: 2, name: '下级已签约' },
        { value: 3, name: '被拒绝' },
        { value: 4, name: '已终止' },
        { value: 5, name: '下级发起终止中' },
        { value: 6, name: '发起终止中' },
        { value: 7, name: '系统终止' }
      ],
      currencyList: [],

      dialogData: {
        status: '', // 契约状态
        showSign: false, // 是否显示接受契约按钮
        showStop: false, // 是否显示发起终止契约按钮
        showAgree: false, // 是否显示同意终止按钮

        list: {
          condition_list: [],
          prize_list: []
        }
      }
    }
  },

  components: {
    contractCreate
  },

  methods: {
    /* 获取发送给下级或上级发给自己的契约列表 */
    getContractList() {
      this.loading = true
      const { status, currency, user_name } = this.form
      let reqData
      if (this.contractToChild) {
        reqData = {
          status,
          currency,
          user_name
        }
      }

      return this.$axiosPlus(
        `user-contract/${
          this.contractToChild ? 'get-contract-list' : 'get-child-contract'
        }`,
        {
          ...(this.contractToChild ? reqData : null)
        },
        res => {
          this.tableData = res.list
          this.loading = false
        }
      )
    },

    formatStatus(status) {
      let statusList
      if (this.contractToChild) {
        statusList = [
          '下级未签约',
          '下级已签约',
          '被拒绝',
          '已终止',
          '下级发起终止中',
          '发起终止中',
          '系统终止'
        ]
      } else {
        statusList = [
          '尚未签约',
          '已签约',
          '已拒绝',
          '已终止',
          '发起终止中',
          '上级发起终止中',
          '系统终止'
        ]
      }

      return statusList[status - 1]
    },

    formatCalculateCycle(calculate_cycle) {
      return find({ id: calculate_cycle })(typeList).name
    },

    checkContractDetail(id, status) {
      this.$axiosPlus(
        'user-contract/get-contract-detail',
        { contract_bonus_id: id },
        res => {
          const { prize_levels, condition_levels, contract } = res
          this.dialogData.status = this.formatStatus(status)

          this.checkActionInDialog(status)

          this.dialogData.list = this.formatConditionList(res)
          this.currentContractId = id
          this.showContract = true
        }
      )
    },

    formatConditionList({ condition_levels, prize_levels, contract }) {
      return {
        condition_list: Object.keys(condition_levels).map(
          level => condition_levels[level]
        ),
        prize_list: Object.keys(prize_levels).map(level => prize_levels[level])
      }
    },

    /* 判断弹窗要显示何种按钮 */
    checkActionInDialog(status) {
      this.dialogData.showSign = false
      this.dialogData.showStop = false
      this.dialogData.showAgree = false
      if (this.contractToChild) {
        if (status === 2) {
          this.dialogData.showStop = true
        } else if (status === 5) {
          this.dialogData.showAgree = true
        }
      } else {
        if (status === 1) {
          this.dialogData.showSign = true
        } else if (status === 2) {
          this.dialogData.showStop = true
        } else if (status === 6) {
          this.dialogData.showAgree = true
        }
      }
    },

    formatCondition(type) {
      return find({ id: type })(conditionList).name
    },

    formatPrize(type) {
      return find({ id: type })(prizeList).name
    },

    handleContract(type, id, decide) {
      const isSign = type === 'sign'
      this.$axiosPlus(
        `user-contract/${isSign ? 'sign-contract' : 'reply-stop-contract'}`,
        {
          contract_bonus_id: id,
          [`${isSign ? 'sign' : 'agree'}`]: decide
        },
        res => {
          this.showContract = false
          this.$message({
            message: '契约处理成功',
            type: 'success',
            duration: 2000
          })
          this.getContractList()
        }
      )
    },

    stopContract(id) {
      this.$axiosPlus(
        'user-contract/apply-stop-contract',
        {
          contract_bonus_id: id
        },
        res => {
          this.showContract = false
          this.$message({
            message: '申请终止契约成功',
            type: 'success',
            duration: 2000
          })
          this.getContractList()
        }
      )
    },

    handleClick(tab, event) {
      if (tab.$options.propsData.label === '契约管理') {
        // 发出去的契约
        this.contractToChild = true
      } else if (tab.$options.propsData.label === '我的契约') {
        // 接受的契约
        this.contractToChild = false
      } else {
        this.contractToChild = true
        this.contractToChild = false
      }
    },

    getCurrency() {
      return this.$axiosPlus('user-contract/get-ready', res => {
        const { currency } = res
        this.renderCurrencyOptions(currency)
      })
    },

    renderCurrencyOptions(currency) {
      const currencyList = Object.keys(currency).map(key => {
        return {
          id: key,
          name: currency[key]
        }
      })
      this.currencyList = currencyList
    },

    queryContractList() {}
  },
  computed: {
    paginationDef() {
      const { tableData } = this
      return paginationDef(tableData ? tableData.length : 0, 5, 1)
    },

    ...mapGetters(['username'])
  },

  created() {
    this.getContractList()
  },

  watch: {
    contractToChild: function() {
      this.getContractList()
    }
  }
}
</script>


