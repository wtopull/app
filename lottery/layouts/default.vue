<template src="../templates/default.html">
</template>

<style lang="scss" src="../assets/scss/default.scss">

</style>
<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import logout from '~/util/logout'
import BarTimer from '~/components/BarTimer'
import BackTop from '~/components/BackTop'
import Sidebar from '~/components/sidebar'
export default {
  data() {
    return {
      // avatarImgSrc: null,
      gy: [
        {
          name: '关于我们'
        },
        {
          name: '联系我们'
        },
        {
          name: '合作伙伴'
        },
        {
          name: '存款帮助'
        },
        {
          name: '取款帮助'
        },
        {
          name: '常见问题'
        },
        {
          name: '责任博彩'
        }
      ]
    }
  },
  components: {
    BarTimer,
    BackTop,
    Sidebar,
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
    async initData() {
      await this.getAvatar()
      //manual catch
      if(!this.avatar) return
      //fix f5 refresh,getAvatar success but vuex getters avatar can't reactive HTMLImageElement src
      // this.avatarImgSrc = this.avatar
      this.getSysConfig()
      this.$children[0].interval()
    },
    logout() {
      logout(this)
    },
    pushLotto(lottoName) {
      this.$lottoNavDropdown.visible = false
      this.$router.push(`/lottery/${lottoName}`)
    },
    ...mapActions({
      getLottoTypes: 'lotto/getTypes'
    }),
    ...mapActions(['getAvatar', 'get3rdGames', 'getSysConfig'])
  },
  computed: {
    ...mapGetters({
      lottoTypes: 'lotto/types',
      bal: 'pay/bal'
    }),
    ...mapGetters(['username', 'news', 'isAgent'])
  },
  mounted() {
    this.$lottoNavDropdown = this.$refs['lotto-nav-dropdown']
  }
}
</script>
