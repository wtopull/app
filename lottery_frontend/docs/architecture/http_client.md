# HTTP client

* [@nuxtjs/axios](#at-nuxtjs-axios)
* [nuxt配置](#nuxt-pei-zhi)
* [interceptors](#interceptors)
* [axiosPlus](#axiosplus)

<a name="table-of-contents"></a>

## @nuxtjs/axios

目前项目使用的是 [axios](https://github.com/axios/axios) 和
[@nuxtjs/axios](https://github.com/nuxt-community/axios-module)

**@nuxtjs/axios** 是把 axios 进一步封装在 nuxt 内，让 nuxt [上下文对象](https://zh.nuxtjs.org/api#%E4%B8%8A%E4%B8%8B%E6%96%87%E5%AF%B9%E8%B1%A1) 的 app 和 vue 组件实例 this 都方便调用$axios

axios 返回的是[Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise),
项目推荐使用 [async/await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)

**@nuxtjs/axios** 推荐使用$post,$get 

**Fetch Style requests**

```js
// Normal usage with axios
let {data} = await $axios.get('...')

// Fetch Style
let data = await $axios.$get('...')
```

### Component

**`asyncData`**

```js
//pages\events.vue:30 获取活动列表

//全局影响的ajax建议使用Promise,非全局可直接用 async/await

async asyncData({ app }) {
  return {
    events: (await app.$axios.$post('event/get')).data
  }
}
```

**`methods`/`created`/`mounted`/etc**

```js
// 官方文档例子 项目 vue 实例推荐使用 this.$axiosPlus
methods: {
  async fetchSomething() {
    const ip = await this.$axios.$get('http://icanhazip.com')
    this.ip = ip
  }
}
```

### Store `nuxtServerInit`

```js
async nuxtServerInit ({ commit }, { app }) {
  const ip = await app.$axios.$get('http://icanhazip.com')
  commit('SET_IP', ip)
}
```

### Store actions

```js
// In store
// store\pay.js:19 更新余额
export const actions = {
  async getBal({ commit }, callback = () => {}) {
    commit('setBal', (await this.$axios.$post('user-balance-account/find-info')).data)
    callback()
  }
}
```

**[🚀 返回目录](#table-of-contents)**

## nuxt配置

[@nuxtjs/axios options](https://github.com/nuxt-community/axios-module#options)

[errorCode错误代码合集](){onclick="document.querySelector('.docs-error-code').click();return false"}

```js
//nuxt.config.js
axios: {
  prefix: '/api',
  proxy: true,
  progress:false,//requests is too more
}
```

## Interceptors

[@nuxtjs/axios interceptors](https://github.com/nuxt-community/axios-module#interceptors)

```js
// plugins\ajax.js
export default function ({ $axios, app , route, error, redirect }) {
  $axios.onError(err => {
    if (err.code === 401) {
      redirect('/login')
    }
    if (err.message.includes('timeout') && route) {
      //route path is always '/'
      // return error(route.path + '相关的的接口网络超时！')
      return error('网络超时！')
    }
  })

  $axios.onResponse(response => {
    if (response.data) {
      const { data: { errorCode } } = response
      if (errorCode === 102901 || errorCode === 100002) {
        //import logout from '~/util/logout'
        logout(app,errorCode)
      }
    }
    return response
  })
}
```

## $axiosPlus

项目 vue 实例推荐使用 this.$axiosPlus,对 `@nuxtjs/axios` 的进一步封装，全局自动处理错误,简化参数

**`plugins\ajax.js`**

已设置`/api/advertisement/get` **api** 前缀,默认 post 请求

`$axiosPlus(url[, data[, callback[,config]]])`

### Parameters

* **url** api 地址

* **data** post 对象或请求成功的回调函数

* **callback** 无 error 返回的请求成功回调函数，参数`response.data`，有 error 时不被调用仅自动提示错误消息

* **config** callback 的参数

  * **showError** 是否显示 error message,默认 true

  * **errCb** 与 showError 一起用，设为 true 时将整个`response`作为`callback`的参数

  * **url** 请求 API url

  * **duration** 错误提示消息自动关闭的时间

```js
//pages\home.vue:131
methods: {
  getAd() {
    this.$axiosPlus(
      'advertisement/get', { type: 1, device_type: DeviceType },
      ({ advertisements }) => {
        this.advertisements = advertisements.map(_ => ({..._.content }))

        this.jQueryRun()
      }
    )
  }
}
```

第二个参数不为 Object 时可直接传回调函数

```js
//pages\home.vue:125
this.$axiosPlus(
  'lottery-issue/get-lottery-info-opened',
  data => (this.openList = data.issues.map(_ => ({ ..._.content })))
)
```

不同响应状态的用法

```js
methods:{
  submit(){
    this.$form.validate((valid) => {
      if (valid) {
          this.getUser(userModel => {
            if(this.quota) {
              //errCb:true时 callback(res)
              this.$axiosPlus('user/open-account',this.form,(res) => {
                if(res && res.error) {  //请求返回error
                  if(res.errorCode === 100101) {
                    validateMessage = `用户名：${this.form.name} 已注册！`
                    this.$form.fields[0].resetField()
                  }
                }else{
                  this.$message.success('恭喜，用户添加成功！')
                }
              },{showError:false,errCb:true}) //关闭error message提示
            }else{
              this.quotaFields.validate()
            }
          })
      } else {
        return false;
      }
    })
  }
}
```

**@nuxtjs/axios** 和 **$axiosPlus** 默认设置了 baseUrl,对于项目中特殊的 API 请求可重置 baseUrl

```js
//pages\domains.vue:30
const check = (
  context,
  { page = 0, limit_type = 1, identify = 'alpha' } = {}
) =>
  context.$axios.$get('/sys-report', {
    params: {
      identify,
      page,
      limit_type
    },
    baseURL: '/'
  })
```

axios 在[坑](https://cnodejs.org/topic/57e17beac4ae8ff239776de5)太多不好用时可选择[superagent](https://github.com/visionmedia/superagent)

**[🚀 返回目录](#table-of-contents)**
