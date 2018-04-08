<template>
<div id="gamecenter" class="gamecenter">
  <div class="banner">
    <div class="bann_src2"></div>
  </div>
  <div class="gameNav">
    <v-touch option="option" v-for="(nav,$index) in $store.state.navsGame" :class="{'gameNavH':nav.toggle}" @tap="$store.commit('swiperToGame',$index)">{{nav.text}}</v-touch>
  </div>
  <swiper ref="gSwiper" :options="gameOption" class="noSwiper">
    <swiper-slide>
      <lottery></lottery>
    </swiper-slide>
    <swiper-slide>
      <dealer></dealer>
    </swiper-slide>
    <swiper-slide>
      <game></game>
    </swiper-slide>
    <swiper-slide>
      <sport></sport>
    </swiper-slide>
  </swiper>
</div>
</template>
<script>
import dealer from './game/dealerCenter.vue';
import game from  './game/gameCenter.vue';
import lottery from './game/lotteryCenter.vue';
import sport from './game/sportCenter.vue';
export default{
	 data(){
	    return{
	       gameOption:{
             noSwiping:true,
             noSwipingClass:'noSwiper'
	       },
	    }
	 },
	 computed:{
      swiper(){
      	return this.$refs.gSwiper.swiper
      }
	 },
   mounted:function(){
     this.$nextTick(()=>{
       let value= this.swiper;
       this.$store.commit('swipergame',value);
       this.$store.commit('swiperToGame',0);
     });
     setTimeout(()=>{
       this.axios({
         method:'get',
         url:`${this.$store.state.url}dist/php/mobile/mobile_platform_status.php`,
         headers:this.$store.state.register.headers,
       }).then(res=>{
         res.data.info.forEach(item=>{
           this.$store.state.maintainStatus.set(item.tags,item.status);
         })
       });
     },50);
   },
	 components:{
	 	dealer,game,lottery,sport
	 }
	}
</script>
<style type="text/css">
	.gamecenter{
		position:relative;
	}
	.gameNav div{
		font-size:0.59733rem !important;
		color:#636363;
		margin:0 !important;
		width:25%;
		font-weight:bold;
		line-height:2.60267rem;
	}
	.second_bg{
		width:100%;
		height:1.621rem;
		background:url(../assets/second_bg.jpg) no-repeat center center;
		background-image:100% 100%;
	}
</style>
