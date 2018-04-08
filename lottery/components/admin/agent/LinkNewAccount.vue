<template>
  <div>
    <el-form status-icon label-width="8em" ref="form" v-if="quotaable || quota > 0">
        <el-form-item label="有效日期" prop="date">
            <el-date-picker type="date" placeholder="选择日期" v-model="date" :picker-options="pickerOptions" :clearable="false" @change="handlePicker" ref="datepicker"></el-date-picker>
        </el-form-item>
        <el-form-item label="可用次数">
            <el-input-number v-model="times" controls-position="right" :min="1" :max="quota"></el-input-number>
            <div class="help-inline">（最大{{quota}}）</div>
        </el-form-item>
        <el-form-item label="返点：">
            <el-slider v-model="groupVal" :min="min" :max="max" :step="2" show-input :format-tooltip="val => getPoint(val)"></el-slider>
            <span>{{getPoint(groupVal)}}%</span>
            <div class="help-inline">（可分配范围{{getPoint(min)}} ~ {{getPoint(max)}}，可用配额 {{quota}}）</div>
        </el-form-item>
        <el-form-item prop="quota" :rules="quotaRule">
            
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">生成链接</el-button>
        </el-form-item>

    </el-form>
    <div v-else>
      您的配额不足！请联系客服
    </div>
    <LinkAdmin v-bind={getPoint,set} :tableData="register" v-if="register.length" />
  </div>
  
</template>

<script>
import {zipObject} from 'lodash/fp'
import { mapGetters,mapActions,mapMutations } from 'vuex'
import {correctValue} from '~/util/mixins/datepicker'
import LinkAdmin from '~/components/admin/agent/LinkAdmin'
import newAccount from '~/util/mixins/new-account'

const addDays = (days = 1) => {
  const date = new Date();
  date.setTime(date.getTime() + 3600 * 1000 * 24 * days)
  return date
}


export default {
  name:'link-new-account',
  mixins:[newAccount],
  data(){
    const groupVal = this.max
    const times = this.quota
    return {
      date:addDays(),
      //todo times must be an integer
      times,
      groupVal,
      quotaable:false,
      quotaRule:[
        { validator:(rule, value,callback) => {
          if (this.quota <= 13) {
            return callback('您的配额不足！')
          }
          callback()
        }}
      ],
      pickerOptions:{
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', addDays());
          }
        }, {
          text: '三天内',
          onClick(picker) {
            picker.$emit('pick', addDays(3));
          }
        }, {
          text: '一周内',
          onClick(picker) {
            picker.$emit('pick', addDays(7));
          }
        }]
      }
    }
  },
  created(){
    this.get()
  },
  components:{
    LinkAdmin
  },
  methods:{
    submit(){
      if (this.isInvoking) return
      this.isInvoking = true
      this.getUser(() => {
        if(this.quota) {
          const {date,times:use_times,groupVal:prize_group,register} = this
          //it be not convenient for use lodash zipObject,the expired_date key must string not Date Object
          this.$axiosPlus('user-register-link/create',{prize_group,use_times,expired_date:date.toISOString().slice(0,10)},registItem => {
            this.closeAllMessage()
            this.$message({
              message:`
                恭喜，注册链接创建成功！<br>
                链接：${location.protocol}//${location.host}/signup/${registItem.id}<br>
                彩票返点：${this.getPoint(prize_group)}<br>
              `,
              dangerouslyUseHTMLString:true,
              type: 'success',
              duration:0,
              showClose: true
            })
            this.set([registItem].concat(register))
            this.isInvoking = false
            // auto clipboard,not require this.$refs.table.initCopy()
          })
        }else{
          this.quotaFields.validate()
          this.isInvoking = false
        }
      })
    },
    handlePicker(){
      correctValue(this.$datepicker )
    },
    closeAllMessage(){
      this.$message.closeAll()
    },
    ...mapActions({
      //todo use_times 0 -> status 2 ?
      get:'admin/getRegister'
    }),
    ...mapMutations({
      set:'admin/regist'
    })
  },
  computed:{
    ...mapGetters({
      register:'admin/register'
    })
  },
  mounted(){
    this.$datepicker = this.$refs.datepicker
  },
  deactivated(){
    this.closeAllMessage()
  },
  destroyed(){
    this.closeAllMessage()
  }
}
</script>