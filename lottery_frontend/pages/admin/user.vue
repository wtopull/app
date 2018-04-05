<template>
  <div class="m_center GeRenZhongXin">
    <div class="x_header">
                    <nuxt-link to="/admin/user">个人中心</nuxt-link>
                    <!-- <nuxt-link to="/admin/user/bank">銀行</nuxt-link> -->
                    <!-- <a href="javascript:void(0)">游戏记录</a>
                    <a href="javascript:void(0)">帐变记录</a> -->
                </div>
                <div class="x_con">
                    <nuxt-child/>
                </div>
                
  </div>  
</template>
<script>
  export default {
    name:'user-center'
  }
</script>