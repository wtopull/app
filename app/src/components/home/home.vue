<template>
  <div class="home">    
    <div class="home-cneter">
      <router-view></router-view>
    </div>
    <div class="home-footer">
      <ul>
        <router-link v-for="(navs,index) in navbat" :to="'/'+navs.pathbat" tag="li" :key="index">
          <p></p>
          <span>{{navs.name}}</span>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
import one from './one.vue'
import second from './second.vue'
import three from './three.vue'
import four from './four.vue'
import five from './five.vue'
export default {
  data() {
    return {
      massg:1,
      navbat:[
        {name:'首页',pathbat:'one'},
        {name:'大厅',pathbat:'second'},
        {name:'开奖',pathbat:'three'},
        {name:'彩聊',pathbat:'four'},
        {name:'个人',pathbat:'five'},
      ]
    };
  },
  components:{
    one,second,three,four,five
  }
}
</script>
<style lang='scss'>
@import "../../assets/scss/home.scss";
@import "../../assets/scss/one.scss";
@import "../../assets/scss/second.scss";
@import "../../assets/scss/three.scss";
@import "../../assets/scss/four.scss";
@import "../../assets/scss/five.scss";
</style>

