<template>
  <div class="home">
    <div class="home-top">top</div>
    <div class="home-cneter">cneter</div>
    <div class="home-footer">
      <ul>
        <router-link to="/" tag="li">首页</router-link>
        <router-link to="/" tag="li">大厅</router-link>
        <router-link to="/" tag="li">开奖</router-link>
        <router-link to="/" tag="li">聊彩</router-link>
        <router-link to="/" tag="li">个人</router-link>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang='scss'>
*,body,html,ul,ol,dl{
  padding: 0px;
  margin: 0px;
}
.home{
  display: flex;
  flex-direction: column;
  .home-footer{
    & ul{
      display: flex;
      justify-content: space-between;
      align-items:center;
      border-top: 1px solid #ccc;
      & li{
        display: flex;
        width: 20%;
        height: 96px;
        justify-content: center;
        align-items: center;
        color: #666;
      }
    }
  }
}
</style>

