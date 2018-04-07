<template>
  <div class="mymsg">
    <div class="mymsg-top">
      <router-link to="/five" tag="i" class="el-icon-arrow-left"></router-link>
      <ul>
        <router-link v-for="(navs,index) in nav" :to="'/mymsg/'+navs.pathurl" tag="li" :key="index">{{navs.name}}</router-link>
      </ul>
    </div>
    <div class="mymsg-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        nav: [{
          name: '公告',
          pathurl: 'notice'
        }, {
          name: '私信',
          pathurl: 'letter'
        }]
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/scss/page-five/mymsg.scss';
</style>