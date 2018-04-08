import axios from 'axios';
import VueCookie from "vue-cookie";
import store from '../user.js';
const state = {
	loginStatus: null, //登陆状态
	moneyStatus: null,
	headers:{'Content-Type':'application/x-www-form-urlencoded'},
	regHide: true,
	regShow: false,
	loginShow: false,
	screenTip:false,
	oid: null,
	ulevel: null, //ulevel数值
	contact_toggle:true,
	Globalusername: "",//全局账号
	Globalpassword: "",//全局密码
	centerusername: "请先登录",
	amountmoney: "",
	user_type: "",
	realname: "",
	loginbe: true,
	loginaf: false,
	agent: "",
	cout: "ms", //转出
	cin: "ag", //转入
	tranforMoney: "",
	choices: [{
		text: "AG平台",
		eachMoney: 0.00
	}, {
		text: "BBIN平台",
		eachMoney: 0.00
	}, {
		text: "PT平台",
		eachMoney: 0.00
	}, {
		text: "MG平台",
		eachMoney: 0.00
	}, {
		text: "SA平台",
		eachMoney: 0.00
	}, {
		text: "GG平台",
		eachMoney: 0.00
	},{
		text: "ww平台",
		eachMoney: 0.00
	}]
}
const mutations = {
	chauser(state,value="") {
		if(value=='showTip'){
			store.state.layer.main_layer = true;
			store.state.layer.loging_status = true;
		}
		state.loginStatus = 211003;
		state.centerusername = state.Globalusername;
		state.loginbe = false;
		state.loginaf = true;
		state.loginShow = false;
		state.regShow = false;
		state.regHide = true;
		//获得金额
		axios({
			method:"get",
			url:store.state.url+"dist/php/bl.php?action=main",
			headers:store.state.headers,
			timeout:100000,
			params: {
				username: state.centerusername,
				oid: state.oid
			}
		}).then((response) => {
			state.amountmoney = response.data.data.money
			if(value=='showTip'){
				store.state.layer.main_layer = false;
				setTimeout(()=>{store.state.layer.loging_status = false;},100);
			}
		}).catch((err)=>{
				store.commit('centerTip',24);
        		setTimeout(()=>{store.commit('loginout');},800);
		})
	},
	//进行退出
	loginout(state) {
		state.loginbe = !state.loginbe
		state.loginaf = !state.loginaf
		state.loging_status=!state.loging_status
		state.login = !state.login;
		state.centerusername = "请先登录";
		state.loginStatus = null;
		state.amountmoney = null;
		state.Globalusername = "";
		state.Globalpassword = "";
		state.user_type = "";
		state.oid='';
		state.page = 1; //页数回到第一页
    VueCookie.delete('username',"password");
		store.state.swiper.slideTo(0, 0, false);
		store.state.navs.forEach(function(nav) {
			Vue.set(nav, 'toggle', false);
		});
		store.state.centers.forEach((center)=>{
			 Vue.set(center,'toggle',false);
		});
		Vue.set(store.state.navs[0], 'toggle', true);
		store.state.navToggle=true;//下面的导航栏开启
		store.state.headToggle=true;//上面的导航栏
	},
	bindToggle(state){
		axios({
			method:"get",
			url: store.state.url + 'dist/php/mobile/mobile_center_save.php',
			headers:state.headers,
			timeout:100000,
			params: {
				username:state.Globalusername,
				oid: state.oid
			}
		}).then((res) => {
			store.state.center.bank_tip = res.data.bank_account;
			//关于绑定的出现条件
			if (res.data.bank_account !== null) {
				store.state.center.secNavs[0].toggle = false;
			}
			if (res.data.email !== null) {
				store.state.center.secNavs[3].tip = res.data.email;
			}
			if (res.data.qq !== null) {
				store.state.center.secNavs[4].tip = res.data.qq;
			}
			if (res.data.wechat !== null) {
				store.state.center.secNavs[5].tip = res.data.wechat;
			}
		}).catch((err)=>{
			 store.commit('centerTip',24);
        setTimeout(()=>{store.commit('loginout');},300);
		}).catch((err)=>{
			store.commit('centerTip',24);
			setTimeout(()=>{store.commit('loginout');},1000);
		})
	},
}
const actions = {
	login(context) {
		axios({
			method:'get',
			url:store.state.url+'dist/php/ac.php?action=login',
			headers:context.state.headers,
			timeout:80000,
		  params:{username:context.state.Globalusername,password:context.state.Globalpassword}
	 }).then((response) => {
			if (response.data.code == 211003) {
				context.commit("loginTip", 2);
				//用户名或者密码错误
			} else if (response.data.code == 201001) {
					context.commit("loginTip", 3);//登陆成功提示
				//登陆成功
				let reg_data = response.data.data;
				// 修改oid
				context.state.oid = reg_data.oid;
				// 获得ulevel
				context.state.ulevel = reg_data.ulevel;
				//获取user_type
				context.state.user_type = reg_data.user_type;
				//获取realname
				context.state.realname = reg_data.realname;
				//获取agent
				context.state.agent = reg_data.agent;
				VueCookie.set('realname',context.state.realname,1)
				VueCookie.set('username', context.state.Globalusername, 1);
				VueCookie.set('password', context.state.Globalpassword, 1);
				VueCookie.set('oid', context.state.oid, 1);
				VueCookie.set('ulevel', context.state.ulevel, 1);
				VueCookie.set('user_type',context.state.user_type,1);
					//获取关闭的保存数据
				context.state.contact_toggle=true;
				store.state.paynowToggle=true;
				//在action中修改state只能用store.state.[name]
				context.commit('bindToggle');//获取各项绑定开关
				context.commit("chauser");
			}
		}).catch((err)=>{
			 store.commit('centerTip',24);
       setTimeout(()=>{store.commit('loginout');},1000);
		})
	},
	getEachMoney(context,value) {
		store.state.layer.main_layer = true;
		store.state.layer.loging_status = true;
		var each = "";
		switch (value.num) {
			case 0:
				each = "?action=ag";
				break;
			case 1:
				each = "?action=bb";
				break;
			case 2:
				each = "?action=pt";
				break
			case 3:
				each = "?action=mg";
				break;
			case 4:
				each = "?action=sa";
				break;
			case 5:
				each = "?action=gg";
				break
			case 6:
				each='?action=ww';
				break;
		}
		axios({
			method: "get",
			url: store.state.url + "dist/php/bl.php" + each,
			headers:context.state.headers,
			timeout:100000,
			params: {
				username: context.state.Globalusername,
				oid: context.state.oid
			}
		}).then((response) => {
			let num = response.data.balance;
			switch (value.num) {
				case value.num:
					state.choices[value.num].eachMoney = parseFloat(num).toFixed(2);
			}
			store.state.layer.main_layer = false;
			setTimeout(()=>{
				store.state.layer.loging_status = false;
			},200);
			if(value.m=='m'){
				 context.commit('chauser');
				 context.commit('centerTip',103019);
			}
		}).catch((err)=>{
			 store.commit('centerTip',24);
       setTimeout(()=>{store.commit('loginout');},800);
		})
	},
	tranformMoney(context) {
		if (context.state.tranforMoney !== "") {
			axios({
				method: "get",
				url: store.state.url + "dist/php/bl.php?action=changemoney",
				headers:context.state.headers,
				timeout:100000,
				params: {
					username: context.state.Globalusername,
					oid: context.state.oid,
					cout: context.state.cout,
					cin: context.state.cin,
					money: context.state.tranforMoney
				}
			}).then((response) => {
				if (response.data.code == 113020) {
					context.commit("centerTip", 2);
				}else if(response.data.code == 113062){
				  context.commit("registerTip",response.data.msg);
				} else if (response.data.code == 103019) {
					state.tranforMoney = "";
					switch (context.state.cin) {
						case "ag":
							context.dispatch("getEachMoney",{num:0,m:'m'});
							break;
						case "bb":
							context.dispatch("getEachMoney", {num:1,m:'m'});
							break;
						case "pt":
							context.dispatch("getEachMoney",{num:2,m:'m'});
							break;
						case "mg":
							context.dispatch('getEachMoney',{num:3,m:'m'});
							break;
						case "sa":
							context.dispatch('getEachMoney',{num:4,m:'m'});
							break;
						case "gg":
							context.dispatch('getEachMoney',{num:5,m:'m'});
							break;
						case "ww":
	 					  context.dispatch('getEachMoney',{num:6,m:'m'});
	 					  break;
						case "ms":
						  switch(context.state.cout){
								case "ag":
									context.dispatch("getEachMoney",{num:0,m:'m'});
									break;
								case "bb":
									context.dispatch("getEachMoney", {num:1,m:'m'});
									break;
								case "pt":
									context.dispatch("getEachMoney",{num:2,m:'m'});
									break;
								case "mg":
									context.dispatch('getEachMoney',{num:3,m:'m'});
									break;
								case "sa":
									context.dispatch('getEachMoney',{num:4,m:'m'});
									break;
								case "gg":
									context.dispatch('getEachMoney',{num:5,m:'m'});
									break;
							  case "ww":
	 	 	 					  context.dispatch('getEachMoney',{num:6,m:'m'});
	 	 	 					  break;
							}
							break;
					}
				}
			}).catch(err=>{
				 store.commit('centerTip',24);
				 setTimeout(()=>{store.commit('loginout');},800);
			})
		} else {
			context.commit("centerTip", 4);
		}
	}
}
export default {
	state,
	mutations,
	actions
}
