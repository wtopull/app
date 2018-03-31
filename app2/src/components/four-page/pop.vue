<template>
  <div class="pop">
    <div class="one-top">
      <van-nav-bar left-arrow title="玩家信息" @click-left="$router.go(-1)"></van-nav-bar>
    </div>
    <div class="pop-center">
    	<div class="pop-center-top">
    		<img src="http://imagess-google.com/system/common/other/playerHomeBg.jpg"/>
    	</div>
    	<div class="pop-center-middle">
    		<div class="pop-center-box">
    			<div class="pop-center-position">
    				<img src="../../assets/img/home/one/ah11x5.png"/>
    				<p>VIP5</p>
    			</div>
    			<h3>苍老师</h3>
    			<ul>
    				<li>账号：xxxxx</li>
    				<li>性别：保密</li>
    				<li>
    					<p>头衔：农民</p>
    					<p>累计中奖：1314</p>
    				</li>
    			</ul>
    			
    		</div>
    	</div><div class="pop-center-bottom">
    		<h3>Ta喜欢的彩票</h3>
    		<ul>
    			<li v-for="(item,index) in 8"></li>
    		</ul>
    	</div>
    </div>
  </div>
</template>
<script>
</script>
<style lang="scss">
  @import '../../assets/scss/four-page/pop.scss';
</style>
