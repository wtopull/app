<template>
    <div>
        <div class="block">
            <div>
          <el-select
              v-model = "form.bankId"
              placeholder="搜索：招商"
              filterable
              @visible-change="getBanks"
            >
              <el-option
                  v-for="item in bankList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
            </div>
            <div>
              <el-input v-model="form.bankBranchName" placeholder="支行名称"></el-input>
            </div>
            <div>
              <el-input v-model="form.bankName" placeholder="开户人姓名"></el-input>
            </div>
            <div>
              <el-input v-model="form.bankCode" placeholder="开户银行账号"></el-input>
            </div>
            <div>
              <el-cascader
                :options="districts"
                @mouseover.native="getDistricts"
                v-model="cityIds"
                expand-trigger="hover"
                filterable
                clearable
                :placeholder="placeholder"
                ref="cascader"
            >
            </el-cascader>
            </div>
            <el-button type="primary" @click="create">綁卡</el-button>
            </div>
    </div>
</template>
<style lang="scss">
.block {
    padding: 30px 0;
    text-align: center;
    border-right: 1px solid #eff2f6;
    width: 50%;
    box-sizing: border-box;
    > div{
      width: 300px;
    }
}
</style>
<script>
import {zipObject} from 'lodash/fp'
import Vue from 'vue'
import {mapActions,mapGetters,mapMutations} from 'vuex'
import cache from '~/util/cache'
export default {

    props:['visible'],
    data(){
        return {
          districts:cache.districts || [],
          cityIds:[],
          form:{
            bankId:'',
            bankCode:'',
            bankName:'',
            bankBranchName:''
          },
          // 搜索：如上海
          placeholder:'点击选择'
          //http://element.eleme.io/#/zh-CN/component/cascader props
          //districts.json after gzip 66k,use 'l-v-c' 65k 
          // props: {
          //   label:'l',
          //   value: 'v',
          //   children: 'c'
          // }
        }
    },
    methods:{
        async getDistricts(){
            !this.districts.length && (this.districts = (cache.districts = (await this.$getJson('districts')).data))
            //tab focus not to trigger mouseover getDistricts
            this.placeholder = '搜索：如上海'
        },
        create(){
          const [province_id,city_id,area_id] = this.cityIds
          this.$axiosPlus('user-bank-card/create',{...zipObject(['bank_id','account_no','account_name','branch_name'])(Object.values(this.form)),province_id,city_id,area_id},(data) => {
            this.set(this.bankCards.concat(data))
            this.$emit('update:visible',false)
          })
        },
        ...mapActions({
          getBanks:'pay/getBanks'
        }),
        ...mapMutations({
          set:'pay/setBankCards'
        })
    },
    computed:{
      ...mapGetters({
        banks:'pay/banks',
        bankCards:'pay/bankCards'

      }),
      bankList(){
        return this.banks.map(({id:value,name:label}) => ({value,label}))
      }
    }
  
}
</script>
