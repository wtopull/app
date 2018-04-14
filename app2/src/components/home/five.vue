<template>
  <div class="five">
    <headers></headers>
    <div class="five-top">
      <div>
        <div class="five-top-left">
          <p></p>
        </div>
        <div class="five-top-right">
          <p>账号：
            <span>{{this.$store.state.Globalusername}}</span>
          </p>
          <p>余额：
            <span v-show="!money">*****</span>
            <span v-show="money">111111</span>
            <button v-show="!money" @click="money = !money">显示</button>
          </p>
        </div>
      </div>
      <ul>
        <router-link to="" tag="li">
          <img src="../../assets/img/five/Wallet.png" />
          <span>我要充值</span>
        </router-link>
        <router-link to="" tag="li">
          <img src="../../assets/img/five/Box.png" />
          <span>我要提现</span>
        </router-link>
        <router-link to="" tag="li">
          <img src="../../assets/img/five/Confirm.png" />
          <span>交易记录</span>
        </router-link>
        <router-link to="" tag="li">
          <img src="../../assets/img/five/370.png" />
          <span>投注记录</span>
        </router-link>
      </ul>
    </div>
    <div class="five-content">
      <ul>
        <router-link :to="fiveNavs.paths" tag="li" v-for="(fiveNavs,index) in fiveNav" :key="index">
          <div class="five-content-nav">
            <i class="iconfont" :class="fiveNavs.icon"></i>
            <p>{{fiveNavs.name}}</p>
          </div>
          <i class="el-icon-arrow-right"></i>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
  import headers from '../public/header'
  export default {
    data() {
      return {
      	money:false,
        fiveNav: [{
          name: '个人信息',
          icon: 'icon-wenbenicon',
          paths: 'detail'
        }, {
          name: '安全中心',
          icon: 'icon-weibiaoti1',
          paths: 'safety'
        }, {
          name: '代理中心',
          icon: 'icon-dailizizhizizhiqiyezizhi',
          paths: 'agency'
        }, {
          name: '今日盈亏',
          icon: 'icon-shuju',
          paths: 'profits'
        }, {
          name: '我的消息',
          icon: 'icon-wenben',
          paths: 'mymsg'
        }, ]
      }
    },
    components: {
      headers
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/scss/five.scss';
</style>