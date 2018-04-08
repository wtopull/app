<template>
<div class="lottery">
  <div class="lrow">
    <v-touch tag="a" data-lottery="SA" href="javascript:;" @tap="$store.dispatch('loginGame','sa_lotto')">
      <v-touch tag="a" data-lottery="BBIN" href="javascript:;" @tap="$store.dispatch('loginGame','bb_lotto')"></v-touch>
    </v-touch>
  </div>
</div>
</template>
<style lang="scss">
@import "../../assets/css/main.scss";
	 .lrow{
		    @extend %flex_center;
		    justify-content:center;
        margin-top:rem2px(150);
	 	a{
	 		display: inline-block;
      		background-size:rem2px(130),rem2px(165) !important;
	 	}
    	a:not(:first-child){
      		margin-left:rem2px(140);
    	}
	    @for $i from 1 through 2{
	      a:nth-child(#{$i}){
	        @include cBg('lottery_'+$i+'.png',rem2px(130),rem2px(165))
	      }
    	}
	}
	.lottery{
		margin-top:rem2px(20);
	}
</style>
