<template>
  <div class="home">
    <div class="home-cneter">
      <router-view></router-view>
    </div>
    <div class="home-footer">
      <ul>
        <router-link v-for="(navs,index) in navbat" :to="'/'+navs.pathbat" tag="li" :key="index">
          <i class="iconfont" :class="navs.icon"></i>
          <span>{{navs.name}}</span>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
import one from './one.vue'
import three from './three.vue'
import four from './four.vue'
import five from './five.vue'
export default {
  data() {
    return {
      navbat: [
        {
        	icon:'icon-shouye',
          name: '首页',
          pathbat: 'one'
        },
        {
        	icon:'icon-liwu',
          name: '活动',
          pathbat: 'three'
        },
        {
        	icon:'icon-faxian1',
          name: '发现',
          pathbat: 'four'
        },
        {
        	icon:'icon-wode',
          name: '我的',
          pathbat: 'five'
        }
      ]
    }
  },
  components: {
    one,
    three,
    four,
    five
  }
}
</script>
<style lang='scss'>
@import '../../assets/scss/home.scss';
@import '../../assets/scss/one.scss';
@import '../../assets/scss/three.scss';
@import '../../assets/scss/four.scss';
</style>