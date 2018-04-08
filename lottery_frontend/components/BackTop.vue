<template>
  <transition name="back-top-fade">
    <div class="back-top" v-show="showBackToTop" @mouseenter="hover = true" @mouseleave="hover = false" @click="toTop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-back-top"></use>
      </svg>
    </div>
  </transition>
</template>

<style lang="scss">
.back-top-fade-enter,
.back-top-fade-leave-active {
  transform: translateY(-30px);
  opacity: 0;
}
.back-top {
  background-color: #8d8d8d;
  position: fixed;
  right: 30px;
  bottom: 100px;
  width: 33px;
  height: 33px;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  .icon {
    color: #fff;
    font-size: 16px;
    margin-right: 0;
  }

  &.hover {
    opacity: 1;
  }
}
</style>


<script>
import { throttle } from 'lodash/fp'
import MoveTo from 'moveto'
export default {
  name: 'back-to-top',
  props: ['height'],
  data() {
    return {
      showBackToTop: false,
      hover: false
    }
  },
  methods: {
    toTop() {
      this.hover = false
      this.showBackToTop = false
      // document.documentElement.scrollTop = 0
    },
    handleScroll() {
      //https://github.com/iview/iview/blob/2.0/src/components/back-top/back-top.vue
      this.showBackToTop =
        window.pageYOffset >= (this.height || 0.5 * document.body.clientHeight)
    }
  },
  mounted() {
    this.throttledScrollHandler = throttle(300, this.handleScroll)
    window.addEventListener('scroll', this.throttledScrollHandler)
    new MoveTo({
      duration: 300
    }).registerTrigger(document.querySelector('.back-top'))
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.throttledScrollHandler)
  }
}
</script>
