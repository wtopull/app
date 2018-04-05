<template>
  <div class="m_center CaiWuZhongXin">
    <div class="x_header">
                    <nuxt-link to="/admin/payment">充值</nuxt-link>
                    <nuxt-link to="/admin/payment/withdraw">提现</nuxt-link>
                    <nuxt-link to="/admin/payment/transfer">转账</nuxt-link>
                    <nuxt-link to="/admin/payment/chargeReport">充值记录</nuxt-link>
                    <nuxt-link to="/admin/payment/withdrawReport">提现记录</nuxt-link>
                    
                </div>
                <div class="x_con">
                    <nuxt-child/>
                </div>
                
  </div>  
</template>
<script>
  export default {
    name:'payment'
  }
</script>