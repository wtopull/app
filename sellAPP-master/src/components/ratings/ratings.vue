<template>
  <div class="ratings" ref="el">
    <div class="rating-content">
       <div class="overview">
          <div class="overview-left">
             <h1 class="score">{{seller.score}}</h1>
             <div class="title">综合评分</div>
             <div class="rank">高于周边商家{{seller.rankRate}}%</div>
          </div>
          <div class="overview-right">
             <div class="score-wrapper">
                <span class="title">服务态度</span>
                <star :size="36" :score="seller.serviceScore"></star>
             </div>
             <div class="score-wrapper">
                <span class="title">服务态度</span>
                <star :size="36" :score="seller.foodScore"></star>
             </div>
             <div class="delivery-wrapper">
                <span class="title">送达时间</span>
                <span class="delivery">{{seller.deliveryTime}}分钟</span>
             </div>
          </div>
       </div>
       <split></split>
       <ratingSelect  :selectType="selectType" :onlyContent="onlyContent" :desc="desc"
                      :ratings="ratings" v-on:incrementType="incrementalTotal" ></ratingselect></ratingSelect>
       <div class="rating-wrapper">
          <ul>
             <li v-for="rating in ratings" class="rating-item"  v-show="needShow(rating.rateType,rating.text)">
                <div class="avatar">
                  <img width="28" height="28" :src="rating.avatar">
                </div>
                <div class="content">
                  <h1 class="name">{{rating.username}}</h1>
                  <div class="star-wrapper">
		            <star :size="24" :score="rating.score"></star>
		            <span class="delivery" v-show="rating.deliveryTime">
		              {{rating.deliveryTime}}分钟送达
		            </span>
		          </div>
		          <p class="text">{{rating.text}}</p>
		          <div class="recommend" v-show="rating.recommend &&rating.recommend.length">
		              <span  class="item" v-for="item in rating.recommend" >{{item}}</span>
		          </div>
		          <div class="time">
                   {{rating.rateTime | formatTime}}
		          </div>
                </div>
             </li>
          </ul>
       </div>           
    </div>
  </div>
</template>

<script type="text/eamascript-6">
import BScroll from 'better-scroll';
import star from '../../components/star/star';
import split from '../../components/split/split';
import ratingSelect from '../../components/ratingSelect/ratingSelect';
import {formatDate} from '../../common/js/date';

const POSITIVE = 0; //定义满意评价
const NEGATIVE = 1; //定义不满意评价
const ALL = 2;      //定义所有评价

export default {
  data(){
	  return{
	    ratings:[],  //将获取的rating信息放置ratings数组中;
	    selectType:ALL,   //定义默认的rating类型是全部-ALL;
      onlyContent:true,  //定义是否只显示只有内容的评价;
      desc:{
        all: '全部',
        positive: '满意',
        negative: '不满意'
      }
	  }
  },
  props:{
	  seller:{
	    type:Object
	  }
  },
  components:{
	  star:star,
	  split:split,
	  ratingSelect:ratingSelect
  },
  mounted:function(){
    this.$nextTick(function(){
      this.getData()
    })
  },
  methods:{
    //获取rating信息;
    getData(){
      this.$http.get('./api/ratings').then(res=>{
        this.ratings=res.data.data;
        this.$nextTick(()=>{
          if(!this.ratingScroll){
            this.ratingScroll=new BScroll(this.$refs.el,{probeType:3,click:true});
          }else{
            this.ratingScroll.refresh();
          }
        })
      }).catch(err=>{
	  		    console.log(err);
  			});
    },
    //显示对应的rating;
    needShow(type,text){
      if(this.onlyContent&&!text){
        return false
      }
      if(this.selectType===ALL){
        return true
      }else{
        return type===this.selectType
      }
   },
   //监听来自ratingselect组件的rating信息;
	  incrementalTotal(type,data){
      this.type=data;
      this.$nextTick(() => {
        this.ratingScroll.refresh();
      });
    }
  },
  filters:{
    //格式化用户评论的时间;
	  formatTime(time){
      var date=new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
  }
}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
 @import "../../common/stylus/mixin"
.ratings
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            margin: 0 12px
            vertical-align: top
          .score
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
        .delivery-wrapper
          font-size: 0
          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)
  
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            margin-bottom: 4px
            line-height: 12px
            font-size: 10px
            color: rgb(7, 17, 27)
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
          .text
            margin-bottom: 8px
            line-height: 18px
            color: rgb(7, 17, 27)
            font-size: 12px
          .recommend
            line-height: 16px
            font-size: 0
            .item
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
              color: gray
              background: #fff
              font-size:9px
          .time
            position: absolute
            top: 0
            right: 0
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)     


</style>
