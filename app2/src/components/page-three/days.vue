<template>
  <div class="days" v-show="isshow.showPage">
    <div class="three-title">
      <i class="el-icon-arrow-left" @click="hide"></i>
      <p>{{days.title}}</p>
    </div>
    <div class="days-box">每日</div>
  </div>
</template>
<script>
import threeTitle from './three-title';
export default {
  data() {
    return {
      isshow: {
        showPage: false
      }
    };
  },
  props: {
    days: {
      type: Object
    }
  },
  methods: {
    show() {
      this.isshow.showPage = true;
    },
    hide() {
      this.isshow.showPage = false;
      this.$emit("sonclick", this.isshow);
    }
  },
  components:{
    threeTitle
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/page-three/days.scss';
</style>