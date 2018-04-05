<template>
  <div>
    <div class="text-danger">内部资料，不外露！</div>
    <br>
    <div v-if="docable">
      <nuxt-link to="/docs">
          <el-button type="primary">进入</el-button>
      </nuxt-link>
    </div>
    <el-form :inline="true" @submit.native.prevent v-else>
      <el-form-item label="登入密码">
        <el-input type="password" v-model="pw" autofocus @keyup.native.enter="submit"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '入口'
    }
  },
  scrollToTop: true,
  data() {
    return {
      pw: ''
    }
  },
  methods: {
    async submit() {
      const data = await this.$axios.$get('/api/doc_enter', {
        params: { pw: this.pw },baseURL:'/'
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
    }
  },
  computed: {
    docable() {
      return this.$store.state.docable
    }
  }
}
</script>
