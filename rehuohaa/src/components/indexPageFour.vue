<template>
<div id="center" class="center">
  <div class="cshow">
    <p>{{$store.state.register.centerusername}}</p>
    <p>主账户 :<span>{{$store.state.register.amountmoney}} 元</span></p>
    <v-touch @tap="swiper(4)" class="left">我要充值</v-touch>
    <v-touch @tap="swiper(5)" class="right">我要提现</v-touch>
    <div class="topNav">
      <v-touch tag="p" @tap="swiper(2)"><span></span></v-touch>
      <v-touch tag="p" @tap="swiper(3)"><span></span></v-touch>
      <v-touch tag="p" @tap="swiper(3)"><span></span></v-touch>
    </div>
  </div>
  <div class="cnav">
    <ul class="navup">
      <v-touch tag="li" @tap="swiper(1)"></v-touch>
      <v-touch tag="li" @tap="swiper(4)"></v-touch>
      <v-touch tag="li" @tap="swiper(5)"></v-touch>
    </ul>
    <ul class="navmiddle">
      <v-touch tag="li" @tap="swiper(6)"></v-touch>
      <v-touch tag="li" @tap="swiper(7)"></v-touch>
      <v-touch tag="li" @tap="swiper(8)"></v-touch>
    </ul>
  </div>
</div>
</template>
<script>
	export default{
      methods:{
      	swiper(value){
					this.$store.dispatch("showWating")
	      	this.$store.commit("togglemain",value)
      	},
				witSwiper(value){
					 if(this.$store.state.center.secNavs[0].toggle==true){
						 this.$store.commit('centerTip',23);
					 }else{
						 this.$store.dispatch("showWating");
 	      		 this.$store.commit("togglemain",value);
					 }
				}
     }
	}
</script>
<style lang="scss">
   @import  '../assets/css/main.scss';
	 .handleIcon{
	  @extend %posr;
		margin-left:0.1rem;
    top:0.05rem;
    width:0.42rem;
	  height:0.34rem;
	  border:0.012rem solid #7f7f7f;
    display:inline-block;
	  border-radius:0.08rem;
	   svg{
	   	display:block;
	   	top:-0.04rem !important;
      bottom:0 !important;
			margin:0 auto !important;
	   }
	 }
   .cshow{
       @include Bg("cshowBg.jpg",100%,rem2px(400))
       @extend %bsc,%font26,%posr;
        display:flex;
        flex-direction:column;
       >p{
        color:#01bad4;
       	text-align:center;
        width:100%;
        @extend %abso;
       	top:rem2px(225);
       }
			 >p:nth-child(2){
			 	top:rem2px(260);
        @extend %abso;
        color:#d03d88;
			 }
       .topNav{
         @extend %abso,%flex_center;
         justify-content:center;
         bottom:0;
         background-color:rgba(0,0,0,0.5);
         width:100%;
         height:rem2px(80);
         >p{
          @extend %flex_center;
          width:rem2px(200);
          height:rem2px(50);
          margin-right:rem2px(30);
          background:linear-gradient(to bottom,#f7b746,#f7b746) no-repeat right /rem2px(2) 100%;
         }
         >p:last-child{
           background:none;
           margin-right:rem2px(0);
         }
         @for $i from 1 through 3{
           >p:nth-child(#{$i})>span{
             display:block;
              @include Bg('sc_'+$i+'.png',rem2px(160),rem2px(35))
              background-size:100%;
           }
         }
       }
   }
   .cnav{
   	@include Bg("cnavBg.png",rem2px(700),rem2px(377));
   	@extend %bsc,%m0a;
    margin-top:rem2px(100);
   }
   .center{
   	  ul{
   	  	 width:100%;
   	  }
   	  li{
   	  	 @extend %bsc,%fl;
   	   	margin-top:0.46rem;
   	  }
   }
   .navup{
       @for $i from 1 through 3{
          li:nth-child(#{$i}){
           @include Bg("function_"+$i+".png",rem2px(145),rem2px(160));
           @if($i==2){
            margin-left:rem2px(90);
            margin-right:rem2px(90);
           }
          }
       }
   }
   .navmiddle{
      @for $i from 1 through 3{
        li:nth-child(#{$i}){
          @include Bg('function_'+ ( 3 + $i ) + ".png",rem2px(145),rem2px(160));
          @if($i==2){
             margin:{
              left:rem2px(90);
              right:rem2px(90);
             }
          }
        }
      }
   }
   .swiper-slide .center{
   	background:#2A2A2A;
   }
   .cshow .left,.cshow .right{
   	width:rem2px(120);
   	height:rem2px(50);
   	line-height:rem2px(50);
   	position: absolute;
   	top:rem2px(124);
   	background:#fff;
   	text-align:center;
   	color:#f7b746;
   	font-size:rem2px(24);
   }
   .cshow .left{
   	left:16%;
   }
   .cshow .right{
   	right:16%;
   }
   .bank{
   	height:rem2px(585.94);
   }
   .fhui{
    	width:rem2px(710);
    	height:rem2px(90);
    	background:#1C648A;
    	font-size:rem2px(26);
    	color:#fff;
    	line-height:rem2px(90);
    	text-align:left;
    	padding-left:rem2px(40);
    }
</style>
