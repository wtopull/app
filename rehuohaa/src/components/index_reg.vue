<template>
<div class="register">
  <div style="height:4rem;padding-top:1rem;" class="loginlogo">
    <div class="content"></div>
  </div>
  <div class="regMod">
    <form @submit.prevent="">
      <div class="modItem">
        <label class="label">推广码 :</label>
        <input placeholder="请输入推广码 (*选填)" v-model="prmCode"/>
      </div>
      <div class="modItem">
        <label class="label">用户名 :</label>
        <input @click="showTip(&quot;username&quot;)" v-model="username" placeholder="请输入用户名" type="text"/>
        <div :class="{'errorH':utip.error,'trueH':utip.succ}" v-show="utip.showerror" class="showerror"></div>
        <div v-show="utip.showtip" class="tip">6-12位,小写字母或数字(不支持符号)<span>
            <icon name="info"></icon></span></div>
      </div>
      <div class="modItem">
        <label class="label">密码 :</label>
        <input @click="showTip(&quot;password&quot;)" v-model="password" placeholder="请输入密码" type="password"/>
        <div :class="{'errorH':ptip.error,'trueH':ptip.succ}" v-show="ptip.showerror" class="showerror"></div>
        <div v-show="ptip.showtip" class="tip">6-16位,数字或英文(不支持符号)<span>
            <icon name="info"></icon></span></div>
      </div>
      <div class="modItem">
        <label class="label">确认密码 :</label>
        <input @click="showTip(&quot;con_password&quot;)" v-model="con_password" placeholder="再次输入密码" type="password"/>
        <div :class="{'errorH':fptip.error,'trueH':fptip.succ}" v-show="fptip.showerror" class="showerror"></div>
        <div v-show="fptip.showtip" class="tip">保持确认密码一致<span>
            <icon name="info"></icon></span></div>
      </div>
      <div class="modItem">
        <label class="label">QQ号码 :</label>
        <input @click="showTip(&quot;qq&quot;)" placeholder="请输入QQ号码" v-model="qq"/>
        <div :class="{'errorH':qqtip.error,'trueH':qqtip.succ}" v-show="qqtip.showerror" class="showerror"></div>
        <div v-show="qqtip.showtip" class="tip"> QQ号码必须填写且为6-15位数字<span>
            <icon name="info"></icon></span></div>
      </div>
      <div class="modItem">
        <label class="label">微信号码 :</label>
        <input @click="showTip(&quot;wechat&quot;)" placeholder="请输入微信号码" v-model="wechat"/>
        <div :class="{'errorH':wetip.error,'trueH':wetip.succ}" v-show="wetip.showerror" class="showerror"></div>
        <div v-show="wetip.showtip" class="tip"> 微信号必须填写且且为6-15位数字和字母<span>
            <icon name="info"></icon></span></div>
      </div>
      <div class="modItem">
        <label class="label">手机 :</label>
        <input @click="showTip(&quot;phone&quot;)" v-model="phone" placeholder="请输入手机号" type="text"/>
        <div :class="{'errorH':phtip.error,'trueH':phtip.succ}" v-show="phtip.showerror" class="showerror"></div>
        <div v-show="phtip.showtip" class="tip">手机号码须符合规格且必须填写<span>
            <icon name="info"></icon></span></div>
      </div>
      <div class="modItem">
        <label class="label">验证码 :</label>
        <input style="width:4.5rem;" v-model="vid" @click="showTip('yzm')" placeholder="请输入验证码" type="text"/><img :src="$store.state.url+'dist/php/vc.php'" class="regvic"/>
        <div :class="{'errorH':yztip.error,'trueH':yztip.succ}" v-show="yztip.showerror" class="showerror"></div>
        <div v-show="yztip.showtip" class="tip">请输入验证码<span>
            <icon name="info"></icon></span></div>
      </div>
      <v-touch tag="button" @tap="post()" style="box-shadow:none;margin:0.8rem 0;" class="t_btn"> 注册</v-touch>
    </form>
  </div>
  <v-touch @tap="$store.commit('regbackend','register')" style="margin-top:1rem" class="Backindex">
    <icon name="home" style="width:0.75rem;"></icon><span style="width:2.8rem;text-align:center;">返回首页</span>
  </v-touch>
</div>
</template>
<script>
	export default{
        data(){
        	return {
            username:null,
            password:null,
            con_password:null,
            phone: "",
            vid: "",
            vid_boolean:null,
            prmCode:null,
            qq:null,
            wechat:null,
        		utip:{
        			showtip:false,
        			showerror:false,
        			error:false,
        		  succ:false,
        		},
        		ptip:{
        			showtip:false,
        			showerror:false,
        			error:false,
        		  succ:false,
        		},
        		fptip:{
        			showtip:false,
        			showerror:false,
        			error:false,
        		    succ:false,
        		},
        		phtip:{
        			showtip:false,
        			showerror:false,
        			error:false,
        		    succ:false,
        		},
        		yztip:{
        			showtip:false,
        			showerror:false,
        			error:false,
        		  succ:false,
        		},
           qqtip:{
            showtip:false,
            showerror:false,
            error:false,
            succ:false
          },
          wetip:{
            showtip:false,
            showerror:false,
            error:false,
            succ:false
          },
        	}
        },
        watch:{
         username(){
             this.$store.state.register.Globalusername=this.username;
             this.usejudg();
         },
         password(){
           this.$store.state.register.Globalpassword=this.password;
           this.passjudg();
         },
         con_password(){
           this.fpassjudg();
         },
         phone(){
           this.phonejudg();
         },
         qq(){
           this.qqjudg();
         },
         wechat(){
           this.wechatjudg();
         }
        },
        mounted:function(){
          this.$store.state.register.Globalusername=""
          this.$store.state.register.Globalpassword=""
        },
        methods:{
        	prevent(e){
        		e.preventDefault();
        	},
        	showTip(value){
            switch(value){
              case 'username':
              this.utip.showtip=true;
              break;
              case 'password':
               this.ptip.showtip=true;
              break;
              case 'qq':
               this.qqtip.showtip=true;
              break;
              case 'wechat':
               this.wetip.showtip=true;
              break;
              case 'con_password':
               this.fptip.showtip=true;
              break;
              case 'phone':
               this.phtip.showtip=true;
              break;
              case 'yzm':
               this.yztip.showtip=true;
              break;
            }
        	},
          qqjudg(){
            if(/^[0-9]{6,15}$/g.test(this.qq)){
              this.qqtip.succ=true;
              this.qqtip.error=false;
              this.qqtip.showerror=true;
              this.qqtip.showtip=false;
            }else{
              this.qqtip.error=true;
              this.qqtip.showerror=true;
            }
          },
          wechatjudg(){
            if(/^[0-9a-zA-Z]{6,20}$/g.test(this.wechat)){
              this.wetip.succ=true;
              this.wetip.error=false;
              this.wetip.showerror=true;
              this.wetip.showtip=false;
            }else{
              this.wetip.error=true;
              this.wetip.showerror=true;
            }
          },
        	usejudg(){
        		let num=this.$store.state.register.Globalusername.length;
        		if(6<=num&&num<=12){
        			this.utip.succ=true
              this.utip.error=false
              this.utip.showerror=true
              this.utip.showtip=false
        		}else{
        			this.error=true
        			this.utip.showerror=true
        		}
        		let username=/^[^A-Z][a-z0-9]{5,11}$/g;
        		if(!username.test(this.$store.state.register.Globalusername)){
        			this.utip.error=true
        			this.utip.showerror=true
        		}
        	},
            passjudg(){
            	 let num=this.$store.state.register.Globalpassword.length;
            	 if(6<=num&&num<=16){
            	 	this.ptip.succ=true
                this.ptip.error=false
                this.ptip.showerror=true
                this.ptip.showtip=false
            	 }else{
            	 	this.ptip.error=true
        			  this.ptip.showerror=true
            	 }
            	 let password=/[a-z0-9]{6,16}$/g;
            	 if(!password.test(this.$store.state.register.Globalpassword)){
            	 	this.ptip.error=true
        			  this.ptip.showerror=true
            	 }
            },
            fpassjudg(){
            	let pass= this.password;
              let fpass=this.con_password;
                if(pass==fpass){
            	 	this.fptip.succ=true
                    this.fptip.error=false
                    this.fptip.showerror=true
                    this.fptip.showtip=false
                }
        	     if(pass!=fpass||fpass==""){
    	       	    this.fptip.error=true
    	       	    this.fptip.showerror=true
    	       	    this.fptip.showtip=true
                 }
            },
            phonejudg(){
                 let num =this.phone.length;
                 if(num!==11){
                    this.phtip.error=true
    	       	    this.phtip.showerror=true
    	       	    this.phtip.showtip=true
                 }
                 let phone=/^1[3|4|5|7|8|][0-9]{9}/g;
                 if(phone.test(this.phone)){
                 	this.phtip.succ=true
                  this.phtip.error=false
                  this.phtip.showerror=true
                  this.phtip.showtip=false
                 }
            },
            post(){
                this.axios({
                 method:"get",
                 url:this.$store.state.url+'dist/php/check/check-vcode.php',
                 headers:this.$store.state.register.headers,
                 params:{
                     name:this.vid
                 }
                }).then(response=>{
                  this.vid_boolean=response.data;
                  if(this.qqtip.showerror
                     &&this.wetip.showerror
                     &&this.fptip.showerror
                     &&this.utip.showerror
                     &&this.ptip.showerror
                     &&this.phtip.showerror
                     &&this.vid_boolean==true){
                    this.ref_user();
                 	}else if(this.qqtip.showerror&&this.wetip.showerror
                     &&this.fptip.showerror&&this.utip.showerror
                     &&this.ptip.showerror&&this.phtip.showerror
                     &&this.vid_boolean==false){
                     this.$store.commit("registerTip","验证码输入错误");
                   }else if(this.qqtip.showerror==false||this.wetip.showerror==false||this.fptip.showerror==false||this.utip.showerror==false||this.ptip.showerror==false||this.phtip.showerror==false){
                       this.$store.commit("registerTip","注册格式填写错误");
                   }
                })
            },
            ref_user(){
              this.axios({
                method:'get',
                  url:this.$store.state.url+"dist/php/check/check-user.php",
                  headers:this.$store.state.register.headers,
                  params:{
                    username:this.$store.state.register.Globalusername,
                  }
              }).then((response)=>{
                if(response.data==211004){
                    this.$store.commit("registerTip","用户名已经存在");
                }else{
                  this.register();
                }
              })
           },
            register(){
              this.axios({
                method:'get',
                url:this.$store.state.url+"dist/php/ac.php?action=register",
                headers:this.$store.state.register.headers,
                params:{
                   username:this.$store.state.register.Globalusername,
                   password:this.$store.state.register.Globalpassword,
                   url:window.location.href,
                   phone:this.phone,
                   agent:this.prmCode,
                   wechat:this.wechat,
                   qq:this.qq
                }
              }).then(response=>{
                if(response.data.code==211020){
                this.$store.commit("registerTip",response.data.msg);
                }else if(response.data.code==201018){
                    this.$store.commit("registerTip","用户注成功");
                    this.$store.dispatch("login");
                }
              })
            }
        }
	}
</script>
<style lang="scss">
	@import "../assets/css/main.scss";
  .regvic{
    @extend %posr;
    width:rem2px(140);
    height:rem2px(55);
    top:0.3rem;
    right:0rem;
  }
	.regMod{
	  width:100%;
		padding-left:rem2px(80);
		padding-right:rem2px(80);
		@extend %bz;
		background-color:#fff;
		form{
			padding-top:.5rem;
		}
		.modItem{
      @extend %posr;
			display: table;
			padding:rem2px(6) 0;
			width: 100%;
			height: rem2px(90);
			border-bottom: 1px solid #dbdbdb;
			input{
       @extend %fl,%font25,%posr;
       width:rem2px(320);
       height: rem2px(50);
       top:0.3rem;
       border:none;
       padding-left:0.3rem;
			}
			::-webkit-input-placeholder{
				color:#a9a9a9;
			}
		}
	}
	.label {
    @extend %font26;
    display:table-cell;
    width: rem2px(150);
    text-align: left;
    line-height:1.23rem;
    letter-spacing: 0.01rem;
    color:#000;
    text-align:left;
    padding-left:0.16rem;
    }
    .r_btn{
    	text-align: center;
	    height: 1.14rem;
	    line-height: 1.14rem;
	    border-radius: .08rem;
    }
   .tip{
      @extend %font24,%abso,%textAli_left;
      width:100%;
      top:rem2px(74);
      left:rem2px(160);
      color:#886426;
      span{
        @extend %posr,%fl;
        display:block;
      	width:rem2px(14);
        height:rem2px(14);
      	background-color:#886426;
      	border-radius:100%;
      	margin-right:rem2px(8);
      	top:rem2px(5);
        svg{
          @extend %m0a;
        	color:#fff;
          display:block;
          width:rem2px(8);
          height:rem2px(8);
        }
      }
   }
   .showerror{
	    @include Bg("confirm.png",rem2px(52),rem2px(55));
      @extend %abso;
	    background-size: 150%;
	    right:0;
	    top:rem2px(25);
   }
   .trueH{
   	 background-position::rem2px(10) center;
   }
   .errorH{
   	  background-position:rem2px(-35) center;
   }
</style>
