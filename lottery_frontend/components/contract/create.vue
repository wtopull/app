<template>
  <div class="contract">
    <el-form :model="form" :rule="formRule" ref="form">
      <div class="block">
        <el-form-item label="接受契约者：" prop="userName">
          <el-input v-model="form.userName" placeholder="输入接受契约者名称"></el-input>
        </el-form-item>
        <div class="d-flex">
          <el-form-item label="契约类型：" prop="contractType">
            <el-select v-model="form.contractType" placeholder="选择契约类型">
              <el-option v-for="item in contract" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="币种：" prop="currency">
            <el-select v-model="form.currency" placeholder="选择币种">
              <el-option v-for="item in currency" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-start">
        <!-- 条件 -->
        <div class="section">
          <div class="head">
            <div class="contract-condition-icon"></div>
            契约条件
          </div>
          <div v-for="(conditionGroup, blockIndex) in form.conditionBlock" :key="`conditionGroup${blockIndex}${blockIndex}`" class="block">
            <p class="level">{{`LV${conditionGroup.level}`}}</p>
            <div v-for="(condition, index) in conditionGroup.conditions" class="d-flex" :key="`condition${blockIndex}${index}`">
              <el-form-item :prop="`conditionBlock.${blockIndex}.conditions.${index}.id`" :rules="formRule.conditionType" class="block-select">
                <el-select v-model="condition.id" :placeholder="`选择条件${index + 1}`">
                  <el-option v-for="option in conditionGroup.options" :key="option.id" :label="option.name" :value="option.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :prop="`conditionBlock.${blockIndex}.conditions.${index}.minValue`" :rules="formRule.conditionMinValue" class="block-input">
                <el-input v-model.number="condition.minValue" placeholder="最小值"></el-input>
              </el-form-item>
              <el-form-item :prop="`conditionBlock.${blockIndex}.conditions.${index}.maxValue`" :rules="formRule.conditionMaxValue" class="block-input">
                <el-input v-model.number="condition.maxValue" placeholder="最大值"></el-input>
              </el-form-item>
            </div>
            <el-button type="primary" @click="addRow(conditionGroup.level, 'condition')">新增</el-button>
            <el-button @click="deleteRow(conditionGroup.level, 'condition')">删除</el-button>
          </div>
          <div class="d-flex justify-content-end action-group">
            <el-button type="primary" @click="addLV('condition')">新增等级</el-button>
            <el-button @click="deleteLV('condition')">删除等级</el-button>
          </div>
        </div>

        <!-- 奖励 -->
        <div class="section">
          <div class="head">
            <div class="contract-prize-icon"></div>
            契约奖励
          </div>
          <div v-for="(prizeGroup, blockIndex) in form.prizeBlock" :key="`prizeGroup${blockIndex}${blockIndex}`" class="block">
            <p class="level">{{`LV${prizeGroup.level}`}}</p>
            <div v-for="(prize, index) in prizeGroup.prizes" class="d-flex" :key="`prize${blockIndex}${index}`">
              <el-form-item :prop="`prizeBlock.${blockIndex}.prizes.${index}.id`" :rules="formRule.prizeType">
                <el-select v-model="prize.id" :placeholder="`选择奖励${index + 1}`" class="block-select">
                  <el-option v-for="option in prizeGroup.options" :key="option.id" :label="option.name" :value="option.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :prop="`prizeBlock.${blockIndex}.prizes.${index}.minValue`" :rules="formRule.prizeMinValue" class="block-input">
                <el-input v-model.number="prize.minValue" placeholder="数值"></el-input>
              </el-form-item>
            </div>
            <el-button type="primary" @click="addRow(prizeGroup.level, 'prize')">新增</el-button>
            <el-button @click="deleteRow(prizeGroup.level, 'prize')">删除</el-button>
          </div>
          <div class="d-flex justify-content-end action-group">
            <el-button type="primary" @click="addLV('prize')">新增等级</el-button>
            <el-button @click="deleteLV('prize')">删除等级</el-button>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <el-button class="submit" @click="saveContract">发出契约</el-button>
      </div>
    </el-form>
  </div>
</template>


<script>
import { map, find, remove, pick } from 'lodash/fp'

import { getRequiredRule, validNumber } from '~/plugins/formValidate'
import typeList from '~/util/contract/type'
import conditionList from '~/util/contract/condition'
import prizeList from '~/util/contract/prize'

export default {
  name: 'contract-create',

  data() {
    return {
      conditionLv: 1,
      prizeLv: 1,

      contract: typeList, // 契约类型
      currency: [], // 币种

      conditionOptions: [],
      prizeOptions: [],

      form: {
        userName: '',
        contractType: 1,
        currency: 'CNY',
        conditionBlock: [this.initRow(1, 'condition')],
        prizeBlock: [this.initRow(1, 'prize')]
      },

      formRule: {
        userName: [getRequiredRule('请输入接受契约者名称', 'change')],
        contractType: [getRequiredRule('请选择契约类型', 'change')],
        currency: [getRequiredRule('请选择币种', 'change')],

        conditionType: [
          getRequiredRule('请选择契约条件', 'change'),
          {
            validator: (rule, value, callback) => {
              // rule -> field: "conditionBlock.0.conditions.0.id"
              const currentBlock = parseInt(rule.field.slice(15, 16), 10)

              this.form.conditionBlock.forEach((conditionGroup, index) => {
                if (currentBlock !== index) {
                  // 不同等级区块跳过检查
                  return
                }
                const selectRows = conditionGroup.conditions.filter(
                  (condition, key) => {
                    return key !== parseInt(rule.field.slice(-4, -3), 10) // @TODO 这个写法 后端传过来的 condition数量 超过 10个不适用
                  }
                )

                const duplicate =
                  selectRows.findIndex(condition => condition.id === value) !==
                  -1

                if (duplicate) {
                  callback(new Error('选择的问题重复！'))
                } else {
                  callback()
                }
              })
            },
            trigger: 'change'
          }
        ],
        conditionMinValue: [
          getRequiredRule('请填入最小值', 'change'),
          validNumber('', { intMsg: false })
        ],
        conditionMaxValue: [
          getRequiredRule('请填入最大值', 'change'),
          validNumber('', { intMsg: false })
        ],

        prizeType: [
          getRequiredRule('请选择契约条件', 'change'),
          {
            validator: (rule, value, callback) => {
              // rule -> field: "prizeBlock.0.prizes.0.id"
              const currentBlock = parseInt(rule.field.slice(11, 12), 10)

              this.form.prizeBlock.forEach((prizeGroup, index) => {
                if (currentBlock !== index) {
                  // 不同等级区块跳过检查
                  return
                }
                const selectRows = prizeGroup.prizes.filter((prize, key) => {
                  return key !== parseInt(rule.field.slice(-4, -3), 10) // @TODO 这个写法 后端传过来的 prize数量 超过 10个不适用
                })

                const duplicate =
                  selectRows.findIndex(prize => prize.id === value) !== -1

                if (duplicate) {
                  callback(new Error('选择的问题重复！'))
                } else {
                  callback()
                }
              })
            },
            trigger: 'change'
          }
        ],
        prizeMinValue: [
          getRequiredRule('请填入最小值', 'change'),
          validNumber('', { intMsg: false })
        ],
        prizeMaxValue: [
          getRequiredRule('请填入最大值', 'change'),
          validNumber('', { intMsg: false })
        ]
      }
    }
  },

  created() {
    this.getContractInfo()
  },

  methods: {
    initRow(level, type) {
      return {
        level: level, // 用户等级
        [`${type}s`]: [
          { id: '', minValue: '', maxValue: '' } // 用户已选条件
        ],
        options: [] // 用户可选条件
      }
    },

    getContractInfo() {
      return this.$axiosPlus('user-contract/get-ready', res => {
        if (res && !res.error) {
          const { contract_types, condition_types, prize_types, currency } = res

          this.renderContractOptions(contract_types)
          this.renderConditionOptions(condition_types)
          this.renderPrizeOptions(prize_types)
          this.renderCurrencyOptions(currency)
        } else {
          this.$message({
            message: res.message,
            type: 'error',
            duration: 2000
          })
        }
      })
    },

    renderContractOptions(contract) {
      const contractOptions = map(index => find({ id: index })(typeList))(
        contract
      )
      this.contract = contractOptions
    },

    renderCurrencyOptions(currency) {
      const currencyList = Object.keys(currency).map(key => {
        return {
          id: key,
          name: currency[key]
        }
      })
      this.currency = currencyList
    },

    renderConditionOptions(condition) {
      const conditionOptions = map(index =>
        find({ id: parseInt(index, 10) })(conditionList)
      )(condition)
      this.conditionOptions = conditionOptions
      this.form.conditionBlock[this.conditionLv - 1].options = conditionOptions
    },

    renderPrizeOptions(prize) {
      const prizeOptions = map(index =>
        find({ id: parseInt(index, 10) })(prizeList)
      )(prize)
      this.prizeOptions = prizeOptions
      this.form.prizeBlock[this.prizeLv - 1].options = prizeOptions
    },

    addRow(level, type) {
      const currentBlock = this.form[`${type}Block`][level - 1]
      const length = currentBlock[`${type}s`].length
      const limit = currentBlock.options.length

      if (length === limit) {
        this.$message({
          message: `契约最多设置${limit}种${
            type === 'condition' ? '条件' : '奖励'
          }`,
          type: 'error',
          duration: 2000
        })
        return
      }

      this.form[`${type}Block`][level - 1][`${type}s`].push({
        id: '',
        minValue: '',
        maxValue: ''
      })
    },

    deleteRow(level, type) {
      const length = this.form[`${type}Block`][level - 1][
        `${type === 'condition' ? 'conditions' : 'prizes'}`
      ].length
      if (length === 1) {
        this.$message({
          message: `契约最少设置${length}种${
            type === 'condition' ? '条件' : '奖励'
          }`,
          type: 'error',
          duration: 2000
        })
        return
      }
      this.form[`${type}Block`][level - 1].conditions.pop()
    },

    addLV(type) {
      this[`${type}Lv`] += 1
      this.form.prizeBlock.push()
      this.form[`${type}Block`].push(this.initRow(this[`${type}Lv`], type))
      this.form[`${type}Block`][this[`${type}Lv`] - 1].options = this[
        `${type}Options`
      ]
    },

    deleteLV(type) {
      if (this[`${type}Lv`] === 1) {
        return
      }
      this[`${type}Lv`] -= 1
      this.form[`${type}Block`].pop()
    },

    formatDynamicData(block, type) {
      let data = {}
      block.forEach((group, index) => {
        let items = group[`${type}s`].reduce((result, next, index) => {
          if (type === 'condition') {
            result[next.id] = [next.minValue, next.maxValue]
          } else {
            result[next.id] = next.minValue
          }
          return result
        }, {})

        data[group.level] = items
      })
      return data
    },

    formatData() {
      // 将表单资料格式化成后端要求的格式
      const { conditionBlock, prizeBlock, userName, contractType, ...others } = this.form
      let conditionData = {}

      const data = {
        user_name: userName,
        contract_type: contractType,
        condition_types: this.formatDynamicData(conditionBlock, 'condition'),
        prize_types: this.formatDynamicData(prizeBlock, 'prize'),
        ...others
      }

      return data
    },

    saveContract() {
      this.$form.validate(valid => {
        if (valid) {
          const contract_type = this.form.contractType
          const requestData = this.formatData()
          this.$axiosPlus('user-contract/make-contract', requestData, () => {
            this.$message({
              message: '契约建立成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          return false
        }
      })
    }
  },

  mounted() {
    this.$form = this.$refs.form
  }
}
</script>


<style lang="scss" scoped>
.contract {

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

  .head {
    font-size: 15px;
    color: #3b3b3b;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 15px;
    height: 45px;
    background: #f9f9f9;

    .contract-condition-icon {
      background: url('~assets/img/contract/contract-condition-icon.png');
      width: 27px;
      height: 27px;
      margin-right: 10px;
    }

    .contract-prize-icon {
      background: url('~assets/img/contract/contract-prize-icon.png');
      width: 22px;
      height: 27px;
      margin-right: 10px;
    }
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

  .action-group {
    width: 460px;
    margin: 0 auto;
    border-top: 1px solid #ccc;
    padding-top: 20px;
    margin-bottom: 40px;

    .el-button {
      width: 95px;
      height: 37px;
      padding: 0;
      line-height: 37px;
      font-size: 16px;
      border-radius: 5px;
    }
  }

  .section {
    border: 1px solid #e8e8e8;
    width: 490px;
  }

  .submit {
    width: 200px;
    height: 37px;
    font-size: 16px;
    margin-top: 28px;
    margin-bottom: 30px;
    background: #e70000;
    color: white;
    border: none;
    border-radius: 5px;

    &:hover,
    &:active {
      background: lighten(#e70000, 10%);
    }
  }

  .level {
    font-size: 16px;
    color: #7b7b7b;
    margin-bottom: 5px;
  }
}
</style>
