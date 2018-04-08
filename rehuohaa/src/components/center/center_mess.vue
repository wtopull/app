<template>
<div class="message">
  <div class="ctitle"></div>
  <icon name="bullhorn">信息通知</icon>
  <div class="icontent">
    <div class="nu">
      <div class="time">2017-03-29</div>
      <div>★☆请注意☆★因第三方支付网络不稳定，建议会员多加利用银行卡入款，还可享有2％回馈。热火感谢您的支持与爱护!! 官网右侧热火QQ联系:2133778450（请备注您的会员帐号）</div>
    </div>
    <div class="nu">
      <div class="time">2017-03-29</div>
      <div>【重要公告】若无法使用在线客服服务 请会员朋友多加利用本公司QQ线上客服或微信客服！不便之处敬请见谅！</div>
    </div>
    <div class="nu">
      <div class="time">2017-03-29</div>
      <div>★OG视讯★平台例行维护：于北京时间每周一 06：00～08：00结束。 为您带来的不便，敬请见谅！</div>
    </div>
  </div>
</div>
</template>

<style lang="scss">
     @import "../../assets/css/main.scss";
	.message{
    @extend %m0a;
    width:rem2px(750);
		border-bottom:1px solid $bc;
		background-color:#fff;
	}
	.ctitle{
		//@extend %font25;
    @extend %textAli_left;
		width:rem2px(710);
		padding-left:rem2px(40);
		svg{
			width:0.468rem;
			height:0.468rem;
			color:#858585;
			position:relative;
			top:0.105rem;
			margin-right: 0.156rem;
		}
	}
	.icontent{
		    color:#878787;
		    @extend %bz;
		    padding:rem2px(20) rem2px(25) 0;
        border-radius:0.1rem;
        width:rem2px(640);
        height:rem2px(540);
        background-color:#f8fdff;
        border:1px solid $bc;
        overflow:scroll;
        margin:{left:rem2px(30);bottom:rem2px(60);}
      	.nu{
      	  @extend %font16,%textAli_left;
      		margin-bottom:0.2rem;
      	}
  }
</style>
