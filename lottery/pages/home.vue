<template src="../templates/home/index.html"></template>

<style lang="scss" src="../assets/scss/home/index.scss"></style>


<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { delayAjax } from '~/plugins/ajax'
import { initLottoPlays } from '~/util/lotto/transform-plays'
import { DeviceType } from '~/plugins/UA'
import Vue from 'vue'
import Marquee3k from '~/plugins/marquee3k'
import { Collapse, CollapseItem, Carousel, CarouselItem } from 'element-ui'
Vue.use(Collapse)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(CollapseItem)

const isServer = process.server
const noop = () => {}
const getOpenList = async context => 
  (await context.$axios.$post(
    'lottery-issue/get-lottery-info-opened'
  )).data.issues.map(_ => ({ ..._.content }))
const getNewsdetail = async (context, id) =>
  (await context.$axios.$post('news-info/get-detail', { id })).data.content

export default {
  name: 'home',
  fetch({ store, app, redirect, from }) {
    if (!store.state.user.token)
      //from.name === 'login',it fix login page f5 refresh redirect '/home'
      return from && from.name === 'login'
        ? redirect('/login')
        : Promise.resolve()
    return Promise.resolve()
  },
  async asyncData({ store, app, redirect, from }) {
    if (!store.state.user.token) return { openList: [], notice: '' }
    await store.dispatch('getNews')
    const notice = await getNewsdetail(app, store.state.news[0].id)
    return {
      openList: await getOpenList(app).catch(noop),
      notice
    }
  },
  data() {
    return {
    	bgopacitys:0,
      advertisements: []
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
  methods: {
  	opacity(index){
  		this.bgopacitys = index
  	},
    async authResolve() {
      this.$store
        .dispatch('lotto/getTypes')
        .then(() => initLottoPlays(this.$store, 'cqssc', this))
      delayAjax(this.$axios, this.$store, () => {
        this.$store
          .dispatch('getNews')
          .then(_ =>
            getNewsdetail(this, this.news[0].id)
          )
          .then(
              content => {
                this.notice = content
                //require nextTick,otherwise request headers **Provisional headers are shown**
                this.$nextTick(this.merquee)
              }
            )
        this.$store.dispatch('get3rdGames')
        getOpenList(this).then(data => (this.openList = data))
        this.getAd()
      })
    },
    getAd() {
      this.$axiosPlus(
        'advertisement/get',
        {
          type: 1,
          device_type: DeviceType
        },
        ({ advertisements }) => {
          this.advertisements = advertisements.map(_ => ({
            ..._.content
            
          }))
          this.merquee()
        }
      )
    },
    merquee(){
      if (this.notice) Marquee3k.init()
    }
  },
  computed: {
    ...mapGetters({
      lottoTypes: 'lotto/types',
      news:'news'
    })
  },
  destroyed() {
    window.removeEventListener('resize',Marquee3k.resize,250)
  }
}
</script>
