import store from '../user.js'
import axios from 'axios'
import VueCookie from "vue-cookie";
const state = {
	bank_toggle: true,
	bankselect: 7, 
	truename: "",
	bank_account: "",
	bank_password: "",
	bank_address: "",
	qwenumber: "",
	oldNewMoney:"",
	outNewMoney:"",
	conNewMoney:"",
	oldPass: "",
	newPass: "",
	type: "",
	out_bank_id:123,
	set_id:123,
	chargeMoney: "",
	bank_address: "",
	bank_name: "",
	bank_account: "",
	save_money2: "",
	save_money1: "",
	start_time2: "",
	start_time1: "",
	promos_money2: "",
	promos_money1: "",
	wit_money: "",
	wit_password: "",
	bet_sum_money2: "",
	bet_sum_money1: "",
	normal_is_ok2: "",
	normal_is_ok1: "",
	sum_data:[],
	//常态投注手续费
	normal_is_kouchu_money2: "",
	normal_is_kouchu_money1: "",
	//优惠投注通过
	promotion_is_ok2: "",
	promotion_is_ok1: "",
	//优惠投注扣除
	promotion_kouchu_money2: "",
	promotion_kouchu_money1: "",
	//单条需扣除金额
	all_kouchu_free2: "",
	all_kouchu_free1: "",
	//总手续费
	all_normal_free: "",
	all_free: "",
	all_delete_poroms: "",
	//重复出款手续费
	h_reply_free: "",
	//出款上限
	h_take_money_max: "",
	//出款下限
	h_take_money_min: "",
 //安全设置
	 secNavs:[{
		 name:"id-card-o",
		 text:"绑定银行卡>",
		 bind:"绑定",
		 bindz:"bindShow",
		 toggle:true,
		 tip:''
	 },{
		 name:"mobile",
		 text:"出款密码修改>",
		 bind:"修改",
		 toggle:true,
		 tip:"出款密码提现时输入"
	 },
	 {
		 name:"lock",
		 text:"登录密码修改>",
		 bind:"修改",
		 toggle:true,
		 tip:"登录密码设定成功"
	 },{
		 name:"envelope",
		 text:"绑定邮箱>",
		 bind:"绑定",
		 toggle:true,
		 tip:'请绑定邮箱'
	 },{
		 name:"qq",
		 text:"绑定QQ号>",
		 bind:"绑定",
		 toggle:true,
		 tip:'请绑定QQ'
	 },{
		 name:"weixin",
		 text:"绑定微信>",
		 bind:"绑定",
		 toggle:true,
		 tip:'请绑定微信'
	 }]
}
const mutations = {
	wit_move(state) {
		if (state.wit_money !== "" && state.wit_password !== "" && state.wit_money > state.all_free) {
			axios({
				method: "get",
				url: store.state.url + "dist/php/report/out.php",
				headers:store.state.register.headers,
				timeout:100000,
				params: {
					username: store.state.register.Globalusername,
					oid: store.state.register.oid,
					ulevel: store.state.register.ulevel,
					agent: store.state.register.agent,
					money: state.wit_money,
					gold: state.all_free, //所要扣除的总手续费
					str_to_log: "money",
					getpass: state.wit_password,
					bank_name: state.bank_name,
					realname: store.state.register.realname,
					bank_account: state.bank_account,
					bank_adress: state.bank_address,
					h_normal_free: state.all_normal_free, //总的常态投注手续费
					h_promotion_free: state.all_delete_poroms, //总的优惠投注手续费
					h_replys_free: state.h_reply_free,
					h_take_money_max: state.h_take_money_max,
					h_take_money_min: state.h_take_money_min,
				}
			}).then((res) => {
				if(res.data.code == 103047) {
					store.commit("centerTip", 103047);
				} else if (res.data.code == 113051){
					store.commit("centerTip", 113051);
				} else if (res.data.code == 113048){
					store.commit("centerTip", 113048);
				}else if(res.data.code==113061){
					store.commit("registerTip","用户不允许提款，请联系客服");
				}else if(res.data.code==113057){
					store.commit("registerTip","稽核信息未更新,提现失败,请刷新页面在提现");
				}
			})
		} else if (state.wit_money == "" && state.wit_password == "") {
			store.commit("centerTip", 7);
		} else if (state.wit_money < state.all_free) {
			store.commit("centerTip", 22);
		}
		state.wit_money = "";
		state.wit_password = "";
	},
	//银行卡绑定
	bankBind(state) {
		if (state.truename !== "" && state.bank_account !== "" && state.bank_password !== "") {
			axios({
				method: "get",
				url: store.state.url + "dist/php/ac.php?action=saveuserdetial",
				headers:store.state.register.headers,
				timeout:8000,
				params: {
					username: store.state.register.Globalusername,
					oid: store.state.register.oid,
					truename: state.truename,
					bank_account: state.bank_account,
					bank_id: state.bankselect,
					bank_password: state.bank_password,
					bank_address: state.bank_address,
				}
			}).then((response) => {
				if (response.data.code == 211028) {
					//绑定银行卡失败
					store.commit("centerTip", 5)
				} else if (response.data.code == 201027) {
					//银行卡绑定成功
					store.commit("centerTip", 6);
					store.state.layer.cen_layer = !store.state.layer.cen_layer;
				}
			}).catch((err)=>{
				 store.commit('centerTip',24);
	        setTimeout(()=>{store.commit('loginout');},300);
			})
		} else {
			store.commit("centerTip", 7);
		}
	},
	//QQ and email and wechat
	qewBind(state, value) {
		axios({
			method: "get",
			url: store.state.url + "dist/php/ac.php?action=changeuserdetail",
			headers:store.state.register.headers,
			timeout:100000,
			params: {
				username: store.state.register.Globalusername,
				oid: store.state.register.oid,
				chgvalue: state.qwenumber,
				ty: value
			}
		}).then((response) => {
			if (response.data.code == 1) {
				//绑定成功
				store.commit("centerTip", 8);
        store.commit('bindToggle');
			} else {
			  //绑定失败
				store.commit("centerTip",9);
			}
			store.state.layer.cen_layer = !store.state.layer.cen_layer;
			state.qwenumber = "";
		}).catch((err)=>{
			 store.commit('centerTip',24);
       setTimeout(()=>{store.commit('loginout');},300);
		})
	},
	outNewMoney(state) {
		axios({
			method: "get",
			url: store.state.url + "dist/php/ac.php?action=changegetpassword",
			headers:store.state.register.headers,
			timeout:100000,
			params: {
				username: store.state.register.Globalusername,
				oid: store.state.register.oid,
				ypassword:state.oldNewMoney,
				password:state.outNewMoney,
				user_type: store.state.register.user_type,
			}
		}).then((response) => {
			switch(response.data.code){
				case 201015:
				//修改密码成功
				store.commit("centerTip",15);
			  store.commit('bindToggle');
				break;
				case 211017:
				store.commit('registerTip',"修改密码失败,原密码错误");
				break;
			}
		}).catch((err)=>{
			 store.commit('centerTip',24);
       setTimeout(()=>{store.commit('loginout')},300);
		})
	},
	changeloginpassword(){
		axios({
			method: "get",
			url: store.state.url + "dist/php/ac.php?action=changepassword",
			headers:store.state.register.headers,
			timeout:100000,
			params: {
				username: store.state.register.Globalusername,
				oid: store.state.register.oid,
				ypassword: state.oldPass,
				password: state.newPass,
				user_type:store.state.register.user_type,
			}
		}).then((response)=>{
			if (response.data.code == 211017) {
				store.commit("centerTip", 14);
			}else{
				store.commit("centerTip",15);
				store.commit("loginout");
			}
		}).catch((err)=>{
			 store.commit('centerTip',24);
       setTimeout(()=>{store.commit('loginout');},300);
		})
	},
	//充值
	transformPay(state, value) {
		//进行判断
		switch (value.type) {
			case 1:
				state.type = "微信";
				break;
			case 2:
				state.type = "支付宝";
				break;
			case 3:
				state.type = "银行卡";
		}
		if (state.set_id !== "") {
			axios({
				method: "get",
				url: store.state.url + "dist/php/ac.php?action=savebankorder",
				headers:store.state.register.headers,
				timeout:8000,
				params: {
					'oid': store.state.register.oid,
					'username': store.state.register.Globalusername,
					'ulevel': store.state.register.ulevel,
					'out_bank_id':state.out_bank_id,//bank_id
					'in_bank_set_id':state.set_id,//id
					"user": store.state.register.realname,
					"type": state.type,
					"money": state.chargeMoney,
					"mark":value.mark,
				}
			}).then((response) => {
				if (response.data.code == 103007) {
					store.commit("centerTip", 16);
					setTimeout(() => {
						store.commit("centerTip", 19);
					}, 2000);
				}else if(response.data.code==113008){
					store.commit("centerTip",'公司存款订单提交失败');
				} else if (response.data.code == 113053) {
					store.commit("centerTip", 18);
				}else if(response.data.code==113017){
					store.commit("centerTip",113017);	//请不要重复提交订单
				}
			}).catch((err)=>{
				 store.commit('centerTip',24);
	       store.commit('loginout');
			})
		} else {
			store.commit("centerTip", 17);
		}
		state.chargeMoney = "";
	},
	getEsWitFo(state) {
		store.state.layer.main_layer = true;
		store.state.layer.loging_status = true;
		axios({
			method: "get",
			url: store.state.url + "dist/php/mobile/mobile_center_out.php",
			headers:store.state.register.headers,
			timeout:100000,
			params: {
				'username': store.state.register.Globalusername,
				'oid': store.state.register.oid,
				'agent': store.state.register.agent,
				'ulevel': store.state.register.ulevel
			}
		}).then((response) => {
			const bank_info = response.data.bank_info, //获取主要信息
			sum_info = response.data.sum_info, //总数据
      sum_data = response.data.data //获取扣除钱
			state.bank_address = bank_info.bank_adress;
			state.bank_name = bank_info.bank_name;
			state.bank_account = bank_info.bank_account;
			store.state.layer.main_layer = false;
			store.state.layer.loging_status = false;
			//获取扣除钱
			//获取后两条
			if (response.data.code == 211026) {
				store.commit("centerTip", 211026)
			}else if(response.data.code == 20000){
				//无稽核信息
				setTimeout(()=>{store.commit("centerTip", 20000)},500);
			}else{
				state.sum_data=sum_data;  //前两条
 				state.all_normal_free = sum_info.all_normal_free;
 				state.all_free = sum_info.all_free;
 				state.all_delete_poroms = sum_info.all_delete_poroms;
 				state.h_reply_free = sum_info.reply_free;
 				state.h_take_money_max = sum_info.take_money_max;
 				state.h_take_money_min = sum_info.take_money_min;
			}
		}).catch((err)=>{
			store.state.layer.main_layer = false;
			store.state.layer.loging_status = false;
			setTimeout(()=>{store.commit('centerTip',24);},100);
      setTimeout(()=>{store.commit('loginout');},800);
		})
	}
}

const actions = {

}
export default {
	state,
	mutations,
	actions
}
