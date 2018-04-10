<template>
  <div class="k3">
    <ul>
      <router-link v-for="(item,index) in 10" :key="index" tag="li" to="">
        <img src="../../assets/img/one/zhssc.png" alt="images"/>
        <h5>快3</h5>
      </router-link>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
@import '../../assets/scss/lotter-list/k3.scss'
</style>
