<template>
    <el-form label-width="8em">
      <el-form-item label="会员账号：">
        {{name}}
      </el-form-item>
      <el-form-item label="注册时间：">
        {{registerTime}}
      </el-form-item>
      <el-form-item label="上次登录时间：">
        {{loginTime}}
      </el-form-item>
      <el-form-item label="返点：">
        <el-select v-model="point">
              <el-option
                      v-for="(val,index) in pointRange"
                      :label="val"
                      :value="val"
                      :key="index"
              />
          </el-select>    
      </el-form-item>
      <el-form-item>
        <el-button @click="submit" type="primary">提交</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
</template>

<script>
import {round,range} from 'lodash'
export default {
  name:'update-point',
  props:['editorData','visible'],
  data(){
    const {name,loginTime,registerTime,point} = this.editorData
   
    return {
      name,
      loginTime,
      registerTime,
      point,
      
    }
  },
  watch:{
    visible(val){
      val && Object.assign(this,this.editorData)
    }
  },
  methods:{
    close() {
      this.$emit('update:visible',false)
    },
    submit(){
      const {point,editorData} = this
      if(point === editorData.point) return this.close()
      const {name:child_name,minBonusGroup} = this
      this.$axiosPlus('proxy-manage/update-child-return-point',{child_name ,prize_group:point * 20 + minBonusGroup },data => {
        this.$message({
          message:'返点更新成功！',
          type: 'success',
          duration:1500,
          onClose:() => {
            this.close()
            Object.assign(editorData,{point})
          }
        })
      }) 
    }
  },
  computed:{
    minBonusGroup(){
      return this.$store.getters.minBonusGroup
    },
    pointRange(){
      const {max,min} = this.editorData
      return range(min,max,.1).map(_ => round(_,1)).concat(max)
    }
  }
}
</script>
