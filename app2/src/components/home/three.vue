<template>
  <div class="three">
    <headers></headers>
    <ul v-show="showFlag">
      <li v-for="(threeC,index) in threeContent" :key="index" @click="selectFood(threeC,$event,index)">
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
    <promote :promote="selectedFood" ref="promote" @sonclick="haashow"></promote>
    <days :days="selectedFood" ref="days" @sonclick="haashow"></days>
    <happy :happy="selectedFood" ref="happy" @sonclick="haashow"></happy>
    <lucky :lucky="selectedFood" ref="lucky" @sonclick="haashow"></lucky>
  </div>
</template>
<script>
import headers from "../public/header";
import promote from "../page-three/promote";
import days from "../page-three/days";
import happy from "../page-three/happy";
import lucky from "../page-three/lucky";
export default {
  data() {
    return {
      threeContent: [
        {
          title: "晋级奖励",
          msg:
            "喷雾时期木是因为回归日加盟因果关系加盟苦脸色去英雄副本姚弘云石切割机"
        },
        {
          title: "每日加奖",
          msg:
            "喷雾时期木是因为回归日加盟因果关系加盟苦脸色去英雄副本姚弘云石切割机"
        },
        {
          title: "中宏诚信彩，包赔嗨翻天",
          msg:
            "喷雾时期木是因为回归日加盟因果关系加盟苦脸色去英雄副本姚弘云石切割机"
        },
        {
          title: "幸运大奖",
          msg:
            "喷雾时期木是因为回归日加盟因果关系加盟苦脸色去英雄副本姚弘云石切割机"
        }
      ],
      selectedFood: {},
      showFlag: true
    };
  },
  methods: {
    selectFood(threeC, event,index) {
      this.selectedFood = threeC;
      this.showFlag = false;
      switch(index){
        case 0:this.$refs.promote.show();break;
        case 1:this.$refs.days.show();break;
        case 2:this.$refs.happy.show();break;
        case 3:this.$refs.lucky.show();break;
      }
    },
    haashow(isshow) {
      this.showFlag = !isshow.showF;
    }
  },
  components: {
    headers,
    promote,
    days,
    happy,
    lucky
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/three.scss";
</style>