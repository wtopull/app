<template>
  <div class="betbjkl8">
    <ul class="betbjkl8-top">
      <li><router-link to="/one" tag="i" class="el-icon-arrow-left"></router-link></li>
      <li>
        <p class="wangfa">玩<br/>法</p>
        <div class="menu" @click="show = !show">{{titles}}
          <i :class="show ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
        </div>
        <div class="menu-list">
          <div v-show="!show">
            <div class="menu-list-top">
              <p v-for="(muens,index) in muen" :key="index" @click="menunav($event,index,muens)">{{muens.a}}</p>
            </div>
            <ul>
              <li v-for="(val,index) in muen" :key="index" v-show="index === navs"><p v-for="(item,index) in val.valus" :key="index"  @click="isshow($event,item)">{{item}}</p></li>
            </ul>
          </div>
          
        </div>
      </li>
      <li><p>北京快乐</p></li>
    </ul>
    <div class="betbjkl8-content">
      qqq
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        show:true,
        show1:false,
        navs: 0,
        titles:'任选一',
        muen:[
          {a:'任选',valus:['任选一','任选二','任选三','任选四','任选五','任选六','任选七','任选八','任选九']},
          {a:'趣味',valus:['上下盘','奇偶盘','和值大小单双']},
        ]
      };
    },
    methods: {
      menunav(event,index,muens){
        if(muens){
          this.navs = index;
        }
      },
      isshow(event,item){
        this.titles = item;
        this.show = !this.show;
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/lotter-list/lotterbet/betbjkl8.scss'
</style>