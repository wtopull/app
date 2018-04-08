<style>
  .demo-color-box {
    border-radius: 4px;
    padding: 20px;
    height: 74px;
    box-sizing: border-box;
    color: #fff;
    font-size: 14px;

    & .value {
      font-size: 12px;
      opacity: 0.69;
      line-height: 24px;
    }
  }
  .demo-color-box-group {
    .demo-color-box {
      border-radius: 0;
    }
    .demo-color-box:first-child {
      border-radius: 4px 4px 0 0;
    }
    .demo-color-box:last-child {
      border-radius: 0 0 4px 4px;
    }
  }
  .bg-yellow {
    background-color: #ffd22c;
  }

  .bg-success {
    background-color: #67C23A;
  }
  .bg-warning {
    background-color: #E6A23C;
  }
  .bg-danger {
    background-color: #F56C6C;
  }
  .bg-info {
    background-color: #909399;
  }

  .bg-text-primary {
    background-color: #303133;
  }
  .bg-text-regular {
    background-color: #606266;
  }
  .bg-text-secondary {
    background-color: #909399;
  }
  .bg-text-placeholder {
    background-color: #c0c4cc;
  }

  .bg-border-base {
    background-color: #dcdfe6;
  }
  .bg-border-light {
    background-color: #e4e7ed;
  }
  .bg-border-lighter {
    background-color: #ebeef5;
  }
  .bg-border-extra-light {
    background-color: #f2f6fc;
  }

  [class*=" bg-border-"] {
    color: #303133;
  }
</style>

目前前端框架主要采用 饿了么UI [element-ui](http://element.eleme.io/#/zh-CN)

## Color 色彩

### 主色

主要品牌颜色

<el-row :gutter="12">
  <el-col :span="6">
    <div class="demo-color-box bg-yellow">Yellow<div class="value">#ffd22c</div></div>
  </el-col>
</el-row>

### 辅助色

除了主色外的场景色，需要在不同的场景中使用（例如危险色表示错误的操作）。

<el-row :gutter="12">
  <el-col :span="6">
    <div class="demo-color-box bg-success">Success<div class="value">#67C23A</div></div>
  </el-col>
  <el-col :span="6">
    <div class="demo-color-box bg-warning">Warning<div class="value">#E6A23C</div></div>
  </el-col>
  <el-col :span="6">
    <div class="demo-color-box bg-danger">Danger<div class="value">#F56C6C</div></div>
  </el-col>
  <el-col :span="6">
    <div class="demo-color-box bg-info">Info<div class="value">#909399</div></div>
  </el-col>
</el-row>

#### 色彩css 变量

```scss
$--color-primary: #ffd22c !default;
$--color-success: #67c23a !default;
$--color-warning: #eb9e05 !default;
$--color-danger: #ff5574 !default;
$--color-info: #878d99 !default;
```

### 文字样式

<nuxt-link to="/admin/report/lotto_report">游戏报表</nuxt-link>

- <span class="text-warning">待开奖</span> <i class="text-disabled">warning</i>
- <span class="text-success">已中奖</span> <i class="text-disabled">success</i>
- <span class="text-danger">未中奖</span> <i class="text-disabled">danger</i>
- <span class="text-muted">已撤单</span> <i class="text-disabled">text-secondary</i>


```scss
$theme-colors: map-merge((
  "primary": $--color-primary,
  "success": $--color-success,
  "info": $--color-info,
  "warning": $--color-warning,
  "danger":$--color-danger,
  "muted":$--color-text-secondary,
  "disabled":$--color-text-placeholder
), $theme-colors);
```

