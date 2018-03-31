<template>
  <el-form :model="form" :rules="rules" ref="form" label-width="100px" status-icon class="amdin-compose">
    <el-form-item label="发送类型">
      <el-radio-group v-model="level" size="small" @change="toggle">
        <el-radio-button :label="label" v-for="(label,index) in sendTypes" :key="label"></el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="isAdmin" label="收件人">
      <el-input value="平台管理员" readonly></el-input>
    </el-form-item>
    <el-form-item label="收件人" prop="name" v-else-if="isNotParent || !parentName">
      <el-select v-model="form.users" multiple placeholder="选择或搜索" filterable no-match-text="无此下级" :collapse-tags="collapse" @change="select" filterable ref="select">
        <el-option v-for="member in optionAll.concat(members)" :key="member.id" :label="member.name" :value="member.id">
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
      <el-input type="textarea" v-model="form.content" @keydown.native.ctrl.enter="submit" @keyup.native.once.enter="showKeyUpTips"></el-input>
      <transition name="el-fade-in">
        <div v-if="keyUpTips">
          Ctrl + 回车 快捷发送
        </div>
      </transition>
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
      & + div {
        position: absolute;
        left: 270px;
        bottom: 5px;
        color: $--color-text-secondary;
        font-style: italic;
      }
    }
  }
  .el-form-item {
    &:nth-last-child(2) {
      position: relative;
    }
  }
}
</style>

<script>
import { getChildren } from '~/plugins/common'
import { delayAjax } from '~/plugins/ajax'
const initForm = () => ({
  users: [],
  title: '',
  content: ''
})

export default {
  name: 'compose',
  asyncData({ store }) {
    if (process.server) return { user: {}, level: '下级', parentName: '' }
    const { user } = store.state
    const { parent_name: parentName } = user
    return {
      user,
      level: parentName ? '上级' : '下级',
      parentName
    }
  },
  data() {
    return {
      form: initForm(),
      rules: {},
      // level: '下级',
      members: [],
      collapse: false,
      optionAll: [{ name: '全选', id: 'all' }],
      keyUpTips: false
    }
  },
  created() {
    if (this.user.token) {
      this.getChildren()
    } else {
      delayAjax(this.$axios, this.$store, this.getChildren)
    }
  },
  methods: {
    async toggle(val) {
      // if(val !== '上级') {
      //   this.members = (await getChildren(this)).data.users.map(_ => _.content)
      // }
    },
    async getChildren() {
      if (this.members.length) return
      this.members = (await getChildren(this)).data.users
    },
    select(val) {
      const { form, members } = this
      const allLabel = this.optionAll[0]
      if (val.slice(-1)[0] === 'all') {
        if (form.users.length - 1 === members.length) {
          allLabel.name = '全选'
          return (form.users = [])
        }
        this.collapse = true
        form.users = members.map(_ => _.id)
        // dont't this.$select = this.$refs.select, v-if="isNotParent
        this.$nextTick(() => {
          this.$refs.select.visible = false
          //do not optionAll[0].name computed,it can't delay
          setTimeout(() => (allLabel.name = '全部取消'), 150)
        })
      } else {
        // else if (val.length + 1 == this.members.length) {
        this.collapse = false
        allLabel.name = '全选'
      }
    },
    submit() {
      const { title, content, users } = this.form
      const { collapse, parentId, isNotParent, isAdmin } = this
      const isNotSendParent = isNotParent || !parentId
      this.$axiosPlus(
        'user-message/send-message',
        {
          title,
          content,
          send_type: isAdmin ? 5 : isNotSendParent ? (collapse ? 2 : 4) : 1,
          ...(collapse || isAdmin
            ? {}
            : { user_id: isNotSendParent ? users.join() : parentId })
        },
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
      this.optionAll[0].name = '全选'
    },
    showKeyUpTips() {
      this.keyUpTips = true
      setTimeout(() => (this.keyUpTips = false), 1500)
    }
  },
  computed: {
    isNotParent() {
      return this.level !== '上级'
    },
    // user() {
    //   return this.$store.state.user
    // },
    parentId() {
      return this.user.parent_id
    },
    // parentName() {
    //   return this.user.parent_name
    // },
    sendTypes() {
      return (this.parentName ? ['上级'] : []).concat('下级', '管理员')
    },
    isAdmin() {
      return this.level === '管理员'
    }
    // collapse(){
    //   return this.form.users.length > 20
    // }
  }
}
</script>
