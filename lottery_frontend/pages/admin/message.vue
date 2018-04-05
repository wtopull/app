<template>
  <div class="m_center XiaoXiZhongXin">
    <div class="x_header">
                    <nuxt-link to="/admin/message">收件箱</nuxt-link>
                    <nuxt-link to="/admin/message/outbox">发件箱</nuxt-link>
                    <nuxt-link to="/admin/message/compose">发消息</nuxt-link>
                </div>
                <div class="x_con">
                    <nuxt-child/>
                </div>
                
  </div>  
</template>
<script>
  export default {
    name:'message'
  }
</script>