## asyncData

**asyncData** **fetch** 的request仅在process.server为false时可调用

**process.server** 仅在node控制台可打印为true,其他情况均为false,不可用于created生命周期作判断



## 路由命名

> Nuxt.js 依据 pages 目录结构自动生成 vue-router 模块的[路由配置](https://zh.nuxtjs.org/guide/routing)

`pages\admin\agent\game_report\_name.vue`  文件夹命名为 **lotto_*** 

页面路由lotto_report (lotto_*) 访问后都会显示 `pages\admin\agent\lotto_order.vue` 这个组件

```html
<nuxt-link to="/admin/agent/lotto1_report">游戏报表</nuxt-link>

<nuxt-link to="/admin/agent/lotto_report">游戏报表</nuxt-link>
```

具体原因尚不明确，先临时把文件夹 **lotto_report** 重命名为 **game_report**

## express + nuxt 中间件不支持post

在express定义一个中间件

```js
import { Router } from 'express'

const router = Router()

router.post('/doc_enter', function(req, res, next) {
  if (req.body.pw) {
    return res.json({success:req.body.pw})
  }
})
```
`req.body` 返回 undefined

使用express的bodyParser

```js
const bodyParser = require('body-parser')

app.use(bodyParser.json({limit:'900kb'}))

app.use('/api', api)
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

app.use(nuxt.render)
```

`req.body` 现在有返回值，但是 反向代理的后端API全部超时

request headers **Provisional headers are shown**

## webpack编译vue mixins methods同名问题

```js
//util/mixins/gameReport.js
export const format = ({
  self_return: point,
  bet_cancel: cancelAmount,
  event,
  trans_in: transfer,
  win,
  bet,
  ...props
})  => {
  const item = {
    point,
    cancelAmount,
    transfer,
    win,
    bet,
    event,
    // profit:plus(plus(minus(win,bet),point),event),
    profit: [minus(win, bet), point, event].reduce((a, b) => plus(a, b)),
    ...props
  }

  return item
}

export default {
  methods: {
    format(item) {
      return format(item)
    }
  }
}
```

In .vue file

```js
import gameReport, { request,format } from '~/util/mixins/gameReport'

export default {
  name: 'agent-lotto-report',
  async asyncData({ app, store, params: { name }, error }) {
    if (!store.state.user.token)
      return { users: [], total: 0, parent_names: [] }
    if (paramValidate(name, { error })) {
      //...
      const { data } = await request(app, {
        ...dateParam(queryDate),
        ...(name ? { parent_name: name } : {})
      })
      return {
        ...data,
        reportData: data.users.map(format),
        queryDate
      }
    }
  }
  //...
}
```

在Vue文件里导入一个mixins，如果mixins methods里的方法和外部方法同名，vue文件导入的外部方法在webpack压缩编译后会出现

**data.users.map(Object(C.format))**

C是mixins模块，而内部的format方法已被 uglifyjs [mangle](https://github.com/mishoo/UglifyJS2#command-line-options) 改变变量

最终 `Object(C.format)`不存在

**解决方案**

- 外部方法format 和 vue mixins里的实例方法 不同名

- 导入修改

```js
import gameReport, { request } from '~/util/mixins/gameReport'

export default {
  name: 'agent-lotto-report',
  async asyncData({ app, store, params: { name }, error }) {
    //...
    const data
    return {
        reportData: data.users.map(gameReport.methods.format),
      }
  }
  //...
}

```