<template>
  <div class="one">
  	<headers></headers>
    <el-carousel :interval="1800">
      <el-carousel-item v-for="item in 4" :key="item"> </el-carousel-item>
    </el-carousel>
    <div class="add">
    	<van-notice-bar text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。" left-icon="https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png" />
    </div>
    <div class="one-center">
    	<ul>
    		<router-link v-for="(item,index) in 16" :key="index" tag="li" to="/one">
    			<img src="../../assets/img/one/中宏时时彩.png" alt="images"/>
    			<h5>大发</h5>
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
      	content:[
      		{title:'购彩大厅',show:'one'},
      		{title:'UU直播',show:'second'},
      		{title:'活动中心',show:'three'},
      		{title:'我的账户',show:'five'},
      	]
      };
    },
    components:{
    	headers
    }
  };
</script>
<style>

</style>