<template>
  <div>
    <el-button type="primary" v-if="!token">
      <nuxt-link to="/login">登录</nuxt-link>
    </el-button>
    <div class="docs-container">
      <div class="el-menu-vertical-demo">
        <el-menu default-active="/docs" :router="true">
          <el-menu-item index="/docs">
            待实现API
          </el-menu-item>
          <el-menu-item index="/docs/invalid_api">
            问题API
          </el-menu-item>
          <el-menu-item index="/docs/fe_dev">
            前端未实现
          </el-menu-item>
          <el-menu-item>
            前端优化
          </el-menu-item>
        </el-menu>
      </div>

      <div class="markdown-body">
        <h1>持续更新中……</h1>
        <nuxt-child/>
      </div>
    </div>
  </div>

</template>

<style lang="scss">
@import '../assets/element-variables';
.docs-container {
  display: flex;
  > div {
    flex-basis: 0;
    flex-grow: 1;
  }
}
.el-menu-vertical-demo {
  flex: 0 0 160px !important;
  .el-menu {
    position: fixed;
  }
}
.markdown-body {
  code {
    color: $--color-danger;
    background: transparent;
  }
  h2 {
    padding-top: 90px;
  }
}
</style>

<script>
import Vue from 'vue'
import { Menu, MenuItem } from 'element-ui'
import 'highlight.js/styles/github.css'
Vue.use(Menu)
Vue.use(MenuItem)

let isLogin

if (process.browser) {
  require('github-markdown-css')
  isLogin = JSON.parse(localStorage.vuex).user.token
}

export default {
  name: 'docs',
  layout: isLogin ? 'default' : 'empty',
  head() {
    return {
      title: '项目进度'
    }
  },
  computed: {
    token() {
      return this.$store.getters.token
    }
  }
}
</script>
<style>
#cssload-loader {
  display: none;
}
.markdown-body {
  margin: 0 auto;
  padding: 45px;
}
</style>