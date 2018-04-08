<template>
<div class="promoList">
  <div @click="proTo(0)" v-show="$store.state.pro_tab[0].toggle"><img src="../../assets/disc_6.jpg"/>
    <promotionh v-show="$store.state.proToggle[0].toggle"></promotionh>
  </div>
  <div @click="proTo(1)" v-show="$store.state.pro_tab[1].toggle"><img src="../../assets/disc_2.jpg"/>
    <promotionj v-show="$store.state.proToggle[1].toggle"></promotionj>
  </div>
  <div @click="proTo(2)" v-show="$store.state.pro_tab[2].toggle"><img src="../../assets/disc_4.jpg"/>
    <promotionl v-show="$store.state.proToggle[2].toggle"></promotionl>
  </div>
  <div @click="proTo(3)" v-show="$store.state.pro_tab[3].toggle"><img src="../../assets/disc_3.jpg"/>
    <promotionk v-show="$store.state.proToggle[3].toggle"></promotionk>
  </div>
</div>
</template>
<script>
import promotionh from './promotion_cheri.vue';
import promotionj from './promotion_2.vue';
import promotionk from './promotion_3.vue';
import promotionl from './promotion_4.vue';
export default{
  components:{
    promotionh,promotionj,promotionk,promotionl
  },
  methods:{
    proTo(index){
      this.$store.state.proToggle[index].toggle=!this.$store.state.proToggle[index].toggle;
    }
  }
}
</script>
<style lang="scss">
@import '../../assets/css/main.scss';
.promoList {
  width:rem2px(750);
  margin-bottom:rem2px(90);
 img{
  width:rem2px(750);
  }
}

</style>
