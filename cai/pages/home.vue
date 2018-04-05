<template src="../templates/home/index.html">
</template>
<style lang="scss">
    .one_r .g_con ul{float:left}
    .one_r .g_con{width: 100%;position: relative;overflow: hidden;    min-height: 400px;}
    .one_r .g_con ul {float: left;width: 33.33%;}
    .qiehuan{position: absolute;top:0;left: 0}
    .p_n {width: 70px;text-align: center;line-height: 30px;padding: 10px 0;color: #CBCBCB;position: absolute;bottom: 0;left: 50%;margin-left: -25px;}
    .p_n .c_prev{color: #6FADE1;}

    .g_con .qiehuan{
        .cqssc{
                background-position: -198px -58px;
        }
        .sd11x5{
background-position: -133px -192px;
        }
        .sh11x5{
background-position: -133px -188px;
        }
        .plsw{
            background-position: -133px -320px;
        }
        .bjpk10{
background-position: 0 -382px;
        }
        .txffc{
background-position: -463px -252px;
        }
    }
</style>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import initLikes from '~/util/initLikes'
import {DeviceType} from '~/plugins/UA'
import '~/assets/c8css/index.css'
import News from '~/components/News'
export default {
  name: 'home',
  fetch({ store, app,redirect }) {
    // if(!store.state.access_token) return
    
    return store.dispatch('getNews')
    // return initLikes(store,app,redirect)
  },
  async asyncData({app,store}){
    // if(!store.state.access_token) return {openList:[]}
    return {
      openList:(await app.$axios.$post('lottery-issue/get-lottery-info-opened')).data.issues.map(_ => ({..._.content}))
    }
  },
  data() {
    return {
      advertisements:[],
      swiperOption: {
            pagination : '.swiper-pagination',
            paginationClickable :true,
            simulateTouch:false,
            autoplay: 6000,
            loop : true,
            speed:1400,
            nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev'

        }
    }
  },
  created(){
    // if(this.access_token){
      this.getAd()
    //   this.$store.dispatch('admin/getBox')
    // }
    this.$store.dispatch('admin/getBox')
  },
  components:{
      News
  },
  methods: {
    // authResolve(){
    //   this.$store.dispatch('lotto/getTypes')
    //   // initLikes(this.$store,this)
    //   this.getAd()
    // },
    getAd(){
      this.$axiosPlus('advertisement/get',{type:1,device_type:DeviceType},({advertisements}) => {
        this.advertisements = advertisements.map(_ => ({..._.content}))
        
        this.jQueryRun()
      })
    },
    // revertLikes() {
    //   this.$store.commit('play-likes/setPre', this.ensureLikes)
    //   this.$store.commit('play-likes/setActive', 'revert')
    // }
    jQueryRun(){
        if(process.server) return
        const $ = require('jquery')
        if(!this.jQueryRunEnd) {

        // $(".nav_menu,.nav_list").niceScroll({
		// 	cursorcolor: "#444F69",
		// 	mousescrollstep: 40,
		// 	scrollspeed: 100,
		// 	autohidemode: "hidden",
		// 	cursorborder: "0px solid #fff",
		// });
        $('.user_icon a').click(function () {
            $('.n_bg').hide();
        });
        $('.nav a').mouseover(function(){
            $('.n_bg').show();
            $('.n_bg').stop().animate({'left':$(this).position().left+5},'3000')
        });
        $('.nav a').mouseout(function(){
            $('.n_bg').stop().animate({'left':$('.nav a.active').position().left+5},'3000');
        });
		// $('.nav a').click(function(){
		// 	$(this).addClass('active').siblings().removeClass('active');
		// });
		$('.logo_b1').animate({'width':'285px'},2000);
		$('.logo_b2').animate({'width':'287px'},1800);
		$('.logo_b3').animate({'width':'310px'},1500);
		setTimeout(function(){
			$('#top .logo img').fadeIn(300);
		},2000);
		$('.an_in li a').click(function(){
			$(this).addClass('active').siblings().removeClass('active')
		});
        var clickm = function () {
            $('.an_in li').eq($(this).index()).show().siblings().hide();
            $('.an-nav').addClass('mob');
            $('body').addClass('menu_active');
            if(document.body.clientWidth<1200){
                $('.mo_men').show();
            }
        }
        var Chuangkou = function () {
            $('body').addClass('menu_active');
            $('.nav_menu li').bind("click",clickm);
        };
        if(document.body.clientWidth<1300){
            Chuangkou();
        };
        // if(document.body.clientWidth<768){
        //     $('.lottery_games,.an_in a').attr('target','_blank');
        // };
        $('.mo_men').click(function () {
            $('body').removeClass('menu_active');
            $(this).hide();
            $('.an-nav').removeClass('mob');
        });
        $(".mobliem").click(function(){
            $('#top .nav').stop().slideToggle();
            $('.mobliem').toggleClass('activetm');
            $('#top .nav a').click(function(){
                $('#top .nav ').hide();
                $('.mobliem').removeClass('activetm');
            });
        });
        $(window).resize(function () {
            if(document.body.clientWidth<1300){
                Chuangkou();
            }else if($('body').hasClass('menu_active')){
                $('body').removeClass('menu_active');
            }
        });
        }
        this.jQueryRunEnd = true
    }
  },
  computed: {
    ...mapGetters({
      likes: 'play-likes/preLikes',
      ensureLikes: 'play-likes/likes'
    })
  },
  mounted(){
    function QieHuan(){
        $('.qiehuan').css({'width':$('.one_r .g_con').width()*$('.one_r .g_con ul').length})
        var i = 0;
        var w = $('.one_r .g_con').width();
        var s = $('.one_r .g_con ul').length;
        $('.c_prev').click(function(){
            i=i-w;
            if(i<-2*w || i==-2*w){
                i=-2*w;
                $(this).css({'color':'#CBCBCB'});
            }else{
                $(this).css({'color':'#6FADE1'});
                $('.c_next').css({'color':'#6FADE1'});
            }
            $('.qiehuan').animate({'left':i+'px'},500)
        })
        $('.c_next').click(function(){
            i=i+w;
            if(i>w || i==w){
                i=0;
                $(this).css({'color':'#CBCBCB'});
            }else{
                $(this).css({'color':'#6FADE1'});
                $('.c_prev').css({'color':'#6FADE1'});
            }
            $('.qiehuan').animate({'left':i+'px'},500)
        })
};
QieHuan();
    // $(".notice_list").niceScroll({
    //         cursorcolor: "#F7F7F7",
    //         mousescrollstep: 40,
    //         scrollspeed: 100,
    //         autohidemode: "hidden",
    //         cursorborder: "0px solid #fff",
    //     });


  }

}
</script>
