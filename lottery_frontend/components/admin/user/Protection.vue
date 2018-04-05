<template>
  <div class="admin-protection" v-loading="loading" :element-loading-text="loadingText">
    <!-- <el-form :model="checkForm" ref="form" label-width="100px" status-icon v-if="hasProtection">
      <div v-for="(qa, index) in checkForm.qa" :key="index">
        <el-form-item :prop="'qa.' + index + '.question'" :rules="checkRuleQuestion" :label="'问题' + (index + 1)">
          <el-input v-model="qa.question"></el-input>
        </el-form-item>
        <el-form-item :prop="'qa.' + index + '.answer'" :rules="ruleAnswer" :label="'答案' + (index + 1)">
          <el-input v-model="qa.answer"></el-input>
        </el-form-item>
      </div>
    </el-form> -->
    <el-form :model="hasProtection ? checkForm : form" ref="form" label-width="100px" status-icon>
      <transition-group name="el-fade-in">
        <div v-for="(qa, index) in (hasProtection ? checkForm : form).qa" :key="index">
          <el-form-item :label="'问题' + (index + 1)" :key="index" :prop="'qa.' + index + '.question'" :rules="hasProtection ? checkRuleQuestion : ruleQuestion" :show-message="hasProtection && permissions[index] || !hasProtection">
            <el-input v-model="qa.question" v-if="hasProtection" :readonly="!permissions[index]" ref="question"></el-input>
            <el-select v-model="qa.question" v-else>
              <el-option v-for="(item,i) in list" :key="item.id" :label="item.content" :value="item.id">
              </el-option>
            </el-select>
            <el-button @click.prevent="update(index)" v-if="hasProtection">修改</el-button>
          </el-form-item>
          <el-form-item :prop="'qa.' + index + '.answer_old'" :rules="checkRuleAnswer" :label="'原答案' + (index + 1)" v-if="hasProtection">
            <el-input v-model="qa.answer_old" placeholder="不填则不修改此问题"></el-input>
          </el-form-item>
          <el-form-item :prop="'qa.' + index + '.answer'" :rules="hasProtection ? checkRuleAnswer : ruleAnswer" :label="(hasProtection ? '新' : '') + '答案' + (index + 1)">
            <el-input v-model="qa.answer"></el-input>
            <el-button @click.prevent="remove(index)" v-if="index !== 0 && !hasProtection">删除</el-button>
          </el-form-item>
        </div>

      </transition-group>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="add" v-if="!hasProtection">新增问题</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button @click="close">取消</el-button>
        <transition name="el-zoom-in-top">
          <div class="el-form-item__error" v-if="qaMore && !hasProtection">
            最多设置3个问题！
          </div>
        </transition>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss">
.admin-protection {
  min-height: 166px;
  padding-right: 15px;
  .el-input {
    width: 337px;
    vertical-align: top;
    margin-right: 10px;
  }
  .el-button + .el-form-item__error {
    left: 80px;
  }
}
</style>


<script>
import { mapGetters, mapMutations } from 'vuex'
import { getRequiredRule } from '~/util/validator'
import cache from '~/util/cache'

const initQA = () => ({
  question: '',
  answer: ''
})

const initCheckQA = () => ({ answer_old: '', ...initQA() })

export default {
  props: ['visible', 'hasProtection','userModel','setUser'],
  name: 'Protection',
  data() {
    //before data ,mapGetters(['hasProtection']) is undefined,use props
    const loading =
      (!this.hasProtection && !cache.safeQuestions) ||
      (this.hasProtection && !cache.mySafeQuestions[this.userModel.name])

    const getTextRule = (require = true, label = '密保答案') => [
      require ? getRequiredRule(`请输入${label}`) : {},
      { min: 3, message: `${label}长度不能少于3个字符`, trigger: 'blur' }
    ]

    return {
      loading,
      list: [],
      form: {
        qa: [initQA()]
      },
      qaMore: false,
      checkForm: {
        qa: [initCheckQA()]
      },
      ruleQuestion: [
        getRequiredRule('请选择问题', 'change'),
        {
          validator: (rule, value, callback) => {
            //rule -> field: "qa.0.question"
            if (
              this.form.qa
                .filter((v, k) => k != rule.field.slice(3, 4))
                .findIndex(_ => _.question === value) !== -1
            ) {
              callback(new Error('选择的问题重复！'))
            }
            callback()
          },
          trigger: 'change'
        }
      ],
      ruleAnswer: getTextRule(),
      checkRuleAnswer: [
        getTextRule(false),
        {
          validator: (rule, value, callback) => {
            const qa = this.checkForm.qa[rule.field.slice(3, 4)]
            if (qa.answer_old && qa.answer === qa.answer_old) {
              callback(new Error('新旧答案不能相同！'))
            }
            callback()
          },
          trigger: 'change'
        }
      ],
      limitNum:3,
      checkRuleQuestion: getTextRule(true, '密保问题'),
      permissions: []
    }
  },
  created() {
    if (!this.hasProtection && cache.safeQuestions) return this.list = cache.safeQuestions
    this.get()
  },
  watch: {
    visible(val) {
      val &&
        this.hasProtection &&
        // !cache.mySafeQuestions &&
        (this.loading = true) &&
        this.get()
    }
  },
  methods: {
    get() {
      if (!this.hasProtection && cache.safeQuestions) {
        return (this.list = cache.safeQuestions)
      }
      this.$axiosPlus(
        `user-safety-question/get${this.hasProtection ? '-list' : ''}`,
        { limit_type: 3 },
        ({ list,limitNum }) => {
          if (this.hasProtection) {
            cache.mySafeQuestions[this.userModel.name] = this.list = list
            this.checkForm.qa = list.map((v, k) => ({
              ...initCheckQA(),
              question: v.question_content
            }))
            this.permissions = this.list.map(_ => false)
            this.$nextTick(this.$form.clearValidate)
          } else {
            cache.safeQuestions = this.list = list
            this.limitNum = limitNum
          }
          this.loading = false
        }
      )
    },
    add() {
      if (this.form.qa.length == this.limitNum) return (this.qaMore = true)
      this.form.qa.push(initQA())
    },
    remove(index) {
      this.qaMore = false
      this.form.qa.splice(index, 1)
    },
    update(index) {
      this.$set(this.permissions,index,true)
      //can't do this.$nextTick(this.$refs.question[index].$refs.input.select),select native event
      this.$nextTick(() => this.$refs.question[index].$refs.input.select())
    },
    submit() {
      this.$form.validate(valid => {
        if (valid) {
          const { hasProtection } = this
          if (hasProtection) {
            let errorMsg = []
            const checkList = this.checkForm.qa.filter(
              _ => _.answer_old && _.answer
            )
            if (!checkList.length) return this.close()
            Promise.all(
              checkList.map(({ answer, answer_old }, index) =>
                this.$axiosPlus(
                  'user-safety-question/update',
                  {
                    id: this.list[index].id,
                    answer,
                    answer_old
                  },
                  res => {
                    res &&
                      res.error &&
                      (errorMsg[index] = `问题${index + 1}，${res.message}`)
                  },
                  { showError: false, errCb: true }
                )
              )
            ).then(() => {
              if (errorMsg.length) {
                this.$message({
                  message: errorMsg.filter(_ => _).join('，'),
                  type: 'error',
                  duration: 2500
                })
              } else {
                this.$message({
                  message: `修改成功！`,
                  type: 'success',
                  duration: 1500,
                  onClose: this.close
                })
              }
            })
          } else {
            this.$axiosPlus(
              'user-safety-question/set',
              {
                info: this.form.qa.map(({ question: id, answer }) => ({
                  answer,
                  id
                }))
              },
              _ => {
                this.$message({
                  message: `${hasProtection ? '修改' : '创建'}成功！`,
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.close()
                    !hasProtection &&
                      setTimeout(() => {
                        this.setUser({
                          ...this.userModel,
                          is_set_safety_question: true
                        })
                      }, 300)
                  }
                })
              }
            )
          }
        } else {
          return false
        }
      })
    },
    close() {
      this.$emit('update:visible', false)
    },
    reset() {
      const { hasProtection } = this
      //must after resetFields(),otherwise initQA can't clear
      this[hasProtection ? 'checkForm' : 'form'].qa.forEach(_ =>
        Object.assign(_, hasProtection ? initCheckQA() : initQA())
      )
    },
    // ...mapMutations(['setUser'])
  },
  computed: {
    loadingText() {
      return this.$store.state.loading.text
    }
  },
  mounted() {
    this.$form = this.$refs.form
  }
}
</script>
