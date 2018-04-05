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
  &:first-child{
    .lotto-ssc{
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
    .lotto-kl8{
      background-position: -266px -2px;
    }
  }
}
</style>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import logout from '~/util/logout'
export default {
  data() {
    return {
      navIndex: 0,
      refreshing: false
    }
  },
  methods: {
    // addLike(e,lotto){
    //   this.$styleLog(e.target.checked,'checked target')
    //   this.$store.dispatch('play-likes/update',{lotto})
    // },
    logout() {
      logout(this)
    },
    getBal() {
      this.refreshing = true
      setTimeout(() => {
        this.$store.dispatch('pay/getBal', () => (this.refreshing = false))
      }, 800)
    }
  },
  computed: {
    ...mapGetters({
      lottoTypes: 'lotto/types',
      bal: 'pay/bal',
      unreadCount: 'admin/unreadCount'
    }),
    ...mapGetters(['username', 'news'])
  }
}
</script>