export default {
  state: {
    main_layer: false,
    main_message: null,
    loging_status: false,
    binds: [{
      main_bind: false, //绑定银行卡
    }, {
      main_bind: false, //出款密码
    }, {
      main_bind: false, //登录密码
    }, {
      main_bind: false, //绑定email
    }, {
      main_bind: false, //QQ绑定
    }, {
      main_bind: false, //微信绑定
    }],
    cen_layer: false
  },
  mutations: {
    close_cenlayer(state) {
      state.cen_layer = !state.cen_layer
    },
    bind(state, index) {
      state.cen_layer = !state.cen_layer
      state.binds.forEach(function(item) {
        Vue.set(item, "main_bind", false)
      })
      state.binds[index].main_bind = true
    },
    loginTip(state, value) {
      if(value == 1) {
        state.main_message = "请输入账号和密码"
      } else if(value == 2) {
        state.main_message = "用户名或者密码错误"
      } else if(value == 3) {
        state.main_message = "登录成功"
      } else if(value == 4) {
        state.main_message = "请先登录！"
      }
      state.main_layer = true;
      setTimeout(() => {
        state.main_layer = false
      }, 1800)
    },
    registerTip(state, value) {
      state.main_message = value;
      state.main_layer = true;
      setTimeout(() => {
        state.main_layer = false
      }, 1800)
    },
    centerTip(state, value) {
      if(value == 1) {
        state.main_message = "请选择类别";
      } else if(value == 2) {
        state.main_message = "转账失败，请重试！";
      } else if(value == 3) {
        state.main_message = "转账成功！";
      } else if(value == 4) {
        state.main_message = "请输入金额";
      } else if(value == 5) {
        state.main_message = "绑定出款银行信息失败";
      } else if(value == 6) {
        state.main_message = "银行卡绑定成功";
      } else if(value == 7) {
        state.main_message = "请填写必要信息";
      } else if(value == 8) {
        state.main_message = "绑定成功";
      } else if(value == 9) {
        state.main_message = "绑定失败";
      } else if(value == 10) {
        state.main_message = "请输入正确的邮箱格式";
      } else if(value == 12) {
        state.main_message = "密码规格错误";
      } else if(value == 13) {
        state.main_message = "密码不相等";
      } else if(value == 14) {
        state.main_message = "原密码错误";
      } else if(value == 15) {
        state.main_message = "修改密码成功";
      } else if(value == 16) {
        state.main_message = "存款订单成功";
      } else if(value == 17) {
        state.main_message = "网络错误,请稍后！";
      } else if(value == 18) {
        state.main_message = "存款不能低于限额！";
      } else if(value == 19) {
        state.main_message = "请稍后刷新额度";
      } else if(value == 20) {
        state.main_message = "暂无记录！";
      } else if(value == 21) {
        state.main_message = "暂无更多记录！";
      } else if(value == 211026) {
        state.main_message = "获取用户出款资料失败";
      } else if(value == 103047) {
        state.main_message = "添加出款订单成功";
      } else if(value == 113051) {
        state.main_message = "提现密码错误";
      } else if(value == 113048) {
        state.main_message = "出款订单失败";
      } else if(value == 22) {
        state.main_message = "提现金额必须大于手续费";
      } else if(value == 103019) {
        state.main_message = '转账成功';
      } else if(value == "请填写备注") {
        state.main_message = '请填写备注';
      } else if(value == "支付备注填写错误") {
        state.main_message = '支付备注填写错误';
      } else if(value == '公司存款订单提交失败') {
        state.main_message = '公司存款订单提交失败';
      } else if(value == '23') {
        state.main_message = '请先绑定银行卡,才能进行提现';
      } else if(value == 24) {
        state.main_message = '网络错误！请重新登录';
      } else if(value == 113017) {
        state.main_message = '请不要重复提交订单!';
      } else if(value == 20000) {
        state.main_message = '暂无稽核信息';
      }
      state.main_layer = true;
      setTimeout(() => {
        state.main_layer = false;
      }, 1800)
    },
    sec_close(state) {
      state.cen_layer = false
    }
  },
}