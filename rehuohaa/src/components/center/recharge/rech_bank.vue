<template>
<div class="bank">
  <div style="height:9.16rem;" class="rewrap">
    <div style="height:2.8rem;" class="title">
      <p class="rehead"><span>★</span>选择充值</p>
      <v-touch :class="{'rechoiceh':ctoggle}" @tap="toggle" class="rechoice">
        <div class="bankpay_icon"></div>银联
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
	export default{
		data(){
				return{
					ctoggle:true,
					picked:"one",
					Remark:null,
					user_Remark:null
				}
	  },
		mounted:function(){
			this.getMatch();
		},
		methods:{
			toggle(){
				this.ctoggle=!this.ctoggle
			},
			getMatch(){
				const mark=Math.ceil(Math.random()*100000);
				this.Remark=mark;
			},
      transform(){
				if(this.$store.state.center.chargeMoney==''){
					this.$store.commit("centerTip",4);
				}else if(this.user_Remark==this.Remark&&this.$store.state.center.chargeMoney!==''){
					 this.$store.commit("transformPay",{type:3,mark:this.Remark});
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
    @import '../../../assets/css/main.scss';
	.bankpay_icon{
		background:url(../../../assets/bankforbank.png) no-repeat;
		background-size:contain;
		width:0.75rem;
		height:0.5rem;
		display: inline-block;
		position:relative;
		top:0.18rem;
		right:0.1rem;
	}
	.bankpay{
		margin-left:0.46rem;
		margin-top:0.46rem;
		input{
		   width:0.28rem;
		   height:0.28rem;
		}
		.info{
		  margin-top:0.39rem;
          @extend %font16;
          span{
          	  display: inline-block;
          	  width:0.25rem;
          	  height:0.25rem;
          	  color:#fff;
          	  text-align:center;
          	  border-radius: 100%;
          	  background-color:#238cbb;
          	  margin-right:0.156rem;
          }
		}

	}
	.bankchoices {
		margin-top:0.42rem;
		margin-bottom:0.3rem;
		margin-left:0.45rem;
		width:4.5rem;
		height:0.7rem;
		padding-left:0.3rem;
		border:1px solid #000;
		color:#898989;
	}
	.input_l{
	  float:left
	}
	.tip_r{
		float:right;
		margin-right:rem2px(30);
	}
</style>
