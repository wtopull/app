<template>
<div class="record">
  <div class="rwrap">
    <div class="title">
      <icon name="credit-card-alt"></icon>{{$store.state.centerTitle}}
    </div>
    <ul class="recontent">
      <li v-if="$store.state.status" class="status">
        <p><span>{{$store.state.select_1}}</span>
          <select v-model="$store.state.selectData_1" @change="in_select2">
            <option v-for="select in $store.state.recordSelect_1" :value="select.value">{{select.text}}</option>
          </select>
        </p>
        <p v-show="$store.state.select2">{{$store.state.select_2}}
          <select v-model="$store.state.selectData_2">
            <option v-for="select in $store.state.recordSelect_2" :value="select.value">{{select.text}}</option>
          </select>
        </p>
      </li>
      <li :class="{'android':android}" class="search"><span>起止日期 :</span>
        <date-picker :date="startTime" :option="option" disabled="value"></date-picker>
        <date-picker :date="endtime" :option="option" disabled="value"></date-picker>
        <v-touch tag="button" @tap="checkdate" class="rebtn"><span>查询</span></v-touch>
      </li>
      <li v-show="$store.state.betToggle" class="betToggle"><span>总投注 : {{$store.state.betamount}}</span><span>总收益 : {{$store.state.winlose}}</span></li>
    </ul>
    <table class="input_record">
      <th>
        <tr>
          <td v-for="item in $store.state.records">{{item.text}}</td>
        </tr>
      </th>
      <tbody ref="viewBox">
        <tr v-for="Data in $store.state.recordDatas">
          <td>{{Data.order}}</td>
          <td>{{Data.number}}</td>
          <td>{{Data.time}}</td>
          <td>{{Data.quota}}</td>
          <td>{{Data.winlost}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>
<script>
    import myDatepicker from "vue-datepicker";
    const data={
    	selected_1:"",//第一个选择提示
    	selected_2:"",//第二个选择提示
      android:true,
    	ths:[{
           text:"订单号"
    	},{
          text:"日期"
    	},{
          text:"类别"
    	},{
    	  text:"说明"
    	},{
    	  text:"金额"
    	}],
    	startTime:{
    		time:""
    	},
    	endtime:{
    		time:""
    	},
    	option: {
	   		type: 'day',
	   		week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
	   		month: ['一月份', '二月份', '三月份', '四月份', '五月份', '六月份', '七月份', '八月份', '九月份', '十月份', '十一月份', '十二月份'],
	   		format: 'YYYY-MM-DD',
	   		color: {
	   			header: '#e4a941',
	   			headerText: '#fff'
	   		},
	   		inputStyle: {
	   			'display': 'inline-block',
	   			'padding': '6px',
	   			'line-height': '22px',
	   			'font-size': '16px',
	   			'border': '2px solid #fff',
	   			'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
	   			'border-radius': '2px',
	   			'color': '#000'
	   		},
	   		buttons:{
	   			ok: '确认',
	   			cancel: '取消'
	   		},
	   		overlayOpacity: 0.3,
	   	},
    }
	export default{
		data(){
			return data;
		},
		components:{
			'date-picker':myDatepicker
		},
		mounted:function(){
				let times = new Date();
				let startmonth = times.getMonth() + 1;
				let startyear = times.getFullYear();
				let startday = times.getDate();
				let starttimer = startyear + "-" + startmonth + "-" + startday;
				this.endtime.time = starttimer;
				let dayBefore = new Date().getTime() - 24 * 60 * 60 * 1 * 1000;
				let before = new Date(dayBefore);
				let endmonth = before.getMonth() + 1;
				let endyear = before.getFullYear();
				let endday = before.getDate();
				let endtimer = endyear + "-" + endmonth + "-" + endday;
				this.startTime.time= endtimer; //时间
  		   this.scroll();
         const ua=navigator.userAgent.toLowerCase();
         if(ua.indexOf('android')!==-1){
           this.android=true;
         }else{
           this.android=false;
         }
		},
		methods:{
			checkdate(){
        this.$store.state.showEnd=true;
				this.$store.state.page=1;
				this.$store.state.recordDatas=[];
				this.$store.state.totalNumber=1;
        this.$store.state.startTime=this.startTime.time;
        this.$store.state.endTime=this.endtime.time;
        this.$store.dispatch("recordData");
			},
			scroll(){
	         	var viewBox=this.$refs.viewBox;
	         	viewBox.addEventListener('scroll',()=>{
	 	             const top=viewBox.scrollTop;
	                 const viewBox_child_h=viewBox.childNodes[1].clientHeight;
	                 const viewBox_child_n=viewBox.childNodes.length;
	                 const viewBox_child_total=viewBox_child_h*viewBox_child_n;
                  const viewBox_minus=viewBox_child_h*(8+viewBox_child_n/100);
                  if(top>viewBox_child_total-viewBox_minus){
                    if(this.$store.state.showEnd){
                      this.$store.dispatch("recordData");
                    }
                  }
	         	})
			},
			in_select2(){
				this.$store.commit("change_select2",this.$store.state.selectData_1);
			}
		}
	}
</script>
<style lang="scss">
   @import "../../assets/css/main.scss";
  .betToggle{
    height:rem2px(50)!important;
    @extend %flex_center,%font24;
    >span{
      margin-right:rem2px(70);
    }
  }
  .record{
    width:rem2px(750);
    @extend %m0a;
    margin-top:rem2px(50);
  }
	.rwrap{
		color:#666666;
		background-color:#fff;
		border-bottom:2px solid $bc;
		padding-left:rem2px(30);
		padding-right:rem2px(30);
		padding-top:rem2px(30);
		font-weight:600;
		@extend %font25,%bz;
		.title{
			text-align: left;
        svg{
          @extend %posr;
        	width:rem2px(32);
        	height: rem2px(24);
        	top:0.05rem;
        	margin-right:rem2px(15);
        }
		}
	}
	.recontent{
		background-color:#f9f9f9;
		margin-top:0.39rem;
    margin-bottom:0;
		>li{
			@extend %bz;
			height:rem2px(70);
			border-top:1px solid $bc;
			padding-left:rem2px(5);
		}
		.status{
			padding-top:0.28rem;
			p{
        @extend %fl,%font24;
          span{
            transform:scale(0.95);
            display:inline-block;
         };
			 }
			p:last-child{
				margin-left:rem2px(30);
			}
			select{
			  @extend %font24;
				width:rem2px(90);
        height:rem2px(35);
				padding-left:rem2px(10);
				margin-left:rem2px(15);
			}
		}
		.search{
			text-align:left;
      @extend %flex_center,%font24;
      height:rem2px(90);
			input{
				width:rem2px(150);
				height:rem2px(40);
        @extend %border, %font24,%bz;
				padding-left:0.2 !important;
				padding-top:0rem !important;
				padding-bottom:0rem !important;
				padding-right:0rem !important;
				box-shadow:none;
				margin-left:rem2px(20);
			}
		}
	}
	.rebtn{
		background-color:#e4a941;
		color:#fff;
		outline:none;
		border:none;
		width:rem2px(70);
    height:rem2px(36);
		line-height:0.58rem;
		border-radius:0.1rem;
		margin-left:rem2px(30);
    @extend %font24;
	}
	.input_record{
		width:100%;
		th{
			display: block;
			line-height:rem2px(50);
			border:{
				top:1px solid $bc;
				bottom:1px solid $bc;
			}
       td{
        @extend %font24;
        width:rem2px(320);
       	text-align:center;
       	font-weight:600;
       }
		}
		tbody{
			margin:rem2px(30) 0 rem2px(30) 0;
			height:rem2px(400);
			overflow-y: scroll;
			display: block;
			border-bottom:1px solid $bc;
			tr{
			 height:rem2px(50);
       display:flex;
       align-items:center;
				td{
           @extend %font16;
			     width:20%;
           flex-shrink:1;
         	 text-align:center;
         	 font-weight:normal;
				}
			}
		}
	}

.android .datepicker-overlay[data-v-51401938]{
  left:0rem !important;
}
.android .cov-date-body[data-v-51401938]{
  left:8rem !important;
}
.cov-date-body[data-v-51401938] {
    left:72rem !important;
    width:rem2px(450) !important;
    top:13rem !important;
    z-index:9999;
    @extend %font24;
    box-shadow: 0rem 0.7rem 1rem rgba(0,0,0,0.32) !important;
}
.datepicker-overlay[data-v-51401938]{
    left: 64rem !important;
    height:26rem !important;
    background-color:rgba(0,0,0,0.0)!important;
}
.cov-picker-box[data-v-51401938]{
	 width:100% !important;
	 height:rem2px(300) !important;
}
.cov-date-monthly>div[data-v-51401938] {
    height: rem2px(180) !important;
}
.button-box[data-v-51401938] {
    @extend %font24;
    height: rem2px(40) !important;
}
</style>
