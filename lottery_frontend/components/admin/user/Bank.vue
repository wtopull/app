<template>
  <el-form class="admin-bank-form" :model="form" :rules="rules" ref="form" status-icon>
    <el-form-item prop="bankId">
      <el-select v-model="form.bankId" placeholder="搜索：招商" filterable @visible-change="getBanks">
        <el-option v-for="item in bankList" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="bankBranchName">
      <el-input v-model="form.bankBranchName" placeholder="支行名称"></el-input>
    </el-form-item>
    <el-form-item prop="bankName">
      <el-input v-model="form.bankName" placeholder="开户人姓名"></el-input>
    </el-form-item>
    <el-form-item prop="bankCode">
      <el-input v-model="form.bankCode" placeholder="开户银行账号"></el-input>
    </el-form-item>
    <el-form-item prop="cityIds">
      <el-cascader :options="districts" @mouseover.native="getDistricts" v-model="form.cityIds" expand-trigger="hover" filterable clearable :placeholder="placeholder" ref="cascader">
      </el-cascader>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">綁卡</el-button>
      <el-button @click="close">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<style lang="scss">
.admin-bank-form {
  padding: 0 40px 20px;
  .el-cascader,
  .el-select {
    display: block;
  }
}
</style>
<script>
import { zipObject,omit } from 'lodash/fp'
import Vue from 'vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import cache from '~/util/cache'
import { getRequiredRule } from '~/util/validator'

//http://stackoverflow.com/questions/9315647/regex-credit-card-number-tests
//Visa, MasterCard, American Express, Diners Club, Discover, and JCB cards:
const creditReg = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
const UnionPayReG = /^(62[0-9]{14,17})$/

export default {
  name:'bind-bank',
  props: ['visible'],
  data() {
    const form = {
      bankId: '',
      bankBranchName: '',
      bankName: '',
      bankCode: '',
      cityIds: []
    }
    return {
      districts: cache.districts || [],
      form,
      // 搜索：如上海
      placeholder: '点击选择',
      //http://element.eleme.io/#/zh-CN/component/cascader props
      //districts.json after gzip 66k,use 'l-v-c' 65k
      // props: {
      //   label:'l',
      //   value: 'v',
      //   children: 'c'
      // }
      rules: {
        ...zipObject(Object.keys(form))(
          [
            '请选择银行',
            '请输入支行名称',
            '请输入开户人姓名',
            ,
            '请选择地区'
          ].map((msg, index) =>
            getRequiredRule(msg, index === 0 ? 'change' : 'blur')
          )
        ),
        bankCode: [
          getRequiredRule('请输入银行卡号'),
          {
            validator: (rule, value, callback) => {
              if (!(UnionPayReG.test(value) || creditReg.test(value))) {
                callback(new Error('请输入有效的银行卡号'))
              } else {
                // if (this.req.reBankId !== '') {
                //   this.$refs.form.validateField('reBankId')
                // }
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async getDistricts() {
      !this.districts.length &&
        (this.districts = cache.districts = (await this.$getJson(
          'districts'
        )).data)
      //tab focus not to trigger mouseover getDistricts
      this.placeholder = '搜索：如上海'
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const [province_id, city_id, area_id] = this.form.cityIds
          this.$axiosPlus(
            'user-bank-card/create',
            {
              ...zipObject([
                'bank_id',
                'branch_name',
                'account_name',
                'account_no',
              ])(Object.values(omit(['cityIds'])(this.form))),
              province_id,
              city_id,
              area_id
            },
            data => {
              this.set(this.bankCards.concat(data))
              this.close()
            }
          )
        }
      })
    },
    close() {
      this.$emit('update:visible', false)
    },
    ...mapActions({
      getBanks: 'pay/getBanks'
    }),
    ...mapMutations({
      set: 'pay/setBankCards'
    })
  },
  computed: {
    ...mapGetters({
      banks: 'pay/banks',
      bankCards: 'pay/bankCards'
    }),
    bankList() {
      return this.banks.map(({ id: value, name: label }) => ({ value, label }))
    }
  },
  mounted() {
    this.$form = this.$refs.form
  }
}
</script>
