<template>
  <div class="ratingselect">
     <div class="rating-type border-1px">
        <span class="block positive"  @click="select(2,$event)" :class="{'active':this.selecttype===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
        <span  class="block positive"  @click="select(0,$event)"  :class="{'active':this.selecttype===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
        <span  class="block negative"  @click="select(1,$event)"  :class="{'active':this.selecttype===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
     </div>
     <div class="switch"  @click.stop.prevent="toggleContent($event)" >
        <span class="icon-check_circle" :class="{'on':this.onlycontent}"></span>
        <span class="text" >只看有内容的评价</span>
     </div>
  </div>
</template>

<script type="text/eamascript-6">
 const POSITIVE = 0; //定义正向评价
 const NEGATIVE = 1; //定义负面评价
 const ALL = 2;      //定义所有评价
export default {
  data(){
    return{
      positiveArray:[],  //满意数组;
      negativeArray:[],  //吐槽数组;
      onlycontent:this.onlyContent,  //不能派发来自父组件的信息,重新赋值进行派发;
      selecttype:this.selectType     //同上;
    }
  },
  props:{
    ratings:{
      type:Array,      //type是Array的需要返回一个空数组;
      default(){
        return [];
      }
    },
    selectType:{      //定义rating默认类型是all-全部;
      type:Number,
      default:ALL
    },
    onlyContent:{     //定义是否只显示内容的评价;
      type:Boolean,
      default:false
    },
    desc:{
      type:Object,
      default(){
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  computed:{
    //获取类型为满意的评价;
    positives(){
      this.positiveArray=[];   //每次将positiveArray清空,防止出现数据叠加;
      for(let i=0;i<this.ratings.length;i++){
        if(this.ratings[i].rateType===POSITIVE){
          this.positiveArray.push(this.ratings[i]);
        }
      }
      return this.positiveArray;
    },
    //获取不满意的评价;
    negatives(){
      this.negativeArray=[];   //negativeArray,防止出现数据叠加;
      this.ratings.forEach((rating)=>{
        if(rating.rateType==NEGATIVE){
          this.negativeArray.push(rating);
        }
      })
    return this.negativeArray;
    }
  },
  methods:{
    //选择对应的rating;
    select(type,event){
      if(!event._constructed){
        return ;
      }
      this.selecttype=type; 
      this.$emit('incrementType','selectType',this.selecttype); //将信息传递给父组件,此处type是数值；
    },
    //切换是否只显示有内容的评价;
    toggleContent(event){
      if(!event._constructed){
        return ;
      }
      this.onlycontent=!this.onlycontent;
      this.$emit('incrementType','onlyContent',this.onlycontent)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.ratingselect
  .rating-type
      padding: 18px 0
      margin: 0 18px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size: 0
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        font-size: 12px
        color: rgb(77, 85, 93)
        &.active
          color: #fff
        .count
          margin-left: 2px
          font-size: 8px   
        &.positive
          background: rgba(0, 160, 220, 0.2)
          &.active
            background: rgb(0, 160, 220)
        &.negative
          background: rgba(77, 85, 93, 0.2) 
          &.active
            background: rgb(77, 85, 93) 
  .switch
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      .icon-check_circle
        display: inline-block
        margin-top:3px
        margin-right: 4px
        height:15px
        width:15px
        background:gray
        &.on
           background:red
      .text
        display: inline-block
        vertical-align: top
        font-size: 12px          


</style>
