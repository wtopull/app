# 第三方游戏平台

> pages\admin\payment\third_platform.vue

- [前置技术](#qian-zhi-ji-zhu)
- [开发原则](#kai-fa-yuan-ze)
- [初始化数据](#chu-shi-hua-shu-ju-vuex)
- [HTML](#html)
- [CSS](#css-sass)
- [JS](#javascript-es6)

<a name="table-of-contents"></a>

## 前置技术

- [bootstrap grid](https://getbootstrap.com/docs/4.0/layout/grid/)
- [bootstrap utilities flex](https://getbootstrap.com/docs/4.0/utilities/flex/)
- [element-ui form表单验证](http://element.eleme.io/#/zh-CN/component/form#biao-dan-yan-zheng)
- element-ui: Select,InputNumber,Radio,Button,Message  
- [vue 单元素/组件的过渡](https://cn.vuejs.org/v2/guide/transitions.html)
- [asyncData](https://zh.nuxtjs.org/api) nuxt.js 异步获取数据
- [vuex store modules mode](https://zh.nuxtjs.org/guide/vuex-store#%E6%A8%A1%E5%9D%97%E6%96%B9%E5%BC%8F) 模块方式的vuex
- [Vue深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)


## 开发原则

### 命名

> 简洁 语义 抽象

[CSS Class 命名](http://zoomzhao.github.io/code-guide/#css-classes)

[BEM](https://www.w3cplus.com/css/mindbemding-getting-your-head-round-bem-syntax.html)略显复杂暂不采用

### vue

[Vue 组件细则](https://vue-loader.vuejs.org/zh-cn/start/spec.html) Src 导入

HTML CSS代码量较少时可不用src导入采用单文件组件

尽可能用组件自定义事件 如`el-select @change`代替vue watch

事件命名可参考 **Element-ui** node_modules\element-ui\packages\table\src\table-header.js:110

handle + element + Click 这种方式 如：`handleHeaderClick` 

### API

CRUD解耦，新增，修改，删除操作完后不要去请求读取列表API，仅在前端实现状态更新

## 初始化数据 vuex

**getters**

```js
//store\index.js:27
export const getters = {
  // /api/user/login,/api/user/find-info 返回的third_party_game_platform_prefix 用户已注册的第三方平台前缀(以逗点分隔输出 ex. AG,VR,NVR)
  _3rdPlatformPrefix:({user}) => user.third_party_game_platform_prefix,
  // 已注册有余额功能的平台，NVR已注册但没balance余额字段
  _3rdGames: state => state._3rdGames,
}
```
**actions**

```js
//查询用户所有已注册平台的余额
//store\index.js:43
async get3rdGames({commit}){
  commit('setState',{key:'_3rdGames',value:(await this.$axios.$post('third-party-game/all-balance')).data})
}

//all-balance 较慢，放到首页预加载
//pages\home.vue:106
created() {
  if (this.$store.state.version) {
    this.$store.dispatch('get3rdGames')
  }
}
```

**[🚀 返回目录](#table-of-contents)**

## HTML

```html
<!-- third-platform  -->
<div class="third-platform">
    <ul class="bal">
        <li>
            <!-- d-flex -> display:flex,flex下align-items-center垂直居中 -->
            <div class="d-flex align-items-center">
                <label>账户总额</label>
                <!-- defaultRound:plugins\filters.js:9 https://cn.vuejs.org/v2/api/#Vue-filter -->
                <span class="text-danger">￥<strong>{{totalBal | defaultRound}}</strong></span>
            </div>
            <!-- <nuxt-link> 组件 https://zh.nuxtjs.org/api/components-nuxt-link -->
            <nuxt-link to="/admin/payment">
                <el-button type="primary">充值</el-button>
            </nuxt-link>
        </li>
        <!-- ... -->
    </ul>
    <!-- container-fluid make-container() ,bootstrap\scss\mixins\_grid.scss:5-->
    <!-- container-fluid bootstrap grid flex布局下清空row 的margin-left: -15px;margin-right: -15px; -->
    <!-- .container-fluid {width: 100%;padding-right: 15px;padding-left: 15px;margin-right: auto;margin-left: auto;} -->
    <div class="container-fluid">
        <ul class="row third-platform-list">
            <!-- justify-content-between -> justify-content: space-between-->
            <!-- static-data/third-party-game-platform 返回的是一个数组，用v-for 循环 -->
             =<!-- col-3 ,bootstrap grid布局每行4个 -->
            <li class="col-3 d-flex align-items-center justify-content-between" v-for="(item,index) in list" :key="item.id">
                <div>
                    <!-- getStatus方法判断，只有已注册游戏显示余额 -->
                    <h4>{{item.prefix}}</h4><span v-if="getStatus(item) === '进入'">
                        余额：{{availableGames[item.prefix].balance | defaultRound}}
                    </span>
                </div>
                <!-- disabled 禁用未开放游戏，loadings分配绑定各个游戏的加载状态 -->
                <!-- element-ui button，loading类型boolean,!!转换 -->
                <el-button type="primary" :disabled="getStatus(item) === '未开放'" :loading="!!loadings[index]" @click="sign(item,index)">{{getStatus(item)}}</el-button>
            </li>
        </ul>
    </div>
    <!-- 使用element-ui 内置过度动画 http://element.eleme.io/#/zh-CN/component/transition -->
    <transition name="el-fade-in">
        <!-- v-if满足vue 单元素过渡条件 -->
        <!-- 表单验证 model数据form采用抽象form命名-->
        <!-- 需要验证的表单项input,select等v-model设置为form[attr],如：form.transOut -->
        <!-- el-form-item的prop和e-form的model 字段需要保持一致 -->
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" v-if="transInList.length > 1">
            <!-- el-form-item 组件自动生产label元素 -->
            <el-form-item label="转出账户：" prop="transOut">
                <!-- el-select change事件 第一个参数:目前的选中值,此处未用到传null-->
                <el-select v-model="form.transOut" @change="change(null,'out')">
                    <el-option v-for="item in transOutList" :label="item.name" :value="item.prefix" :key="item.prefix" :disabled="item.disabled" />
                </el-select>
            </el-form-item>
            <el-form-item label="转入账户：" prop="transIn">
                <!-- 转入 转出 共用一个方法change,根据第二个参数来判断类型 -->
                <el-select v-model="form.transIn" @change="change(null,'in')">
                    <el-option v-for="item in transInList" :label="item.name" :value="item.prefix" :key="item.prefix" :disabled="item.disabled" />
                </el-select>
            </el-form-item>
            <el-form-item label="转入金额：">
                <!-- el-input-number change事件 回调参数 form.amount改变后的数-->
                <el-input-number v-model="form.amount" @change="amountChange" controls-position="right" :min="50">
                </el-input-number>最低转入50元
                <!-- hotAmountChange 选择 全部余额 时 设置转入余额 form.amount 为当前选中转出账户余额 -->
                <el-radio-group v-model="hotAmount" size="small" @change="hotAmountChange">
                    <el-radio-button v-for="amount in hotAmounts" :label="amount" :key="amount"></el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="登录密码：" prop="pw">
                <!-- @keyup.native.enter 绑定input 原生 keyup 回车事件 -->
                <el-input type="password" v-model="form.pw" @keyup.native.enter="sumbit"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="sumbit" :loading="loading">确认</el-button>
                <!-- reset 重置表单所有已设置数据 -->
                <el-button @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </transition>
</div>
```

**[🚀 返回目录](#table-of-contents)**

## CSS (sass)

```scss
//$--border-color-base, assets\element-variables.scss:61
//lighten http://sass-lang.com/documentation/Sass/Script/Functions.html#lighten-instance_method

//定义 第三方游戏全局边框颜色
$platform-border-color-base: lighten($--border-color-base, 5%);
//定义 第三方游戏全局边框
$platform-border-base:$--border-width-base $--border-style-base
$platform-border-color-base;

.third-platform {
  .bal {
    display: flex;
    border: $platform-border-base;
    //assets\scss\variables.scss:49 bootstrap grid布局间隔
    margin-bottom: $grid-gutter-width/2;
    li {
      //flex-basis: 0;flex-grow: 1; 自适应flex布局
      flex-basis: 0;
      padding: 20px;
      flex-grow: 1;
      display: flex;
      justify-content: space-between;
      & + li {
        border-left: 1px solid $platform-border-color-base;
      }
      //...
    }
  }
  //...
}

.third-platform-list{
  li{
    padding-top: 20px;padding-bottom: 20px;
    border: $platform-border-base;
    border-left:none;
    margin-bottom: $grid-gutter-width/2;
    // 列表循环后 每行4个，使用https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-child 让每行第一个有左边框
    &:nth-child(4n+1){
      border-left:1px solid $platform-border-color-base;
    }
  }
  //...
}
```

**[🚀 返回目录](#table-of-contents)**

## javascript es6

```js
import { mapState,mapGetters, mapActions, mapMutations } from 'vuex'
//判断用户代理设置是网页还是app,此处简单用isMobile来代替app
import { isMobile } from '~/plugins/UA'
import { pwReg, getRequiredRule,camelCase } from '~/util/validator'

//初始化转入转出 数组函数
const initTransList = _ => ({
  ..._,
  disabled: _.prefix === 'NVR'
})

export default {
  name: 'third-platform',
  async asyncData({ app, store }) {
    //初始化 第三方游戏平台列表，es6解构赋值为list
    const { data: list } = await app.$axios.$post(
      'static-data/third-party-game-platform'
    )
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    //筛选转入转出共同列表
    const availableList = list.filter(
      _ =>
        //es6 属性表达式 http://es6.ruanyifeng.com/#docs/object#%E5%B1%9E%E6%80%A7%E5%90%8D%E8%A1%A8%E8%BE%BE%E5%BC%8F
        //筛选 web_status 或mobile_status 不为2(2为停用)
        _[`${isMobile ? 'mobile' : 'web'}_status`] !== 2 &&
        //判断login初始化后已注册第三方游戏前缀是否包含
        //String.prototype.includes()
        //https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/includes
        store.getters._3rdPlatformPrefix.includes(_.prefix)
    )
    //定义自己平台账户
    const self = [{ prefix: 'self', name: '彩票' }]
    //创建转入账户 transInList,转出账户 transOutList,将NVR设置为禁用
    const transInList = self.concat(availableList.map(initTransList))
    const transOutList = self.concat(availableList.map(initTransList))
    // 根据游戏列表数量为每一个游戏绑定loading
    const loadings = [...Array(list.length)]
    return {
      list,
      transInList,
      transOutList,
      //由于第三方接口速度较慢，el-button均设置loading
      loadings
    }
  },
  data() {
    return {
      //定义转入 转出类型字段，后面用camelCase拼接
      types: ['in', 'out'],
      loading: false,
      //el-form model
      form: {
        pw: '',
        transIn: '',
        transOut: '',
        transable: true,
        amount: '1000'
      },
      //el-form rules
      rules: {
        //getRequiredRule 返回表单必填项 ->  { required: true, message: '请选择平台', trigger: 'change' }
        //此处封装为项目大量表单验证必填项通用
        transIn: [getRequiredRule('请选择平台', 'change')],
        transOut: [
          getRequiredRule('请选择平台', 'change'),
          {
            validator: (rule, value, callback) => {
              const { form } = this
              if (
                //transable true时，select切换不触发自定义表单验证，仅在提交时触发
                !form.transable &&
                //钱转出去时 判断平台可用余额 是否小于 设置转出金额,反之判断选中游戏余额
                (this.isTransOut
                  ? this.bal
                  : this.availableGames[form.transOut].balance) < form.amount
              ) {
                callback(new Error('余额不足！'))
              }
              callback()
            },
            trigger: 'blur'
          }
        ],
        pw: [
          getRequiredRule('请输入资金密码')
        ]
      },
      //快捷金额 选中值
      hotAmount: '1000',
      //快捷金额 选择项
      hotAmounts: ['1000', '5000', '10000', '全部余额']
    }
  },
  created() {
    //除了首页初始化获取第三方游戏余额，进入本页再获取1次
    this.$store.dispatch('get3rdGames')
  },
  methods: {
    //判断列表游戏 可用，注册状态
    //判断逻辑同 const availableList = list.filter(_ => ...)
    getStatus(item) {
      if (item[`${isMobile ? 'mobile' : 'web'}_status`] === 2) {
        return '未开放'
      } else if (this._3rdPlatformPrefix.includes(item.prefix) && item.prefix !== 'NVR') {
        return '进入'
      } else {
        return '注册'
      }
    },
    //转入 转出 选择切换事件
    change(val, type) {
      //camelCase https://lodash.com/docs/4.17.4#camelCase 转化驼峰命名
      //Array.prototype.find() //https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find
      //判断当前选择对立的select,比如 转入账户 change后，reverseProp为transOut
      const reverseProp = camelCase(`trans ${this.types.find(_ => _ !== type)}`)
      //获取 对立选择器列表
      const reverseList = this[reverseProp + 'List']
      //判断当前选择器是否选择了平台彩票
      const isSelf = this.form[camelCase(`trans ${type}`)] === 'self'
      //循环对立选择器，如当前选择器选中了彩票，则对立选择器第三方游戏关闭disabled，反之禁用，跳过彩票和NVR
      reverseList.forEach(
        (v, k) => k !== 0 && v.prefix !== 'NVR' && (v.disabled = !isSelf)
      )
      //当前选择器选中彩票，对立选择器清空，反之设为彩票
      this.form[reverseProp] = isSelf ? '' : 'self'
      //最后判断 如快捷金额是全部余额，则变更 转入金额
      // 比如上一次状态是 转出账户:彩票，转入账户：AG，选中 全部余额时 转入金额为彩票余额
      // 当切换 转出账户：AG，转入账户：彩票，转入金额 则自动变更为 AG余额
      this.hotAmount === '全部余额' && this.hotAmountChange('全部余额')
    },
    hotAmountChange(amount) {
      const { form } = this
      this.form.amount =
        amount === '全部余额'
          ? this.isTransOut
            //当前选中状态是 平台彩票转出到第三方游戏时,转入金额 this.form.amount 设置为 平台可用余额
            ? this.bal
            : form.transOut
            // 转入账户为第三方游戏，转出账户：彩票，转入金额 this.form.amount 设置为 选中游戏余额
              ? this.availableGames[form.transOut].balance
            // 转入账户：彩票，转出自动清空，此时 转入金额 this.form.amount 不改变
              : form.amount
          //快捷金额未设置为 全部余额 时不改变 转入金额 this.form.amount的数值
          //此处为3元表达式写法，可改为if(amount === '全部余额') ...
          : amount
    },
    amountChange(amount) {
      //如快捷金额 包含 输入的 转入金额 this.form.amount，快捷金额选中值 this.hotAmount 高亮，反之清空选中状态
      this.hotAmount = this.hotAmounts.find(_ => _ == amount) || ''
    },
    //重置 表单数据
    reset() {
      //重置表单验证项
      this.$form.resetFields()
      this.loading = false
      //重置 快捷金额 和 转入金额
      this.form.amount = this.hotAmount = '1000'
      // 重置 转入转出 选择器，清空选择下拉框options disabled
      this.form.transIn = this.form.transOut = ''
      this.transInList = this.transInList.map(initTransList)
      this.transOutList = this.transOutList.map(initTransList)
    },
    //登录 sign-in,注册sign-up,共用方法，此处通用命名为sign
    // item 列表项，index 列表下标
    sign(item, index) {
      const isSignUp = this.getStatus(item) === '注册'
      //解构赋值prefix为platform,便于API传值
      const { prefix: platform } = item
      //vue data bind Array响应需要下列操作
      //1.复制数组loadings,http://es6.ruanyifeng.com/#docs/array#%E6%89%A9%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6%E7%9A%84%E5%BA%94%E7%94%A8
      const loadings = [...this.loadings]
      //2.更改数组下标项值
      loadings[index] = true
      //3.将上面复制的数组loadings再次复制并赋值给this.loadings
      this.loadings = [...loadings]

      //更好的实现
      // https://cn.vuejs.org/v2/api/#vm-set
      //更多了解请看 深入响应式原理
      // this.$set(this.loadings,index,true)

      this.$axiosPlus(
        //es6 模板字符串
        //http://es6.ruanyifeng.com/#docs/string#%E6%A8%A1%E6%9D%BF%E5%AD%97%E7%AC%A6%E4%B8%B2
        //判断 注册还是登录
        `third-party-game/${isSignUp ? 'register' : 'login'}`,
        { platform },
        _ => {
          loadings[index] = false
          //再次通过复制来响应 数组绑定变化
          this.loadings = [...loadings]

          // this.$set(this.loadings,index,false)

          this.$message({
            message: `${platform}${isSignUp ? '注册' : '登录'}成功！`,
            type: 'success',
            duration: 1500,
            //el-message 关闭回调
            onClose: () => {
              if (isSignUp) {
                //转入 转出列表添加新注册游戏
                this.transInList.push(this.list[index])
                this.transOutList.push(this.list[index])
              }
            }
          })
          if (isSignUp) {
            //前端新增 一个已注册有余额功能的平台
            this.setState({
              key: '_3rdGames',
              //对象 扩展运算符
              //http://es6.ruanyifeng.com/#docs/object#%E5%AF%B9%E8%B1%A1%E7%9A%84%E6%89%A9%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6 
              value: { ...this.availableGames, [platform]: { balance: 0 } }
            })
            //前端新增 一个用户已注册的第三方平台前缀
            this.setUser({
              ...this.userModel,
              third_party_game_platform_prefix:
                this._3rdPlatformPrefix + `,${platform}`
            })
          }
        }
      )
    },
    sumbit() {
      //transable false后触发自定义表单时间
      this.form.transable = false
      this.$form.validate(valid => {
        //表单验证通过
        if (valid) {
          //对象的解构赋值
          //http://es6.ruanyifeng.com/#docs/destructuring#%E5%AF%B9%E8%B1%A1%E7%9A%84%E8%A7%A3%E6%9E%84%E8%B5%8B%E5%80%BC
          const { pw, amount } = this.form
          const { isTransOut } = this
          //根据API规则设定 转帐类型 1=转入第三方, 2=转出第三方
          const type = this.isTransOut ? 1 : 2
          //获取 转账类型
          const platform = this.form[camelCase(`trans ${this.types[type - 1]}`)]
          this.loading = true
          this.$axiosPlus(
            'third-party-game/transfer',
            {
              type,
              user_password: pw,
              platform,
              money: amount
            },
            _ => {
              this.loading = false
              //转账成功清空表单
              this.reset()
              this.$message({
                message: `转${isTransOut ? '入' : '出'}${platform}成功！`,
                type: 'success',
                duration: 1500,
                onClose: () => {
                  const { availableGames } = this
                  //刷新 平台可用余下额
                  this.getBal()
                  //前端修改 转账第三方游戏平台余额
                  this.setState({
                    key: '_3rdGames',
                    value: {
                      ...availableGames,
                      [platform]: {
                        balance:
                          //+号转换类型 String -> Number
                          +availableGames[platform].balance +
                          // 根据平台转出还是转入状态判断 金额增减
                          +amount * (isTransOut ? 1 : -1)
                      }
                    }
                  })
                }
              })
            }
          )
        } else {
          //表单验证没通过，transable:true 继续下次提交验证
          this.form.transable = true
          return false
        }
      })
    },
    //更新平台余额 getBal
    ...mapActions({ getBal: 'pay/getBal' }),
    //setState -> vuex mutations通用方法，此处用来更新 availableGames 新注册游戏列表
    //setUser 更新 _3rdPlatformPrefix 已注册的第三方平台前缀
    ...mapMutations(['setState', 'setUser'])
  },
  computed: {
    isTransOut() {
      //当前选中状态是转出状态，平台彩票转出金额到第三方游戏
      return this.form.transOut === 'self'
    },
    //_3rdPlatformPrefix属于userModel,此处缓存为后面set用
    ...mapState({
      userModel:'user'
    }),
    ...mapGetters({
      //平台可用余额
      bal: 'pay/bal',
      //平台总额
      totalBal: 'pay/totalBal',
      // 已注册有余额功能的平台，NVR已注册但没balance余额字段
      availableGames: '_3rdGames'
    }),
    ///login后 用户已注册的第三方平台前缀(以逗点分隔输出 ex. AG,VR,NVR)
    ...mapGetters(['_3rdPlatformPrefix'])
  },
  mounted() {
    //缓存表单form DOM
    this.$form = this.$refs.form
  }
}
```

**[🚀 返回目录](#table-of-contents)**


