<template>
<div class="game">
  <div class="grow_1">
    <v-touch tag="a" data-game="AG" href="javascript:;" @tap="$store.dispatch('loginGame','ag_game')"></v-touch>
    <v-touch tag="a" data-game="GG" href="javascript:;" @tap="$store.dispatch('loginGame','gg_game')"></v-touch>
  </div>
  <div class="grow_2">
    <v-touch tag="a" data-game="MG" @tap="$store.dispatch('loginGame','mg_game')"></v-touch>
    <v-touch tag="a" data-game="SA" href="javascript:;" @tap="$store.dispatch('loginGame','sa_game')"></v-touch>
  </div>
  <div class="grow_3">
    <v-touch tag="a" data-game="PT" href="javascript:;" @tap="$store.dispatch('loginGame','pt_game')"></v-touch>
  </div>
</div>
</template>
<style lang="scss">
  @import "../../assets/css/main.scss";
  .game{
       @extend %bz;
       margin-top:rem2px(50);
       a{
          @extend %fl;
          background-size:cover !important;
       }
       >div{
         @extend %bz;
         width:rem2px(750);
         height:rem2px(180);
         padding:0 rem2px(155);
       	 margin-bottom:rem2px(40);
      	 display:flex;
         justify-content:space-between;
       }
	}
	.grow_1{
		a:first-child{
      @include cBg("game_1.png",rem2px(148),rem2px(180))
		};
		a:last-child{
			@include cBg('game_2.png',rem2px(148),rem2px(180))
		}
	}
	.grow_2{
		a:first-child{
			@include cBg("game_4.png",rem2px(148),rem2px(180))
		};
		a:last-child{
			@include cBg('game_5.png',rem2px(148),rem2px(180))
		}
	}
	.grow_3{
		a:first-child{
		 @include cBg("game_6.png",rem2px(148),rem2px(180));
		}
	}
</style>
