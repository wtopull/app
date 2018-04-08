<template>
<div class="security">
  <ul class="secNav">
    <li v-for="(nav,$index) in $store.state.center.secNavs" class="secNavs">
      <p>
        <icon :name="nav.name"></icon>
      </p>
      <p>{{nav.text}}</p>
      <v-touch tag="p" @tap="$store.commit('bind',$index)" v-show="nav.toggle">{{nav.bind}}</v-touch>
      <p>{{nav.tip}}</p>
    </li>
  </ul>
  <layer v-show="$store.state.layer.cen_layer"></layer>
</div>
</template>
<script>
import layer from "./layer/cen_layer.vue"
	export default{
		components:{
			layer
		}
	}
</script>
<style lang="scss">
   @import "../../assets/css/main.scss";
   .security{
     @extend %m0a;
   }
  .secNav{
    @extend %bz;
  	width:rem2px(750);
  	background-color:#fff;
  	padding-top:0.4rem;
  	border-bottom:2px solid #d5d5d5;
  	color:#737373;
  }
	.secNavs{
		@extend %m0a,%bz;
		width:rem2px(680);
		height:rem2px(130);
    padding-top:rem2px(30);
		line-height:1.4843rem;
		border-bottom:1px solid #d5d5d5;
		vertical-align: middle;
    @extend %font16;
		>p{
      @extend %fl;
		}
		p:nth-child(1){
		  @extend %posr;
		  width:rem2px(45);
      height:rem2px(45);
      border-radius:100%;
      top:0.36rem;
      margin-left:rem2px(10);
		}
		p:nth-child(2){
      margin-left:rem2px(30);
      @extend %font25;
		}
		p:nth-child(4){
		  @extend %fr,%font16,%abso,%textAli_center;
      color:#d5d5d5;
      width:7rem;
      left:6rem;
		}
		p:nth-child(3){
		  @extend %fr,%font25,%posr;
      width:rem2px(88);
			height:rem2px(40);
			border:1px solid #d5d5d5;
			border-radius:rem2px(5);
			top:0.38rem;
			line-height:rem2px(40);
      margin-right:rem2px(50);
		}
		svg{
		  @extend %posr;
			width:rem2px(20);
			height:rem2px(25);
			color:#fff;
			top:-0.15rem;
		}
	}
	.secNav{
		li:nth-child(1){
			p:nth-child(1){
				background-color:#b0b3fe;
			}
		}
		li:nth-child(2){
			p:nth-child(1){
				background-color:#60d3ff;
			}
		}
		li:nth-child(3){
			p:nth-child(1){
				background-color:#e4adff;
			}
		}

		li:nth-child(4){
			p:nth-child(1){
				background-color:#ecb4b4;
			}
		}

		li:nth-child(5){
			p:nth-child(1){
				background-color:#fb9696;
			}
		}
		li:nth-child(6){
			p:nth-child(1){
				background-color:#56c560;
			}
		}
	}
</style>
