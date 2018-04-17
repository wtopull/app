<template>
  <div class="number-choose">
    <div class="unit">{{unit}}</div>
    <div class="value" :class="{active: value.active}" v-for="value in values" :key="'value'+value.value">{{value.label}}</div>
    <div class="button" :class="{active: button.active, disabled: button.disabled}" v-for="button in buttons" :key="'button'+button.value" @click="choose(button)">{{button.label}}</div>
  </div>
</template>

<script>
export default {
  name: 'NumberChoose',
  props: {
    unit: String,
    selectedNums: Array
  },
  data () {
    return {
      values: [
        { label: '0', value: 0, active: false },
        { label: '1', value: 1, active: false },
        { label: '2', value: 2, active: false },
        { label: '3', value: 3, active: false },
        { label: '4', value: 4, active: false },
        { label: '5', value: 5, active: false },
        { label: '6', value: 6, active: false },
        { label: '7', value: 7, active: false },
        { label: '8', value: 8, active: false },
        { label: '9', value: 9, active: false }
      ],
      buttons: [
        { label: '全', value: 0, active: false, disabled: false },
        { label: '大', value: 1, active: false, disabled: false },
        { label: '小', value: 2, active: false, disabled: false },
        { label: '奇', value: 3, active: false, disabled: false },
        { label: '偶', value: 4, active: false, disabled: false },
        { label: '清', value: 5, active: false, disabled: false }
      ],
      prevType: ''
    }
  },
  watch: {
    selectedNums (val) {
      this.buttons = this.buttons.map(button => {
        button.disabled = val.indexOf(button.value) > -1 && !button.active
        return button
      })
    }
  },
  methods: {
    choose (button) {
      if (button.disabled) {
        return false
      }
      this.$emit('choose', button.value, this.prevType)
      this.prevType = button.value
      this.buttons = this.buttons.map(btn => {
        btn.active = btn.value === button.value
        return btn
      })
      switch (button.value) {
        case 0:
          this.values = this.values.map(value => {
            value.active = true
            return value
          })
          break
        case 1:
          this.values = this.values.map(value => {
            if (value.value > 4) {
              value.active = true
            } else {
              value.active = false
            }
            return value
          })
          break
        case 2:
          this.values = this.values.map(value => {
            if (value.value < 5) {
              value.active = true
            } else {
              value.active = false
            }
            return value
          })
          break
        case 3:
          this.values = this.values.map(value => {
            if (value.value % 2 !== 0) {
              value.active = true
            } else {
              value.active = false
            }
            return value
          })
          break
        case 4:
          this.values = this.values.map(value => {
            if (value.value % 2 === 0) {
              value.active = true
            } else {
              value.active = false
            }
            return value
          })
          break
        default:
          this.values = this.values.map(value => {
            value.active = false
            return value
          })
          break
      }
    }
  }
}
</script>

<style>
.number-choose {
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.number-choose:last-child {
  margin-bottom: 0;
}
.unit {
  background-color: #000033;
  color: #fff;
  border: 1px solid #000033;
  border-top-right-radius: 40%;
  border-bottom-right-radius: 40%;
  font-size: 12px;
  line-height: 12px;
  padding: 8px 12px;
  cursor: default;
}
.value {
  background: -webkit-linear-gradient(#eee, #fff);
  border: 1px solid #ddd;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 14px;
  cursor: default;
}
.button {
  background: -webkit-linear-gradient(#eee, #fff);
  border: 1px solid #ddd;
  border-radius: 3px;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
}
.button.active,
.value.active {
  background: -webkit-linear-gradient(#ff0033, #ff00cc);
  color: #fff;
}
.button.disabled,
.value.disabled {
  cursor: not-allowed;
  background: -webkit-linear-gradient(#bbb, #ddd);
  color: #999;
}
</style>
