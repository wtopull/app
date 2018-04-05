<template>
  <el-form :model="form" :rules="rules" ref="form" label-width="100px" status-icon class="amdin-compose">
    <el-form-item label="开户类别" v-if="parentName">
      <el-radio-group v-model="level" size="small" @change="toggle">
        <el-radio-button :label="label" v-for="(label,index) in ['上级','下级']" :key="label"></el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="收件人" prop="name" v-if="isNotParent || !parentName">
      <el-select v-model="form.users" multiple placeholder="选择或搜索" filterable no-match-text="无此下级" :collapse-tags="collapse" @change="select" filterable>
        <el-option v-for="member in [{name:'全部',id:'all'}].concat(members)" :key="member.id" :label="member.name" :value="member.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-else-if="parentName">
      <el-input v-model="parentName" readonly></el-input>
    </el-form-item>
    <el-form-item label="主题" prop="title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <el-input type="textarea" v-model="form.content"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss">
.amdin-compose {
  .el-form-item__content {
    > .el-input,
    .el-textarea,
    .el-select {
      width: 410px;
    }
    .el-textarea {
      textarea {
        height: 200px;
      }
    }
  }
}
</style>

<script>
import { getChildren } from '~/plugins/common'

const initForm = () => ({
  users: [],
  title: '',
  content: ''
})

export default {
  name: 'compose',
  data() {
    return {
      form: initForm(),
      rules: {},
      level: '上级',
      members: [],
      collapse: false
    }
  },
  created(){
    this.getChildren()
  },
  methods: {
    async toggle(val) {
      // if(val !== '上级') {
      //   this.members = (await getChildren(this)).data.users.map(_ => _.content)
      // }
    },
    async getChildren() {
      if (this.members.length) return
      this.members = (await getChildren(this)).data.users.map(_ => _.content)
    },
    select(val) {
      if (val.slice(-1)[0] === 'all') {
        this.collapse = true
        this.form.users = this.members.map(_ => _.id)
      } else if (val.length + 1 == this.members.length) {
        this.collapse = false
      }
    },
    submit() {
      const { title, content,users } = this.form
      this.$axiosPlus(
        'user-message/send-message',
        { title, content, user_id: this.isNotParent || !this.parentId ? users.join() : this.parentId },
        data => {
          this.$message({
            message: '发送成功！',
            type: 'success',
            duration: 1500
          })
        this.reset()
        }
      )
    },
    reset() {
      this.form = initForm()
    }
  },
  computed: {
    isNotParent() {
      return this.level !== '上级'
    },
    user() {
      return this.$store.state.user
    },
    parentId() {
      return this.user.parent_id
    },
    parentName() {
      return this.user.parent_name
    }
    // collapse(){
    //   return this.form.users.length > 20
    // }
  }
}
</script>
