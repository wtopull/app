<template>
<div>
  <div class="srow">
    <v-touch tag="a" data-sport="BBIN" href="javascript:;" @tap="$store.dispatch('loginGame','bb_sport')"></v-touch>
  </div>
  <v-touch tag="a" data-sport="ww" href="javascript:;" @tap="$store.dispatch('loginGame','ww_sport')"></v-touch>
</div>
</template>
<style lang="scss">
@import "../../assets/css/main.scss";
.srow{
  margin-top:rem2px(150);
  @extend %flex_center;
 justify-content:center;
 a{
   display:inline-block;
   background-size:rem2px(160),rem2px(195) !important;
   @include cBg('sport_2.png',rem2px(160),rem2px(195));
 }
}
</style>
