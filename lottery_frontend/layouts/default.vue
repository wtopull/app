<template src="../templates/default.html">
</template>


<style lang="scss">
/* nuxt app start */
#cssload-loader {
  display: none;
}
body {
  background: #ecf1f5;
}
.bal-refresh {
  display: inline-block;
  vertical-align: middle;
  animation: rotating 0.5s linear infinite;
}

.nav_menu li a i {
  width: 55px;
  height: 48px;
  display: block;
  margin: 0 auto;
  /* -107px 11x5 */
  background: url('~/assets/img/index/index_icon.png') no-repeat;
}

.nav_menu li {
  &:first-child {
    .lotto-ssc {
      background-position: -3px -2px;
    }
  }
  a {
    .lotto-ssc {
      background-position: -55px -2px;
    }
    .lotto-11x5 {
      background-position: -107px -2px;
    }
    .lotto-pk10 {
      background-position: -319px -2px;
    }
    .lotto-kl8 {
      background-position: -266px -2px;
    }
    .lotto-k3{
      background-position: -160px -2px;
    }
  }
}
</style>
<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import logout from '~/util/logout'
export default {
  data() {
    return {
      navIndex: 0,
      refreshing: false,
      avatarImgSrc: null
    }
  },

  async created() {
    if (this.$store.state.version) {
      this.initData()
    } else {
      await this.getLottoTypes()
      this.initData()
    }
  },
  methods: {
    // addLike(e,lotto){
    //   this.$styleLog(e.target.checked,'checked target')
    //   this.$store.dispatch('play-likes/update',{lotto})
    // },
    async initData() {
      await this.getAvatar()
      //fix f5 refresh,getAvatar success but vuex getters avatar can't reactive HTMLImageElement src
      this.avatarImgSrc = this.avatar
      this.getBox()
      this.getSysConfig()
    },
    logout() {
      logout(this)
    },
    getBal() {
      this.refreshing = true
      setTimeout(() => {
        this.$store.dispatch('pay/getBal', () => (this.refreshing = false))
      }, 800)
    },
    ...mapActions({
      getLottoTypes: 'lotto/getTypes',
      getBox: 'admin/getBox'
    }),
    ...mapActions(['getAvatar', 'get3rdGames', 'getSysConfig'])
  },
  computed: {
    ...mapGetters({
      lottoTypes: 'lotto/types',
      bal: 'pay/bal',
      unreadCount: 'admin/unreadCount'
    }),
    ...mapGetters(['username', 'avatar', 'news', 'isAgent'])
  }
}
</script>
