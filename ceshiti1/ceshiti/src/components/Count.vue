<template>
  <div class="ball-main">
    <ul>
      <template v-for="(item,index) in layout">
        <li>
          <div class="ball-num-warp">
            <h3 class="ball-title">{{item.title}}</h3>
            <template class="">
              <span v-for="b in item.balls" :class='[b.choose ? "active": ""]' @click="curBall(b,item)" class="ball-num">
                    {{ b.ball}} 
                    </span>
            </template>
          </div>
          <div class="ball-tools-warp">
            <a v-for="tools in ballTools" @click="toolsCur(tools,item)">{{tools.name}}</a>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Count',
  data() {
    return {
      layout: [{ "title": "万位", "balls": [{ "ball": 0, "choose": false }, { "ball": 1, "choose": false }, { "ball": 2, "choose": false }, { "ball": 3, "choose": false }, { "ball": 4, "choose": false }, { "ball": 5, "choose": false }, { "ball": 6, "choose": false }, { "ball": 7, "choose": false }, { "ball": 8, "choose": false }, { "ball": 9, "choose": false }] },
        { "title": "千位", "balls": [{ "ball": 0, "choose": false }, { "ball": 1, "choose": false }, { "ball": 2, "choose": false }, { "ball": 3, "choose": false }, { "ball": 4, "choose": false }, { "ball": 5, "choose": false }, { "ball": 6, "choose": false }, { "ball": 7, "choose": false }, { "ball": 8, "choose": false }, { "ball": 9, "choose": false }] }, { "title": "百位", "balls": [{ "ball": 0, "choose": false }, { "ball": 1, "choose": false }, { "ball": 2, "choose": false }, { "ball": 3, "choose": false }, { "ball": 4, "choose": false }, { "ball": 5, "choose": false }, { "ball": 6, "choose": false }, { "ball": 7, "choose": false }, { "ball": 8, "choose": false }, { "ball": 9, "choose": false }] }, { "title": "十位", "balls": [{ "ball": 0, "choose": false }, { "ball": 1, "choose": false }, { "ball": 2, "choose": false }, { "ball": 3, "choose": false }, { "ball": 4, "choose": false }, { "ball": 5, "choose": false }, { "ball": 6, "choose": false }, { "ball": 7, "choose": false }, { "ball": 8, "choose": false }, { "ball": 9, "choose": false }] }, { "title": "个位", "balls": [{ "ball": 0, "choose": false }, { "ball": 1, "choose": false }, { "ball": 2, "choose": false }, { "ball": 3, "choose": false }, { "ball": 4, "choose": false }, { "ball": 5, "choose": false }, { "ball": 6, "choose": false }, { "ball": 7, "choose": false }, { "ball": 8, "choose": false }, { "ball": 9, "choose": false }] }
      ],
      ballTools: [
        { fncode: 'full', name: '全' },
        { fncode: 'big', name: '大' },
        { fncode: 'small', name: '小' },
        { fncode: 'single', name: '单' },
        { fncode: 'double', name: '双' },
        { fncode: 'empty', name: '清' }
      ]
    }

  },
  components: {

  },
  computed: {

  },
  watch: {},
  created() {},
  mounted() {},
  methods: {

    curBall(item, list) {
      // 如果只能选择一个球
      if (list.chooseOne) {
        list.balls.map((b) => {
          b.choose = false
        })
      }
      item.choose = !item.choose
    },

    full({ ball }) {
      this.empty({ ball })
      ball.filter(list => {
        list.choose = true
      })
    },
    big({ ball }) {
      // console.log(ball)
      this.empty({ ball })
      // let Half = ball.length % 2 === 0
      let len = Math.ceil(ball.length / 2)
      ball.filter((list, idx) => {
        if (idx >= len) {
          list.choose = true
        }
      })
    },
    small({ ball }) {
      this.empty({ ball })
      let len = Math.ceil(ball.length / 2)
      ball.filter((list, idx) => {
        if (idx < len) {
          list.choose = true
        }
      })
    },
    single({ ball }) {
      this.empty({ ball })
      ball.filter(list => {
        if (list.ball % 2) {
          list.choose = true
        }
      })
    },
    double({ ball }) {
      this.empty({ ball })
      ball.filter(list => {
        if (list.ball % 2 === 0) {
          list.choose = true
        }
      })
    },
    empty({ ball }) {
      ball.filter(list => {
        list.choose = false
      })
    },

    toolsCur(tools,item) {
      if (Object.is(tools.fncode,'full')) {
        this.full({ball: item.balls})
      } else if(Object.is(tools.fncode,'big')) {
        this.big({ball: item.balls})
      }else if(Object.is(tools.fncode,'small')){
             this.small({ball: item.balls})
      }else if(Object.is(tools.fncode,'single')){
           this.small({ball: item.balls})  
      }else if(Object.is(tools.fncode,'double')){
         this.double({ball: item.balls})
      }else{
        this.empty({ball: item.balls})
      }
      /*switch (tools.fncode) {
          case 'full':
          this.full({ball: item.balls})
          case 'big':
          this.big({ball: item.balls})
           case 'small':
          this.small({ball: item.balls})
           case 'single':
          this.single({ball: item.balls})
           case 'double':
          this.double({ball: item.balls})
          break;
           case 'empty':
          this.empty({ball: item.balls})
          break;
        
      }*/
    },
  }

}

</script>
<style>
* {
  padding: 0;
  margin: 0;
}

ul li {
  list-style: none
}

.play-content {
  width: 100%;
  overflow: hidden;
}

.play-content h3 {
  width: 50px;
  float: left;
  height: 40px;
  line-height: 40px;
}

.play-content .play-ul button {
  float: left;
  margin: 4px;
  border-radius: 0;
}

.ball-content {
  font-size: 14px;
}

.buy-tips {
  margin-top: 10px;
  width: 500px;
  text-align: left
}

.ball-main {
  padding: 10px 10px 10px;
  margin: 0 auto;
  background: #fff;
}

.ball-main li {
  width: 100%;
  overflow: hidden;
  padding-top: 10px;
}

.ball-main li:last-child {
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
}

.ball-main .desc-pop .ivu-poptip-inner {
  white-space: normal
}

.ball-num-warp {
  float: left
}

.ball-main li .ball-title {
  width: 75px;
  float: left;
  margin: 5px 14px 5px 0;
  line-height: 30px;
  height: 30px;
  background: #ededed;
  text-align: center;
  border-radius: 3px;
  color: #000;
  position: relative;
}

.ball-main li .ball-title:after {
  content: "";
  position: absolute;
  right: -15px;
  top: 7px;
  display: block;
  width: 0;
  height: 0;
  border-width: 8px;
  border-style: dashed dashed dashed solid;
  border-color: transparent transparent transparent #ededed;
}

.ball-main .ball-num {
  width: 36px;
  height: 36px;
  line-height: 34px;
  display: inline-block;
  border: 1px solid #b0b0b0;
  text-align: center;
  border-radius: 50%;
  color: #222;
  margin-right: 10px;
  cursor: pointer;
  background: linear-gradient(#fff, #e5e5e5);
  font-size: 21px;
}

.ball-num-warp .xyc-dw-balls {
  display: inline-block;
  margin-bottom: 5px;
  height: 68px;
  width: 68px;
  line-height: 36px;
  font-size: 14px;
}

.xyc-dw-balls span {
  display: inline-block;
  width: 60px;
}

.ball-main .ball-txt {
  padding: 0 2px;
  height: 36px;
  line-height: 36px;
  display: inline-block;
  border: 1px solid #b0b0b0;
  text-align: center;
  border-radius: 3px;
  color: #222;
  margin-right: 10px;
  cursor: pointer;
  background: linear-gradient(#fff, #e5e5e5);
  font-size: 21px;
}

.ball-main .ball-num.active,
.ball-main .ball-txt.active {
  background: #00b5b1;
  border-color: #00b5b1;
  color: #fff;
}

.ball-tools-warp {
  float: right;
  padding: 3px 0;
}

.ball-tools-warp a {
  height: 28px;
  width: 28px;
  float: left;
  color: #666;
  display: block;
  text-align: center;
  line-height: 28px;
  cursor: pointer;
  margin: 0 5px;
  font-size: 13px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #b0b0b0
}

.ball-tools-warp a:hover {
  background: #00b5b1;
  color: #fff;
  border-color: #00b5b1;
}

.shop-cart {
  border-top: 1px solid #ddd;
  margin: 0 -20px;
  display: flex;
}

.buySet-warp {
  padding: 10px 0px 12px;
  clear: both;
  /*overflow: hidden;*/
  line-height: 36px;
}

.buySet-warp .buySet-warp-left>div {
  padding: 0 4px;
  display: inline-block;
  vertical-align: middle;
  margin: 0 5px;
}

.buySet-warp-left .ivu-btn-group .ivu-btn {
  padding: 6px 10px;
  margin-right: 3px;
  border-radius: 5px;
}

.buySet-warp-left .ivu-btn-group:not(.ivu-btn-group-vertical)>.ivu-btn:first-child:not(:last-child),
.buySet-warp-left .ivu-btn-group .ivu-btn:not(:first-child):not(:last-child),
.buySet-warp-left .ivu-btn-group:not(.ivu-btn-group-vertical)>.ivu-btn:last-child:not(:first-child) {
  border-radius: 5px;
}

.lottery-content>.ivu-tabs {
  width: 100%;
}

.lottery-content .ivu-btn-group:not(.ivu-btn-group-vertical) .ivu-btn-primary+.ivu-btn,
.ivu-btn-group:not(.ivu-btn-group-vertical) .ivu-btn-primary:last-child:not(:first-child) {
  border-left-color: #dddee1 !important;
}

.buySet-warp-right {
  text-align: right;
}

.buySet-warp em {
  color: #ff8f35;
}

.buySet-Btns {
  padding-left: 100px;
}

.buySet-Btns .ivu-btn {
  margin-top: 5px;
  margin-left: 15px;
}

.buySet-Btns .ivu-btn:first-child {
  background: #43aef9;
  border-color: #43aef9;
}

.buySet-Btns .ivu-btn:first-child:hover,
.buySet-Btns .ivu-btn:nth-child(2),
.buySet-Btns .ivu-btn:nth-child(3) {
  color: #fff;
}

.buySet-Btns .ivu-btn:nth-child(2) {
  background: #ff778d;
  border-color: #ff778d;
}

.buySet-Btns .ivu-btn:nth-child(3) {
  background: #00b5b1;
  border-color: #00b5b1
}

.buySet-Btns .ivu-icon {
  font-size: 20px;
  vertical-align: middle;
}


/*.buySet-Btns .ivu-btn:last-child {*/


/*float: right;*/


/*background: #ff8f35;*/


/*border: 2px solid #d25e00;*/


/*padding: 10px 15px;*/


/*margin: 0*/


/*}*/

.buyCard {
  margin: -64px 0px 15px 10px;
  position: relative;
  padding-bottom: 22px;
  padding-top: 40px;
  border: 1px solid #ddd;
}

.buyCard h3 {
  font-size: 30px;
  color: rgb(223, 223, 223);
  text-align: center;
  margin-top: 40px;
}

.buyCard .buyCard-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: #ebebeb;
  height: 40px;
  padding: 8px;
}

.buyCard .buyCard-top i {
  font-size: 20px;
  margin-right: 5px;
  vertical-align: middle;
}

.buyCard .buyCard-top h5 {
  font-size: 16px;
  float: left;
}

.buyCard .buyCard-top h5 i {
  color: #00b5b1
}

.buyCard .buyCard-top span {
  font-size: 14px;
  float: right;
  cursor: pointer;
}

.buyCard .table {
  width: 100%;
  font-size: 14px;
  color: #575757;
  height: 400px;
  overflow: auto;
}

.buyCard .table>li:nth-child(1) {
  width: 100%;
}

.buyCard .totalinfo {
  color: #666;
  font-size: 14px;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 800;
  width: 100%;
  line-height: 18px;
  padding-bottom: 4px;
}

.buyCard .totalinfo .ivu-btn-group {
  margin-top: 5px;
  padding: 0 8px;
  width: 100%;
  font-size: 12px;
}

.buyCard .totalinfo .ivu-btn-group .ivu-btn:first-child {
  width: 63%;
  font-size: 12px;
  border-radius: 5px !important;
  background: #00b5b1;
  color: #fff !important;
  border-color: #00b5b1;
}

.buyCard .totalinfo .ivu-btn-group .ivu-btn:first-child span.buy {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  display: block;
}

.buyCard .totalinfo .ivu-btn-group .ivu-btn:first-child span.buy i {
  margin-right: 5px;
}

.totalinfo>span {
  color: #ff8f35
}

.buyCard .totalinfo .ivu-btn-group .ivu-btn:last-child {
  width: 35%;
  float: right;
  height: 63px;
  border-radius: 5px !important;
  font-size: 16px;
  background: #f6f6f6;
  border-color: #dadada;
  color: #666;
  padding: 6px 0;
}

.buyCard .table li {
  padding: 0;
  border-bottom: 1px dashed #eee;
}

.buyCard .table .td,
.buyCard .table .th {
  line-height: 40px;
  height: 40px;
  text-align: center;
  font-weight: normal;
  width: 23%;
  display: inline-block;
  float: left
}

.buyCard .table .td:last-child,
.buyCard .table .th:last-child {
  width: 8%
}

.buyCard .table .buyCardlist {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #01b5b1;
  cursor: pointer;
}

.ivu-tabs-nav-wrap {
  background: #e7eefe;
}


.lottery-time {
  background: #e7eefe;
  line-height: 30px;
  padding-left: 20px;
}


.comp-lottery-ssc {
  margin: 0;
  background: #fff;
  border: 1px solid #bedbdd;
}

.comp-lottery-ssc .ivu-btn:hover {
  opacity: .9
}

.comp-lottery-ssc .ivu-poptip-content {

  display: block
}



.btn-del {
  color: #999;
  font-size: 20px;
}


.cyel {

  color: #ff7e00;
}

.buyTips {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 500px;
  float: left;
}

</style>
