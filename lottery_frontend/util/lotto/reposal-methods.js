import { UA } from '~/plugins/UA'
const isWebkit = UA.engine.name == 'WebKit'

export default {
  methods: {
    querySearch(queryString, cb) {
      cb(this.hotNums)
    },
    _validate(autocomplete) {
      //vue 2.5 require nextTick
      this.$nextTick(() => {
        let value = isWebkit
          ? autocomplete.value
          : autocomplete.$refs.input.currentValue
        if (value >= 1) {
          autocomplete.activated = false
          autocomplete.$refs.input.setCurrentValue(value.replace('.', '')) //replace decimals
        } else {
          autocomplete.$refs.input.setCurrentValue('')
          !isWebkit && autocomplete.$refs.input.$emit('change', '')
          autocomplete.activated = true
        }
      })
    },
    _select($vm, i) {
      if (!this.shortcut) return
      let autocomplete = $vm.$refs.input[i]
      //Expected String, got Number.<ElAutocomplete>
      autocomplete.$refs.input.$emit('input', +autocomplete.value ? '0' : '1')
      // if(!+autocomplete.value) {
      //   $vm.lastSelectedInput.push(i)
      // }else{
      //   $vm.lastSelectedInput = $vm.lastSelectedInput.filter(v => v !== i)
      // }
    }
  }
}

// https://github.com/valerybugakov/react-selectable-fast
// https://github.com/stephan281094/vue-drag-select/tree/master/example
