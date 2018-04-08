import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Userregister from './modules/register';
import layer from './modules/layer.js';
import center from './modules/center.js';
Vue.use(Vuex);
const userStore = new Vuex.Store({
  state: {
    url: "http://m1.net/",
    maintainStatus: new Map(),
    swiper: "",
    getNotice: "",
    swiperGame: "",
    navToggle: true,
    headToggle: true,
    centerPage: false,
    centerTitle: '',
    paynowToggle: true,
    showEnd: true,
    betToggle: false,
    pro_tab: [{
      toggle: true,
    }, {
      toggle: true,
    }, {
      toggle: true,
    }, {
      toggle: true,
    }],
    centers: [{
      toggle: false
    }, {
      toggle: false
    }, {
      toggle: false
    }, {
      toggle: false
    }, {
      toggle: false
    }, {
      toggle: false
    }, {
      toggle: false
    }, {
      toggle: false
    }],
    navs: [{
      toggle: true
    }, {
      toggle: false
    }, {
      toggle: false
    }, {
      toggle: false
    }],
    navsGame: [{
      text: '彩票游戏',
      toggle: true
    }, {
      text: '真人视讯',
      toggle: false
    }, {
      text: '电子游戏',
      toggle: false
    }, {
      text: '体育赛事',
      toggle: false
    }],
    reTitle: "",
    status: false,
    records: [{
      text: "订单记录"
    }, {
      text: "日期"
    }, {
      text: "类别"
    }, {
      text: "说明"
    }, {
      text: "金额"
    }],
    proToggle: [{
      toggle: false,
    }, {
      toggle: false,
    }, {
      toggle: false,
    }, {
      toggle: false,
    }],
    select2: false,
    select_1: null,
    select_2: null,
    recordSelect_1: [],
    recordSelect_2: [],
    recordDatas: [],
    selectData_1: 0, //select第一个
    selectData_2: 0, //select第二个
    startTime: null,
    endTime: null,
    page: 1,
    totalNumber: 1
  },
  mutations: {
    swiper(state, value) {
      state.swiper = value;
    },
    swipergame(state, value) {
      state.swiperGame = value;
    },
    swiperTo(state, value) {
      state.headToggle = true;
      const nav = value.nav;
      const index = value.index
      if(state.register.loginStatus == 211003) {
        state.navs.forEach(function(nav) {
          Vue.set(nav, 'toggle', false)
        })
        Vue.set(nav, 'toggle', true)
      } else if(index !== 3) {
        state.navs.forEach(function(nav) {
          Vue.set(nav, 'toggle', false)
        })
        Vue.set(nav, 'toggle', true)
      }
    },
    swiperTopage(state, value) {
      state.proToggle.forEach((item) => {
        Vue.set(item, 'toggle', false)
      })
      if(value == 0) {
        state.swiper.slideTo(value, 500, false)
        state.swiper.slideTo(0, 500, false);
        Vue.set(state.navs[value], 'toggle', true);
        state.navToggle = true;
      } else if(value == 1) {
        state.swiper.slideTo(value, 500, false);
      } else if(value == 2) {
        state.navs.forEach(function(nav) {
          Vue.set(nav, 'toggle', false);
        })
        state.swiper.slideTo(value, 500, false);
        Vue.set(state.navs[value], 'toggle', true);
      } else if(value == 3 && state.register.loginStatus == 211003) {
        state.swiper.slideTo(3, 500, false);
      } else if(state.register.loginStatus !== 211003) {
        state.layer.main_message = "请先登录"
        state.layer.main_layer = !state.layer.main_layer
        setTimeout(() => {
          state.layer.main_layer = !state.layer.main_layer
        }, 1300)
      }
    },
    swiperToGame(state, value) {
      state.navsGame.forEach(function(nav) {
        Vue.set(nav, 'toggle', false);
      });
      Vue.set(state.navsGame[value], 'toggle', true);
      state.swiperGame.slideTo(value, 500, false);
    },
    showToCenter(state, value) {
      state.swiper.slideTo(value.main, 500, false);
      state.swiperGame.slideTo(value.game, 0, false);
      state.navsGame.forEach(function(nav) {
        Vue.set(nav, 'toggle', false);
      });
      Vue.set(state.navsGame[value.game], 'toggle', true);
      ///nav
      state.navs.forEach(function(nav) {
        Vue.set(nav, 'toggle', false);
      })
      Vue.set(state.navs[1], 'toggle', true)
    },
    swiperToCenter(state) {
      state.swiper.slideTo(5, 500, false);
    },
    returnCenter(state) {
      state.swiper.slideTo(3, 500, false);
      state.headToggle = true;
      state.navToggle = true;
      state.centerPage = false;
      state.centers.forEach((item) => {
        Vue.set(item, "toggle", false);
      })
    },
    ctoggle(state) {
      state.centerPage = true;
      state.headToggle = false;
      state.navToggle = false;
    },
    togglemain(state, value) {
      state.centers.forEach(function(nav) {
        Vue.set(nav, 'toggle', false)
      });
      state.remess = [];
      state.betToggle = false;
      switch(value) {
        case 1:
          state.centerTitle = "站内转账"
          Vue.set(state.centers[0], "toggle", true);
          break;
        case 2:
          state.centerTitle = "安全设置"
          Vue.set(state.centers[1], 'toggle', true);
          break;
        case 3:
          state.centerTitle = "站内信息"
          Vue.set(state.centers[2], 'toggle', true);
          break;
        case 4:
          state.centerTitle = "充值"
          Vue.set(state.centers[3], 'toggle', true);
          break;
        case 5:
          state.centerTitle = "提现";
          Vue.set(state.centers[4], 'toggle', true);
          break;
      }
      if(value == 6) {
        state.page = 1;
        state.centerTitle = "交易记录"
        state.status = true
        Vue.set(state.centers[5], 'toggle', true)
        state.select_1 = "类别:";
        state.select2 = false;
        state.recordDatas = [];
        state.selectData_1 = 0;
        state.recordSelect_1 = [];
        state.recordSelect_1.push({
          text: "全部",
          value: 0
        }, {
          text: "入款",
          value: 1
        }, {
          text: "出款",
          value: 2
        }, {
          text: "转账记录",
          value: 3
        })
      }
      //转账记录
      if(value == 7) {
        state.page = 1;
        state.centerTitle = "转账记录";
        state.status = false;
        Vue.set(state.centers[5], 'toggle', true);
        state.records[0].text = "序列号";
        state.recordDatas = [];
        state.selectData_1 = null;
      }
      //投注记录
      if(value == 8) {
        state.page = 1;
        state.centerTitle = "投注记录";
        state.winlose = "——";
        state.betamount = "——";
        state.betToggle = true;
        state.status = true;
        state.select2 = true;
        Vue.set(state.centers[5], 'toggle', true);
        state.select_1 = "视讯:";
        state.select_2 = "游戏:";
        state.selectData_1 = '';
        state.selectData_2 = '';
        state.recordSelect_1 = [];
        state.recordSelect_1.push({
          text: '全部',
          value: ''
        }, {
          text: "AG",
          value: 2
        }, {
          text: "BBIN",
          value: 11
        }, {
          text: "GG",
          value: 12
        }, {
          text: "MG",
          value: 13
        }, {
          text: "PT",
          value: 14
        }, {
          text: "SA",
          value: 15
        }, {
          text: "ww",
          value: 17
        });
        state.recordSelect_2.push({
          text: "全部",
          value: "",
        });
        state.records[0].text = "游戏类别";
        state.records[1].text = "注单号";
        state.records[2].text = "投注时间";
        state.records[3].text = "投注额";
        state.records[4].text = "输/赢";
        state.recordDatas = [];
      }
    },
    //注册
    register(state) {
      state.paynowToggle = false;
      state.register.regHide = false;
      state.register.regShow = true;
      state.register.contact_toggle = false;
    },
    regbackend(state, value) {
      state.paynowToggle = true;
      state.register.contact_toggle = true;
      if(value = "regiser") {
        state.register.regHide = true;
        state.register.regShow = false;
      }
      if(value = "login") {
        state.register.regHide = true;
        state.register.loginShow = false;
      }
    },
    loginShow(state) {
      state.paynowToggle = false;
      state.register.loginShow = !state.register.loginShow;
      state.register.regHide = !state.register.regHide;
      state.register.contact_toggle = false;
    },
    loginToreg(state) {
      setTimeout(() => {
        state.register.loginShow = false;
        state.register.regShow = true;
        state.register.contact_toggle = false;
      }, 100)
    },
    //获取用户
    change_select2(state, value) {
      if(value !== '') {
        state.recordSelect_2 = [];
      }
      switch(value) {
        case 0:
          state.recordSelect_2.push({
            text: "AG视讯",
            value: 21,
            selected: true
          }, {
            text: "AG机率",
            value: 22,
            selected: false
          })
          state.recordSelect_2.
          break;
        case 1:
          state.recordSelect_2.push({
            text: "AG视讯",
            value: 21,
            selected: true
          }, {
            text: "AG机率",
            value: 22,
            selected: false
          })
          break;
        case 2:
          state.recordSelect_2.push({
            text: "AG视讯",
            value: 21,
            selected: true
          }, {
            text: "AG机率",
            value: 22,
            selected: false
          })
          break;
        case 3:
          state.recordSelect_2.push({
            text: "AG视讯",
            value: 21,
            selected: true
          }, {
            text: "AG机率",
            value: 22,
            selected: false
          })
          break;
        case 11:
          state.recordSelect_2.push({
            text: "BBIN球类",
            value: 1
          }, {
            text: "BBIN视讯",
            value: 3

          }, {
            text: "BBIN机率",
            value: 5,

          }, {
            text: "BBIN彩票",
            value: 12,
          }, {
            text: "BBIN3D厅",
            value: 15,

          }, {
            text: "BB 六合彩",
            value: 54,

          });
          break;
        case 12:
          state.recordSelect_2.push({
            text: "GG 捕鱼",
            value: 55
          }, {
            text: "GG 电子",
            value: 56
          });
          break;
        case 13:
          state.recordSelect_2.push({
            text: "MG 视讯",
            value: 90
          }, {
            text: "MG电子",
            value: 91
          });
          break;
        case 14:
          state.recordSelect_2.push({
            text: "暂无",
            value: 0
          });
          break;
        case 15:
          state.recordSelect_2.push({
            text: "SA 视讯",
            value: 41
          }, {
            text: "SA彩票",
            value: 52
          }, {
            text: "SA电子",
            value: 53
          });
          break;
        case 17:
          state.recordSelect_2.push({
            text: "全部",
            value: ""
          });
          break;
      }
      state.selectData_2 = state.recordSelect_2[0].value;
    }
  },
  actions: {
    showWating(context, value) {
      context.commit('ctoggle')
      setTimeout(() => {
        context.commit('swiperToCenter')
      }, 50)
    },
    recordData(context) {
      var url;
      var page = context.state.page++;
      if(context.state.status == false) {
        var ty = "re_change";
      } else if(context.state.select2 == true) {
        var ty = "re_bet";
      } else if(context.state.select2 == false) {
        var ty = "re_deal";
      }
      switch(ty) {
        case 're_deal':
          url = context.state.url + 'dist/php/mobile/mobile_re_deal.php?i=3.2243';
          break;
        case 're_bet':
          url = context.state.url + 'dist/php/mobile/mobile_re_bet.php?i=3.2243';
          break;
        case 're_change':
          url = context.state.url + 'dist/php/mobile/mobile_re_change.php?i=3.2243';
          break;
      }
      if(url !== undefined && page <= context.state.totalNumber) {
        context.state.layer.main_layer = true;
        context.state.layer.loging_status = true;
        axios({
          method: "get",
          url: url,
          headers: context.state.register.headers,
          timeout: 100000,
          params: {
            username: context.state.register.Globalusername,
            oid: context.state.register.oid,
            ulevel: context.state.register.ulevel,
            page: page,
            t1: context.state.startTime,
            t2: context.state.endTime,
            ty: ty,
            live_game_id: context.state.selectData_1,
            re_deal_code: context.state.selectData_1,
            child_game_id: context.state.selectData_2
          }
        }).then((response) => {
          context.state.layer.main_layer = false;
          setTimeout(() => {
            context.state.layer.loging_status = false;
          }, 100);
          if(response.data.dataList == '') {
            setTimeout(() => {
              context.commit('centerTip', 20);
            }, 100);
          } else if(response.data.dataList !== '') {
            let data_1 = response.data.data,
              data_2 = response.data.dataList,
              data_page = response.data.pagation,
              data_total = response.data.total;
            context.state.totalNumber = data_page.totalNumber / 10;
            if(data_page.totalNumber !== 0 && context.state.select2 == false) {
              for(let i = 0; i < data_1.length; i++) {
                context.state.recordDatas.push({
                  order: (page * 10 + i + 1 - 10),
                  number: data_1[i].createTime,
                  time: data_1[i].fromKeyType,
                  quota: data_1[i].memo,
                  winlost: data_1[i].remit
                });
              }
            } else if(data_page.totalNumber !== 0 && context.state.select2 == true) {
              //投注记录
              context.state.winlose = data_total.winlose;
              context.state.betamount = data_total.betamount;
              for(let i = 0; i < data_2.length; i++) {
                var arr = new Array();
                switch(data_2[i].winloseType) {
                  case "1":
                    arr[i] = "输";
                    break;
                  case "2":
                    arr[i] = "赢"
                    break;
                  case "3":
                    arr[i] = "和"
                }
                context.state.recordDatas.push({
                  order: data_2[i].gameName,
                  number: data_2[i].billNo,
                  time: data_2[i].betTime,
                  quota: data_2[i].betamount,
                  winlost: arr[i]
                });

              }
            } else if(data_page.totalNumber == 0) {
              setTimeout(() => {
                context.commit('centerTip', 20);
              }, 400);
            }
          }
          //then结束
        }).catch((err) => {
          context.commit('centerTip', 24);
          setTimeout(() => {
            context.commit('loginout')
          }, 1500);
        })
      } else if(page > context.state.totalNumber) {
        context.state.showEnd = false;
        if(a !== 1) {
          context.commit('centerTip', 21);
        } else if(a == 1) {
          return false;
        }
        var a = 1;
      } else {
        context.state.showEnd = false;
        context.commit("centerTip", 21)
      }
    },
    loginGame(context, value) {
      const maintainStatus = context.state.maintainStatus,
        firstTest = value.substr(0, 2) + '_all',
        loginStatus = context.state.register.loginStatus,
        getMaintain_1 = maintainStatus.get(firstTest),
        getMaintain_2 = maintainStatus.get(value);
      if(getMaintain_1 == 1 && getMaintain_2 == 1) {
        if(loginStatus === 211003 && value !== 'mg_game' && value !== 'ww_sport') {
          window.location.href = `${context.state.url}dist/php/mobile/mobile_game_login.php?action=${value}&username=${context.state.register.Globalusername}&oid=${context.state.register.oid}&version=01`;
        } else if(loginStatus === 211003 && value == 'mg_game') {
          window.location.href = '/mg.html';
        } else if(loginStatus === 211003 && value == 'ww_sport') {
          window.location.href = `${context.state.url}iframe.html?src=${context.state.url}dist/php/mobile/mobile_game_login.php?action=${value}&username=${context.state.register.Globalusername}&oid=${context.state.register.oid}&version=01`;
        } else {
          context.commit('registerTip', '请先登录！');
        }
      } else {
        context.commit('registerTip', '游戏正在维护中!');
      }
    }
  },
  modules: {
    register: Userregister,
    center: center,
    layer: layer
  }
})

export default userStore;