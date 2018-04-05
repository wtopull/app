<template>
  <div class="m_center CaiWuZhongXin">
    <div class="x_header">
                    <nuxt-link to="/admin/agent">团队总览</nuxt-link>
                    <nuxt-link to="/admin/agent/accountCenter">开户中心</nuxt-link>
                    <nuxt-link to="/admin/agent/team">团队管理</nuxt-link>
                    <nuxt-link to="/admin/agent/online">在线会员</nuxt-link>
                    <nuxt-link to="/admin/agent/lottoReport">游戏报表</nuxt-link>
                    <nuxt-link to="/admin/agent/lottoOrder">彩票记录</nuxt-link>
                    <nuxt-link to="/admin/agent/transaction">帐变记录</nuxt-link>
                    <nuxt-link to="/admin/agent/withdrawReport">取款记录</nuxt-link>
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