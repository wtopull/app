<template>
  <div class="third-party-nav">
    <div class="third-party-container container">
      <div class="third-party-amount">
        当前馀额：{{200000.00}}元
      </div>
      <el-form :model="form" :rules="rules" ref="form" label-width="82px" v-if="transInList.length > 1" class="d-flex">
        <el-form-item label="转出账户：" prop="transOut" class="third-party-operator">
          <el-select v-model="form.transOut" @change="change(null,'out')">
            <el-option v-for="item in transOutList" :label="item.name" :value="item.prefix" :key="item.prefix" :disabled="item.disabled" />
          </el-select>
        </el-form-item>
        <el-form-item label="转入账户：" prop="transIn" class="third-party-operator">
          <el-select v-model="form.transIn" @change="change(null,'in')">
            <el-option v-for="item in transInList" :label="item.name" :value="item.prefix" :key="item.prefix" :disabled="item.disabled" />
          </el-select>
        </el-form-item>
        <el-form-item label="转入金额：" class="third-party-operator">
          <el-select v-model="form.amount" @change="amountChange">
            <el-option v-for="amount in hotAmounts" :label="amount" :value="amount" :key="amount" />
          </el-select>
          <b>(最低100元,最高49999元)</b>
          <!--<el-input-number v-model="form.amount" @change="amountChange" controls-position="right" :min="100"></el-input-number>最低转入50元
                    <el-radio-group v-model="hotAmount" size="small" @change="hotAmountChange">
                        <el-radio-button v-for="amount in hotAmounts" :label="amount" :key="amount"></el-radio-button>
                    </el-radio-group>-->
        </el-form-item>
        <el-form-item label="登入密码：" prop="pw" class="third-party-operator">
          <el-input type="password" v-model="form.pw" @keyup.native.enter="sumbit" placeholder="请输入登入密码"></el-input>
        </el-form-item>
        <el-form-item class="third-party-operator">
          <el-button type="primary" @click="sumbit" :loading="loading">确认</el-button>
        </el-form-item>
      </el-form>
      <!-- <div class="third-party-operator">
        <label for="">转出帐户：</label>
        <el-select v-model="transferFrom" placeholder="转出帐户">
          <el-option v-for="item in options" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="third-party-operator">
        <label for="">转入帐户：</label>
        <el-select v-model="transferFrom" placeholder="转入帐户">
          <el-option v-for="item in options" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="third-party-operator">
        <label for="">转入金额：</label>
        <el-input v-model="transferAmount" placeholder="转入金额"></el-input>
      </div>
      <el-button type="primary" @click="transfer">确定转入</el-button> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.third-party-nav {
  background: $--color-primary;
  height: 42px;
}

.third-party-container {
  display: flex;
  height: 42px;
  justify-content: space-between;

  .el-button {
    width: 103px;
    height: 32px;
    margin-top: 5px;
    margin-left: 5px;
  }
}

.third-party-amount {
  width: 240px;
  background: #444;
  color: white;
  text-align: center;
  line-height: 42px;
  font-size: 16px;
}

.third-party-operator {
  flex: 1;
  padding: 0 15px;
  border-left: 1px solid #ddb72e;
  label {
    color: #4d4d4d;
  }
  & /deep/ .el-input__inner {
    width: 160px;
    height: 29px;
    margin-top: 7px;
    font-size: 14px;
  }

  & /deep/ .el-input__suffix {
    margin-top: 4px;
  }

  & /deep/ .el-input {
    width: 160px;
    font-size: 14px;
  }
}
</style>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { isMobile } from '~/plugins/UA'
import { pwReg, getRequiredRule } from '~/util/validator'

const initTransList = _ => ({
  ..._,
  disabled: _.prefix === 'NVR'
})

export default {
  name: 'third-party-nav',
  props: [],
  data() {
    return {
      loading: false,
      types: ['in', 'out'],
      list: '',
      transferAmount: '',
      transInList: '',
      transOutList: '',
      loadings: '',

      form: {
        pw: '',
        transIn: '',
        transOut: '',
        transable: true,
        amount: '1000'
      },

      rules: {
        transIn: [getRequiredRule('请选择平台', 'change')],
        transOut: [
          getRequiredRule('请选择平台', 'change'),
          {
            validator: (rule, value, callback) => {
              const { form } = this
              if (
                !form.transable &&
                (this.isTransOut
                  ? this.bal
                  : this.availableGames[form.transOut].balance) < form.amount
              ) {
                callback(new Error('余额不足！'))
              }
              callback()
            },
            trigger: 'blur'
          }
        ],
        pw: [getRequiredRule('请输入登入密码')]
      },
      hotAmount: '1000',
      hotAmounts: ['1000', '5000', '10000', '全部余额']
    }
  },

  methods: {
    sumbit() {
      this.form.transable = false
      this.$form.validate(valid => {
        if (valid) {
          const { pw, amount } = this.form
          const { isTransOut } = this
          const type = this.isTransOut ? 1 : 2
          const platform = this.form[camelCase(`trans ${this.types[type - 1]}`)]
          this.loading = true
          this.$axiosPlus(
            'third-party-game/transfer',
            {
              type,
              user_password: pw,
              platform,
              money: amount
            },
            _ => {
              this.loading = false
              this.reset()
              this.$message({
                message: `转${isTransOut ? '入' : '出'}${platform}成功！`,
                type: 'success',
                duration: 1500,
                onClose: () => {
                  const { availableGames } = this
                  this.getBal()
                  this.setState({
                    key: '_3rdGames',
                    value: {
                      ...availableGames,
                      [platform]: {
                        balance:
                          +availableGames[platform].balance +
                          +amount * (isTransOut ? 1 : -1)
                      }
                    }
                  })
                }
              })
            }
          )
        } else {
          this.form.transable = true
          return false
        }
      })
    },
    change(val, type) {
      const reverseProp = camelCase(`trans ${this.types.find(_ => _ !== type)}`)
      const reverseList = this[reverseProp + 'List']
      const isSelf = this.form[camelCase(`trans ${type}`)] === 'self'
      reverseList.forEach(
        (v, k) => k !== 0 && v.prefix !== 'NVR' && (v.disabled = !isSelf)
      )
      this.form[reverseProp] = isSelf ? '' : 'self'
      this.hotAmount === '全部余额' && this.hotAmountChange('全部余额')
    },
    hotAmountChange(amount) {
      const { form } = this
      this.form.amount =
        amount === '全部余额'
          ? this.isTransOut
            ? this.bal
            : form.transOut
              ? this.availableGames[form.transOut].balance
              : form.amount
          : amount
    },
    amountChange(amount) {
      this.hotAmount = this.hotAmounts.find(_ => _ == amount) || ''
    },

    reset() {
      this.$form.resetFields()
      this.loading = false
      this.form.amount = this.hotAmount = '1000'
      this.form.transIn = this.form.transOut = ''
      this.transInList = this.transInList.map(initTransList)
      this.transOutList = this.transOutList.map(initTransList)
    },
    ...mapActions({ getBal: 'pay/getBal' }),
    ...mapMutations(['setState', 'setUser'])
  },

  computed: {
    isTransOut() {
      return this.form.transOut === 'self'
    },
    ...mapState({
      userModel: 'user'
    }),
    ...mapGetters({
      bal: 'pay/bal',
      totalBal: 'pay/totalBal',
      availableGames: '_3rdGames'
    }),
    ...mapGetters(['_3rdPlatformPrefix'])
  },

  mounted() {
    this.$form = this.$refs.form

    this.$axiosPlus('static-data/third-party-game-platform', {}, list => {
      const availableList = list.filter(
        _ =>
          _[`${isMobile ? 'mobile' : 'web'}_status`] !== 2 &&
          this.$store.getters._3rdPlatformPrefix.includes(_.prefix)
      )
      const self = [{ prefix: 'self', name: '彩票' }]
      this.transInList = self.concat(availableList.map(initTransList))
      this.transOutList = self.concat(availableList.map(initTransList))
      this.loadings = [...Array(list.length)]
      this.list = list
    })
  }
}
</script>

