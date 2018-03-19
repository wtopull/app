<template>
  <div>
    <mt-swipe :auto="2000">
      <mt-swipe-item>
        <img src="../../assets/img/home/one/banner.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../../assets/img/home/one/banner.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../../assets/img/home/one/banner.jpg" alt="">
      </mt-swipe-item>
    </mt-swipe>
    <div class="add">
      广告
    </div>
    <div class="one-nav">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
    <ul class="one-conter">
      <li>
        <div class="one-conter-top"></div>
        <ul>
          <li>1</li>
        </ul>
      </li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
    </ul>
  </div>
</template>
<script>
import { Swipe, SwipeItem } from 'mint-ui';
export default {
  data() {
    return {};
  }
};
</script>

<style>

</style>
