<template>
  <div class="second">
    <!--<mt-header title="大厅"  class="second-top">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>-->
    <ul class="second-nav">
      <router-link v-for="(navs,index) in secondNav" :to="'/second/'+navs.pathbat" tag="li" :key="index">
        <p></p>
        <span>{{ navs.name}}</span>
      </router-link>
    </ul>
    <div class="second-conter">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        secondNav:[
          {name:'彩票中心',pathbat:'lotto'},
          {name:'真人娱乐',pathbat:'reality'},
          {name:'电子游戏',pathbat:'electronic'},
          {name:'体育投注',pathbat:'sports'}
        ]
      }
    }
  }
</script>
