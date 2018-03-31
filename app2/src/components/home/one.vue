<template>
  <div class="one">
  	<div class="one-top">
  		<van-nav-bar title="购彩大厅" right-text="按钮"></van-nav-bar>
  	</div>
    <el-carousel :interval="1800" arrow="always">
      <el-carousel-item v-for="item in 4" :key="item"> </el-carousel-item>
    </el-carousel>
    <div class="add">
    	<van-notice-bar text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。" left-icon="https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png" />
    </div>
    <div class="one-center">
    	<ul>
    		<router-link v-for="(item,index) in 16" tag="li" to="/second/lotto">
    			<img src="../../assets/img/home/one/ah11x5.png" alt="images"/>
    			<h5>大发</h5>
    			<p>1分1期</p>
    		</router-link>
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
<style>

</style>