<template>
  <div class="four">
  	<div class="one-top">
  		<ul>
  			<router-link v-for="(navs,index) in nav" :to="'/four/'+navs.pathurl" tag="li" :key="index">{{navs.name}}</router-link>
  		</ul>
  	</div>
  	<div class="four-conter">
  		<router-view></router-view>
  	</div>
  </div>
</template>
<script>
	export default{
		data() {
			return{
				nav:[
					{name:'中奖信息',pathurl:'winning'},
					{name:'昨日盈利榜',pathurl:'profit'}
				]
			}
		}
	}
</script>
