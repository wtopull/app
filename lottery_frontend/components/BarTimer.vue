<template>
  <div class="bar-time">
    <i class="el-icon-time"></i>时间：
    <span>{{ISO}}</span>
    <span> {{hours}}:{{minutes}}</span>
  </div>
</template>

<style lang="scss">
.bar-time{
  > span{
    margin: 0 3px;
  }
}
</style>


<script>
export default {
  data() {
    let now = new Date()
    return {
      ISO: now.toISOString().slice(0, 10),
      now
    }
  },
  methods: {
    interval() {
      window.setInterval(() => (this.now = new Date()), 1000 * 20)
    }
  },
  computed: {
    hours() {
      const value = this.now.getHours()
      return value < 10 ? '0' + value : value
    },
    minutes() {
      const value = this.now.getMinutes()
      return value < 10 ? '0' + value : value
    }
  }
}
</script>
