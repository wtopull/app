<template src="../templates/home/index.html">
</template>
<style src="../assets/c8css/index.css">

</style>

<style lang="scss">
.one_r .g_con {
  width: 100%;
  position: relative;
  overflow: hidden;
  min-height: 400px;
}

.qiehuan {
  position: absolute;
  top: 0;
  left: 0;
  height: 410px;
  width: 100%;
  & .el-scrollbar__wrap {
    height: 410px;
  }
}
.p_n {
  width: 70px;
  text-align: center;
  line-height: 30px;
  padding: 10px 0;
  color: #cbcbcb;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -25px;
}

.g_con .qiehuan {
  .cqssc {
    background-position: -198px -58px;
  }
  .sd11x5 {
    background-position: -133px -192px;
  }
  .sh11x5 {
    background-position: -133px -188px;
  }
  .plsw {
    background-position: -133px -320px;
  }
  .bjpk10 {
    background-position: 0 -382px;
  }
  .txffc {
    background-position: -463px -252px;
  }
}
</style>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { delayAjax } from '~/plugins/ajax'
import initLikes from '~/util/initLikes'
import { initLottoPlays } from '~/util/lotto/transform-plays'
import { DeviceType } from '~/plugins/UA'
import News from '~/components/News'

const isServer = process.server
const noop = () => {}
const getOpenList = async context =>
  (await context.$axios.$post(
    'lottery-issue/get-lottery-info-opened'
  )).data.issues.map(_ => ({ ..._.content }))

export default {
  name: 'home',
  fetch({ store, app, redirect, from }) {
    if (isServer)
      //from.name === 'login',it fix login page f5 refresh redirect '/home'
      return from && from.name === 'login'
        ? redirect('/login')
        : Promise.resolve()
    return store.dispatch('getNews')
    // return initLikes(store,app,redirect)
  },
  async asyncData({ app, store }) {
    if (isServer) return { openList: [] }
    return {
      openList: await getOpenList(app).catch(noop)
    }
  },
  data() {
    return {
      advertisements: [],
      swiperOption: {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        simulateTouch: false,
        autoplay: 6000,
        loop: true,
        speed: 1400,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'
      }
    }
  },
  created() {
    if (this.$store.state.version) {
      this.getAd()
      this.$store.dispatch('get3rdGames')
      initLottoPlays(this.$store, 'cqssc', this)
    } else {
      this.authResolve()
    }
  },
  components: {
    News
  },
  methods: {
    async authResolve() {
      this.$store
        .dispatch('lotto/getTypes')
        .then(() => initLottoPlays(this.$store, 'cqssc', this))
      //   // initLikes(this.$store,this)
      delayAjax(this.$axios, this.$store, () => {
        this.$store.dispatch('getNews')
        this.$store.dispatch('get3rdGames')
        getOpenList(this).then(data => (this.openList = data))
      })

      this.getAd()
    },
    getAd() {
      this.$axiosPlus(
        'advertisement/get',
        { type: 1, device_type: DeviceType },
        ({ advertisements }) => {
          this.advertisements = advertisements.map(_ => ({ ..._.content }))

          this.jQueryRun()
        }
      )
    },
    // revertLikes() {
    //   this.$store.commit('play-likes/setPre', this.ensureLikes)
    //   this.$store.commit('play-likes/setActive', 'revert')
    // }
    jQueryRun() {
      if (process.server) return
      const $ = require('jquery')
      if (!this.jQueryRunEnd) {
        // $(".nav_menu,.nav_list").niceScroll({
        // 	cursorcolor: "#444F69",
        // 	mousescrollstep: 40,
        // 	scrollspeed: 100,
        // 	autohidemode: "hidden",
        // 	cursorborder: "0px solid #fff",
        // });
        $('.user_icon a').click(function() {
          $('.n_bg').hide()
        })
        $('.nav a').mouseover(function() {
          $('.n_bg').show()
          $('.n_bg')
            .stop()
            .animate({ left: $(this).position().left + 5 }, '3000')
        })
        $('.nav a').mouseout(function() {
          $('.n_bg')
            .stop()
            .animate({ left: $('.nav a.active').position().left + 5 }, '3000')
        })
        // $('.nav a').click(function(){
        // 	$(this).addClass('active').siblings().removeClass('active');
        // });
        $('.logo_b1').animate({ width: '285px' }, 2000)
        $('.logo_b2').animate({ width: '287px' }, 1800)
        $('.logo_b3').animate({ width: '310px' }, 1500)

        // $('.nav_list li a').bind('click', function(){console.log(123)})

        setTimeout(function() {
          $('#top .logo img').fadeIn(300)
        }, 2000)
        $('.an_in li a').click(function() {
          $(this)
            .addClass('active')
            .siblings()
            .removeClass('active')
          $('.an-nav').removeClass('mob')
        })
        var clickm = function() {
          $('.an_in li')
            .eq($(this).index())
            .show()
            .siblings()
            .hide()
          $('.an-nav').addClass('mob')
          $('body').addClass('menu_active')
          if (document.body.clientWidth < 1200) {
            $('.mo_men').show()
          }
        }
        var Chuangkou = function() {
          $('body').addClass('menu_active')
          $('.nav_menu li').bind('click', clickm)
        }
        if (document.body.clientWidth < 1300) {
          Chuangkou()
        }
        // if(document.body.clientWidth<768){
        //     $('.lottery_games,.an_in a').attr('target','_blank');
        // };
        $('.mo_men').click(function() {
          $('body').removeClass('menu_active')
          $(this).hide()
          $('.an-nav').removeClass('mob')
        })
        $('.mobliem').click(function() {
          $('#top .nav')
            .stop()
            .slideToggle()
          $('.mobliem').toggleClass('activetm')
          $('#top .nav a').click(function() {
            $('#top .nav ').hide()
            $('.mobliem').removeClass('activetm')
          })
        })
        $(window).resize(function() {
          if (document.body.clientWidth < 1300) {
            Chuangkou()
          } else if ($('body').hasClass('menu_active')) {
            $('body').removeClass('menu_active')
          }
        })
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
  mounted() {}
}
</script>
