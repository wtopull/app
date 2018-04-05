<template>
  <div class="m_center CaiWuZhongXin">
    <div class="x_header">
                    <nuxt-link to="/admin/agent">团队总览</nuxt-link>
                    <nuxt-link to="/admin/agent/account_center">开户中心</nuxt-link>
                    <nuxt-link to="/admin/agent/team">团队管理</nuxt-link>
                    <nuxt-link to="/admin/agent/online">在线会员</nuxt-link>
                    <!-- <nuxt-link to="/admin/agent/lotto1_report">游戏报表</nuxt-link> -->
                    <!-- <nuxt-link to="/admin/agent/lotto_report">游戏报表</nuxt-link> -->
                    <!-- nuxt issue ? 
                    {
                      path: "lotto:order",
                      component: _0449882c,
                      name: "admin-agent-lottoorder"
                    },
                    {
                      path: "lotto:report/:name?",
                      component: _4c87865c,
                      name: "admin-agent-lottoreport-name"
                    }
                    page components can't named lotto** 
                    -->
                    <nuxt-link to="/admin/agent/game_report">游戏报表</nuxt-link>
                    <nuxt-link to="/admin/agent/lotto_order">彩票记录</nuxt-link>
                    <nuxt-link to="/admin/agent/transaction">帐变记录</nuxt-link>
                    <nuxt-link to="/admin/agent/withdraw_report">取款记录</nuxt-link>
                    <nuxt-link to="/admin/agent/contract">建立契约</nuxt-link>
                    <!-- <a href="javascript:void(0)">分红</a> -->
                </div>
                <div class="x_con">
                    <nuxt-child/>
                </div>
                
  </div>  
</template>
<script>
  export default {
    name:'agent'
  }
</script>