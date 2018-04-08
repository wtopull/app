<template>
  <el-dialog custom-class="register-modal" title="编辑链接" :visible.sync="visible" @open="get">
    <el-form status-icon label-width="8em" ref="form">
      <el-form-item label="状态：">
        <el-radio-group v-model="statusText" size="medium">
          <el-radio-button label="启用"></el-radio-button>
          <el-radio-button label="停用"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input type="textarea" v-model="remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
        <el-button @click="submit" type="primary" size="mini">提交</el-button>
        <el-button size="mini" @click="close">取消</el-button>
    </div>
  </el-dialog>
</template>
<style lang="scss">
  .register-modal{
    width:520px;
  }
</style>
<script>
  export default {
    name:'link-register-modal',
    props:['editorData','set','tableData'],
    data(){
      const statusLabel = ['启用','停用']
      return {
        visible:true,
        statusLabel,
        statusText:'',
        // form:{
        //   remark:''
        // },
        remark:'',
        // rules:{
        //   remark:[
        //     { validator:(rule, value,callback) => {
        //       //editorData.remark is null,null != ''
        //       if(typeof value === 'string' && value.trim() == this.editorData.remark){
        //         callback('备注未修改！')
        //       }
        //       callback()
        //     }, trigger: 'blur' }
        //   ]
        // }
      }
    },
    created(){
      //before @open run,first visible true not  emit @open
      this.get()
    },
    methods:{
      get(){
        //clearValidate can not be clear in second times
        // clear && this.$refs.form.resetFields()
        const {remark,status} = this.editorData
        this.remark = remark
        this.statusText = this.statusLabel[status - 1]
      },
      submit(){
        //do not this.$form = this.$refs.form in dialog,this.$form will be undefined
        // this.$refs.form.validate((valid) => {
        //   if (valid) {
              
        //   } else {
        //     return false;
        //   }
        // })
        const status = this.statusLabel.indexOf(this.statusText) + 1
        const {remark} = this
        const _remark = this.editorData.remark
        //' '.trim() != undefined
        if((typeof remark === 'string' ? !_remark ? !!remark.trim() == !!_remark : remark.trim() == _remark : remark === null) && status === this.editorData.status) {
          return this.close()
        }
        const {editorData,tableData} = this
        this.$axiosPlus('user-register-link/update',{remark,status,id:editorData.id},data => {
          // Object.assign(this.editorData,{remark,status}) Do not mutate vuex store state outside mutation handlers.
          tableData[tableData.findIndex(_ => _.id === editorData.id)] = data
          //element-ui table row template require tableData.slice()) can be observe
          this.set([...tableData])
          this.close()
        })
      },
      close(){
        this.visible = false
      }
    },
    // mounted(){
    //   this.$emit('update:editorMounted',true)
      
    // }
  }  
</script>