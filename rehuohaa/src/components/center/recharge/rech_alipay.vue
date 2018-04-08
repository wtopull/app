<template>
<div class="alipay">
  <div class="rewrap">
    <div class="title">
      <p class="rehead"><span>★</span>选择充值</p>
      <v-touch :class="{'rechoiceh':ctoggle}" @tap="toggle" class="rechoice">
        <div class="ralipay"></div>支付宝
      </v-touch>
    </div>
    <div class="input">
      <p class="rehead"><span>★</span>输入金额</p>
      <div class="input_l">
        <input placeholder="请输入" v-model="$store.state.center.chargeMoney" type="text" class="t_input"/>
        <input style="display:block;margin-top:0.25rem" type="text" v-model="user_Remark" placeholder="请输入支付备注" class="t_input"/>
        <div class="input_tip">本次支付备注请用  :<span>{{Remark}}</span></div>
      </div>
      <div class="tip_r">
        <div class="mesl mesr"><span>单笔限额</span><span>银行卡 : 100到50000元<br> 微信支付宝 : 10到5000元</span></div>
        <div class="mesl"><span>每日限额</span><span>无上限</span></div>
      </div>
    </div>
  </div>
  <v-touch tag="button" @tap="transform" class="t_btn">充值</v-touch>
</div>
</template>
<script>
    let data ={
    	ctoggle:true,
      Remark:null,
      user_Remark:null
    }
	export default{
		data(){
			return data
		},
    mounted:function(){
      this.getMatch();
    },
		methods:{
			toggle(){
				this.ctoggle=!this.ctoggle;
			},
      getMatch(){
        const mark=Math.floor(Math.random()*100000);
        this.Remark=mark;
      },
      transform(){
        if(this.$store.state.center.chargeMoney==''){
          this.$store.commit("centerTip",4);
        }else if(this.user_Remark==this.Remark&&this.$store.state.center.chargeMoney!==''){
          this.$store.commit("transformPay",{type:2,mark:this.Remark});
          this.user_Remark='';
          this.getMatch();
        }else if(this.user_Remark==null){
            this.$store.commit("centerTip","请填写备注");
        }else if(this.user_Remark!==this.Remark&&this.user_Remark!==null){
           this.$store.commit("centerTip","支付备注填写错误");
        }

      }
		}
	}
</script>

<style lang="scss">
.ralipay{
      background:url(../../../assets/ailpay.png) no-repeat;
      background-size:contain;
      width:rem2px(30);
      height:rem2px(30);
      display: inline-block;
      position:relative;
      top:0.14rem;
      right:0.1rem;
  }
</style>
