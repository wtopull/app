import Vue from 'vue'
import '~/layouts/empty'
// Import common components & modules to optimize chunks size
import './UA'
import 'animejs'
import 'number-precision'
import '~/util/cache'

import { zip, flatten, camelCase,sumBy} from 'lodash'
export { zip, flatten, camelCase,sumBy }

import {
    Autocomplete,
    Pagination,
    Dialog,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    Tooltip,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Slider,
    Scrollbar,
    Badge,
    Cascader,
    Loading,
    MessageBox,
    Notification
  } from 'element-ui'
  
  Vue.use(Pagination)
  Vue.use(Dialog)
  Vue.use(Autocomplete)
  Vue.use(Input)
  Vue.use(InputNumber)
  Vue.use(Radio)
  Vue.use(RadioGroup)
  Vue.use(RadioButton)
  Vue.use(Checkbox)
  Vue.use(CheckboxButton)
  Vue.use(CheckboxGroup)
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(OptionGroup)
  Vue.use(Button)
  Vue.use(ButtonGroup)
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(DatePicker)
  Vue.use(Tooltip)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Tabs)
  Vue.use(TabPane)
  Vue.use(Slider)
  Vue.use(Scrollbar)
  Vue.use(Badge)
  Vue.use(Cascader)

  
  Vue.use(Loading.directive)
  
  Vue.prototype.$loading = Loading.service
  Vue.prototype.$msgbox = MessageBox
  Vue.prototype.$alert = MessageBox.alert
  Vue.prototype.$confirm = MessageBox.confirm
  Vue.prototype.$prompt = MessageBox.prompt
  Vue.prototype.$notify = Notification
// export  {format} from 'date-fns'
// direct export format make date-fns bundle 30K,the second way less then 10k
// import  {format} from 'date-fns'
// export {format}


// import {supportWebp as webp} from 'vue-lazyload/src/util'
// util.js has let,nuxt webpack config babel-loader exclude node_modules
function webp () {
  if(process.server) return
  let support = true
  const d = document

  try {
      let el = d.createElement('object')
      el.type = 'image/webp'
      el.style.visibility = 'hidden'
      el.innerHTML = '!'
      d.body.appendChild(el)
      support = !el.offsetWidth
      d.body.removeChild(el)
  } catch (err) {
      support = false
  }

  return support
}

export const supportWebp = webp()

let Log = {}
Log.install = function(Vue){
    Vue.prototype.$styleLog = process.env.NODE_ENV === 'development' ? function(value,str = 'debug',{style = 'color:fuchsia;font-size:24px',...props} = {}){
        this.$emit(str,value,...Object.values(props)) //vue-devtool events
        console.warn(`%c${str}`,style,value,props)
    } : () => {}
}
Vue.use(Log)

if (process.browser) {
    window.$ = require('jquery')
    const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
    Vue.use(VueAwesomeSwiper)

    if(process.env.NODE_ENV === 'production'){
        //https://github.com/nuxt-community/sentry-module can't use exprss in this project ?
        const Raven = require('raven-js');
        const RavenVue = require('raven-js/plugins/vue'); 
        Raven
        .config('https://b76335ef02d340e0844fc7240ffa2e2a@sentry.io/234492',{release:process.env.appVersion})
        .addPlugin(RavenVue, Vue)
        .install();
    }
}

export const AsyncComp = (dir,component) => {
    return () => ({
      // The component to load. Should be a Promise
      component: import(`../components/${dir}/${component}.vue`),
      // A component to use if the load fails
      // error: ErrorComp,
      // Delay before showing the loading component. Default: 200ms.
      delay: 0,
      // The error component will be displayed if a timeout is
      // provided and exceeded. Default: Infinity.
      timeout: 3000
    })
}

export const AsyncMultComp = (dir) => (component) => AsyncComp(dir,component)

// 大小写字母开头,6-10个字符
export const usernameReg = /^[a-zA-Z]\w{5,9}$/

// 字母数字组合,6-18个字符
export const pwReg = /^(?=\w*[A-Za-z]+\w*)(?=\w*\d+\w*)\w{6,18}$/

export const getRequiredRule = (message,tigger = 'blur') => ({ required: true, message,tigger})

export const paramValidate = (id,{error,reg = usernameReg,message = '不存在的用户',ssr = true,context} = {}) => id && !reg.test(id) ? (ssr ? error({ message }) : context.$message.error({duration:2000,message}))  : true //context.$message return Promise

export const apiIdValidate = (id,message,error) => id && id.length !== 24 ? error({ message }) : true


export const clipboard = (target,cb = () => {}) => {
    import('clipboard')
      .then(Clipboard => {
        var clipboard = new Clipboard(target);
        clipboard.on('success',cb);
      })
  }

export const getChildren = (context,props = {}) => context.$axios.$post('user/get-children',{children_type:1,...props})
