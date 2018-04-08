<template>
<div id="overlayer">
  <div class="layContent">
    <ul v-show="$store.state.layer.binds[0].main_bind" class="cen_bind">
      <v-touch tag="li" @tap="sec_close" class="sec_close">Ⅹ</v-touch>
      <li>
        <label>账户姓名</label>
        <input v-model="$store.state.center.truename"/>
      </li>
      <li>
        <label>账(卡)号</label>
        <input v-model="$store.state.center.bank_account"/>
      </li>
      <li>
        <label>出款密码</label>
        <input type="password" v-model="$store.state.center.bank_password"/>
      </li>
      <li>
        <label>银行名称</label>
        <select v-model="$store.state.center.bankselect">
          <option value="7">工商银行</option>
          <option value="9">交通银行</option>
          <option value="11">农业银行</option>
          <option value="13">建设银行</option>
          <option value="15">招商银行</option>
          <option value="17">民生银行</option>
          <option value="19">深圳银行</option>
          <option value="21">中信银行</option>
          <option value="23">光大银行</option>
          <option value="25">华夏银行</option>
          <option value="27">广东发展银行</option>
          <option value="29">中国邮政储蓄银行</option>
          <option value="31">中国银行</option>
          <option value="33">兴业银行</option>
          <option value="83">东莞农村商业银行</option>
          <option value="81">北京农商银行</option>
          <option value="79">浙江稠州商业银行</option>
          <option value="77">顺德农商银行</option>
          <option value="73">汉口银行</option>
          <option value="71">广州农商银行</option>
          <option value="69">晋商银行</option>
          <option value="67">温州银行</option>
          <option value="63">杭州银行</option>
          <option value="61">广州银行</option>
          <option value="59">东莞银行</option>
          <option value="57">渤海银行</option>
          <option value="55">东亚银行</option>
          <option value="51">上海农村商业银行</option>
          <option value="49">广州市商业银行</option>
          <option value="47">南京银行</option>
          <option value="45">宁波银行</option>
          <option value="43">平安银行</option>
          <option value="41">上海银行</option>
          <option value="39">天津银行</option>
          <option value="37">北京银行</option>
          <option value="35">上海浦东发展银行</option>
          <option value="85">甘肃银行</option>
          <option value="95">浙商银行</option>
        </select>
      </li>
      <li>
        <label>银行支行</label>
        <input v-model="$store.state.center.bank_address"/>
      </li>
      <v-touch @tap="bankbind" class="binBtn">确定</v-touch>
    </ul>
    <ul v-show="$store.state.layer.binds[1].main_bind" class="cen_bind">
      <v-touch tag="li" @tap="sec_close" class="sec_close">Ⅹ</v-touch>
      <li>
        <label>旧密码</label>
        <input v-model="$store.state.center.oldNewMoney" type="password"/>
      </li>
      <li>
        <label>新密码</label>
        <input v-model="$store.state.center.outNewMoney" type="password"/>
      </li>
      <li class="secTip">由4-12位数字组成</li>
      <li>
        <label>确认密码</label>
        <input v-model="$store.state.center.conNewMoney" type="password"/>
      </li>
      <v-touch @tap="outNewMoney" class="binBtn">确定</v-touch>
    </ul>
    <ul v-show="$store.state.layer.binds[2].main_bind" class="cen_bind">
      <v-touch tag="li" @tap="sec_close" class="sec_close">Ⅹ</v-touch>
      <li>
        <label>旧密码</label>
        <input v-model="$store.state.center.oldPass" type="password"/>
      </li>
      <li>
        <label>新密码</label>
        <input v-model="newPass" type="password"/>
      </li>
      <li>
        <label>确认密码</label>
        <input v-model="$store.state.center.newPass" type="password"/>
      </li>
      <v-touch @tap="changeloginpassword" class="binBtn">确认</v-touch>
    </ul>
    <ul v-show="$store.state.layer.binds[3].main_bind" class="cen_bind">
      <v-touch tag="li" @tap="sec_close" class="sec_close">Ⅹ</v-touch>
      <li>
        <label>您的邮箱</label>
        <input v-model="$store.state.center.qwenumber"/>
      </li>
      <v-touch @tap="qewBind(&quot;email&quot;)" class="binBtn">确认</v-touch>
    </ul>
    <ul v-show="$store.state.layer.binds[4].main_bind" class="cen_bind">
      <v-touch tag="li" @tap="sec_close" class="sec_close">Ⅹ</v-touch>
      <li>
        <label>QQ账号</label>
        <input v-model="$store.state.center.qwenumber"/>
      </li>
      <v-touch @tap="qewBind(&quot;qq&quot;)" class="binBtn">确认</v-touch>
    </ul>
    <ul v-show="$store.state.layer.binds[5].main_bind" class="cen_bind">
      <v-touch tag="li" @tap="sec_close" class="sec_close">Ⅹ</v-touch>
      <li>
        <label>微信账号</label>
        <input v-model="$store.state.center.qwenumber"/>
      </li>
      <v-touch @tap="qewBind(&quot;wechat&quot;)" class="binBtn">确认</v-touch>
    </ul>
  </div>
</div>
</template>
<script>
	export default{
    data(){
      return{
        newPass:""
      }
    }
    ,
	   mounted:function(){
	   	this.$nextTick(function(){
	   	})
	   },
	   methods:{
	   	 cen_firm(){
           this.$store.commit("close_cenlayer");
	   	 },
       bankbind(){
          this.$store.commit('bankBind');
       },
       sec_close(){
          this.$store.commit("sec_close");
       },
       qewBind(value){
         if(value=="email"){
           const reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
           let testEmail =reg.test(this.$store.state.center.qwenumber);
            if(testEmail){
              this.$store.commit('qewBind',value);
            } else if(this.$store.state.center.qwenumber==""){
              this.$store.commit("centerTip",7);
            }else{
              this.$store.commit("centerTip",10);
            }
         }else if(value=="qq"){
           if(this.$store.state.center.qwenumber==""){
             this.$store.commit("centerTip",7);
           }else{
            this.$store.commit('qewBind',value);
           }
         }else if(value=="wechat"){
           if(this.$store.state.center.qwenumber==""){
             this.$store.commit("centerTip",7);
           }else{
             this.$store.commit('qewBind',value);
           }
         }
       },
       outNewMoney(){
         let [password,cpword]=[this.$store.state.center.outNewMoney,this.$store.state.center.conNewMoney]
        const numReg=/^\d{4,12}$/g;
        const n=numReg.test(password);
        if(password!==''&&cpword!==''&&password!==cpword){
          this.$store.commit('registerTip','输入两次密码不相等');
        }else if(password==""||cpword==""){
          this.$store.commit("centerTip",7);
        }else if(n){
          this.$store.commit("outNewMoney");
        }else{
          this.$store.commit('registerTip','输入格式错误');
        }

       },
       changeloginpassword(){
          const promise = new Promise((resolve, reject)=> {
            if(this.$store.state.center.oldPass==""||this.newPass==""||this.$store.state.center.newPass==""){
               resolve();
            }else{
              reject();
            }
          });
         promise.then(()=>{
           this.$store.commit("centerTip",7);
         },()=>{
             let password=/[\w]{8,16}$/g;
             var passwordz=password.test(this.newPass);
              if(!passwordz){
                this.$store.commit("centerTip",12);
              } else if(this.newPass!==this.$store.state.center.newPass){
                this.$store.commit("centerTip",13);
              }else{
                this.$store.commit("changeloginpassword");
                this.newPass=this.$store.state.center.newPass
              }
         })
       }
	   }
	}
</script>
<style lang="scss">
  @import "../../../assets/css/main.scss";
  .sec_close{
    width:rem2px(45);
    height:rem2px(43) !important;
    line-height:rem2px(48);
    border-radius:100%;
    color:#fff;
    text-align:center;
    background-color:$color_2;
    position:absolute;
    top:-0.4rem;
    right:-0.3rem;
  }
	#overlayer{
		width:rem2px(750);
		height:rem2px(1000);
    position:fixed;
    top:0;
		background-color:rgba(0,0,0,0.0);
		z-index:9999;
	}
	.layContent{
	  @extend %font25;
		width:rem2px(500);
		background-color:#fff;
		position:relative;
		margin:0 auto;
		padding-top:0.8rem;
		padding-bottom:0.5rem;
    box-shadow:0rem 0.2rem 0.9rem rgba(0,0,0,0.35);
		top:6rem;
	  @extend %bz;
    z-index:100011;
	}
	.cen_bind{
		width:80%;
		margin:0 auto;
		text-align:left;
    li:first-child{
      line-height:rem2px(40);
    }
		li{
			margin-bottom:0.3rem;
			height:rem2px(50);
      line-height:0.7rem;
			label{
				line-height:0.5rem;
        @extend %font16;
			}
      input{
       float:right;
       border:1px solid #dedede;
       width:rem2px(240);
       height:rem2px(35);
       display:block;
       @extend %font16;
			}
      select{
        float:right;
        width:rem2px(240);
        height:rem2px(35);
        @extend %font16;
        border:1px solid #d5d5d5;
      }
		}
	}
	.binBtn{
		margin-top:0.5rem;
		width:rem2px(90);
		line-height:rem2px(35);
		background-color:$color_2;
		color:#fff;
		border-radius:0.1rem;
		text-align:center;
		@extend %m0a;
    @extend %font16;
	}
  .secTip{
    height:0.5rem !important;
    margin:0!important;
    @extend %font16;
    @extend %bz;
    @extend %posr;
    top:-0.45rem;
    text-align:right;
    color:#ea4558;
  }
</style>
