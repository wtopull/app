<template>
  <div class="contract">
    <el-form :model="form" :rule="formRule" ref="form">
      <div class="block">
        <el-form-item label="接受契约者" prop="userName">
          <el-input v-model="form.userName" placeholder="输入接受契约者名称"></el-input>
        </el-form-item>
        <el-form-item label="合约类型" prop="contracType">
          <el-select v-model="form.contractType" placeholder="选择合约类型">
            <el-option v-for="item in contract" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="d-flex justify-content-between">
        <!-- 条件 -->
        <div class="section">
          <div class="title">合约条件</div>
          <div v-for="(conditionGroup, blockIndex) in form.conditionBlock" :key="`conditionGroup${blockIndex}${blockIndex}`" class="block">
            <p class="level">{{`LV${conditionGroup.level}`}}</p>
            <div v-for="(condition, index) in conditionGroup.conditions" class="d-flex" :key="`condition${blockIndex}${index}`">
              <el-form-item :prop="`conditionBlock.${blockIndex}.conditions.${index}.id`" :rules="formRule.conditionType">
                <el-select v-model="condition.id" :placeholder="`选择条件${index + 1}`">
                  <el-option v-for="option in conditionGroup.options" :key="option.id" :label="option.name" :value="option.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :prop="`conditionBlock.${blockIndex}.conditions.${index}.minValue`" :rules="formRule.conditionMinValue">
                <el-input v-model.number="condition.minValue" placeholder="最小值"></el-input>
              </el-form-item>
              <el-form-item :prop="`conditionBlock.${blockIndex}.conditions.${index}.maxValue`" :rules="formRule.conditionMaxValue">
                <el-input v-model.number="condition.maxValue" placeholder="最大值"></el-input>
              </el-form-item>
            </div>
            <el-button @click="addRow(conditionGroup.level, 'condition')">新增条件</el-button>
            <el-button type="danger" @click="deleteRow(conditionGroup.level, 'condition')">删除条件</el-button>
          </div>
          <div class="d-flex justify-content-end">
            <el-button type="primary" @click="addLV('condition')" round>新增等级</el-button>
            <el-button type="danger" @click="deleteLV('condition')" round>删除等级</el-button>
          </div>
        </div>

        <!-- 奖励 -->
        <div class="section">
          <div class="title">合约奖励</div>
          <div v-for="(prizeGroup, blockIndex) in form.prizeBlock" :key="`prizeGroup${blockIndex}${blockIndex}`" class="block">
            <p class="level">{{`LV${prizeGroup.level}`}}</p>
            <div v-for="(prize, index) in prizeGroup.prizes" class="d-flex" :key="`prize${blockIndex}${index}`">
              <el-form-item :prop="`prizeBlock.${blockIndex}.prizes.${index}.id`" :rules="formRule.prizeType">
                <el-select v-model="prize.id" :placeholder="`选择奖励${index + 1}`">
                  <el-option v-for="option in prizeGroup.options" :key="option.id" :label="option.name" :value="option.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :prop="`prizeBlock.${blockIndex}.prizes.${index}.minValue`" :rules="formRule.prizeMinValue">
                <el-input v-model.number="prize.minValue" placeholder="数值"></el-input>
              </el-form-item>
            </div>
            <el-button @click="addRow(prizeGroup.level, 'prize')">新增奖励</el-button>
            <el-button type="danger" @click="deleteRow(prizeGroup.level, 'prize')">删除奖励</el-button>
          </div>
          <div class="d-flex justify-content-end">
            <el-button type="primary" @click="addLV('prize')" round>新增等级</el-button>
            <el-button type="danger" @click="deleteLV('prize')" round>删除等级</el-button>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <el-button type="success" class="submit" @click="saveContract">建立合约</el-button>
      </div>
    </el-form>
  </div>
</template>


<script>
import { map, find, remove, pick } from 'lodash/fp'

import { getRequiredRule, validNumber } from '~/util/validator'
import typeList from '~/util/contract/type'
import conditionList from '~/util/contract/condition'
import prizeList from '~/util/contract/prize'

export default {
  name: 'contract',

  data() {
    return {
      conditionLv: 1,
      prizeLv: 1,

      contract: typeList,

      conditionOptions: [],
      prizeOptions: [],

      form: {
        userName: '',
        contractType: 1,
        conditionBlock: [this.initRow(1, 'condition')],
        prizeBlock: [this.initRow(1, 'prize')]
      },

      formRule: {
        userName: [getRequiredRule('请输入接受契约者名称', 'change')],
        contracType: [getRequiredRule('请选择合约类型', 'change')],

        conditionType: [
          getRequiredRule('请选择合约条件', 'change'),
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
          getRequiredRule('请选择合约条件', 'change'),
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
          const { contract_types, condition_types, prize_types } = res

          this.renderContractOptions(contract_types)
          this.renderConditionOptions(condition_types)
          this.renderPrizeOptions(prize_types)
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
          message: `合约最多设置${limit}种${
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
      const length = this.form[`${type}Block`][level - 1].conditions.length
      if (length === 1) {
        this.$message({
          message: `合约最少设置${length}种${
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
      const { conditionBlock, prizeBlock, userName, contractType } = this.form
      let conditionData = {}

      const data = {
        rewards: 1,
        user_name: userName,
        contract_type: contractType,
        condition_types: this.formatDynamicData(conditionBlock, 'condition'),
        prize_types: this.formatDynamicData(prizeBlock, 'prize')
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


<style lang="scss">
.contract {
  .el-input {
    width: 200px;
  }

  .title {
    font-size: 18px;
    margin-bottom: 15px;
  }

  .block {
    border-bottom: 1px solid #ccc;
    padding-bottom: 30px;
    margin-bottom: 30px;
  }

  .section {
    flex: 1;
    margin: 0 20px;
  }

  .submit {
    width: 210px;
    height: 45px;
    font-size: 18px;
    margin-top: 150px;
    margin-bottom: 30px;
  }

  .level {
    font-size: 16px;
    color: #999;
    margin-bottom: 5px;
  }
}
</style>
