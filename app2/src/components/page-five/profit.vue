<template>
  <div class="profit">
    <div class="profit-top">
      <router-link to="/five" tag="i" class="el-icon-arrow-left"></router-link>
      <p>今日盈亏</p>
    </div>
    <div class="profit-content">
      <div class="profit-content-top">
        <div>
          <p>盈利金额</p>
          <p>-3.98</p>
        </div>
      </div>
      <div class="profit-contents">
        <i class="el-icon-warning"></i>盈亏计算公式：中奖-投注+活动+返点 </div>
      <div class="profit-content-list">
        <ul>
          <li>
            <span>12.00</span>
            <span>投注金额</span>
          </li>
          <li>
            <span>12.00</span>
            <span>中奖金额</span>
          </li>
          <li>
            <span>12.00</span>
            <span>活动礼金</span>
          </li>
          <li>
            <span>12.00</span>
            <span>返点金额</span>
          </li>
          <li>
            <span>12.00</span>
            <span>充值金额</span>
          </li>
          <li>
            <span>12.00</span>
            <span>提现金额</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
</script>
<style lang="scss" scoped>
  @import '../../assets/scss/page-five/profit.scss';
</style>