<template>
<div id="app"><img src="./assets/screenTip.png" v-show="$store.state.register.screenTip" class="screenTip"/>
  <div v-show="$store.state.register.regHide" class="slidermain">
    <div v-show="$store.state.headToggle" class="head">
      <div class="logo"></div>
      <div v-show="$store.state.register.loginbe" class="reg">
        <v-touch @tap="$store.commit('loginShow')" class="headbtn"><span>登录</span></v-touch>
        <v-touch @tap="$store.commit('register')" class="headbtn"><span>注册</span></v-touch>
      </div>
      <div v-show="$store.state.register.loginaf" class="regAfter"><span>您好 , {{this.$store.state.register.centerusername}}</span>
        <v-touch @tap="$store.commit(&quot;loginout&quot;)" tag="span" class="headbtn"><span>退出</span></v-touch>
      </div>
    </div>
    <swiper :options="swiperOption" ref="mySwiper" class="noSwiper">
      <swiper-slide>
        <indexOne></indexOne>
      </swiper-slide>
      <swiper-slide>
        <indexSecond></indexSecond>
      </swiper-slide>
      <swiper-slide>
        <indexThree></indexThree>
      </swiper-slide>
      <swiper-slide>
        <indexFour></indexFour>
      </swiper-slide>
      <swiper-slide>
        <indexFive></indexFive>
      </swiper-slide>
    </swiper>
    <div v-show="$store.state.navToggle" class="mainNavs">
      <v-touch v-for="(nav,$index) in $store.state.navs" :class="{'navH':nav.toggle}" @tap="iswiper(nav,$index)" class="mainNav">
        <p></p>
      </v-touch>
    </div>
  </div>
  <register v-if="$store.state.register.regShow"></register>
  <login v-if="$store.state.register.loginShow"></login><a href="https://chat6.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=80188&amp;configID=53873&amp;jid=4710603337&amp;s=1" target="_self" v-if="$store.state.register.contact_toggle" class="contact"></a>
  <div v-show="$store.state.paynowToggle" class="paynow">
    <div><a target="_self" :href="&quot;http://fastpay.hdc07.com/?site_id=3018&amp;isMobile=1&amp;username=&quot;+$store.state.register.Globalusername+&quot;&amp;domain=&quot;+$store.state.url"></a>
      <div class="paynow_bo"></div>
      <div class="paynow_bo paynow_bo2"></div>
    </div>
  </div>
  <transition enter-active-class="bounceIn">
    <div v-show="$store.state.layer.main_layer" class="main_layer">
      <layer></layer>
    </div>
  </transition>
</div>
</template>
<script type="text/javascript">
import indexOne from './components/indexPageOne.vue'
import indexSecond from './components/indexPagesecond.vue'
import indexThree from './components/indexPageThree.vue'
import indexFour from './components/indexPageFour.vue'
import indexFive from './components/indexPageFive.vue'
import register from './components/index_reg.vue'
import login from './components/index_login.vue'
import layer from './components/public/main_layer.vue'
export default {
  data(){
    return{
      swiperOption:{
          noSwiping:true,
          noSwipingClass:'noSwiper',
      }
    }
  },
  computed:{
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods:{
    iswiper(nav,index){
      this.$store.commit("swiperTo",{nav,index});
      this.$store.commit('swiperTopage',index);
    },
    cookie(){
      if(this.$cookie.get('username')){
        this.$store.state.register.loginbe=false;
        this.$store.state.register.loginaf=false;
        this.$store.state.register.Globalusername=this.$cookie.get('username');
        this.$store.state.register.Globalpassword=this.$cookie.get("password");
        this.$store.state.register.oid=this.$cookie.get("oid");
        this.$store.state.register.ulevel=this.$cookie.get('ulevel');
        this.$store.state.register.realname=this.$cookie.get('realname');
        this.$store.state.register.user_type=this.$cookie.get('user_type');
        this.$store.commit('bindToggle');
        this.$store.commit('chauser');
     }
    }
  },
  mounted:function(){
     this.$nextTick(function(){
         if(process.env.NODE_ENV!=='development'){
           this.$store.state.url=window.location.href;
         }
         let  value= this.swiper;
         this.$store.commit('swiper',value);
         this.cookie();
     });
    let scroll =(value)=>{
      this.$store.state.register.screenTip=value;
      this.$store.state.register.regHide=!value;
      this.$store.state.paynowToggle=!value;
      this.$store.state.register.contact_toggle=!value;
      this.$store.state.register.regShow=false;
      this.$store.state.register.loginShow=false;
    }
    let reside =function* (value){
      while(true){
        if(value=='ver'){
          yield scroll(true);
          yield scroll(false);
        }else{
          yield scroll(false);
          yield scroll(true);
        }
      }
    }
      const scWidth=window.screen.availWidth;
      const scHeight=window.screen.availHeight;
      let verStart=reside('ver');
      let lanStart=reside('lan');
      if(scWidth>scHeight){
        scroll(true);
        window.addEventListener("orientationchange",()=> {
             lanStart.next();
         }, false);
      }else{
        window.addEventListener("orientationchange",()=> {
             verStart.next();
         }, false);
      }
  },
  components:{
    indexOne,indexThree,indexSecond,indexFour,register,login,layer,indexFive
  }
}
</script>
<style lang="scss">
@import "assets/css/main.scss";
@import "assets/css/reset.scss";
.screenTip{
  display:block;
  width:rem2px(500);
  height:rem2px(250);
  margin-top:2.4rem;
  @extend %m0a;
  border-radius:0.4rem;
  box-shadow:0.1rem 0.15rem 0.35rem rgba(0,0,0,0.25);
  align-self:center;
}
.main_layer{
  @extend %font25;
}
.link{
  display:flex;
  @extend %posr;
  @for $i from 1 through 3{
    >a:nth-child(#{$i}){
      display:block;
      @include iBg('link'+$i+".png",rem2px(41),rem2px(34));
      @extend %bsc;
      margin-left:rem2px(20);
    }
    @if($i==2){
      >a:nth-child(2){
        width:rem2px(33);
        height:rem2px(33);
      }
    }@else if($i==3){
      >a:nth-child(3){
        width:rem2px(32);
        height:rem2px(34);
      }
    }
  }
  .link_c{
    @extend %font24;
    top:rem2px(55);
    z-index:999;
    span{
      @extend %abso;
      top:rem2px(50);
      display:block;
      border-radius:rem2px(6);
      background-color:#fff;
      padding:rem2px(8);
      text-align:left;
      >img{
        width:rem2px(120);
        height:rem2px(120);
      }
    }
  }
}
.contact{
  display:block;
  width:rem2px(50);
  height:rem2px(162);
  background:url(./assets/contract.jpg) no-repeat 0 0 /100%;
  position:fixed;
  border-radius:rem2px(10) rem2px(0) rem2px(0) rem2px(10);
  right:rem2px(-5);
  top:rem2px(150);
  z-index: 999;
}
.swiper-pagination-bullet{
  width: 0.15rem;
  height:0.15rem;
}
.head{
  @extend %posr;
	width:100%;
  height:rem2px(90);
  display:flex;
  justify-content:space-between;
  align-items:center;
  z-index:10000;
  top:0;
  background:#222;
}
.reg{
   display:flex;
   margin-right:rem2px(25);
   >div:first-child{
    margin-right:rem2px(20);
   }
}
.headbtn{
  color:#fff;
  @include iBg('headbtn_bg.png',rem2px(80),rem2px(32)) ;
  background-size: contain;
  color:$color_1;
  line-height:rem2px(30);
  border-radius: rem2px(5);
  display:inline-block;
  @extend %font24;
}
 .slidermain{
   position:relative;
 }

.mainNavs{
  display:flex;
  justify-content:center;
  align-items:flex-end;
  position:fixed;
  z-index:9999;
  bottom:0;
  height:2.09067rem;
  width:100%;
  background-color:#222;
  border-top:2px solid #464646;
}
.mainNav{
  height:2.09067rem;
  width:25%;
}
.mainNav p{
   @extend %m0a;
  background-size:contain !important;
}

.navH{
   box-shadow:rem2px(0) rem2px(0) rem2px(35)  rgba(0,0,0,0.3);
}
@for $i from 1 through 4{
  .mainNavs>div.mainNav:nth-child(#{$i})>p{
    @include iBg("nav"+$i+'.jpg',1,rem2px(100));
    @extend %bsc;
  }
}
@for $i from 1 through 4{
  .mainNavs>div.navH:nth-child(#{$i})>p{
    @include iBg("navbg"+$i+'.jpg',1,rem2px(100));
    @extend %bsc;
  }
}


//站内转账 站内信息
.ctitle{
    @extend %bz;
    @extend %font28;
    @extend %m0a;
    text-align:left;
    width:10rem;
    margin-top:0.46rem;
    color:#858585;
    svg{
      @extend %posr;
      width:0.468rem;
      height:0.468rem;
      top:0.105rem;
      margin-right: 0.156rem;
    }
}
.regAfter{
  display:flex;
  height:0.468rem;
  align-items:flex-end;
  padding:{
    top:0.25rem;
    right:0.6rem;
  }
  >span:first-child{
    color:#f7b747;
    @extend %font24;
  }
  @extend %fr;
  >span:first-child{
    @extend %scale0.9;
  }
  >span:last-child{
    margin-left:0.35rem;
   }
}
//个人中心输入框
.t_input{
  @extend %bz;
  @extend %font24;
  width:rem2px(360);
  height:rem2px(45);
  margin-top:rem2px(42);
  padding-left:0.23rem;
  border:1px solid #b3b3b3;
  margin-left:0.45rem;
}
.t_btn{
  @extend  %font28;
  width:rem2px(580);
  height:rem2px(70);
  outline:none;
  border:none;
  background-color:#f2b345;
  color:#000;
  border-radius:0.2rem;
  box-shadow:0.0rem 0.15rem 0.3rem rgba(0,0,0,0.3);
  letter-spacing: 0.1rem;
}
// 充值开始
  .wechat,.alipay{
    height:12.5rem;
  }
   .rewrap{
     @extend %textAli_left;
      height:rem2px(431);
      margin-top:rem2px(60);
      margin-bottom: 0.8rem;
      background-color:#fff;
      border:{
        top:1px solid #dbdbdb;
        bottom:1px solid #dbdbdb;
      }
      .title{
        margin-top:rem2px(30);
        height:rem2px(125);
        border-bottom:1px solid $bc;
        padding-left:0.39rem;
      }
      .rehead{
        color:#898989;
        @extend %font25;
        span:first-child{
          @extend %posr,%font16,%textAli_center;
          width:rem2px(24);
          line-height:rem2px(24);
          background-color:#f7b747;
          display: inline-block;
          border-radius:100%;
          color:#fff;
          top:-0.05rem;
          margin-right:rem2px(10);
        }
        .tip{
          @extend %font24;
          color:#d0d0d0;
          margin-left:0.3rem;
        }
      }
      .message{
        @extend %bz;
        padding-left:0.39rem;
        padding-top:0.625rem;
        height:3.2rem;
        border:{
          top:1px solid $bc;
          bottom:1px solid $bc;
        }
      .content{
          margin-top:0.2rem;
          line-height:0.5rem;
        }
      }
      .input{
        @extend %bz;
        padding-left:0.39rem;
        padding-top:0.39rem;
      }
      .input_tip{
        @extend %font16;
        margin-top:0.20rem;
        margin-left:0.45rem;
        color:#898989;
        span{
          @extend %font24;
          color:#ff0000;
        };
      }
      .mesl{
        @extend %font16;
        margin-top:0.125rem;
        display:flex;
        width:rem2px(300);
        height:rem2px(40);
        border:1px solid #e7e7e7;
         span{
           @extend %textAli_center;
           display:inline-block;
           line-height:0.5rem;
           color:#828282;
          }
          span:first-child{
            width:30%;
            height:100%;
            border-right:1px solid  #e7e7e7;
            @extend %scale0.8;
          }
          span:last-child{
            @extend %scale0.75;
            color:$color_1;
            width:50%;
            text-align:center;
          }
      }
      .mesr{
        height:rem2px(90);
        span:first-child{
          line-height:1.03rem;
        }
        span:last-child{
          @extend %scale0.75;
          line-height:rem2px(20);
          text-align:left;
          margin:{top:0.125rem;};
          padding-left:0.14rem;
        }
      }

   }
  .rechoice{
    @extend %font24;
    width:rem2px(160);
    line-height:rem2px(42);
    text-align:center;
    border:1px solid #5fb7e1;
    border-radius:0.04rem;
    margin:{
      top:rem2px(20);
      left:0.45rem;
    }
     svg{
       width:rem2px(30);
       height:rem2px(30);
       color:#00c800;
       position:relative;
       top:rem2px(9);
       right::0.08rem;
     }
   }
   .rechoiceh{
    background-color:#d6f1ff;
   }
   // 充值结束
   //注册和加载
   .Backindex{
      width:rem2px(240) !important;
      color:#f7b847;
      letter-spacing:0.06rem;
      display:flex;
      justify-content:space-between;
      -webkit-justify-content:space-between;
      @extend %font26;
      vertical-align:top;
      transform:scale(0.88);
      margin:0 auto;
     svg{
       vertical-align:bottom;
       width:rem2px(36);
       height:rem2px(36);
     }
   }
   //游戏中心和优惠中心
    .mtitle{
      @extend %font28;
       line-height:rem2px(90);
       height:rem2px(90);
       color:#f7b747;
       font-weight:500;
    }
    .backend{
      @extend %fl;
      @extend %abso;
      @extend %font25;
      width:2rem;
      top:0.03rem;
      color:#fff;
      svg{
        @extend %posr;
        margin-right:0.1rem;
        top:rem2px(8);
        width:rem2px(36);
        height:rem2px(36);
      }
    }
//promotion
.re_nav,.gameNav{
  height:rem2px(70);
  display:flex;
  justify-content:center;
  >div{
    width:rem2px(150);
    height:100%;
    line-height:rem2px(72);
    color:#4a3615;
    float:left;
    @extend %font26;
    font-weight:500;
  }
  >div:not(:first-child){
    margin-left:rem2px(35);
  }
}

.gameNavH{
  color:#c3ab6d !important;
}
.promoNav div{
	width:25%;
	float:left;
	font-size:rem2px(28);
	font-weight:bold;
	color:#939090;
}
.promoNav{
	width:100%;
	height:rem2px(122);
	line-height:rem2px(122);
}

.promoNav .promoNavH{
	color:#c3ab6d !important;
  background:#000;
}
.paynow{
  position:fixed;
  right:rem2px(30);
  bottom:rem2px(140);
  z-index:10;
  width:rem2px(80);
  height:rem2px(80);
  >div{
    position:absolute;
    width:1.3rem;
    height:1.3rem;
  }
 a{
  background:url(./assets/pay_bg.png) no-repeat 0 0 /100% 100%;
  position:relative;
   display: inline-block;
   width:rem2px(80);
   height:rem2px(80);
   z-index:10;
   color:#000;
 }
}
.paynow_bo{
    border-radius:50%;
    opacity:0;
    background-color:#f7b746;
    position:relative;
    top:rem2px(-82);
    left:rem2px(9);
    height: 100%;
    width: 100%;
    z-index:9;
    animation-duration: 2.9s;
    animation-iteration-count: inherit;
    animation-name:c;
    animation-iteration-count: infinite;
}
.paynow_bo2{
  top:rem2px(-142);
  left:rem2px(9);
  animation-delay:1s;
}
.loginlogo{
    @extend %bz;
    .content {
        @include iBg("logo.png",rem2px(121),rem2px(102));
        background-size: rem2px(121) rem2px(102);
        @extend %m0a;
    }
}
@keyframes c{
  0%{
    opacity:0;
    -webkit-transform:scale(.6);
    transform:scale(.6)
  }
  18%{
     opacity:.3;
     -webkit-transition-timing-function:linear;
     transition-timing-function:linear
  }
  50%{
    -webkit-transform:scale(0.5);
    transform:scale(0.5);
    -webkit-transition-timing-function:cubic-bezier(.1,.55,.95,.5);
    transition-timing-function:cubic-bezier(.1,.55,.95,.5);
  }
  55%{
    opacity:.5;
    -webkit-transform:scale(.9);transform:scale(.9);
    -webkit-transition-timing-function:linear;
    transition-timing-function:linear
  }
  80%{
    opacity:0.28;
    -webkit-transition-timing-function:ease-in;
    transition-timing-function:ease-in;
  }
  to{
    opacity:0.0;
    -webkit-transform:scale(2);
    transform:scale(2);
  }
}
</style>
