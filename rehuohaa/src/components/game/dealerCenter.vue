<template>
<div class="dealer">
  <div class="drow_1">
    <v-touch data-dealer="AG" tag="a" href="javascript:;" @tap="$store.dispatch('loginGame','ag_live')"></v-touch>
    <v-touch data-dealer="MG" tag="a" href="javascript:;" @tap="$store.dispatch('loginGame','mg_live')"></v-touch>
  </div>
  <div class="drow_2">
    <v-touch data-dealer="BBIN" tag="a" href="javascript:;" @tap="$store.dispatch('loginGame','bb_live')"></v-touch>
    <v-touch data-dealer="SA" tag="a" href="javascript:;" @tap="$store.dispatch('loginGame','sa_live')"></v-touch>
  </div>
  <div class="drow_3">
    <v-touch data-dealer="PT" tag="a" href="javascript:;" @tap="$store.dispatch('loginGame','pt_live')"></v-touch>
  </div>
</div>
</template>
<style lang="scss">
 @import "../../assets/css/main.scss";
	.dealer{
       @extend %bz;
       margin-top:rem2px(50);
       a{
          @extend %fl;
          display:inline-block;
          background-size:cover !important;
       }
       >div{
        width:rem2px(750);
       	height:rem2px(180);
        padding:0 rem2px(155);
        @extend %bz;
      	margin-bottom:rem2px(40);
      	display:flex;
		    justify-content:space-between;
       }
	}
	.drow_1{
		a:first-child{
      @include cBg("dealer_1.png",rem2px(148),rem2px(180));
		};
		a:last-child{
			@include cBg('dealer_2.png',rem2px(148),rem2px(180));
		}
	}
	.drow_2{
		a:first-child{
			@include cBg("dealer_3.png",rem2px(148),rem2px(180));
		};
		a:last-child{
			@include cBg('dealer_4.png',rem2px(148),rem2px(180));
		}
	}
  .drow_3 a{
    @include  cBg("dealer_5.png",rem2px(148),rem2px(180));
  }
</style>
