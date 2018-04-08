<template>
<div class="promotion_c">
  <div class="title">活动详情</div>
  <table border="0">
    <thead>
      <tr>
        <th>奖品类型</th>
        <th>奖品详情</th>
        <th>指定游戏</th>
        <th>活动日期</th>
        <th>任务1</th>
        <th>任务2</th>
        <th>奖品名额（名）</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>iPhoneX 256GB</td>
        <td>iPhoneX 256G深空灰色移动联通 电信4G 价值9688</td>
        <td>12月20-12月26日</td>
        <td>真人电子</td>
        <td>每天投注200万</td>
        <td>活动期间累计投注2000万</td>
        <td>不限</td>
      </tr>
      <tr>
        <td>小米曲面电视65英寸</td>
        <td>小米（MI）小米电视3S 65英寸 分体曲面 4K超高清超薄金属机身64位智能网络液晶平板电视（含小米电视主机L65M4-AQ京东商城价值9299</td>
        <td>12月20-12月26日</td>
        <td>真人电子</td>
        <td>每天投注150万</td>
        <td>活动期间累计投注1500万</td>
        <td>不限</td>
      </tr>
      <tr>
        <td>西门子洗烘一体变频 滚筒洗衣机</td>
        <td>西门子(SIEMENS) XQG80-WD12G4681W 8公斤 洗烘一体变频 滚筒洗衣机 LED显示屏 静音 热风除菌（银色）京东商城价值5598查询</td>
        <td>12月20-12月26日</td>
        <td>真人电子</td>
        <td>每天投注100万</td>
        <td>活动期间累计投注700万</td>
        <td>不限</td>
      </tr>
      <tr>
        <td>小米净化器</td>
        <td>小米（MI）小米净化器2智能家用卧室空气净化器除甲醛雾霾PM2.5京东商城价值699.00</td>
        <td>12月20-12月26日</td>
        <td>真人电子</td>
        <td>每天投注30万</td>
        <td>活动期间累计投注250万</td>
        <td>不限</td>
      </tr>
    </tbody>
  </table>
  <div class="title">申请方式</div>
  <div class="content">
    <div>联系热火官方微信：rh100kf23 或者经理微信：rd100yy</div>
    <div>活动结束三天之内（北京时间12月30日中午之前）没有联系申请的会员或者申请未成功的会员将视为放弃~时间有限，赶紧完成任务申请哦！</div>
  </div>
  <div class="title">活动细则</div>
  <div class="content">
    <div>1.热火会员于美东时间12月20日至12月26日，投注额度达到相应的要求即获得相应礼品，达到任务一或任务二要求，即可获得圣诞豪礼活动礼品。</div>
    <div>2.每位会员、每一姓名、相同IP仅限申请一次，如注册多个账户或使用诈骗性账户的会员将无权参与活动。</div>
    <div>3.桌面游戏和多旋转游戏不作为有效投注，任何优惠产生的有效投注不予计算。</div>
    <div>4.会员账号信息必须真实有效，这里将会致电核实，电话无法接通者将不予办理奖品。</div>
    <div>5.参与该优惠，即表示您同意《优惠规则与条款》。</div>
  </div>
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
      padding:0 rem2px(5);
  	}
  	tr:nth-child(2n){
  		background: #eee;
  	}
  }
}
</style>
