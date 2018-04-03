<template>
  <div class="promote"  v-show="isshow.showPage">
    <!-- <three-title :threeTitle="isshow.showPage"></three-title> -->
    <div class="three-title">
      <i class="el-icon-arrow-left" @click="hide"></i>
      <p>{{promote.title}}</p>
    </div>
    <div class="pormote-box">升级</div>
  </div>
</template>
<script>
import threeTitle from "./three-title";
export default {
  data() {
    return {
      isshow: {
        showPage: false
      }
    };
  },
  props: {
    promote: {
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
  components: {
    threeTitle
  }
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/page-three/promote.scss';
</style>