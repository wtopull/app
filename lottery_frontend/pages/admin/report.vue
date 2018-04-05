<template>
  <div class="m_center BaoBiaoJiLu">
    <div class="x_header">
                    <nuxt-link to="/admin/report">游戏记录</nuxt-link>
                    <nuxt-link to="/admin/report/chase_order">追号记录</nuxt-link>
                    <nuxt-link to="/admin/report/transaction">账变记录</nuxt-link>
                    <nuxt-link to="/admin/report/lotto_report">游戏报表</nuxt-link>
                </div>
                <div class="x_con">
                    <nuxt-child/>
                </div>
                
  </div>  
</template>
<script>
  export default {
    name:'report'
  }
</script>