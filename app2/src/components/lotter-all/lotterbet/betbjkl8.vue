<template>
  <div class="betbjkl8">
    <ul class="betbjkl8-top">
      <li><router-link to="/one" tag="i" class="el-icon-arrow-left"></router-link></li>
      <li>
        <p class="wangfa">玩<br/>法</p>
        <div class="menu" @click="show = !show">任选一
          <i :class="show ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
        </div>
        <div v-show="!show" class="menu-list" v-for="(muens,index) in muen" :key="index">
          <div class="menu-list-top"><p>{{muens.a}}</p></div>
          
          <!-- <ul><li><span v-for="(val,index) in muens.valus" :key="index">{{val}}</span></li></ul> -->
        </div>
      </li>
      <li><p>北京快乐</p></li>
    </ul>
    <div class="betbjkl8-content">北京快乐8
      <div v-for="(muens,index) in muen" :key="index">
        <p v-show="index === 0">{{muens.a}}</p>
        <ul>
          <li  v-show="index === 0"><p v-for="(val,index) in muens.valus" :key="index">{{val}}</p></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        show:true,
        show1:true,
        muen:[
          {a:'任选',valus:['任选一','任选二','任选三','任选四','任选五','任选六','任选七','任选八','任选九']},
          {a:'趣味',valus:['上下盘','奇偶盘','和值大小单双']},
        ]
      };
    },
    methods: {
      
    }
  }
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/lotter-list/lotterbet/betbjkl8.scss'
</style>