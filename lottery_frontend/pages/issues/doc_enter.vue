<template>
  <div>
    <div class="text-danger">内部资料，不外露！</div>
    <br>
    <div v-if="docable">
      <nuxt-link to="/docs">
          <el-button type="primary">进入</el-button>
      </nuxt-link>
    </div>
    <el-form :inline="true" @submit.native.prevent label-width="6em" v-else>
      <el-form-item label="登入密码">
        <el-input type="password" v-model="pw" autofocus @keyup.native.enter="submit"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">确定</el-button>
      </el-form-item>
    </el-form>
    <div v-if="ui_docable">
      <nuxt-link to="/ui_styles">
          <el-button type="primary">进入UI规范</el-button>
      </nuxt-link>
    </div>
    <el-form :inline="true" @submit.native.prevent label-width="6em" v-else>
      <el-form-item label="UI文档登录">
        <el-input type="password" v-model="uiPw" autofocus @keyup.native.enter="submitUI"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitUI">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  head() {
    return {
      title: '入口'
    }
  },
  scrollToTop: true,
  data() {
    return {
      pw: '',
      uiPw:''
    }
  },
  methods: {
    async submit() {
      const data = await this.$axios.$get('/doc_enter', {
        params: { pw: this.pw }
      })
      if (data.success) {
        this.$store.commit('setState', { key: 'docable', value: data.success })
        this.$router.push('/docs')
      } else if (data.error) {
        this.$message({
          message: data.message,
          type: 'error',
          duration: 2000
        })
      }
    },
    async submitUI() {
      const data = await this.$axios.$get('/ui_doc_enter', {
        params: { pw: this.uiPw }
      })
      if (data.success) {
        this.$store.commit('setState', { key: 'ui_docable', value: data.success })
        this.$router.push('/ui_docs')
      } else if (data.error) {
        this.$message({
          message: data.message,
          type: 'error',
          duration: 2000
        })
      }
    }
  },
  computed: {
    ...mapState([
      'docable',
      'ui_docable'
    ])
  }
}
</script>
