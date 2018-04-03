<template>
  <div class="pop" v-show="isshow.showPage" ref="el">
    <div class="one-top">
      <div class="pop-top">
        <i class="el-icon-arrow-left" @click="hide"></i>
        <p>玩家信息</p>
      </div>
    </div>
    <div class="pop-center">
      <div class="pop-center-top">
        <img src="http://imagess-google.com/system/common/other/playerHomeBg.jpg" /> 
      </div>
      <div class="pop-center-middle">
        <div class="pop-center-box">
          <div class="pop-center-position">
            <img src="../../assets/img/home/one/ah11x5.png" />
            <p>VIP5</p>
          </div>
          <h3>{{pop.name}}</h3>
          <ul>
            <li>账号：{{pop.name}}</li>
            <li>性别：保密</li>
            <li>
              <p>头衔：农民</p>
              <p>累计中奖：1314</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="pop-center-bottom">
        <h3>Ta喜欢的彩票</h3>
        <ul>
          <li v-for="(item,index) in 8" :key="index"></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isshow: {
          showPage: false,
          showF: false
        }
      }
    },
    props: {
      pop: {
        type: Object
      }
    },
    methods: {
      show() {
        this.isshow.showPage = true;
      },
      hide() {
        this.isshow.showPage = false;
        this.$emit('sonclick', this.isshow);
      },
      routerBack() {
        let _this = this;
        if(_this.$route.path === "/four/winning") {
          //    		_this.$router.push({path:'winning',userid:'winning'})
          //    		_this.$router.go('/four/winning')
        }
        if(_this.$route.path === "/four/profit") {
          _this.$router.go('/four/profit')
        }
      }
    }
  }
</script>
<style lang="scss">
  @import '../../assets/scss/four-page/pop.scss';
</style>