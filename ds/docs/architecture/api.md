## API测试 

前后端分离

后端API [swagger](http://alpha-api.test.bestsnake.com/documentation)

使用 build\api-config.js:5 的参数 通过 `/oauth/token` 获取 **access_token** ,最前面加上 'Bearer ' (scheme含空格) 

**/api/user/login** 获取 user_token

右上角 Authorize 设置相关token和 **user_device_type** 可测试API

![](img/swagger.jpg)

前端提供 <nuxt-link to="/test">API測試</nuxt-link>

## 反向代理


等待完善更新……