<template>
  <div class="head-top">
    <div class="pop-top">
      <p v-for="(contents,index) in content" :key="index">{{contents.show === routerUrl ? contents.title : ''}}</p>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        content: [{
          title: '购彩大厅',
          show: 'one'
        }, {
          title: 'UU直播',
          show: 'second'
        }, {
          title: '活动中心',
          show: 'three'
        }, {
          title: '我的账户',
          show: 'five'
        }, ],
        routerUrl:this.$route.name
      }
    },
  }
</script>
<style lang="scss" scoped>
  .head-top {
    height: 46px;
    width: 100%;
    background: #dc3b40 !important;
    position: fixed;
    top: 0px;
    z-index: 11;
    & .pop-top {
    	height: 46px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      color: #fff;
      position: relative;
      & i {
        position: absolute;
        left: 16px;
      }
    }
  }
</style>