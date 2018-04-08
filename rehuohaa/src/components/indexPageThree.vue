<template>
<div id="promotion" class="promotion">
  <div class="banner">
    <div class="bann_src3"></div>
  </div>
  <div class="promoNav">
    <v-touch v-for="(nav,$index) in navs" :class="{'promoNavH':nav.toggle}" @tap="swiperTo(nav,$index)">{{nav.text}}</v-touch>
  </div>
  <swiper :options="promotionOption" ref="pSwiper" class="noSwiping">
    <swiper-slide>
      <all></all>
    </swiper-slide>
    <swiper-slide>
      <all></all>
    </swiper-slide>
    <swiper-slide>
      <all></all>
    </swiper-slide>
    <swiper-slide>
      <all></all>
    </swiper-slide>
  </swiper>
</div>
</template>
<script>
import all from './promotions/index.vue';
export default{
	data(){
		return {
			promotionOption:{
         noSwiping:true,
         noSwipingClass:"noSwiper"
			},
			navs:[{
				text:"所有优惠",
				toggle:true
			},{
				text:"首存优惠",
				toggle:false
			},{
				text:"VIP优惠",
				toggle:false
			},{
				text:"其它优惠",
				toggle:false
			}]
		}
	},
	computed:{
		swiper(){
			return this.$refs.pSwiper.swiper
		}
	},
	methods:{
      swiperTo(nav,index){
          this.navs.forEach(function(nav){
          	Vue.set(nav,'toggle',false);
          })
          Vue.set(nav,'toggle',true)
          this.$store.state.proToggle.forEach(item=>{
            Vue.set(item,"toggle",false);
          });
          this.$store.state.pro_tab.forEach(item=>{
            Vue.set(item,'toggle',false);
          });
          switch(index){
            case 0:
              this.$store.state.pro_tab.forEach(item=>{
                Vue.set(item,'toggle',true);
              });
            break;
            case 1:
             this.$store.state.pro_tab[1].toggle=true;
             this.$store.state.pro_tab[3].toggle=true;
             break;
            case 2:
             this.$store.state.pro_tab[0].toggle=true;
             break;
            case 3:
             this.$store.state.pro_tab[2].toggle=true;
             break;
          }
          this.swiper.slideTo(index,500,false);
      }
	},
	components:{
		all
	}
}
</script>
<style lang="scss">
.promotion{
 background:#0C0E0E;
}</style>
