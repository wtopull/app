<template>
 <transition name="move">
  <div class="food" v-show="showFlag" ref="el">
    <div class="food-content">
      <div class="food-header">
        <img :src="food.image">
         <div class="back" @click="hide">
          <span class="icon-arrow_lift"><</span>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
         <span class="now" >￥{{food.price}}</span>
         <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper">
        <cartcontrol :food="food" v-on:increament="increamental"></cartcontrol>
        </div>
        <transition name="fade">
        <div class="buy" v-show="!food.count||food.count===0" @click.stop.prevent="addFirst">加入购物车</div>
        </transition>
      </div>
      <split v-show="food.info"></split>
      <div class="info" v-show="food.info">
        <h1 class="title">商品介绍</h1>
        <span class="text">{{food.info}}</span>
      </div>
      <split></split>
      <div class="rating">
        <h1 class="title">商品评价</h1>
        <ratingselect  :selectType="selectType" :onlyContent="onlyContent" :desc="desc"
                      :ratings="food.ratings" v-on:incrementType="incrementalTotal" ></ratingselect>
        <div class="rating-wrapper">
           <ul v-show="food.ratings&&food.ratings.length">
              <li v-for="rating in food.ratings" class="rating-item "
              v-show="needShow(rating.rateType,rating.text)">
                 <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <img class="avatar" width="12" height="12" :src="rating.avatar">
                 </div>
                 <div class="time">{{rating.rateTime|formatTime}}</div>
                 <p class="text">
                  {{rating.text}}
                 </p>
              </li>
           </ul>
           <div class="no-rating" v-show="!food.ratings||!food.ratings.length">暂无评价</div>
        </div>
      </div>
    </div>
     <shopcart ref="shopCart"></shopcart>
  </div>
   </transition>
</template>

<script type="text/eamascript-6">
import BScroll from 'better-scroll'
import cartcontrol from '../../components/cartcontrol/cartcontrol'
import Vue from 'vue';
import shopcart from '../../components/shopcart/shopcart'
import split from '../../components/split/split'
import ratingselect from '../../components/ratingSelect/ratingSelect'
import {formatDate} from '../../common/js/date'
 const POSITIVE = 0; //定义正向评价
 const NEGATIVE = 1; //定义负面评价
 const ALL = 2;      //定义所有评价

export default {
  data(){
	  return{
	    showFlag:false,   //显示/隐藏food;
      selectType:ALL,   //选择评价的类型;
      onlyContent:true,//定义是否只显示有内容的评价;
      desc:{
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
	  }
  },
  props:{
	  food:{
	    type:Object
	  }
  },
  components:{
    cartcontrol:cartcontrol,
    shopcart:shopcart,
    split:split,
    ratingselect:ratingselect
  },
  methods:{
    //显示选中的food;
    show(){
      this.showFlag=true;
      this.selectType=ALL;  //保证每次显示的时候都进行初始化;
      this.onlyContent=false; //保证每次显示的时候都进行初始化;
      this.$nextTick(()=>{
        if(!this.scroll){
          this.foodScroll=new BScroll(this.$refs.el,{probeType:3,click:true});
        }else{
          this.foodScroll.refresh();
        }
      })
    },
    //隐藏对应的food;
    hide(){
      this.showFlag=false;
    },
    addFirst(event){
      if(!event._constructed){
        return ;
      }
    //第一次添加商品时，调用shopcart组件的drop方法,实现动画效果;
      this.$refs.shopCart.drop(event.target);
      Vue.set(this.food,'count',1)
    },
    //监听第一次添加商品后，添加商品事件监听，监听来自子组件cartcontrol事件;
    increamental(target){
      this.$refs.shopCart.drop(target);
      },
    //监听ratingselect组件传递的rating信息;  
    incrementalTotal(type,data){
      this.type=data;
      this.$nextTick(() => {
        this.foodScroll.refresh();
      });
   },
   //控制显示对应的rating信息;
    needShow(type,text){
      if(this.onlyContent&&!text){
        return false
      }
      if(this.selectType===ALL){
        return true
      }else{
        return type===this.selectType
      }
   }  
},
//定义过滤器函数，用于格式化rating的时间;
filters:{
  formatTime(time){
    var date=new Date(time);
    return formatDate(date, 'yyyy-MM-dd hh:mm');
  }
}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.food
  position:fixed
  left:0
  top:0
  bottom:48px
  width:100%
  z-index:30
  background:#fff
  &.move-enter-active, &.move-leave-active 
    transition: all .2s linear
    transform:translate3d(0,0,0) 
  &.move-enter,&.move-leave-active 
    transform:translate3d(100%,0,0)
  .food-header
    position: relative
    width:100%
    height:0
    padding-top:100%
    img
      position: absolute
      left: 0
      top:0
      width:100%
      height:100%

    .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px
          font-size: 20px
          color: red
          font-weight: 700
  .content
      position: relative
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        font-size: 0
        .sell-count, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240, 20, 20)       
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)

      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: 10px
        color: #fff
        background: rgb(0, 160, 220)  
        &.fade-enter-active, .fade-leave-active 
          transition: opacity .5s ease
        &.fade-enter, .fade-leave-active 
          opacity: 0   
  .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7, 17, 27)
      .text
        line-height: 24px
        padding: 0 8px
        font-size: 12px
        color: rgb(77, 85, 93)   

  .rating
      padding-top: 18px
      .title
        line-height: 14px
        margin-left: 18px
        font-size: 14px
        color: rgb(7, 17, 27)    

      .rating-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .user
            position: absolute
            right: 0
            top: 16px
            line-height: 12px
            font-size: 0
            .name
              display: inline-block
              margin-right: 6px
              vertical-align: top
              font-size: 10px
              color: rgb(147, 153, 159)
            .avatar
              border-radius: 50%       

          .time
            margin-bottom: 6px
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)    

          .text
            line-height: 16px
            font-size: 12px
            color: rgb(7, 17, 27)   

        .no-rating
          padding: 16px 0
          font-size: 12px
          color: rgb(147, 153, 159)           
</style>
