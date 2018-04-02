<template>
  <div class="three">
    <headers></headers>
    <ul>
      <li v-for="(threeC,index) in threeContent">
        <div class="three-box">
          <div class="icon"> {{index}} </div>
          <div class="cont">
            <p class="title">{{threeC.title}}</p>
            <p class="msg">{{threeC.msg}}</p>
          </div>
        </div>
        <i class="el-icon-arrow-right"></i>
      </li>
    </ul>
  </div>
</template>
<script>
  import headers from '../public/header'
  export default {
    data() {
      return {
        threeContent: [{
          title: '晋级奖励',
          msg: '喷雾时期木是因为回归日加盟因果关系加盟苦脸色去英雄副本姚弘云石切割机'
        }, {
          title: '每日加奖',
          msg: '喷雾时期木是因为回归日加盟因果关系加盟苦脸色去英雄副本姚弘云石切割机'
        }, {
          title: "中宏诚信彩，包赔嗨翻天",
          msg: '喷雾时期木是因为回归日加盟因果关系加盟苦脸色去英雄副本姚弘云石切割机'
        }, {
          title: '幸运大奖',
          msg: '喷雾时期木是因为回归日加盟因果关系加盟苦脸色去英雄副本姚弘云石切割机'
        }]
      }
    },
    components: {
      headers
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/three.scss";
</style>