<template>
  <div v-loading="loading">
    <el-form :model="form" ref="paForm" label-width="100px" status-icon>
      <transition-group name="el-fade-in">
        <el-form-item v-for="(question, index) in form.questionList" :label="`问题${index+1}`" :key="index" :prop="'questionList.' + index + '.question'" :rules="ruleAnswer">
          {{question.question_content}}
          <el-input v-model="form.answerList[index]" placeholder="请输入答案"></el-input>
        </el-form-item>
      </transition-group>
      <el-form-item>
        <el-button type="primary" @click="submit">送出</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
const initQuestion = () => ({
  question: ''
})

export default {
  props: ['questionList'],
  name: 'ProtectionAnswer',
  data() {
    return {
      loading: false,

      form: {
        questionList: this.questionList,
        answerList: []
      },
      ruleAnswer: []
    }
  },
  methods: {
    submit() {
      this.$paForm.validate(valid => {
        if (valid) {
          const data = this.form.questionList.map((question, index) => {
            return {
              id: question.id,
              answer: this.form.answerList[index]
            }
          })
          this.$axiosPlus(
            'user-safety-question/check-answer',
            {info: data},
            (res) => {
              this.$emit('checkSuccess')
            }
          )
        }
      })
    },

    close() {
      this.$emit('update:visible', false)
    }
  },
  mounted() {
    this.$paForm = this.$refs.paForm
  }
}
</script>

