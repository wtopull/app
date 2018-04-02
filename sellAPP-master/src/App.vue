<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link :to="{name:'goods',params:{goodsId:'id=123'}}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{name:'ratings',params:{ratingsId:'id=456'}}">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{name:'seller',params:{sellerId:'id=789'}}">商家</router-link>
      </div>
  </div>
  <keep-alive>
        <router-view :seller="seller"></router-view>
  </keep-alive>
  </div>
</template>

<script>
import header from './components/header/header.vue';
import {urlParse} from './common/js/util';
export default {
data(){
  return{
      seller:{
        id: (() => {
          let queryParam = urlParse();
          return queryParam;
        })()
      }
    }
},
mounted: function () {
    this.$nextTick(function(){
      this.getData();
    })
  },
methods:{
getData(){
  this.$http.get('./api/seller?id='+this.seller.id).then(res=>{
  //扩展this.seller，将seller.id添加到seller中;
  this.seller = Object.assign({}, this.seller, res.data.data);
  }).catch(error=>{
  console.log(error)
  })
  }
},
components:{
  'v-header':header
}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border:1px solid rgba(7,17,27,0.1)
  .tab-item
    flex:1 
    text-align:center   
    & > router-link 
        display: block
        font-size: 40px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
          
</style>
