<template>
  <div class="resetWay">
    <div class="resetWay-top">
      <router-link to="/safety" tag="i" class="el-icon-arrow-left"></router-link>
      <p>找回安全密码</p>
    </div>
    <div class="resetWay-input">
      <router-link to="" tag="div">
        <p>通过密保问题</p>
        <i class="el-icon-arrow-right"></i>
      </router-link>
      <router-link to="" tag="div">
        <p>通过密保邮箱</p>
        <i class="el-icon-arrow-right"></i>
      </router-link>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    methods: {
      resetWay() {
        this.$router.push({
          path: '/safety'
        });
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/page-five/safety/resetWay.scss';
</style>