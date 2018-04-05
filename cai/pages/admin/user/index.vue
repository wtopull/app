<template>
    <div class="x_con-li">
        <div class="userinfo">
            <div class="header"><img data-command="XiuGaiTouXIang" src="~/assets/img/avatar/header.jpg" alt=""></div>
            <div class="user_i">
                <span>{{meridiem}}好！{{username}}</span>
                <a href="javascript:void(0)" data-command="XiuGaiNiCheng">修改昵称</a>
            </div>
            <div class="balance">
                <div class="ye">
                    <div class="zy">账户总额(￥)</div>
                    <div class="nu">{{totalBal | round3}}</div>
                </div>
                <a href="">充值</a>
            </div>
            <div class="balance ktbalance">
                <div class="ye">
                    <div class="zy">可提余额(￥)</div>
                    <div class="nu">{{bal}}</div>
                </div>
                <a href="">提款</a>
            </div>
            <div class="balance">
                <div class="ye">
                    <div class="zy">冻结金额(￥)</div>
                    <div class="nu">{{frozen_balance | round3}}</div>
                </div>
                <a href="">提款</a>
            </div>
            <div class="mc_z">
                <a href="">转账</a>
            </div>
            <div class="next_login">
                <div>上次登录时间：
                    <span>{{loginTime}}</span>
                </div>
                <div>上次登录IP：
                    <span>{{ip}}</span>
                </div>
                <div>不是本人？
                    <a href="javascript:void(0)" data-command="XiuGaiMiMa" @click="modifyPw('login','登錄')">修改密码</a>
                </div>
            </div>
        </div>
        <div class="my_band_card">
            <div class="b_head">我的银行卡</div>
            <div class="b_list">
                <ul>
                    <li v-for="(card,index) in bankCards" :key="card.id">
                        <div class="card-id">
                            <div :class="['fl_l','bankicon',card.bank_identifier.toLowerCase()]"></div>
                            <div class="bank_yuansu fl_l">
                                <div class="bank_name">
                                    <span>{{card.branch_name}}</span>
                                    <span>{{card.bank_name}} </span>
                                    <span>{{card.account_name}}</span>
                                </div>
                                <div class="bank_number">{{card.account_no}}</div>
                            </div>
                            <div class="moren fl_r">
                                <el-button type="info" plain icon="el-icon-delete" @click="delBankCard(index)" v-if="isLocked(card.end_locked_at)"></el-button>
                                <div v-else>
                                    已锁定
                                    <div>锁定时间截至到{{card.end_locked_at}}</div>
                                </div>
                            </div>
                        </div>

                    </li>
                    <li>
                        <a class="addcard" @click="addCard" data-command="TianJiaYinHangKa">
                            <i class="icon iconfont">&#xe661;</i>
                            添加银行卡
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="change_p">
            <div class="cp_list">
                <ul>
                    <li>
                        <div class="c_l-left fl_l">
                            <i class="icon iconfont">&#xe662;</i>
                        </div>
                        <div class="c_l-right fl_l">
                            <div class="c-title">登录密码</div>
                            <div class="c-tip">建议您使用字母和数字的组合、混合大小写、在组合中加入下划线等符号。</div>
                            <div class="c-d">
                                <a @click="modifyPw('login','登錄')" data-command="XiuGaiMiMa">修改</a>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="c_l-left fl_l">
                            <i class="icon iconfont">&#xe679;</i>
                        </div>
                        <div class="c_l-right fl_l">
                            <div class="c-title">{{hasPayPw ? '已' : '未'}}設置资金密码</div>
                            <div class="c-tip">在进行银行卡绑定，转账等资金操作时需要进行资金密码确认，以提高您的资金安全性。</div>
                            <div class="c-d">
                                <a @click="modifyPw('pay','资金')" data-command="ZiJinMiMa">修改</a>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="c_l-left fl_l">
                            <i class="icon iconfont">&#xe689;</i>
                        </div>
                        <div class="c_l-right fl_l">
                            <div class="c-title">密保设置</div>
                            <div class="c-tip">设置密保后可以通过密保修改资金密码等。</div>
                            <div class="c-d">
                                <a href="javascript:void(0)" data-command="BangDingMiBao">设置</a>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="c_l-left fl_l">
                            <i class="icon iconfont">&#xe674;</i>
                        </div>
                        <div class="c_l-right fl_l">
                            <div class="c-title">绑定取款人</div>
                            <div class="c-tip">绑定取款人后您可以绑定银行卡，并且只能绑定与取款人相同的银行卡资料。</div>
                            <div class="c-d">
                                <a href="javascript:void(0)" data-command="BangDingQuKuanRen">绑定</a>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="c_l-left fl_l">
                            <i class="icon iconfont">&#xe67b;</i>
                        </div>
                        <div class="c_l-right fl_l">
                            <div class="c-title">{{bankCards.length > 0 ? '已' : '未'}}绑定银行卡</div>
                            <div class="c-tip">绑定银行卡就能存取款，以及平台内部之间转账等功能。</div>
                            <div class="c-d">
                                <a @click="addCard" data-command="TianJiaYinHangKa">绑定</a>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="c_l-left fl_l">
                            <i class="icon iconfont">&#xe66e;</i>
                        </div>
                        <div class="c_l-right fl_l">
                            <div class="c-title">绑定谷歌</div>
                            <div class="c-tip">绑定谷歌验证账户更安全
                                <span style="color:red">(注:未绑定谷歌忘记密码需通过联系客服找回密码。)</span>
                            </div>
                            <div class="c-d">
                                <a href="javascript:void(0)">绑定</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <el-dialog :title="dialogTitle" :visible.sync="visible" width="30%">
            <component :is="view" :visible.sync="visible" />
        </el-dialog>

    </div>
</template>
<style>

</style>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
// import {format} from 'date-fns'
import { format, subDays } from 'date-fns'
import { delayAjax } from '~/plugins/ajax'
import { time } from '~/plugins/filters'
// import locale from 'date-fns/esm/locale/zh_cn'
//ES6 modules Can't resolve 'date-fns/esm/locale'
const locale = require('date-fns/locale/zh_cn')
import Bank from '~/components/admin/user/Bank'
import LoginPw from '~/components/admin/user/LoginPw'
import PayPw from '~/components/admin/user/PayPw'

export default {
  fetch({ store }) {
    //a new session has user.token but server response errorCode 102901 
    if (!store.state.user.token) return Promise.resolve()
    return store.dispatch('pay/getBankCards')
  },
  data() {
    return {
      meridiem: format(new Date(), 'aa', { locale }),
      visible: false,
      view: '',
      dialogTitle: ''
    }
  },
  components: {
    Bank,
    LoginPw,
    PayPw
  },
  created() {
    if (!this.bankCards.length) {
      delayAjax(this.$axios, this.$store, () =>
        this.$store.dispatch('pay/getBankCards')
      )
    }
  },
  methods: {
    delBankCard(index) {
      this.$axiosPlus(
        'user-bank-card/delete',
        { id: this.bankCards[index].id },
        () => {
          this.setCard(this.bankCards.filter((v,k) => k !== index))
          this.$message({
            message: '銀行卡刪除成功！',
            type: 'success'
          })
        }
      )
    },
    addCard() {
      this.view = 'bank'
      this.dialogTitle = '添加銀行卡'
      this.visible = true
    },
    modifyPw(type, name) {
      this.view = `${type}Pw`
      this.dialogTitle = `${name === '资金' && !this.hasPayPw ? '设置' : '修改'}${name}密码`
      this.visible = true
    },
    isLocked(time){
      return  +new Date(time) >= Date.now()
    },
    ...mapMutations({
        setCard:'pay/setBankCards'
    })
  },
  computed: {
    frozen_balance() {
      return this.$store.state.pay.bal.frozen_balance
    },
    loginTime() {
      return time(subDays(new Date(this.expires), 1))
    },
    ...mapGetters({
      bal: 'pay/bal',
      totalBal:'pay/totalBal',
      bankCards: 'pay/bankCards'
    }),
    ...mapGetters(['username', 'ip', 'expires', 'hasPayPw'])
  },
  mounted(){
      this.$route.query.paypw  && 
      this.modifyPw('pay','资金')
  }
}
</script>
