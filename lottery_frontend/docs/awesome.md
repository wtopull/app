- [环境与工具](#huan-jing-yu-gong-ju)
- [文档](#wen-dang)
- [入门教程](#ru-men-jiao-cheng)
- [推荐配置](#tui-jian-pei-zhi)

<a name="table-of-contents"></a>

## 环境与工具

[Node.js 9.x](https://nodejs.org/zh-cn/)

[vscode](https://code.visualstudio.com/) 推荐 已集成 [Emmet](https://www.w3cplus.com/tools/emmet-cheat-sheet.html)

[webstorm](https://www.jetbrains.com/webstorm/)

[yarn](https://yarnpkg.com/lang/en/)

### Chrome扩展

[Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)

[Window Resizer](https://chrome.google.com/webstore/detail/window-resizer/kkelicaakdanhinjdeammmilcgefonfh)

### npm全局库

[vue-cli](https://github.com/vuejs/vue-cli)

[rimraf](https://github.com/isaacs/rimraf) windows删除大量文件用，unix用rm

[npm-check-updates](https://github.com/tjunnone/npm-check-updates) 检查package.json里面库的最新版


## 文档

[ES6](http://es6.ruanyifeng.com/)

[vue 2.5+](https://cn.vuejs.org/index.html) 包含 vue-router 和 vuex

[nuxt.js](https://nuxtjs.org/) 建议看英文，API更准确

[element-ui](http://element.eleme.io/#/zh-CN)

[sass](https://sass-guidelin.es/zh/)

[boostrap4](https://getbootstrap.com/) (layout grid,utilities flex) [中文](https://v4.bootcss.com/) 未翻译

[lodash](https://lodash.com/) 推荐用 [函数式](https://github.com/lodash/lodash/wiki/FP-Guide) 

[Web前端开发技术中文文档合集](https://docschina.org/)

查阅文档工具 [devdocs](http://devdocs.io/)

**[🚀 返回目录](#table-of-contents)**

## 入门教程

[一个完整的Flexbox指南](https://www.w3cplus.com/css3/a-guide-to-flexbox-new.html)

## 推荐配置

### vscode

测试**webpack-hot-middleware** hmr更新 autosave无法准确响应，建议关闭autosave换成手动保存

#### user settings

```json
{
    "editor.fontFamily": "Fira Code, Consolas, 'Courier New', monospace", //Fira Code
    "vetur.validation.template": false,
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    "prettier.singleQuote": true,
    "prettier.semi": false,
    "emmet.triggerExpansionOnTab": true
}
```
字体：[Fira Code](https://github.com/tonsky/FiraCode)

`vetur.validation.template` .vue文件template高亮问题

`js-beautify-html` 可格式化.vue文件

[prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) 配置

`singleQuote` 格式化后使用单引号

`semi` 每行末尾分号添加

`emmet.triggerExpansionOnTab`  [emmet](https://code.visualstudio.com/blogs/2017/08/07/emmet-2.0)默认用Tab键触发

[JS-CSS-HTML Formatter](https://marketplace.visualstudio.com/items?itemName=lonefy.vscode-JS-CSS-HTML-formatter) 不明确推荐

```
{
    "onSave": false,
    "javascript": {
        "indent_size": 2,
        "indent_char": " ",
        "eol": "auto",
        "preserve_newlines": true,
        "break_chained_methods": false,
        "max_preserve_newlines": 0,
        "space_in_paren": false,
        "space_in_empty_paren": false,
        "jslint_happy": false,
        "space_after_anon_function": false,
        "keep_array_indentation": false,
        "space_before_conditional": true,
        "unescape_strings": false,
        "wrap_line_length": 0,
        "e4x": false,
        "end_with_newline": false,
        "comma_first": false,
        "brace_style": "collapse-preserve-inline"
    },
    "css": {
        "indent_size": 4,
        "indentCharacter": " ",
        "indent_char": " ",
        "selector_separator_newline": true,
        "end_with_newline": false,
        "newline_between_rules": true,
        "eol": "\n"
    },
    "html": {
        "indent_inner_html": false,
        "indent_size": 4,
        "indent_char": " ",
        "indent_character": " "
    }
}
```

`onSave` false

js代码缩进2个空格，css html 用4个

**[🚀 返回目录](#table-of-contents)**

### 已安装vscode扩展

- bgse.relative-path-and-line
- ecmel.vscode-html-css
- esbenp.prettier-vscode
- fknop.vscode-npm
- formulahendry.auto-rename-tag
- hollowtree.vue-snippets
- HookyQR.minify
- liuji-jim.vue
- lonefy.vscode-JS-CSS-HTML-formatter
- ms-vscode.Theme-1337
- naumovs.color-highlight
- octref.vetur
- PKief.material-icon-theme
- robertohuertasm.vscode-icons
- Shan.code-settings-sync
- vilicvane.es-quotes
- wayou.vscode-todo-highlight
- xabikos.JavaScriptSnippets

根据关键字搜索在 vscode [marketplace](https://marketplace.visualstudio.com/)搜索 对比 Unique Identifier

例如 ：[Relative path and line](https://marketplace.visualstudio.com/items?itemName=bgse.relative-path-and-line) 的Unique Identifier : bgse.relative-path-and-line

**[🚀 返回目录](#table-of-contents)**