<template>
  <div>
    <el-button type="primary" v-if="!token">
      <nuxt-link to="/login">登录</nuxt-link>
    </el-button>
    <div class="docs-container">
      <div class="el-menu-vertical-demo">
        <el-menu default-active="/docs" :router="true">
          <el-menu-item index="/docs">
            新人必看
          </el-menu-item>
          <el-menu-item index="/docs/style_guide">
            编码规范
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">框架详解</template>
            <el-menu-item index="/docs/architecture?view=api">
              后端API
            </el-menu-item>
            <el-menu-item index="/docs/architecture?view=http_client">
              HTTP client
            </el-menu-item>
            <el-menu-item index="/docs/architecture?view=error_code" class="docs-error-code">
              errorCode
            </el-menu-item>
            <el-menu-item index="/docs/architecture?view=issues">
              踩坑记录
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">程序范例</template>
            <el-menu-item index="/docs/example?view=third_platform">
              第三方游戏
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>

      <div class="markdown-body">
        <h1>持续更新中……</h1>
        <div class="text-muted" style="font-size:12px;margin-bottom:15px">
          注：文档左侧导航使用了 <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/position" target="_blank">position:sticky</a>粘性布局 Chrome地址栏输入 <span class="text-danger">chrome://flags</span>   ，找到 <span class="text-danger">enable-experimental-web-platform-features</span>，选择启用
        </div>
        
        <nuxt-child/>
      </div>
    </div>
  </div>

</template>

<style lang="scss">
.docs-container {
  display: flex;
  > div {
    flex-basis: 0;
    flex-grow: 1;
  }
  .markdown-body {
    ul ul,
    ol ul {
      list-style-type: circle;
    }
    ol {
      list-style-type: decimal;
    }
    li {
      list-style: inherit;
    }
  }
}
.el-menu-vertical-demo {
  flex: 0 0 180px !important;
  .el-menu {
    position: sticky ;
    top: 90px;
    width: 140px;
    .el-submenu .el-menu-item{
      min-width: auto;
    }
  }
}
.markdown-body {
  code {
    background: transparent;
  }
  h2 {
    padding-top: 90px;
  }
  [name='table-of-contents'] {
    position: relative;
    top: -360px;
    display: block;
  }
}
</style>

<script>
import Vue from 'vue'
import { Menu, MenuItem, Submenu } from 'element-ui'
import 'highlight.js/styles/github.css'
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)

let isLogin

if (process.browser) {
  require('github-markdown-css')
  isLogin = localStorage.vuex ? JSON.parse(localStorage.vuex).user.token : false
}

export default {
  name: 'docs',
  // fetch({ store, error }) {
  //   return store.state.docable
  //     ? Promise.resolve()
  //     : error({ message: '没有权限！' })
  // },
  middleware: 'docable',
  layout: isLogin ? 'default' : 'empty',
  head() {
    return {
      title: '前端框架'
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
