<template>
  <div class="one">
  	<!-- <headers></headers> -->
    <el-carousel :interval="1800">
      <el-carousel-item v-for="item in 4" :key="item"> </el-carousel-item>
    </el-carousel>
    <div class="add">
    	<van-notice-bar text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。" left-icon="https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png" />
    </div>
    <div class="one-center">
    	<ul>
    		<router-link v-for="(item,index) in lotters" :key="index" tag="li" v-if="item.title" :to="'/'+item.title">
    			<img :src="item.paths" alt="images"/>
    			<h5>{{item.name}}</h5>
    		</router-link>
        <router-link class="lotter-list" to="/lotterList" tag="li">
          <i class="el-icon-circle-plus"></i>
          <h5>更多彩种</h5>
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
        lotters:[
          {name:'中宏时时彩',paths: require('../../assets/img/one/zhssc.png'),title:'betssc',sort:'ssc'},
          {name:'江苏快3',paths: require('../../assets/img/one/zsk3.png'),title:'betk3',sort:'k3'},
          {name:'中宏六合彩',paths: require('../../assets/img/one/zhlhc.png'),title:'betlhc',sort:'klc'},
          {name:'中宏快3',paths: require('../../assets/img/one/zhk3.png'),title:'betk3',sort:'k3'},
          {name:'香港六合彩',paths: require('../../assets/img/one/xglhc.png'),title:'betlhc',sort:'klc'},
          {name:'安徽快3',paths: require('../../assets/img/one/zhk3.png'),title:'betk3',sort:'k3'},
          {name:'广东11选5',paths: require('../../assets/img/one/gd11.png'),title:'betetf',sort:'etf'},
          {name:'广西快3',paths: require('../../assets/img/one/zhk3.png'),title:'betk3',sort:'k3'},
          {name:'重庆时时彩',paths: require('../../assets/img/one/ccssc.png'),title:'betssc',sort:'ssc'},
          {name:'湖北快3',paths: require('../../assets/img/one/bjk3.png'),title:'betk3',sort:'k3'},
          {name:'北京PK10',paths: require('../../assets/img/one/bj10.png'),title:'betbj10',sort:'klc'},
          {name:'大发六合彩',paths: require('../../assets/img/one/xglhc.png'),title:'betlhc',sort:'klc'},
          {name:'大发PK10',paths: require('../../assets/img/one/bj10.png'),title:'betbj10',sort:'klc'},
          {name:'上海快3',paths: require('../../assets/img/one/zhk3.png'),title:'betk3',sort:'k3'},
          {name:'北京快乐8',paths: require('../../assets/img/one/bj10.png'),title:'betbjkl8',sort:'klc'},
        ]
      };
    },
    components:{
    	headers
    }
  };
</script>
<style lang="scss">
@import '../../assets/scss/one.scss';
</style>