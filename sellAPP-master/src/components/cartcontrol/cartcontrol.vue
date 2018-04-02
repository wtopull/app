<template>
  <div class="cartcontrol">
    <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="desCount">-</div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-increase" @click.stop.prevent="addCount">+</div>
  </div>
</template>

<script type="text/eamascript-6">
import Vue from 'vue';
export default {
  props:{
    food:{
      type:Object
    }
  },
  methods:{
    //添加food;
    addCount(event){
 //因为此组件隶属于goods组件，当触发betterScroll时，判断此事件是不是betterScroll派发的如果是阻止;保证事件执行一次;
      if (!event._constructed) {
        return;
      }
      if(!this.food.count){
        Vue.set(this.food,'count',1)
      }else{
        this.food.count++
      }
     this.$emit('increament',event.target)
    },

    //较少food;
    desCount(event){
      if (!event._constructed) {
        return;
      }
      if(!this.food.count){
        Vue.set(this.food,'count',0)
      }else{
      this.food.count--
      } 
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
  font-size:0
  .cart-decrease, .cart-increase
    padding:6px
    font-size:24px
    line-height:24px
    display:inline-block
  .cart-count
    display: inline-block
    vertical-align: top
    width: 12px
    padding-top: 6px
    line-height: 24px
    text-align: center
    font-size: 14px
    color: rgb(147, 153, 159)
  .cart-increase
    display:inline-block 
    color: rgb(0, 160, 220)
</style>
