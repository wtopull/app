<template src="../templates/active.html">

</template>

<style lang="scss">
.active_list{
  .el-collapse-item__header{
    height: 305px;
    line-height: $line-height-base;
  }
  .el-collapse-item__arrow{
    display: none;
  }
  .el-collapse-item__content{
    padding-bottom: 0;
  }
}
</style>


<script>
import '~/assets/c8css/active.css'
import Vue from 'vue'
import { Collapse, CollapseItem } from 'element-ui'
import ad from '../components/ad.vue'
Vue.use(Collapse)
Vue.use(CollapseItem)

export default {
  name: 'events',
  data(){
  	return{
  		isshow:false,
  		eventsactive:0,
  		menu:[{name:'全部优惠'},{name:'彩票优惠'},{name:'真人优惠'},{name:'电子优惠'},{name:'体育优惠'}],
  	}
  },
  async asyncData({ app }) {
    return {
      events: (await app.$axios.$post('event/get')).data
    }
  },
  methods: {
    change(activeNames){
      if(activeNames.length) {
        this.$axiosPlus('event/find',{id:activeNames[0]},data => {
          console.log('data',data)
        })
      }
    },
    show(){
    	$(".list li a").click(function(){
    		$(this).children('i').removeClass('el-icon-caret-right').addClass('el-icon-caret-bottom');
    		$(this).parents('li').siblings().children().find('i').removeClass('el-icon-caret-bottom').addClass('el-icon-caret-right');
    		$(this).parents('li').addClass('active');
    		$(this).parents('li').siblings().removeClass('active');
    		
    		$(this).parents('li').children().find('.list-bottom').addClass('active');
    		$(this).parents('li').siblings().children().find('.list-bottom').removeClass('active');
    	})
    }
  },
  mounted(){
	this.show();
  },
  components:{
  	ad
  }
}
</script>

