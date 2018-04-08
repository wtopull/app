<template>
<div id="index" class="index">
  <v-touch tag="div" @tap="chri_promo" class="banner">
    <div class="bann_src1"></div>
  </v-touch>
  <div class="marqu">
    <div class="marr">
      <marquee scrollamount="4">{{$store.state.getNotice}}</marquee>
    </div>
  </div>
  <div class="ishow">
    <div class="navIndex">
      <div class="top">
        <v-touch tag="div" @tap="swiperTo(1,1)"></v-touch>
        <v-touch tag="div" @tap="swiperTo(1,3)"></v-touch>
      </div>
      <div class="bottom">
        <v-touch tag="div" @tap="swiperTo(1,2)"></v-touch>
        <v-touch tag="div" @tap="swiperTo(1,0)"></v-touch>
      </div>
    </div>
  </div>
</div>
</template>
<script>
	export default{
       methods:{
          chri_promo(){
           this.$store.commit("swiperTopage",2);
           this.$store.state.proToggle[0].toggle=true;
            setTimeout(()=>{
              window.scrollTo(0,350);
            },100)
          },
          swiperTo(mainValue,gameValue){
            if(mainValue==1){
              this.$store.commit("showToCenter",{main:mainValue,game:gameValue});
            }else{
              this.$store.commit("swiperTopage",mainValue);
            }
          },
          getNotice(){
            this.axios({
              method:'get',
              url:this.$store.state.url+'dist/php/ac.php?action=getnotice',
              headers:this.$store.state.register.headers,
              params:{
                note_type:1
              }
            }).then((response)=>{
              for(let i=0;i<(response.data.info).length;i++){
               this.$store.state.getNotice+=`${response.data.info[i].note_content}`;
              }
            })
          }
       },
       mounted(){
          setTimeout(()=>{this.getNotice();},200)
       }
	}
</script>
<style lang="scss">
  @import "../assets/css/main.scss";
  .tipHead_1{
    @extend %m0a;
    @include Bg('showTip1.png',2.85rem,0.296875rem);
    background-size:2.85rem,0.296875rem;
  }
  .tipHead{
    @extend %m0a;
    @include Bg('showTip2.png',3.5rem,0.3125rem);
    background-size:3.5rem 0.3125rem;
  }
  .logo{
  	 @extend %fl,%bsc;
     @include Bg("logo.png",rem2px(90),rem2px(65))
     margin-left:rem2px(30);
  }
  .marqu{
  	 @include Bg('marBg.jpg',100%,rem2px(47));
     @extend %font16,%bz,%abso,%m0a,%flex_center;
     justify-content:flex-end;
     width:rem2px(750);
     height:rem2px(43);
  	 background-size:100% rem2px(43);
  	 color:#fff;
  	 .marr{
       @extend %fl,%textAli_center;
       width:75%;
       display:flex;
	    >marquee{
	      color:#fff;
	    	width:rem2px(500);
        height:rem2px(43);
        line-height:rem2px(43);
        vertical-align:middle;
        span{
          margin-right:rem2px(200);
        };
	    }
  	 }
  }
  .ishow{
    @include Bg('index_bg.jpg',100%,100%);
  	@extend %bz;
    background-size:100% 100%;
  }
  .navIndex{
    .top{
      display:flex;
      justify-content:center;
      padding-top:rem2px(160);
      @for $i from 1 through 2{
        >div:nth-child(#{$i}){
          @include Bg('nav_t'+$i+".jpg",50%,rem2px(320));
          @extend %bsc;
        }
      }
    }
    .bottom{
	  	display:flex;
	  	justify-content:center;
		@for $i from 1 through 2{
		  	>div:nth-child(#{$i}){
		        @include Bg('nav_b'+$i+'.jpg',50%,rem2px(320));
		    	@extend %bsc;
		  	}
	    }
    }
  }
  @for $i from  1 through 3{
    .bann_src#{$i}{
      @include Bg('banner-'+$i+'.jpg',100%,rem2px(260));
      background-size:100% rem2px(260);
    }
  }
</style>
