<template>
  <div class="profit">
    <ul>
    	<router-link to="/pop" tag="li" v-for="(item,index) in haa">
        <div class="profit-left">
          <img src="../../assets/img/home/one/ah11x5.png" />
          <div class="profit-xq">
            <p>账号昵称：
              <span>{{item.name | capitalize}}</span>
            </p>
            <p>昨日盈利：
              <span>￥{{index+10000.26}}</span>
            </p>
          </div>
        </div>
        <div class="profit-right">
          <span>{{index+1}}</span>
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
<style>

</style>
<style lang="scss">
  @import '../../assets/scss/four-page/profit.scss';
</style>