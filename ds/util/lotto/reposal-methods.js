import { UA } from '~/plugins/UA'
const isWebkit = UA.engine.name == 'WebKit'

export default {
  methods: {
    querySearch(queryString, cb) {
      cb(this.hotNums)
    },
    _validate(input) {
      this.$nextTick(() => {
        const isHotNum = input.label === 'hot-num'
        let value = input.currentValue
        if (value >= 1) {
          isHotNum && (input.$parent.activated = false)
          value = value.replace('.', '')
          input.$emit('input', input.selected || isHotNum ? value : +value)
        } else {
          input.setCurrentValue('')
          !isWebkit && input.$emit('change', '')
          isHotNum && (input.$parent.activated = true)
        }
        isHotNum && this.selectHotNum(value)
      })
    },
    _select($vm, i) {
      let input = $vm.$refs.input[i]
      let value = input.value
      const isValueStr = value && typeof value === 'string'
      input.$emit(
        'input',
        isValueStr || value === null
          ? ''
          : value ? '' + value : this.lottoRoot.hotNum || null
      )
      input.selected = value !== null && !isValueStr
    }
  }
}
