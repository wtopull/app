<template>
  <div class="winning">
    <ul>
      <router-link to="/pop" tag="li" v-for="(item,index) in haa">
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
      </router-link>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        haa: [
        	{name:'你好haaaaaa1'},
        	{name:'你好haaaaaa2'},
        	{name:'你好haaaaaa3'},
        	{name:'你好haaaaaa4'},
        	{name:'你好haaaaaa5'},
        	{name:'你好haaaaaa6'},
        	{name:'你好haaaaaa7'},
        	{name:'你好haaaaaa8'},
        	{name:'你好haaaaaa9'},
        	{name:'你好haaaaaa10'},
        ]
      }
    },
    filters: {
      capitalize(value) {
        let start = value.slice(0, 1);
        let end = value.slice(-1);
        return `${start}***${end}`;
      }
    }
  }
</script>
<style lang="scss">
  @import '../../assets/scss/four-page/winning.scss';
</style>