<template>
  <div class="three-title">
    <i class="el-icon-arrow-left" @click="hide"></i>
    <p>信息</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isshow: {
        showPage: false
      }
    };
  },
  props: {
    threeTitle: {
      type: Boolean
    }
  },
  methods: {
    hide() {
      this.isshow.showPage = false;
      this.$emit("sonclick", this.isshow);
    }
  }
};
</script>
<style lang="scss">
.three-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #fff;
    position: fixed;
    top: 0px;
    height: 46px;
    width: 100%;
    background: linear-gradient(to right, #f75f5b , #fead50);
    z-index: 11;
    & i {
        position: absolute;
        left: 16px;
    }
}
</style>
