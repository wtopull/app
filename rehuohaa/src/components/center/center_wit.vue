<template>
<div class="withdraw">
  <div class="witbank"><span>{{$store.state.center.bank_name}}<span style="margin-left:0.5rem">{{$store.state.center.bank_account}}</span></span></div>
  <ul class="witcontent">
    <li>
      <p>开户地区 :</p>
      <p>{{$store.state.center.bank_address}}</p>
    </li>
    <li>
      <p>账户姓名 :</p>
      <p>{{$store.state.register.realname}}</p>
    </li>
    <li>
      <p>主账户 :</p>
      <p>{{$store.state.register.amountmoney}}</p>
    </li>
    <li>
      <p>提现金额 :</p>
      <p>
        <input v-model="$store.state.center.wit_money" placeholder="请输入" type="text" class="winput"/>
      </p>
    </li>
    <li style="height:0.7rem">
      <div class="wtip">我们接受的最小提现金额为100元。&nbsp;&nbsp;&nbsp;</div>
    </li>
    <li>
      <p>提现密码 :</p>
      <p>
        <input v-model="$store.state.center.wit_password" placeholder="请输入" type="password" class="winput"/>
      </p>
    </li>
    <li style="height:0.7rem">
      <div class="wtip">完成入款金额一倍的有效投注(领取优惠则依照优惠规则计算)&nbsp;&nbsp;&nbsp;</div>
    </li>
    <li class="wtip_2">
      <table border="0">
        <tr>
          <td rowspan="2" style="width:5%">存款时间</td>
          <td rowspan="2" style="width:4%">存款</td>
          <td rowspan="2" style="width:4%">优惠</td>
          <td rowspan="2" style="width:5%">有效投注</td>
          <td colspan="2" style="width:8%">常态投注要求</td>
          <td colspan="2" style="width:8%">优惠投注要求</td>
          <td rowspan="2" style="width:4%">需扣金额</td>
        </tr>
        <tr>
          <td>通过</td>
          <td>手续费</td>
          <td>通过</td>
          <td>扣除</td>
        </tr>
        <tr v-for="item in $store.state.center.sum_data.slice(0,2)">
          <td>{{item.start_time}}</td>
          <td>{{item.save_money}}</td>
          <td>{{item.promos_money}}</td>
          <td>{{item.bet_sum_money}}</td>
          <td>{{item.normal_is_ok}}</td>
          <td>{{item.normal_is_kouchu_money}}</td>
          <td>{{item.promotion_is_ok}}</td>
          <td>{{item.promotion_kouchu_money}}</td>
          <td>{{item.all_kouchu_free}}</td>
        </tr>
        <tr>
          <td colspan="5"></td>
          <td>{{$store.state.center.all_normal_free}}</td>
          <td></td>
          <td>{{$store.state.center.all_delete_poroms}}</td>
          <td>{{$store.state.center.all_free}}</td>
        </tr>
        <tr class="tip_wit">
          <td colspan="9" class="down_tip">
            <p>*出款金额限制：100 - 10000000</p>
            <p>*24小时内3次出款。不需扣行政手续费</p>
            <p>*出款总需扣除（存款有效投注审核手续费+优惠扣除+24小时超次数出款行政手续费）：3000</p>
            <p>*本次信息展现仅限最后两条，如有疑问请联系客服。</p>
          </td>
        </tr>
      </table>
    </li>
  </ul>
  <v-touch tag="button" @tap="wit_move()" class="t_btn">提现</v-touch>
</div>
</template>
<script>
	export default{
    mounted:function(){
      this.$store.commit("getEsWitFo");
    },
		methods:{
			wit_move(){
        if(this.$store.state.center.wit_money>=100){
           this.$store.commit("wit_move");
        }else{
          this.$store.commit("registerTip","最小提现金额为100元");
        }
			}
		}
	}
</script>
<style lang="scss">
   @import "../../assets/css/main.scss";
    .withdraw{
      @extend %m0a;
      width:rem2px(750);
    	padding-bottom:0.5rem;
      color:#4d4c4c;
    }
	.witbank{
		line-height:rem2px(100);
		text-align:left;
		background-color:#fff;
		padding-left:0.46rem;
		border-bottom:1px solid $bc;
		@extend %font32;
		font-weight:600;
		.selected{
			margin-right:0.26rem;
		   display: inline-block;
           @include cBg("bank.jpg",0.7rem,0.7rem);
           @extend %bsc;
           position:relative;
           top:0.1rem;
		}
	}
	.witcontent{
		background-color:#fff;
    	padding-left:0;
    	margin-bottom:rem2px(50);
		border:{
			top:1px solid $bc;
			bottom:1px solid $bc;
		}
		li:last-child{
			border:none;
		}
		li{
			float:none !important;
			@extend %font26;
			height:rem2px(90);
			border-bottom:1px solid $bc;
			p{
				padding-top:0.4rem;
			}
			p:first-child{
            @extend %fl;
            margin-left:0.46rem;
            font-weight:600;
			}
			p:last-child{
           @extend %fr;
           margin-right:0.625rem;
			}
		}
	}
	.wtip{
	  @extend %font16,%bz;
		height:rem2px(35) !important;
    line-height:rem2px(35)!important;
		text-align:right;
		color:#d0d0d0;
	}
	.wtip_2{
    padding: 0.2rem 0.1rem 0.1rem 0.1rem;
		height:100% !important;
    color:#d0d0d0;
		table{
			border-color:$bc;
			width:100%;
			td{
			  @extend %font16;
				text-align: center;
			}
		}
		.down_tip{
			padding-left:0.2rem;
			padding-top:0.1rem;
			padding-bottom:0.1rem;
      @extend %font16;
			p{
				text-align: left;
				float:none !important;
				margin:0 !important;
				padding:0 !important;
			}
		}
	}
	.winput{
	  @extend %font25;
	  height:rem2px(48);
    width:rem2px(380);
	  border:none;
	  text-align:right;
	  color:#d0d0d0;
	}
</style>
