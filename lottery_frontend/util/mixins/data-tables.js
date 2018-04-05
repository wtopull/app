import { mapGetters, mapMutations } from 'vuex'
import { defaultRound } from '~/plugins/filters'

export { defaultRound }

//el-select change value to be '0' but not 0
export const queryAll = { '0': '全部' }

export const levels = ['顶级', '主管', '招商', '特权', '直属', '普通']

//todo style insert component method
// style(value > 1 ? -1 : 1,'disabled') is default ?
// Math.sign
export const style = (value, negative = 'danger', success = 'success',processing) =>
  value === 0 ? processing || 'text-warning' : `text-${[success, negative][value > 0 ? 0 : 1]}`

export const paginationDef = (total, pageSize, currentPage) => {
  const isLte20 = total <= 20
  let pageSizes = [pageSize, isLte20 ? pageSize * 2 : 30, 50, 100].slice(
    0,
    total >= 7.5 * pageSize
      ? 4
      : Math[total > pageSize ? 'ceil' : 'floor'](
          total / ((isLte20 ? 2.5 : 3) * pageSize)
        ) + 1
  )
  let layout = [total > pageSize ? 'total' : '']
  pageSizes.length > 1 && layout.push('sizes')
  total > pageSize && layout.push('prev, pager, next')
  total > pageSize * 5 &&
    // layout.splice(-1, 0, 'jumper')
    layout.push('jumper')
  return {
    layout: layout.join(),
    pageSizes,
    pageSize,
    currentPage
  }
}

export default {
  data() {
    return {
      tableData: [],
      pageData: [],
      initPageSize: 10,
      pageSize: 10,
      currentPage: 1,
      total: 0,
      resetting: false,
      status: '',
      statusList: { ...queryAll }
    }
  },
  methods: {
    fetch(listKey = 'list') {
      if (this.serverData) {
        const { serverData, format } = this
        this.getStatus(serverData)
        this.getActions && this.getActions(serverData)
        const { total } = serverData
        this.pageData[0] = this.tableData = serverData[listKey].map(_ => ({
          ...(format ? format(_) : _)
        }))
        this.total = total
      }
    },
    getStatus({ drop_list }) {
      this.statusList = {
        ...queryAll,
        ...drop_list.status_list
      }
    },
    statusLabel(status) {
      return this.statusList[status]
    },
    getQueryParams(loadProps) {
      const loadType =
        loadProps &&
        ['keyup', 'click'].every(_ => _ !== loadProps.type) &&
        loadProps.type
      const page = loadType ? loadProps.page - 1 : 0
      return {
        loadType,
        page
      }
    },
    checkPageData(loadProps, page) {
      return (
        //reset loadProps is undefined
        loadProps &&
        ((loadProps.type === 'init' && this.serverData) ||
          this.getPageCache(loadProps, page))
      )
    },
    listen(prop = []) {
      ;(Array.isArray(prop) && prop.length
        ? prop
        : ['date', 'status'].concat(prop)
      ).forEach(i => this.$watch(i, () => !this.resetting && this.get(true)))
    },
    //use limit_type
    // getPageSizes(pageSize) {
    //   return this.paginationDef.pageSizes.findIndex(_ => _ === pageSize) + 1
    // },
    getPageCache(loadProps, page) {
      const { type, pageSize } = loadProps
      if (type === 'pageChange') {
        this.currentPage = page + 1
        const pageDataItem = this.pageData[page]
        if (pageDataItem) {
          this[this.dataKey || 'tableData'] = pageDataItem
          return true
        }
      } else if (type === 'sizeChange') {
        this.pageSize = pageSize
        this.pageData = []
      } else {
        this.pageData = []
      }
    },
    sortChange(loadProps) {
      if (loadProps && loadProps.type === 'sortChange') {
        const { sortInfo } = loadProps
        const { prop: sortProp } = sortInfo
        this.tableData.sort(
          (a, b) =>
            (a[sortProp] - b[sortProp]) *
            (sortInfo.order === 'ascending' ? 1 : -1)
        )
        return true
      }
    },
    pageDone(data, page) {
      this.pageData[page] = this[this.dataKey || 'tableData'] = data[
        this.listKey || 'list'
      ].map(_ => ({
        ...(this.format ? this.format(_) : _)
      }))
      if (!this.total) {
        this.getStatus(data)
        this.getActions && this.getActions(data)
      }
      this.total = data.total
      this.spin({ on: false })
      if (this.resetting) {
        this.currentPage = 1
        this.resetting = false
      }
    },
    style,
    reset() {
      this.resetting = true
      this.status = ''
      this.pageSize = this.initPageSize
      this.initDate && Object.assign(this, this.initDate())
      this.resetDate()
      this.$nextTick(this.get)
    },
    ...mapMutations(['spin'])
  },
  computed: {
    paginationDef() {
      const { currentPage, total, pageSize } = this
      return paginationDef(total, pageSize, currentPage)
    },
    version() {
      return this.$store.state.version
    },
    ...mapGetters(['loading'])
  },
  destroyed() {
    this.spin({ on: false })
  }
}
