<template>
  <div class="home">    
    <div class="home-cneter">
      <!-- <div class="home-top">top{{ massg}}</div> -->
      <router-view></router-view>
    </div>
    <div class="home-footer">
      <ul>
        <router-link v-for="(navs,index) in navbat" :to="'/'+navs.pathbat" tag="li" >
          <p><img src="../../assets/img/home/home.png" alt=""></p>
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
</style>

