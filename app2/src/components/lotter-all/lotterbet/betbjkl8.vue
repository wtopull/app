<template>
  <div class="betbjkl8">
    <ul class="betbjkl8-top">
      <li><router-link to="/one" tag="i" class="el-icon-arrow-left"></router-link></li>
      <li>
        <p class="wangfa">玩<br/>法</p>
        <div class="menu" @click="show = !show">{{titles}}
          <i :class="show ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
        </div>
        <div class="menu-list">
            <van-popup v-model="show" position="top">
            <div class="menu-list-top">
              <p :class="{'active': index === navs}" v-for="(muens,index) in muen" :key="index" @click.stop="menunav($event,index,muens)">{{muens.a}}</p>
            </div>
            <ul>
              <li v-for="(val,index) in muen" :key="index" v-show="index === navs">
                <p :class="{'active': index === list}" v-for="(item,index) in val.valus" :key="index"  @click.stop="isshow($event,item,index)">{{item}}</p>
                </li>
            </ul>
            </van-popup>
        </div>
      </li>
      <li><p>北京快乐</p></li>
    </ul>
    <div class="betbjkl8-content">
      <div class="lottery-box">
        <div class="lottery-top" @click="lottery = !lottery">
          <p>888888开奖：<ul><li v-for="(item,index) in 10" :key="index">1</li>...</ul></p>
          <p>888888投注：<span>00:00:00</span><i :class=" lottery ? 'el-icon-arrow-down' :'el-icon-arrow-up'"></i></p>
          <div class="lottery-ms" v-show=" !lottery">
            <p><span>期号</span><span>开奖号码</span></p>
            <ul>
              <li v-for=" (item,index) in 10" :key="index">
                <div>
                  <span>888888</span>
                  <span>00:00:00</span>
                </div><i class="el-icon-minus"></i>
                <div>
                  <ul>
                    <li v-for="(item,index) in 20" :key="index">02</li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="lottery-content">
          <div class="lottery-scoll-box">
            <!-- <ul class="annotation" ref="annotation">
              <li class="active">从01-80中选择1个号码组成一注，当期开奖结果的20个号码中包含所选号码，即可中奖。奖金<span>7.80</span>元</li>
              <li>从01-80中选择2-8个号码，当期开奖结果的20个号码中包含所选号码中的两个，即可中奖。奖金<span>32.43</span>元</li>
              <li>从01-80中选择3-8个号码，当期开奖结果的20个号码中包含所选号码中的三个，即可中奖。<span>奖金详情</span></li>
              <li>从01-80中选择4-8个号码，当期开奖结果的20个号码中包含所选号码中的四个，即可中奖。<span>奖金详情</span></li>
              <li>从01-80中选择5-8个号码，当期开奖结果的20个号码中包含所选号码中的五个，即可中奖。<span>奖金详情</span></li>
              <li>从01-80中选择6-8个号码，当期开奖结果的20个号码中包含所选号码中的六个，即可中奖。<span>奖金详情</span></li>
              <li>从01-80中选择7-8个号码，当期开奖结果的20个号码中包含所选号码中的七个，即可中奖。<span>奖金详情</span></li>
            </ul> -->
            <p v-for="(annotations,index) in annotation" :key="index" v-show="index === list">{{annotations.title}}</p>
            <div class="lottery-scoll">
              <p><span>上盘</span></p>
              <ul><li v-for="(val,index) in 40" class="active" :key="index">{{index+1}}</li></ul>
            </div>
            <div class="lottery-scoll">
              <p><span>下盘</span></p>
              <ul><li v-for="(val,index) in 40" class="active" :key="index">{{index+1}}</li></ul>
            </div>
          </div>
        </div>
        <cart></cart>
      </div>
    </div>
  </div>
</template>
<script>
import cart from '../../public/cart'
  export default {
    data() {
      return {
        show:false,
        show1:false,
        lottery:true,
        navs: 0,
        list:0,
        titles:'任选一',
        annotation:[
          {title:'从01-80中选择1个号码组成一注，当期开奖结果的20个号码中包含所选号码，即可中奖。'},
          {title:'从01-80中选择2-8个号码，当期开奖结果的20个号码中包含所选号码中的两个，即可中奖。'},
          {title:'从01-80中选择3-8个号码，当期开奖结果的20个号码中包含所选号码中的三个，即可中奖。'},
          {title:'从01-80中选择4-8个号码，当期开奖结果的20个号码中包含所选号码中的四个，即可中奖。'},
          {title:'从01-80中选择5-8个号码，当期开奖结果的20个号码中包含所选号码中的五个，即可中奖。'},
          {title:'从01-80中选择6-8个号码，当期开奖结果的20个号码中包含所选号码中的六个，即可中奖。'},
          {title:'从01-80中选择7-8个号码，当期开奖结果的20个号码中包含所选号码中的七个，即可中奖。'},
        ],
        muen:[
          {a:'任选',valus:['任选一','任选二','任选三','任选四','任选五','任选六','任选七']},
          {a:'趣味',valus:['上下盘','奇偶盘','和值大小单双']},
        ]
      };
    },
    mounted () {  

    }, 
    methods: {
      menunav(event,index,muens){
        if(muens){
          this.navs = index;
        }
      },
      isshow(event,item,index){
        this.titles = item;
        this.list = index;
        this.show = !this.show;
        // const anno = this.$refs.annotation;
        // this.$refs.annotation.style.background = 'red'; 
        
        //   console.log(index);
      }
    },
    components:{
      cart
    }
  }
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/lotter-list/lotterbet/betbjkl8.scss'
</style>