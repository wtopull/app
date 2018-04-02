<template>
  <div class="winning">
    <ul v-show="showFlag" >
      <li v-for="(item,index) in haa" @click="selectFood(item,$event)">
        <div class="winning-left">
          <img src="../../assets/img/home/one/ah11x5.png" />
          <div class="winning-xq">
            <p>
              <span>{{item.name | capitalize}}</span>
              <span>在大发时时彩</span>
            </p>
            <p>
              <span>喜中</span>
              <span>￥{{index+10000.26}}</span>
            </p>
          </div>
        </div>
        <div class="winning-right">
          <span><i class="el-icon-arrow-right"></i></span>
        </div>
      </li>
    </ul>
    <pop :pop="selectedFood" @sonclick="haashow" ref="pop"></pop>
  </div>
</template>
<script>
	import pop from './pop'
  export default {
    data() {
      return {
        haa: [
        	{name:'haaaa1'},
        	{name:'haaaa2'},
        	{name:'haaaa3'},
        	{name:'haaaa4'},
        	{name:'haaaa5'},
        	{name:'haaaa6'},
        	{name:'haaaa7'},
        	{name:'haaaa8'},
        	{name:'haaaa9'},
        	{name:'haaaa10'},
        ],
        selectedFood: {},
        showFlag: true
      }
    },
    methods: {
      selectFood(item, event) {
      	this.showFlag = false;
        this.selectedFood = item;
        this.$refs.pop.show();
      },
      haashow(isshow){
      	this.showFlag = !isshow.showF;
      }
    },
    filters: {
      capitalize(value) {
        let start = value.slice(0, 1);
        let end = value.slice(-1);
        return `${start}***${end}`;
      }
    },
    components: {
      pop
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/scss/four-page/winning.scss';
</style>