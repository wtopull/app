<template>
  <div>
    <el-form :model="form" status-icon label-width="8em" :rules="rules" ref="form" v-if="quotaable || quota > 0">
        <el-form-item label="用户名：" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="pw">
            <el-input v-model="form.pw" type="password"></el-input>
        </el-form-item>
        <el-form-item label="真实名字：" prop="realName">
            <el-input v-model="form.realName"></el-input>
        </el-form-item>
        <el-form-item label="昵称：" prop="nickname">
            <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="返点：">
            <el-slider v-model="form.groupVal" :min="min" :max="max" :step="2" show-input :format-tooltip="val => getPoint(val)"></el-slider>
            <span>{{getPoint(form.groupVal)}}%</span>
            <div class="help-inline">（可分配范围{{getPoint(min)}} ~ {{getPoint(max)}}，可用配额 {{quota}}）</div>
        </el-form-item>
        <el-form-item prop="quota">
            
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">立即开户</el-button>
            <el-button @click="reset">重置</el-button>
        </el-form-item>

    </el-form>
    <div v-else>
      您的配额不足！请联系客服
    </div>
  </div>
  
</template>

<script>
import {zipObject} from 'lodash/fp'
import { mapGetters,mapActions,mapMutations } from 'vuex'
import {usernameReg,pwReg,getRequiredRule} from '~/util/validator'
import newAccount from '~/util/mixins/new-account'
const quotaValidateMessage = '您的配额不足！'
let validateMessage = quotaValidateMessage
  export default {
    name:'new-account',
    mixins:[newAccount],
    data(){
      const groupVal = this.max
      return {
        form:{
          name:'',
          pw:'',
          realName:'',
          nickname:'',
          groupVal
        },
        quotaable:false,
        rules:{
          name:[
            getRequiredRule('请填写用户名'),
            { validator:(rule, value,callback) => {
              if (!usernameReg.test(value)) {
                return callback('必须大小写字母开头,6-10个字符！')
              }
              validateMessage !== quotaValidateMessage && this.quotaFields && (validateMessage = quotaValidateMessage) && this.quotaFields.clearValidate();
              callback()
            },trigger: 'blur'}
          ],
          pw: [
            getRequiredRule('请输入密码'),
            { validator:(rule, value,callback) => {
              if(!pwReg.test(value)){
                //todo new Error is required ?
                callback(new Error('密码必须字母数字组合,6-18个字符'))
              }
              callback()
            }, trigger: 'blur' }
          ],
          realName: getRequiredRule('请填写真实姓名'),
          nickname:getRequiredRule('请填写昵称'),
          quota:[
            { validator:(rule, value,callback) => {
              if (this.quota <= 0 || validateMessage !== quotaValidateMessage) {
                return callback(validateMessage)
              }
              callback()
            }}
          ]
        }
      }
    },
    methods:{
      submit(){
        // validateMessage = quotaValidateMessage //reset quota rule
        this.$form.validate((valid) => {
          if (valid) {
              this.getUser(userModel => {
                if(this.quota) {
                  this.$axiosPlus('user/open-account',zipObject(['name','password','real_name','nick_name','prize_group'])(Object.values(this.form)),res => {
                    if(res && res.error) { //res -> data:null plugins/ajax.js:27
                      if(res.errorCode === 100101) {
                        validateMessage = `用户名：${this.form.name} 已注册！`
                        this.$form.fields[0].resetField()
                      }else{
                        validateMessage = res.message
                      }
                      this.quotaFields.validate()
                    }else{ 
                      this.quotaable = true //this.quotaable can be render form after submit and hide form next route this page
                      const {name,groupVal,pw} = this.form
                      this.reset()
                      this.$message({
                        message:`
                          恭喜，用户添加成功！<br>
                          用户名：${name}<br>
                          彩票返点：${this.getPoint(groupVal)}<br>
                          初始密码：${pw}
                        `,
                        dangerouslyUseHTMLString:true,
                        type: 'success',
                        duration:0,
                        showClose: true
                      })
                      this.setUser({...userModel,quota:this.quota - 1})
                    }
                  },{showError:false,errCb:true})
                }else{
                  this.quotaFields.validate()
                }
              })
          } else {
            return false;
          }
        })
      },
      reset(){
        this.$form.resetFields()
      },
      ...mapMutations([
        'setUser'
      ])
    }
  }
</script>