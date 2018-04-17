<template>
  <div class="home">
    <number-choose v-on:choose="onChoose" :unit="number.unit" :selected-nums="selectedNums" v-for="(number, index) in numbers" :key="index"></number-choose>
  </div>
</template>

<script>
import NumberChoose from './NumberChoose'

export default {
  name: 'Home',
  components: {
    NumberChoose
  },
  data () {
    return {
      numbers: [
        { unit: '万位' },
        { unit: '千位' },
        { unit: '百位' },
        { unit: '十位' },
        { unit: '个位' }
      ],
      selectedNums: []
    }
  },
  methods: {
    onChoose (val, oldVal) {
      let index = this.selectedNums.indexOf(oldVal)
      if (index > -1) {
        this.selectedNums.splice(index, 1)
      }
      this.selectedNums.push(val)
    }
  }
}
</script>

<style>
.home {
  border: 1px solid #ddd;
  border-radius: 6px;
  width: 780px;
  padding: 14px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
