<template>
  <div class="lottery">
    <div class="lottery_top">
      <div class="t_l fl_l">
        <div class="c_pic fl_l" :class="lottoName"></div>
        <div class="c_ld fl_l">
          <a :href="trendHref" target="_blank">
            <i class="icon iconfont">&#xe6a1;</i>走势图　</a>
          <nuxt-link :to="`/${betType[0][1]}/${lottoName}`">
            <i class="icon iconfont">&#xe66f;</i>{{betType[1][1]}}玩法</nuxt-link>
        </div>
      </div>
      <issue ref="issue" />
    </div>
    <div class="lottery_con reposal-wrap">
      <options :max="getMaxBonus(playMaxGroup)" ref="options" />
      <transition name="el-fade-in-linear" mode="out-in">
        <component v-bind={playList,playMaxGroup,checkOrder,lottoType} :is="lottoType.replace('11x5','x11to5')" ref="type" />
      </transition>
      <!-- avoid reposal change page. Flash of Unstyled Content -->
      <div class="text-center" v-show="tabMounted">
        <el-autocomplete @input.native="_validate($hotNumInput)" @keyup.enter.native="getOrder" v-model="hotNum" v-show="shortcut" :fetch-suggestions="querySearch" :debounce="0" ref="hot-num-input" />
        <el-button type="warning" @click="getOrder(false)" size="mini">一键投注</el-button>
        <el-button type="primary" @click="getOrder" size="mini">确定</el-button>
        <el-button @click="reset" size="mini">清空</el-button>
      </div>
      <order ref="order" />
      <component :is="view" v-bind={itemLeave,removeItem} ref="hot-nums" />
      <!--element v-loading may be Flash of Unstyled Content  -->
      <div class="el-loading-mask" v-show="!renderer[lottoType]">
        <div class="el-loading-spinner">
          <svg viewBox="25 25 50 50" class="circular">
            <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
          </svg>
          <p class="el-loading-text">{{loading.text}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import '../../assets/scss/lotto';
@import '../../assets/scss/reposal/index';
</style>
<script>
import { mapGetters, mapMutations } from 'vuex'
import anime from 'animejs'
import { initReposalPlays } from '~/util/lotto/transform-plays'
import lotto from '~/util/mixins/lotto'
import methods from '~/util/lotto/reposal-methods'
import Options from '~/components/reposal/Options'
import Order from '~/components/reposal/Order'
import { AsyncMultComp } from '~/plugins/common'
const AsyncComp = AsyncMultComp('reposal')
export default {
  name: 'reposal',
  asyncData({ app, store, params, redirect, error }) {
    if (store.state.lotto.types.length == 0) {
      return {
        playList: []
      }
    }
    //can't full hide buttons
    store.commit('reposal/tabMount', false)
    return initReposalPlays(store, params.name, app, error)
  },
  data() {
    return {
      view: '',
      hotNum: ''
    }
  },
  mixins: [lotto, methods],
  components: {
    Options,
    Order,
    HotNums: AsyncComp('HotNums'),
    ssc: AsyncComp('ssc/index'),
    x11to5: AsyncComp('11x5/index'),
    pk10: AsyncComp('pk10/index'),
    kl8: AsyncComp('kl8/index'),
    k3: AsyncComp('k3/index')
  },
  watch: {
    shortcut(val) {
      if (!val) {
        this.reset()
      }
    }
  },
  methods: {
    async authResolve() {
      //the first await to avoid repeat 'static-data/lottery-version'
      await this.$store.dispatch('lotto/getTypes')
      this.getIssue()
      this.getIssueList()
      this.getBal()
      Object.assign(
        this,
        await initReposalPlays(this.$store, this.lottoName, this)
      )
    },
    openHotNums() {
      if (this.view == 'HotNums') {
        return (this.$refs['hot-nums'].visible = true)
      }
      this.view = 'HotNums'
    },
    removeItem(index, list, least = false, context) {
      context.leaveable = true
      if (least && context[list].length == least) {
        return
      }
      context[list].splice(index, 1)
    },
    itemLeave(el, complete, context) {
      //prevent orderList change when not removeItem animate
      if (!context.leaveable) return complete() //parm can't named 'done',issue ? https://cn.vuejs.org/v2/guide/transitions.html#JavaScript-%E9%92%A9%E5%AD%90 vue 2.4
      anime({
        targets: el,
        opacity: 0,
        translateX: -20,
        duration: 300,
        easing: 'linear',
        complete
      })
    },
    reset() {
      Object.assign(this.playView, this.playView.initData())
    },
    getViewOrder(valid = false) {
      const { playView } = this
      playView.orderType
        ? playView.orderType.forEach(
            (v, k) => (valid ? !playView[v] : true) && playView.getOrder(k)
          )
        : (valid ? !playView[playView.orderStr] : true) &&
          playView.getOrder(valid)
    },
    getView() {
      return this.playView
    },
    getOrder(check) {
      if (this.shortcut && !this.hotNum) {
        return this.checkOrder('请填写快捷金额！')
      }
      this.getViewOrder()
      this.playView.order() &&
        (check === false ? this.bet(true) : (this.$order.visible = true))
    },
    orderFormat(buyValue, endIndex = -1) {
      let value = buyValue.slice(endIndex)
      let result = value
      switch (value) {
        case '大':
        case '单':
        case '龙':
        case '豹子':
          result = 0
          break
        case '小':
        case '双':
        case '虎':
        case '顺子':
          result = 1
          break
        case '和':
        case '对子':
          result = 2
          break
      }
      return result
    },
    getBet() {
      const { point, value } = this.$refs.options
      return {
        user_bet_self_return_point: point,
        user_bet_prize_group: value,
        lottery_info_identifier: this.lottoName,
        issue: this.issue,
        multiple: 1,
        bet_count: 1,
        money_unit: 1
      }
    },
    bet(oneKey) {
      const { $order, orderFormat, shortcut, ip, hotNum, playView } = this
      if (!this.isInvoking && this.checkBal($order.sum)) {
        const isOneKey = oneKey === true
        if (!($order.sum > 0) && !isOneKey)
          return this.checkOrder('請填寫金額！')
        // this._getOrder('valid')
        // this.playView.submit(this.bet)
        this.isInvoking = true
        this.$axiosPlus(
          'user-bet-lottery/create',
          {
            ip,
            bets: (isOneKey ? this.order : $order.order)
              .map(_ => {
                //order empty amount,typeof _[2] === ''
                if (!shortcut && !+_[2]) return false
                return {
                  //components/reposal/All5in1.vue:41,all5in1 only 1 identifier
                  lottery_method_identifier: _[5] || playView.identifier,
                  buy_number: orderFormat(_[0]),
                  one_bet_amount: shortcut ? hotNum : _[2],
                  ...this.getBet()
                }
              })
              .filter(_ => _)
          },
          data => {
            this.getBal()
            this.$message({
              message: '投注成功！',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.reset()
                this.$order.visible = false
                this.isInvoking = false
              }
            })
          }
        )
      }
    },
    ...mapMutations({
      toggleView: 'reposal/toggleView',
      setOrder: 'reposal/setOrder'
    })
  },
  computed: {
    ...mapGetters({
      hotNums: 'reposal/nums',
      tabName: 'reposal/tabName',
      shortcut: 'reposal/shortcut',
      tabMounted: 'reposal/tabMounted',
      renderer: 'lotto/renderer',
      order: 'reposal/order'
    }),
    playMaxGroup() {
      return Math.min(
        ...[].concat(
          ...this.playList.map(_ => _.bets.map(_ => _.max_bet_prize_group))
        )
      )
    },
    reposalType() {
      return this.$refs.type
    },
    playView() {
      let tabs = this.reposalType.$children[0]
      let view = tabs.$refs[this.tabName].$children[0]
      return view.deep ? view.$children[0] : view
    }
  },
  mounted() {
    this.$hotNumInput = this.$refs['hot-num-input']
  },
  destroyed() {
    // this.$store.commit('reposal/toggleView', '一般')
    // this.$store.commit('reposal/setOrder', [])
    this.toggleView('一般')
    this.setOrder([])
  }
}
</script>
