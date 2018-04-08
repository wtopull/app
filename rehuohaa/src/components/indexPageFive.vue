<template>
<div ref="center" class="centerModules">
  <div id="mtitle" class="mtitle">
    <v-touch @tap="$store.commit('returnCenter')" class="backend">
      <icon name="angle-left"></icon>返回
    </v-touch>{{this.$store.state.centerTitle}}
  </div>
  <transform v-if="$store.state.centers[0].toggle"></transform>
  <security v-if="$store.state.centers[1].toggle"></security>
  <message v-if="$store.state.centers[2].toggle"></message>
  <recharge v-if="$store.state.centers[3].toggle"></recharge>
  <withdraw v-if="$store.state.centers[4].toggle"></withdraw>
  <record v-if="$store.state.centers[5].toggle"></record>
</div>
</template>
<script>
  import transform from "./center/center_tran.vue";
  import security from "./center/center_sec.vue";
  import message from "./center/center_mess.vue";
  import recharge from "./center/center_recha.vue";
  import withdraw from './center/center_wit.vue';
  import record from './center/center_reco.vue';
	export default{
		components:{
			transform,
			security,
			message,
			recharge,
			withdraw,
			record
		}
	}
</script>
