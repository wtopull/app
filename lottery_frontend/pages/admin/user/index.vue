<template src="../../../templates/admin/user-center.html">
</template>

<style lang="scss">
.userinfo .header {
  position: relative;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  > img {
    width: 100%;
    border-radius: 50%;
  }
  .avatar-upload {
    position: absolute;
    display: none;
    background: rgba(0, 0, 0, 0.75);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border-radius: 50%;
    cursor: pointer;
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
    i {
      color: white;
      font-size: 4em;
      &:focus {
        outline: none;
      }
    }
  }
  &:hover,
  &:focus {
    .avatar-upload {
      display: block;
    }
  }
}
</style>


<script>
import Vue from 'vue'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
// import {format} from 'date-fns'
import { format, subDays } from 'date-fns'
import { Popover } from 'element-ui'
import { delayAjax } from '~/plugins/ajax'
import { time } from '~/plugins/filters'
import cache from '~/util/cache' 
// import locale from 'date-fns/esm/locale/zh_cn'
//ES6 modules Can't resolve 'date-fns/esm/locale'
const locale = require('date-fns/locale/zh_cn')
import Bank from '~/components/admin/user/Bank'
import LoginPw from '~/components/admin/user/LoginPw'
import PayPw from '~/components/admin/user/PayPw'
// import AvatarUpload from '~/components/admin/user/AvatarUpload'
import Avatar from '~/components/admin/user/Avatar'

import { AsyncMultComp } from '~/plugins/common'
Vue.use(Popover)
const AsyncComp = AsyncMultComp('admin/user')

export default {
  fetch({ store,query }) {
    //a new session has user.token but server response errorCode 102901
    if (process.server || cache.isRequestBankCards) return Promise.resolve()
    if (query.noBankCards) return Promise.resolve()
    cache.isRequestBankCards = true
    return store.dispatch('pay/getBankCards')
  },
  data() {
    return {
      meridiem: format(new Date(), 'aa', { locale }),
      visible: false,
      view: '',
      dialogTitle: '',
      popoverVisible: false,
      newNickName: '',
      avatarImgSrc: null
    }
  },
  asyncData({ store }) {
    if (process.server) return { avatarImgSrc: null }
    return {
      avatarImgSrc: store.state.user.avatar
    }
  },
  components: {
    Bank,
    LoginPw,
    PayPw,
    // AvatarUpload,
    Avatar: AsyncComp('Avatar'),
    Protection: AsyncComp('Protection'),
    GoogleAuth: AsyncComp('GoogleAuth')
  },
  created() {
    //prevent ssr request again
    if (!cache.isRequestBankCards) {
      delayAjax(this.$axios, this.$store, () => {
        this.$store.dispatch('pay/getBankCards')
        this.avatarImgSrc = this.avatar
      })
    }
  },
  methods: {
    delBankCard(index) {
      this.$axiosPlus(
        'user-bank-card/delete',
        { id: this.bankCards[index].id },
        () => {
          this.setCard(this.bankCards.filter((v, k) => k !== index))
          this.$message({
            message: '銀行卡刪除成功！',
            type: 'success'
          })
        }
      )
    },
    modifyPw(type, name) {
      this.dialogTitle = `${
        name === '资金' && !this.hasPayPw ? '设置' : '修改'
      }${name}密码`
      if (this.view === `${type}Pw`) {
        this.resetForm()
        return (this.visible = true)
      }
      this.view = `${type}Pw`
      this.visible = true
    },
    activeModal(view) {
      this.dialogTitle = view === 'Bank' ? '添加银行卡' : ''
      if (this.view === view) {
        this.resetForm()
        return (this.visible = true)
      }
      this.view = view
      this.visible = true
    },
    handleShowPopper() {
      this.newNickName = this.nickName
      this.$nextTick(this.$refs.popover.$children[0].focus)
    },
    setNickName() {
      const { newNickName } = this
      if (this.nickName === newNickName || !newNickName)
        return (this.popoverVisible = false)
      this.$axiosPlus('user/set-nick-name', { nick_name: newNickName }, _ => {
        this.setUser({ ...this.userModel, nick_name: newNickName })
        this.popoverVisible = false
      })
    },
    enabled(time) {
      return +new Date(time) < Date.now()
    },
    resetForm() {
      const modifier = this.$refs.modifier
      modifier.$form.resetFields()
      modifier.reset && modifier.reset()
    },
    ...mapMutations({
      setCard: 'pay/setBankCards',
      setUser: 'setUser'
    })
  },
  computed: {
    frozen_balance() {
      return this.$store.state.pay.bal.frozen_balance
    },
    loginTime() {
      return time(subDays(new Date(this.expires), 1))
    },
    ...mapState({
      userModel: 'user'
    }),
    nickName() {
      return this.userModel.nick_name
    },
    ...mapGetters({
      bal: 'pay/bal',
      totalBal: 'pay/totalBal',
      bankCards: 'pay/bankCards'
    }),
    ...mapGetters([
      'username',
      'ip',
      'expires',
      'hasPayPw',
      'hasProtection',
      'GA',
      'avatar'
    ])
  },
  mounted() {
    const { query } = this.$route
    query.paypw && !this.hasPayPw && this.modifyPw('pay', '资金')
    query.noBankCards &&
      this.$confirm('未绑定银行卡，是否添加?', '提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setTimeout(() => this.activeModal('Bank'),300)
      }).catch(() => {
        this.$router.push('/admin/user')
      })
  }
}
</script>
