import { levels } from '~/util/mixins/data-tables'
import { delayAjax } from '~/plugins/ajax'
import {paramValidate} from '~/util/validator'
import { getChildren } from '~/plugins/common'
export { getChildren }

export default {
  data() {
    return {
      dataKey: 'teamData',
      listKey: 'users',
      //patch util\mixins\data-tables.js:89,checkPageData
      serverData: true,
      SSRInvoking:true,
      name: ''
    }
  },
  created() {
    if (this.isSPA) {
      delayAjax(this.$axios, this.$store, this.get)
    } else {
      this.fetch()
    }
  },
  methods: {
    fetch() {
      this.pageData[0] = this.teamData
    },
    getStatus() {
      //noop util\mixins\data-tables.js:126
    },
    format({
      total_balance: amount,
      level,
      return_point: point,
      logined_at: loginTime,
      register_at: registerTime,
      online_status,
      max_return_point: max,
      mini_return_point: min,
      ...props
    }) {
      return {
        amount,
        point,
        level: levels[level - 1],
        loginTime: loginTime || '未登录',
        registerTime,
        status: online_status ? 1 : 2,
        max,
        min,
        ...props
      }
    },
    async get(loadProps) {
      const { loadType, page } = this.getQueryParams(loadProps)
      if (page === 0 && loadType === 'pageChange' && this.SSRInvoking)
        return this.fetch()
      this.SSRInvoking = false
      if (this.checkPageData(loadProps, page)) return
      //name is query self not inlucde children
      const { name } = this
      //context.$message return Promise
      if (paramValidate(name, { context: this, ssr: false }) === true) {
        !this.resetting && this.spin()
        const { online: is_online, routeName: parent_name } = this
        const { data } = await getChildren(this, {
          name,
          is_online,
          parent_name,
          children_type: name || this.onlyOnline ? 2 : 1,
          page,
          page_size: loadType ? loadProps.pageSize : this.pageSize
        })
        Object.assign(this, data)
        this.pageDone(data, page)
      }
    }
  }
}
