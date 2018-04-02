<template>
 <div class="goods">
  <div class="menu-wrapper" ref="menuWrapper">
   <ul>
      <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex==index}" @click="selectMenu(index,$event)">
        <span class="text border-1px"> <span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>{{item.name}}</span>
      </li>
    </ul>
  </div>
  <div class="foods-wrapper" ref="foodsWrapper">
    <ul> 
      <li v-for="item in goods" class="food-list food-list-hook">
        <h1 class="title">{{item.name}}</h1>
         <ul>
            <li v-for="food in item.foods" class="food-item border-1px" @click="selectFood(food,$event)">
               <div class="icon">
                  <img :src="food.icon">
               </div>
               <div class="content">
                   <h1 class="name">{{food.name}}</h1>
                   <p class="desc">{{food.description}}</p>
                   <div class="extra">
                       <span>月售{{food.sellCount}}</span>
                       <span>好评率{{food.rating}}</span>
                   </div>
                   <div class="price">
                       <span class="now" >￥{{food.price}}</span>
                       <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                   </div>
                   <div class="cartcontrol-wrapper">
                   <cartcontrol :food="food" v-on:increament="increamental"></cartcontrol>
                   </div>
               </div>
            </li>
         </ul>
      </li>
    </ul>
  </div>
  <shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectfoods" ref="shopCart"></shopcart>
  <food :food="selectedFood" ref="food"></food>
 </div> 
</template>

<script type="text/eamascript-6">
import BScroll from 'better-scroll'
import shopcart from '../../components/shopcart/shopcart'
import cartcontrol from '../../components/cartcontrol/cartcontrol'
import food from '../../components/food/food'
//此处的seller是由router-view渲染得到的;
export default {
  props:{
    seller:{
      type:Object
    }
  },
  data(){
    return {
      goods:[],   //存放获取的goods;
      listHeight:[],  //存放每一个good对应的clientHeight;
      scrollY:0,      //每一个good滚动的y;
      selectedFood:{}  //选中的food;
    }
  },
  components:{
    shopcart:shopcart,
    cartcontrol:cartcontrol,
    food:food
   },
  mounted:function(){
    this.$nextTick(function(){
      this.getData()
    })
  },
  created(){
   //define the image array to load 
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  computed:{
    //计算当前的good位置-索引;
    currentIndex(){
      for(let i=0;i<this.listHeight.length;i++){
        let currentHeight1=this.listHeight[i];
        let currentHeight2=this.listHeight[i+1];
        if(!currentHeight2||(this.scrollY>=currentHeight1&&this.scrollY<currentHeight2)){
          return i;
        }
      }
    return 0;
    },
    //选择food,将其放置foodsArray数组中;
    selectfoods(){
      let foodsArray=[];
      this.goods.forEach((good)=>{
        good.foods.forEach((food)=>{
          if(food.count>0){
            foodsArray.push(food)
          }
        })
      })
    return foodsArray;
    }
  },
  methods:{
    //获取goods数据;
    getData(){
      this.$http.get('./api/goods').then(res=>{
        this.goods=res.data.data,
        //this.$nextTick可以保证dom渲染完成之后调用相关dom方法;
        this.$nextTick(()=>{
          this._initScroll(),
          this._calculateHeight()
        })
      }).catch(err=>{
	  		 console.log(err);
  			});
    },

   //selectMenu实现foods栏滚动,运用scrollToElement接口;
   //!event._constructed阻止betterscroll派发事件,
   //只有我们派发的自定义事件才支持;
    selectMenu(index,event){
      if(!event._constructed){
        return ;
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let el=foodList[index];
      this.foodsScroll.scrollToElement(el,300);
   },
   //在父组件选中商品，传递给子组件;*判断是不是better-scroll派发的事件;
    selectFood(food,event){
      if(!event._constructed){
        return ;
      }
      this.selectedFood=food;
      this.$refs.food.show();
    },

   //Implement the menu bar with the item bar to scroll
    _initScroll(){
      //click:true用于取消betterScroll的默认行为,但是在pc端click事件正常；
      this.menuScroll=new BScroll(this.$refs.menuWrapper,{click:true});
      //probeType:3表示foods栏在滚动时候实时告诉滚动位置;
      this.foodsScroll=new BScroll(this.$refs.foodsWrapper,{probeType:3,click:true});
      this.foodsScroll.on("scroll",(pos)=>{
        this.scrollY=Math.abs(Math.round(pos.y));
      })
    },
    
    //计算每一个food分类对应的clientHeight;
    _calculateHeight(){
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let height=0;
      this.listHeight.push(height);
      for(let i=0;i<foodList.length;i++){
        let item=foodList[i];
        height+=item.clientHeight;
        this.listHeight.push(height);
     }
    },

    //increamental用来监听子组件传来的信息;v-on:increament="increamental"
    increamental(target){
      this.$refs.shopCart.drop(target);
    }
   }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
 @import "../../common/stylus/mixin"
.goods
 display:flex
 position:absolute
 width:100%
 top:181px
 bottom:46px
 overflow:hidden

 .menu-wrapper
   flex:0 0 80px
   width:80px
   background:#f3f5f7

   .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()

        .icon
           display:inline-block
           vertical-align: top
           width:20px
           height:20px
           margin-right:2px
           &.decrease
             bg-image('decrease_3')
           &.discount
             bg-image('discount_3')
           &.guarantee
             bg-image('guarantee_3')
           &.invoice
             bg-image('invoice_3')
           &.special
             bg-image('special_3')
        
        .text
           display:table-cell
           width:56px
           font-size:12px
           border-1px(rgba(7, 17, 27, 0.1))
           vertical-align:middle    

 .foods-wrapper
   flex:1
   .title
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: 2px solid #d9dde1
      font-size: 12px
      color: rgb(147, 153, 159)
      background: #f3f5f7

   .food-item
      display: flex
      margin: 18px
      border-1px(rgba(7, 17, 27, 0.1))
      padding-bottom: 18px 

      &:last-child
          border-none()
          margin-bottom: 0

      .icon
          flex: 0 0 57px
          margin-right: 10px   

      .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)


          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159) 

          .desc
            line-height: 12px
            margin-bottom: 8px
            
          .extra
            .count
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
            position:absolute
            bottom:12px
            right:0px

</style>
