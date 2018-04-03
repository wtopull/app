<template>
  <div class="lucky" v-show="isshow.showPage">
    <div class="three-title">
      <i class="el-icon-arrow-left" @click="hide"></i>
      <p>{{lucky.title}}</p>
    </div>
    <div class="lucky-box">幸运</div>
  </div>
</template>
<script>
import threeTitle from './three-title'
export default {
  data() {
    return {
      isshow: {
        showPage: false
      }
    };
  },
  props: {
    lucky: {
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
@import '../../assets/scss/page-three/lucky.scss';
</style>