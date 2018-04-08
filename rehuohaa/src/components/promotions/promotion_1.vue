<template>
<div class="promotion_c">
  <div class="title">活动详情</div>
  <table border="0">
    <thead>
      <tr>
        <th>VIP等级</th>
        <th>晋级条件</th>
        <th>保级条件</th>
        <th>晋级红包</th>
        <th>专属服务</th>
        <th>每月赠送彩金</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td rowspan="2">VIP1</td>
        <td>1.月积累存款≥100,000;</td>
        <td rowspan="2">月积累存款≥50,000</td>
        <td rowspan="2">188</td>
        <td rowspan="2">在线客服</td>
        <td rowspan="2">88</td>
      </tr>
      <tr>
        <td>2.月积累有效投注≥800,000;</td>
      </tr>
      <tr>
        <td rowspan="2">VIP2</td>
        <td>1、月积累存款≥500,000;</td>
        <td rowspan="2">月积累存款≥300,000</td>
        <td rowspan="2">388</td>
        <td rowspan="2">客服专员</td>
        <td rowspan="2">158</td>
      </tr>
      <tr>
        <td>2、月积累有效投注≥3000,000;</td>
      </tr>
      <tr>
        <td rowspan="2">VIP3</td>
        <td>1、月积累存款≥1,000,000;</td>
        <td rowspan="2">月积累存款≥600,000</td>
        <td rowspan="2">588</td>
        <td rowspan="2">VIP 客服</td>
        <td rowspan="2">388</td>
      </tr>
      <tr>
        <td>2、月积累有效投注≥8,000,000;</td>
      </tr>
      <tr>
        <td rowspan="2">金卡VIP</td>
        <td>1、月积累存款≥3,000,000;</td>
        <td rowspan="2">月积累存款≥1800,000</td>
        <td rowspan="2">888</td>
        <td rowspan="2">VIP 经理</td>
        <td rowspan="2">588</td>
      </tr>
      <tr>
        <td>2、月积累有效投注≥10,000,000;</td>
      </tr>
      <tr>
        <td rowspan="2">白金VIP</td>
        <td>1、月积累存款≥8,000,000;</td>
        <td rowspan="2">月积累存款≥4,800,000</td>
        <td rowspan="2">2888</td>
        <td rowspan="2">VIP 经理</td>
        <td rowspan="2">1888</td>
      </tr>
      <tr>
        <td>2、月积累有效投注≥50,000,000;</td>
      </tr>
      <tr>
        <td rowspan="2">钻石VIP</td>
        <td>1、月积累存款≥15,000,000;</td>
        <td rowspan="2">月积累存款≥9,000,000</td>
        <td rowspan="2">5888</td>
        <td rowspan="2">VIP 经理</td>
        <td rowspan="2">5888</td>
      </tr>
      <tr>
        <td>2、月积累有效投注≥100,000,000;</td>
      </tr>
      <tr>
        <td>保级条件</td>
        <td colspan="5">连续3个月未达到活跃彩金领取条件则降一级</td>
      </tr>
    </tbody>
  </table>
  <div class="contentx">
    <div>2017年07月01号起存款月累计10万或有效投注80万起即可申请升级VIP 注: 会员通过任意方式存款后存款额达到升级标准即可向相关QQ申请升级VIP申请时间为每日11点-19点.</div>
  </div>
  <div class="title">活动细则</div>
  <div class="content">
    <div>1、如何查询VIP等级?</div>
    <div>我们会在每月8号18:00前后发送站内信通知您,您也可以咨询24小时在线客服帮您查询</div>
    <div>2、如何申请时时返水</div>
    <div>会员VIP等级晋升为金卡VIP的时候即可申请系统时时返水，如会员VIP等级为金卡VIP或以上级别且当天产生10万有效投注额，您可以随时向在线客服或您的私人经理申请时时返水优惠，无需等待第二天系统派送。</div>
    <div>3、关于24小时服务</div>
    <div>我们为您提供7X24小时不间断的客服服务、在线存取款以及游戏投注如需帮助请随时咨询24小时在线客服。</div>
  </div>
  <info></info>
</div>
</template>
<script>
  import info from './info/info.vue';
   export default{
    components:{
       info
    }
  }
</script>
<style lang="scss">
@import "../../assets/css/main.scss";
.contentx,.content{
	@extend %font8;
}
.promotion_c{
  text-align:left;
  background:#fff;
  padding:rem2px(30);
  .title{
    @extend %font16;
  	margin-bottom:rem2px(10);
  	color:#b2996c;
  	text-align:left;
    height:rem2px(20);
  }
  .content{
    div{
     width: 100%;
     display:block;
     margin-bottom:rem2px(6);
    }
  }
  table{
  	width:100%;
    margin:{
    	top:rem2px(25);
    	bottom:rem2px(25);
    }
  }
  thead{
  	tr{
  		width:100%;
  		background:#b59c70;
  		color:#fff;
  		 th{
  		  @extend %font16;
  		 	text-align:center;
  		 	line-height:0.55rem;
  		 	border:1px #fff solid;
  		 	font-weight: 200;
  		 }
  	}
  }
  tbody{
  	td{
      @extend %font16;
      text-align: center;
      line-height: 0.45rem;
      border:1px solid #eee;
  	}
  	tr:nth-child(2n){
  		background: #eee;
  	}
  }
}
</style>
