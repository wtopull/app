<template>
<div class="recharge">
  <div class="re_nav">
    <v-touch v-for="(item,$index) in navs" :class="{'promoNavH':item.toggle}" @tap="swiperTo(item,$index)">{{item.text}}</v-touch>
  </div>
  <swiper ref="rSwiper" :options="rswiperOption" class="rec_container">
    <swiper-slide>
      <wechat></wechat>
    </swiper-slide>
    <swiper-slide>
      <alipay></alipay>
    </swiper-slide>
    <swiper-slide>
      <bank></bank>
    </swiper-slide>
  </swiper>
</div>
</template>
<script>
     import wechat from "./recharge/rech_wechat.vue";
     import alipay from './recharge/rech_alipay.vue';
     import bank from './recharge/rech_bank.vue';
     let data = {
     	rswiperOption:{
           autoplay: 0,
     	},
     	navs:[{text:"微信支付",toggle:true},
     	{text:"支付宝支付",toggle:false},
     	{text:"银行支付",toggle:false}]
     }
	export default{
		data(){
			return data
		},
		computed:{
           swiper(){
           	return this.$refs.rSwiper.swiper
           }
		},
		methods:{
			swiperTo(item,index){
          this.navs.forEach(function(item){
          	Vue.set(item,'toggle',false)
          })
          Vue.set(item,"toggle",true)
          this.swiper.slideTo(index,500,false);
			}
		},
		components:{
			wechat,alipay,bank
		}
	}
</script>
<style lang="scss">
	@import "../../assets/css/main.scss";
    .recharge{
      width:rem2px(750);
      @extend %m0a;
    }
    .tip_z{
        @extend %font24;
        margin-left:0.2rem;
    }
    .re_nav{
      background-color:#b59c70;
    }
    .promoNavH{
      background-color:#fff;
    }
</style>
