<template>
  <div class="looterAll">
    <ul>
      <router-link v-for="(item,index) in 19" :key="index" tag="li" to="">
        <img src="../../assets/img/one/zhssc.png" alt="images"/>
        <h5>全部彩种</h5>
      </router-link>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
@import '../../assets/scss/lotter-list/lotterAll.scss'
</style>

